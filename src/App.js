import './App.scss';
import './components/signin/signin.component';
import SignIn from './components/signin/signin.component';
import SignUp from './components/signup/signup.component';
import Header from './components/header/header.component';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import { auth, createUserProfileDoc } from './firebase/firebase.utils';
import React from 'react';
import Homepage from './components/homepage/homepage.component';
import General from './components/general/general.component';
import Bookmarks from './components/bookmarks/bookmarks.component';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      currentUser: null
    }
    //to close the subscribe
    this.unsubscribeFromAuth = null;
  }
  componentDidMount() {
    //open messgaing sysgtem whenever a change happen to the app the serivce send us a new obj
    //open subscription 
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => { //returns a function that lets us unsubscribe
      this.setState({ user: user }) //i can just save the user i get from the db and useit orrr get the ref of it 
      //console.log(createUserProfileDoc(user)) //exsists? false? save it by userref.set() otherwise return the ref
      if (user) {
        //if we have the user save it in thr front end 
        const userRef = await createUserProfileDoc(user);
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          }, () => console.log(this.state.currentUser)) //it's aysnc and the data isn't yet updated
        });
      } else {
        //if we don't make sure to give it a null value 
        this.setState({ currentUser: null })
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App" >
        <Router>
          <Header user={this.state.user} />
          <Route exact path='/signIn' component={SignIn} />
          <Route exact path='/signUp' component={SignUp} />
          <Route exact path='/bookmarks' component={() => <Bookmarks userId={this.state.user ? this.state.user.uid : null} />} />
          <Route exact path='/' component={() => <Homepage user={this.state.user} />} />
          <Route exact path='/general' component={() => <General user={this.state.user} />} />
        </Router>
      </div>
    );
  }
}

export default App;
