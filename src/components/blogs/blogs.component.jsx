import React from 'react';
import './blogs.styles.scss';
import { useState, useEffect } from 'react';
import { saveText, getTexts } from '../../firebase/firebase.utils';
import Card from './card/card.component';
import Swal from 'sweetalert2';

export default function BlogsSpace({ user }) {
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
      .then((snapShot) => {
        setVal('');

        //add it to the allTexts
        setAllTexts((prevState) => {
          let newState = [...prevState, snapShot];
          return newState;
        });

        Swal.fire({
          icon: 'success',
          text: `Yay! it's saved`,
        });
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
        Swal.fire({
          icon: 'error',
          text: `oops! we had an issue getting data`,
        });
      });
  }, [id]);

  return id ? (
    <div className='container'>
      <div className='first-block'>
        <span id='welcoming'>
          <span id='welcome'>Welcome</span> to Your Blogging Space ✨
        </span>
        <textarea onChange={handleChange} value={val} name='txt' /> <br />
        <br />
        <button onClick={handleSubmit}>Save</button>
      </div>
      <div>
        <div className='getTexts'>
          {allTexts
            ? allTexts.map((text, idx) => {
                return (
                  <Card
                    key={idx}
                    index={idx + 1}
                    textId={text.id}
                    text={text.data().txt}
                    hidden={text.data().hidden}
                    userId={id}
                  />
                );
              })
            : null}
        </div>
      </div>
    </div>
  ) : (
    <div id='note'>
      Please{' '}
      <a href='./signIn' style={{ color: ' rgb(196, 29, 29' }}>
        Sign In
      </a>{' '}
      to be able to save new blogs, messages and notes and read your prev ones
      🙏
    </div>
  );
}
