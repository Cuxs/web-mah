import React from 'react';
/* eslint react/jsx-filename-extension: 0 */

export default props => (
  props.results === 1 ?
    (<p>Se encontró {props.results} auto.</p>)
    :
    (<p>Se encontraron {props.results} autos.</p>)
);

