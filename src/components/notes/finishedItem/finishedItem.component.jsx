import React, { useState } from 'react';
import { deleteNote } from '../../../firebase/firebase.utils';
import './finishedItem.styles.scss';

export default function FinishedItem({ userId, noteId, note }) {
  let [display, setDisplay] = useState('');
  //delete note!
  let handleClick = (e) => {
    deleteNote(userId, noteId)
      .then((res) => {
        alert('sucess');
        setDisplay('none');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className='note'
      style={{ display: `${display}` }}
      onClick={handleClick}
      id=''
    >
      {note}{' '}
    </div>
  );
}
