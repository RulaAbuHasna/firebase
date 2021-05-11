import React, { useState, useEffect } from 'react';
import { getGeneral } from '../../firebase/firebase.utils';
import Card from './card/card.component';
import './general.styles.scss';
import Footer from '../footer/footer.component';
import { useHistory } from 'react-router-dom';

export default function General({ user }) {
  let [generalBlogs, setGeneralBlogs] = useState([]);
  let [origin, setOrigin] = useState([]);
  let [val, setVal] = useState('');
  let history = useHistory();

  useEffect(() => {
    getGeneral()
      .then((res) => {
        setGeneralBlogs(res);
        setOrigin(res);
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
    console.log(val);
    if (val === '' || val.length === 1) {
      setGeneralBlogs(origin);
      return;
    }
    let generated = origin.filter((blog) =>
      blog.data().blog.toLowerCase().includes(val.toLowerCase())
    );
    setGeneralBlogs(generated);
  };

  return (
    <div id='general'>
      <div>
        <span
          id='back'
          onClick={() => {
            history.push('./main');
          }}
        >
          Go Back
        </span>
        <h3 id='title'>Searhing for a specific topic?</h3>
        <input type='text' value={val} onChange={handleChange} id='search' />
      </div>
      <div id='blogs'>
        {generalBlogs.length ? (
          generalBlogs.map((blog, idx) => {
            return (
              <Card
                data={blog}
                blog={blog.data().blog}
                blogUserId={blog.data().userId}
                curUser={user}
                blogId={blog.id}
                key={idx}
              />
            );
          })
        ) : (
          <div id='note'>oops! Can't load any new posts! </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
