import React from 'react';

function Loader() {
  return (
    <span className='loader'>
      <span className='loader__dot loading'>.</span>
      <span className='loader__dot loading'>.</span>
      <span className='loader__dot loading'>.</span>
    </span>
  );
}

export default Loader;
