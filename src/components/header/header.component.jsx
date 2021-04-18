import { AppBar, Toolbar } from '@material-ui/core';
import React from 'react';
import { auth } from '../../firebase/firebase.utils';
import './header.styles.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from 'react-router-dom';

export default function Header({ user }) {
  //console.log(user.displayName, ' this is the header');
  const displayDesktop = () => {
    return (
      <Toolbar>
        <span className='option'>
          Welcome{user ? <span>{user.displayName}</span> : null} To My first
          Firebse-based App
        </span>
        {user ? (
          <span onClick={() => auth.signOut()} className='option signInAndOut'>
            Sign Out
          </span>
        ) : (
          <Router>
            {' '}
            <Link to='./signIn' className='option signInAndOut'>
              Sign In
            </Link>
          </Router>
        )}
      </Toolbar>
    );
  };

  return (
    <header>
      <AppBar style={{ position: 'relative' }}>{displayDesktop()}</AppBar>
    </header>
  );
}
