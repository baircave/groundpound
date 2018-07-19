import React from 'react';

export default ({ artworkUrl, title }) => {
  return (
    <div className='show-artwork'>
      <h1>{title}</h1>
      <img src={artworkUrl}></img>
    </div>
  );
};
