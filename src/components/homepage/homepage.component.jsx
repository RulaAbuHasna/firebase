import React from 'react';
import BlogsSpace from '../blogs/blogs.component';
import NotesSpace from '../notes/notes.component';
import './homepage.styles.scss';

export default function Homepae({ user }) {
  return (
    <div style={{ padding: ' 0px 34px' }}>
      <div className='main_section'>
        <span className='main_title'>
          Hey! This is your personal space, you can wrtie blogs, notes, todos
          and Tasks, share them and more! Enjoy!
        </span>
      </div>
      <div>
        <BlogsSpace user={user} />
      </div>
      <br />
      <br />
      <br />
      <div>
        {' '}
        <NotesSpace user={user} />
      </div>
    </div>
  );
}
