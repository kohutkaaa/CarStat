import React, { memo } from 'react';


function Spiners() {
  return (
    <div className='text-center d-flex justify-content-center align-items-center' style={{marginTop: '400px'}}>
      <div className="spinner-grow spinner-grow-sm text-primary mx-2" role="status"></div>
      <div className="spinner-grow spinner-grow-sm text-primary mx-2" role="status"></div>
      <div className="spinner-grow spinner-grow-sm text-primary mx-2" role="status"></div>
    </div>
  )
}

Spiners.propTypes = {};

export default memo(Spiners);
