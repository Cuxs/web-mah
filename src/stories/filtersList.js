import React from 'react';
import { Row } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

export default props => props.filters.map(row => (
  <div>
    <p className="title" >{row.title}</p>
    {items(row.options)}
    <style jsx>
      {`
        .title {
          margin-top: 40px;
          font-size: 16px;
          font-weight: bold;
        }
        .option {
          font-size: 15px;
          margin-bottom: 5px
        }
        .quantity {
          font-size: 15px;
          color: lightgrey
        }
      `}
    </style>
  </div>
));

const items = props => (
  <div>
    {props.map(row => (
      <p className="option" >{row.name} <span className="quantity" >({row.quantity})</span></p>
    ))}
  </div>
);
