import React, { useState, useEffect } from 'react';
import { getGeneral } from '../../firebase/firebase.utils';
import Card from './card/card.component';
import './general.styles.scss';
import Footer from '../footer/footer.component';

export default function General({ user }) {
  let [generalBlogs, setGeneralBlogs] = useState([]);
  let [origin, setOrigin] = useState([]);
  let [val, setVal] = useState('');

  useEffect(() => {
    getGeneral()
      .then((res) => {
        setGeneralBlogs(res);
        setOrigin(res);
        console.log(res);
      })
      .catch((err) => {
        console.log('err getting the data');
      });
  }, []);

  //search blogs
  let handleChange = (e) => {
    e.preventDefault();
    setVal(e.target.value);
    console.log(val);
    if (val === '' || val.length === 1) {
      setGeneralBlogs(origin);
      return;
    }
    let generated = origin.filter((blog) =>
      blog.data().blog.toLowerCase().includes(val)
    );
    setGeneralBlogs(generated);
  };

  return (
    <div id='general'>
      <div>
        <h3 id='title'>Searhing for a specific topic?</h3>
        <input type='text' value={val} onChange={handleChange} id='search' />
      </div>
      <div id = "blogs">
        {generalBlogs
          ? generalBlogs.map((blog) => {
              return <Card blog={blog.data().blog} />;
            })
          : null}
      </div>
      <Footer />
    </div>
  );
}
