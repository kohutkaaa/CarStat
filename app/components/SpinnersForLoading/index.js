import React, { memo } from 'react';

function SpinnersForLoading() {
  return (
    <div
      className="text-center d-flex justify-content-center align-items-center"
      style={{ marginTop: '300px' }}
    >
      <div
        className="spinner-grow spinner-grow-sm text-primary mx-2"
        role="status"
      />
      <div
        className="spinner-grow spinner-grow-sm text-primary mx-2"
        role="status"
      />
      <div
        className="spinner-grow spinner-grow-sm text-primary mx-2"
        role="status"
      />
    </div>
  );
}

SpinnersForLoading.propTypes = {};

export default memo(SpinnersForLoading);
