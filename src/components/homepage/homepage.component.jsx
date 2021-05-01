import React from 'react';
import BlogsSpace from '../blogs/blogs.component';
import NotesSpace from '../notes/notes.component';

export default function Homepae({ user }) {
  return (
    <div>
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
