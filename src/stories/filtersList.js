import React from 'react';
import { split } from 'split-object';
/* eslint react/jsx-filename-extension: 0 */

const items = (title, value, search, history) => (
  <ul>
    {split(value).map((row) => {
      return (
        <li>
          <button className="sidebar-option" disabled={split(value).length === 1} onClick={() => history.push(`${search}&${title}=${row.key}`)}>
            {row.key} <span className="quantity">({row.value})</span>
          </button>
        </li>
    );
})}
  </ul>
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
  <ul>
    <li className="sidebar-title"> {parseTitle(row.key)}
      { items(row.key, row.value, props.search, props.history) }
    </li>
  </ul>
));
