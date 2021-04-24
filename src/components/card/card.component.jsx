import React, { useState } from 'react';
import './card.styles.scss';
import { deleteText } from '../../firebase/firebase.utils';
import Swal from 'sweetalert2';

export default function Card({ textId, text, userId }) {
  const [display, setDisplay] = useState('');

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

  return (
    <div className='card' style={{ display: `${display}` }}>
      {text}
      <button onClick={handleDelete} class='deleteBtn'>
        Delete
      </button>
    </div>
  );
}
