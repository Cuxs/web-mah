import React from 'react';
import { split } from 'split-object';
/* eslint react/jsx-filename-extension: 0 */

const items = (title, value, search, history) => (
  <div>
    {split(value).map((row) => {
      return (
        <button className="option" disabled={split(value).length === 1} onClick={() => history.push(`${search}&${title}=${row.key}`)}>
          {row.key} <span className="quantity">({row.value})</span>
        </button>
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
    { items(row.key, row.value, props.search, props.history) }
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
              border: none;
              background: none;
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
