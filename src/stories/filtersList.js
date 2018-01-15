import React from 'react';
import { split } from 'split-object';
/* eslint react/jsx-filename-extension: 0 */


const items = value => (
  <div>
    {split(value).map(row => (
      <p className="option">
        {row.key} <span className="quantity">({row.value})</span>
      </p>
    ))}
  </div>
);
const parseTitle = (title) => {
  switch (title) {
    case 'fuel':
      return 'Combustible';
    case 'year':
      return 'Año';
    case 'carState':
      return 'Estado del auto';
    case 'state':
      return 'Estado de la publicación';
    default:
      return '';
  }
};
export default props => split(props.filters).map(row => (
  <div>
    <p className="title"> {parseTitle(row.key)}</p>
    { items(row.value) }
    <style jsx>
      {`
            .title {
              margin-top: 40px;
              font-size: 16px;
              font-weight: bold;
            }
            .option {
              font-size: 15px;
              margin-bottom: 5px;
            }
            .option:hover {
              cursor: pointer;
            }
            .quantity {
              font-size: 15px;
              color: lightgrey;
            }
          `}
    </style>
  </div>
));
