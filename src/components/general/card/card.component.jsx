import React, { useState } from 'react';
import './card.styles.scss';

export default function Card({ blog }) {
  let [prompt, setPrompt] = useState(false);

  let handlePrompt = (e) => {
    e.preventDefault();
    setPrompt(!prompt);
  };

  return !prompt ? (
    <div id='container' onClick={handlePrompt}>
      {blog}
    </div>
  ) : (
    <div id='promptContainer' onClick={handlePrompt}>
      {blog}
    </div>
  );
}
