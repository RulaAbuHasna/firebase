import React, { useEffect, useState } from 'react';
import { getBookmarks } from '../../firebase/firebase.utils';
import Card from './card/card.component';
import './bookmarks.styles.scss';
import { useHistory } from 'react-router-dom';

export default function Bookmarks({ userId }) {
  let [bookmarks, setBookmarks] = useState([]);
  let history = useHistory();

  useEffect(() => {
    getBookmarks(userId)
      .then((res) => {
        setBookmarks(res.docs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  return (
    <div>
      <span
        className='back'
        onClick={() => {
          history.push('./main');
        }}
      >
        Go Back
      </span>
      <div className='title' style={{ margin: '30px' }}>
        Your Bookmarks 📑
      </div>
      <div className='bookmarks'>
        {bookmarks
          ? bookmarks.map((bookmark) => {
              return <Card data={bookmark.data()} />;
            })
          : null}
      </div>
    </div>
  );
}
