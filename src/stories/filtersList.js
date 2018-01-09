import React from 'react';
/* eslint react/jsx-filename-extension: 0 */
const items = props => (
  <div>
    {props.map(row => (
      <p className="option" >{row.name} <span className="quantity" >({row.quantity})</span></p>
    ))}
  </div>
);

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
        .option:hover{
          cursor:pointer;
        }
        .quantity {
          font-size: 15px;
          color: lightgrey
        }
      `}
    </style>
  </div>
));

