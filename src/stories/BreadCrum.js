import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

export default (props) => {
  const url = new URL(props.url).pathname;
  const rute = url.split('/');
  return (
    <div>
      <Breadcrumb>
        {rute.map(row => (
          <BreadcrumbItem>{row}</BreadcrumbItem>
        ))
        }
      </Breadcrumb>
    </div>
  );
};

