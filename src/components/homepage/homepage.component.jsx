import React from 'react';
import BlogsSpace from '../blogs/blogs.component';
import NotesSpace from '../notes/notes.component';
import './homepage.styles.scss';
import Footer from '../footer/footer.component';

export default function Homepae({ user }) {
  return user ? (
    <div>
      <div style={{ padding: ' 0px 34px' }}>
        <div className='main_section'>
          <span className='main_title'>
            Hey! This is your personal space, you can wrtie blogs, notes, todos
            and Tasks, share them and more! Enjoy!
            <div>
              <button>
                <a href='#blogSpace'>My Blog Space</a>
              </button>
              <button>
                <a href='#todosSpace'>My Todos</a>
              </button>
            </div>
          </span>
        </div>
        <div id='blogSpace'>
          <BlogsSpace user={user} />
        </div>
        <br />
        <br />
        <br />
        <div id='todosSpace'>
          {' '}
          <NotesSpace user={user} />
        </div>
      </div>
      <Footer />
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
