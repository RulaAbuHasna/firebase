import React from 'react';
import BlogsSpace from '../blogs/blogs.component';
import NotesSpace from '../notes/notes.component';
import './homepage.styles.scss';
import Footer from '../footer/footer.component';
import { useHistory } from 'react-router-dom';

export default function Homepae({ user }) {
  const history = useHistory();
  return user ? (
    <div>
      <div style={{ padding: ' 0px 34px' }}>
        <div className='main_section'>
          <span className='main_title'>
            Hey! This is your personal space, you can wrtie blogs, notes, todos
            and Tasks, share them and more! Enjoy!
            <div>
              <button>
                <span onClick={() => history.push('./general')}>
                  General Blog Space
                </span>
              </button>
              <button>
                <span onClick={() => history.push('./bookmarks')}>
                  My Bookmarks
                </span>
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
      <span
        style={{ color: ' rgb(196, 29, 29' }}
        onClick={() => {
          history.push('./signIn');
        }}
      >
        Sign In
      </span>{' '}
      to be able to save new blogs, messages and notes and read your prev ones
      🙏
    </div>
  );
}
