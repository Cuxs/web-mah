import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */

export default ({
  numberOfResults, history, text, carState, actualPage,
}) => {
  const page = parseInt(actualPage, 10);
  const numberOfPages = Math.round(numberOfResults / 9);
  const pages = [];
  for (let i = 1; i <= numberOfPages; i += 1) {
    pages.push(<PaginationItem style={{ cursor: 'pointer' }}>
      <PaginationLink onClick={() => history.push(`/SearchCars?text=${text}&carState=${carState}&page=${i}`)}>
        {i}
      </PaginationLink>
    </PaginationItem>);
  }

  return (
    <Pagination>
      <PaginationItem disabled={page === 1} style={{ cursor: 'pointer' }}>
        <PaginationLink previous onClick={() => history.push(`/SearchCars?text=${text}&carState=${carState}&page=${page - 1}`)} />
      </PaginationItem >
      {pages}
      <PaginationItem disabled={page === numberOfPages} style={{ cursor: 'pointer' }}>
        <PaginationLink next onClick={() => history.push(`/SearchCars?text=${text}&carState=${carState}&page=${page + 1}`)} />
      </PaginationItem>
    </Pagination>
  );
};
