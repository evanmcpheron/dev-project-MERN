import React from 'react';

const Hamburger = (props) => {
  return (
    <div>
      <i className={`fas fa-hamburger`} onClick={props.drawerClickHandler}></i>
    </div>
  );
};

export default Hamburger;
