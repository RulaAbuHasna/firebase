import './App.scss';
import './components/signin.component';
import SignIn from './components/signin.component';
import SignUp from './components/signup.component';
import Header from './components/header/header.component'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import { auth, createUserProfileDoc } from './firebase/firebase.utils';
import React from 'react';


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
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
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
        <Header user={this.state.user} />
        <Router>
          <Route exact path='/signIn' component={SignIn} />
          <Route exact path='/SignUp' component={SignUp} />
        </Router>
        {/* <div id="first">first block</div>
      <div id="second">second block</div>
      <div id="third">third block</div> */}
      </div>
    );
  }
}

export default App;
