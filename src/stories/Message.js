import React from 'react';

/* eslint react/jsx-filename-extension: 0 */

export default ({ message }) => (
  <div className="col-md-12" >
    <div className="d-flex flex-row">
      <h4>{message.author}</h4>
      <h6>{message.date}</h6>
    </div>
    <h5>{message.body}</h5>
  </div>
);

