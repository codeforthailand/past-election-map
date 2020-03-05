import React from 'react';
import { withRouter } from 'react-router-dom';

const Dropdown = props => {
  return (
    <div className="dropdown--container">
      <button className="dropdown--button">{props.children}</button>
      <div className="dropdown--items"></div>
    </div>
  );
};

export default withRouter(Dropdown);
