import React from 'react';
/* eslint react/jsx-filename-extension: 0 */

export default (props) => {
  if (props.consecionaria) {
    return props.results === 1 ?
      (<p>Esta consecionaria posee {props.results} publicación activa.</p>)
      :
      (<p>Esta consecionaria posee {props.results} publicaciones activas.</p>);
  }
  return props.results === 1 ?
    (<p>Se encontró {props.results} auto.</p>)
    :
    (<p>Se encontraron {props.results} autos.</p>);
};

