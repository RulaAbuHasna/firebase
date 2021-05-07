import React, { useState, useEffect } from 'react';
import { getGeneral } from '../../firebase/firebase.utils';

export default function General({ user }) {
  let [generalBlogs, setGeneralBlogs] = useState([]);

  useEffect(() => {
    getGeneral()
      .then((res) => {
        setGeneralBlogs(res);
        console.log(res);
      })
      .catch((err) => {
        console.log('err getting the data');
      });
  }, []);

  return (
    <div>
      "this is the general space for all of the clients"
      {generalBlogs
        ? generalBlogs.map((blog) => {
            return <div>{blog.data().blog}</div>;
          })
        : null}
    </div>
  );
}
