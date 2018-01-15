import React from 'react';
import { split } from 'split-object';
/* eslint react/jsx-filename-extension: 0 */

let href = '#';
const items = (title, value, search) => (
  <div>
    {split(value).map((row) => {
    href = split(value).length === 1 ? '#' : `${search}&${title}=${row.key}`; // deshabilita el href si es solo una opcion
      return (
        <a className="option" href={href}>
          {row.key} <span className="quantity">({row.value})</span>
        </a>
    );
})}
  </div>
);
const parseTitle = (title) => {
  switch (title) {
    case 'fuel':
      return 'Combustible';
    case 'year':
      return 'Año';
    case 'state':
      return 'Estado de la publicación';
    default:
      return '';
  }
};
export default props => split(props.filters).map(row => (
  <div>
    <p className="title"> {parseTitle(row.key)}</p>
    { items(row.key, row.value, props.search) }
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
              display:block;    
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
