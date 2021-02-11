/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';

import './square.css';

const Square = ({ data }) => {
  function displayMatrix() {
    return data.map((item, i) => (
      <div className="square" key={i}>
        {item}
      </div>
    ));
  }
  return (
    <div className="rows">
      {displayMatrix()}
    </div>
  );
};

export default Square;
