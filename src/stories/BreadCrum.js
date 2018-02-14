import React from 'react';
import { Breadcrumb, Button } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

export default ({ history }) => {
  return (
    <div>
      <Breadcrumb><Button color="link" onClick={() => history.push('/')}>{'< VOLVER'}</Button></Breadcrumb>
    </div>
  );
};

