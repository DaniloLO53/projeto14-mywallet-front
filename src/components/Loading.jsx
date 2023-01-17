import { ThreeDots } from 'react-loader-spinner';
import React from 'react';

function Loading() {
  return (
    <div>
      <ThreeDots
        height="40"
        width="40"
        radius="9"
        color="white"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    </div>
  );
}

export default Loading;
