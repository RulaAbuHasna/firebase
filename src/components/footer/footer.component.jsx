import React from 'react';
import './footer.styles.scss';

export default function Footer() {
  return (
    <footer className='site-footer'>
      <section className='about_section'>
        <span className='section_title'>About</span>
        <span className='about_'>
          This website is made for you to enjoy your personal space, and to
          share your blogs with others, and surfe whatever topic you need!
        </span>
      </section>
      <section className='links_section'>
        <span className='section_title'>Quick Links</span>
        <span className='blogs_section'>
          {' '}
          <a href='#myBlogs'>My Blogs ✨</a>
        </span>
        <span className='todos_section'>
          {' '}
          <a href='#myTodos'>My To dos 📝</a>
        </span>
      </section>
      <section>
        <span className='section_title'>Contact Me</span>
        <ul className='social-icons'>
          <li>
            <a className='facebook' href='https://www.facebook.com/rula.hasna/'>
              <i className='fa fa-facebook'>fb</i>
            </a>
          </li>
          <li>
            <a className='twitter' href='https://twitter.com/Rulahasna'>
              <i className='fa fa-twitter'>t</i>
            </a>
          </li>
          <li>
            <a
              className='linkedin'
              href='https://www.linkedin.com/in/rula-abu-hasna-9a32b61b3/'
            >
              <i className='fa fa-linkedin'>lI</i>
            </a>
          </li>
        </ul>
      </section>
    </footer>
  );
}
