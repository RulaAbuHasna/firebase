import React from 'react';
import './footer.styles.scss';

export default function Footer() {
  return (
    <footer className='site-footer'>
      <div className='container'>
        <section>About Section</section>
        <section>Quick Links</section>
        <section>
          Contact Me
          <ul className='social-icons'>
            <li>
              <a className='facebook' href='#'>
                <i className='fa fa-facebook'></i>
              </a>
            </li>
            <li>
              <a className='twitter' href='#'>
                <i className='fa fa-twitter'></i>
              </a>
            </li>
            <li>
              <a className='dribbble' href='#'>
                <i className='fa fa-dribbble'></i>
              </a>
            </li>
            <li>
              <a className='linkedin' href='#'>
                <i className='fa fa-linkedin'></i>
              </a>
            </li>
          </ul>
        </section>
      </div>
    </footer>
  );
}
