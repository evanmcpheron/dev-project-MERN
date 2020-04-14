import React from 'react';

const Overlay = ({ show, click }) => {
  let hidden = '';
  if (show) {
    hidden = 'hidden';
  }
  return <div>{show ? <div className={`backdrop`} onClick={click} /> : <div></div>}</div>;
};

export default Overlay;
