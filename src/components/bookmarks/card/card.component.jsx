import React from 'react';
import './card.styles.scss';

export default function Card({ data }) {
  return <div className='bookmark'>{data.blog}</div>;
}
