import React, { useState, useEffect } from 'react';
import './item.styles.scss';
import { updateNote } from '../../../firebase/firebase.utils';

export default function Item({ userId, noteId, note, checked }) {
  const [emoji, setEmoji] = useState('📎'); //
  const [decoration, setDecoration] = useState('none');
  const [done, setDone] = useState(checked);

  let handleClick = (e) => {
    e.preventDefault();
    if (!done) {
      setEmoji('✔️');
      setDecoration('line-through');
      setDone(true);
    } else {
      setEmoji('📎');
      setDecoration('none');
      setDone(false);
    }
    updateNote(userId, noteId, note)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className='note'>
      {' '}
      {emoji}
      <div onClick={handleClick} style={{ textDecoration: `${decoration}` }}>
        {note}
      </div>
    </div>
  );
}
