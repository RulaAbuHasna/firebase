import React, { useState } from 'react';
import './card.styles.scss';
import { deleteText, editText } from '../../firebase/firebase.utils';
import Swal from 'sweetalert2';

export default function Card({ textId, text, userId }) {
  const [display, setDisplay] = useState('');
  const [hide, setHide] = useState(false);
  const [edit, setEdit] = useState(false);
  const [val, setVal] = useState(text);

  let handleDelete = (e) => {
    e.preventDefault();
    console.log({ userId, textId });
    deleteText(userId, textId)
      .then(() => {
        Swal.fire({
          icon: 'success',
          text: `Yup, it's gone`,
        });
        setDisplay('none');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let handleEdit = (e) => {
    //change the card to allow the user to change
    e.preventDefault();
    //console.log('here');
    setEdit(true);
  };

  let handleChange = (e) => {
    //handle the input change
    e.preventDefault();
    setVal(e.target.value);
  };

  let handleUpdate = (e) => {
    //update it in the DB
    e.preventDefault();
    editText(userId, textId, val)
      .then(() => {
        Swal.fire({
          icon: 'success',
          text: `Yup, it's edited`,
        });
        setEdit(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let handleHide = (e) => {
    e.preventDefault();
    !hide ? setHide(true) : setHide(false);
  };

  return !edit ? (
    <div
      className={!hide ? 'card' : 'hiddenCard'}
      style={{ display: `${display}` }}
    >
      <span style={{ width: '10px', cursor: 'pointer' }} onClick={handleHide}>
        📌
      </span>
      {!hide ? val : 'Hidden'}
      {!hide ? (
        <div className='row'>
          <button onClick={handleEdit} class='cardBtn edit'>
            Edti
          </button>
          <button onClick={handleDelete} class='cardBtn'>
            Delete
          </button>
        </div>
      ) : null}
    </div>
  ) : (
    //if we're editing show this component
    <div>
      <div className='card' style={{ display: `${display}` }}>
        <input
          value={val}
          name='edit'
          onChange={handleChange}
          className='edit'
        />
        <button onClick={handleUpdate} class='cardBtn'>
          update
        </button>
      </div>
    </div>
  );
}
