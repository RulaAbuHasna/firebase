import React from 'react';
import './homepage.styles.scss';
import { useState, useEffect } from 'react';
import { saveText, getTexts } from '../../firebase/firebase.utils';

export default function HomePage({ user }) {
  let id = user ? user.uid : null;
  const [val, setVal] = useState('');
  const [allTexts, setAllTexts] = useState([]);

  let handleChange = (e) => {
    e.preventDefault();
    setVal(e.target.value);
  };

  //save the text to db
  let handleSubmit = (e) => {
    e.preventDefault();
    if (val === '') return;
    saveText(val, id)
      .then((res) => {
        setVal('');
        alert('Sucessfully Submited');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTexts(id)
      .then((docs) => {
        setAllTexts(docs);
      })
      .catch((err) => {
        console.log(err);
        alert('error getting data!');
      });
  }, [allTexts, id]);

  return (
    <div class='container'>
      <br />
      <span id='welcoming'>Welcome to Your Blogging Space ✨</span>
      <div>
        <textarea onChange={handleChange} value={val} name='txt' />{' '}
        <br />
        <br />
        <button onClick={handleSubmit}>Save</button>
      </div>
      <div>
        <div className='getTexts'>
          {allTexts
            ? allTexts.map((text, idx) => {
                return (
                  <div key={idx} className='card'>
                    {idx + 1}.{text.data().txt}{' '}
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
