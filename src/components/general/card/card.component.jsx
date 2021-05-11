import React, { useState } from 'react';
import './card.styles.scss';
import {
  deleteBlogFromGeneral,
  bookmarkBlog,
} from '../../../firebase/firebase.utils';
import Swal from 'sweetalert2';

export default function Card({ data, blog, blogUserId, curUser, blogId }) {
  let [prompt, setPrompt] = useState(false);
  let [display, setDisplay] = useState('');

  let handlePrompt = (e) => {
    e.preventDefault();
    setPrompt(!prompt);
  };

  let handleDelete = (e) => {
    e.preventDefault();
    deleteBlogFromGeneral(blogId)
      .then((res) => {
        console.log(res);
        setDisplay('none');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let handleBookmark = (e) => {
    e.preventDefault();
    bookmarkBlog(curUser.uid, data.data())
      .then((res) => {
        if (res)
          Swal.fire({
            icon: 'success',
            title: 'Bookmarked',
          });
        else
          Swal.fire({
            icon: 'error',
            title: 'already bookmarked',
          });
      })
      .catch((err) => {
        console.log('cannot save to bookmark');
      });
  };

  return !prompt ? (
    <div id='container' onClick={handlePrompt} style={{ display: display }}>
      <span className='save' onClick={handleBookmark}>
        🔖
      </span>
      {blog}
      {blogUserId === curUser.uid ? (
        <span className='del' onClick={handleDelete}>
          🗑️
        </span>
      ) : null}
    </div>
  ) : (
    <div
      id='promptContainer'
      onClick={handlePrompt}
      style={{ display: display }}
    >
      <span className='save' onClick={handleBookmark}>
        🔖
      </span>
      {blog}
      {blogUserId === curUser.uid ? (
        <span className='del' onClick={handleDelete}>
          🗑️
        </span>
      ) : null}
    </div>
  );
}
