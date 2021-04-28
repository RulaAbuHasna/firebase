import { AppBar, Toolbar } from '@material-ui/core';
import React from 'react';
import { auth } from '../../firebase/firebase.utils';
import './header.styles.scss';
import { useHistory } from 'react-router-dom';

export default function Header({ user }) {
  let history = useHistory();
  //console.log(user.displayName, ' this is the header');
  const displayDesktop = () => {
    return (
      <Toolbar style={{ background: '#86C232' }}>
        <span className='first'>
          Welcome {user ? <span id='name'>{user.displayName}</span> : null} To
          My first Firebse-based App
        </span>
        <span className='second'>
          {user ? (
            <span
              onClick={() => {
                auth.signOut();
                history.push('./signIn');
              }}
              className=''
            >
              Sign Out
            </span>
          ) : (
            <span onClick={() => history.push('./signIn')}>Sign In</span>
          )}
          <span
            style={{ margin: '0px 7px' }}
            onClick={() => history.push('./signUp')}
          >
            Sign Up
          </span>
        </span>
      </Toolbar>
    );
  };

  return (
    <header>
      <AppBar style={{ position: 'relative' }}>{displayDesktop()}</AppBar>
    </header>
  );
}
