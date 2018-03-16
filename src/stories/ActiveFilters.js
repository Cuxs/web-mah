import React from 'react';
import { Button } from 'reactstrap';
import { split } from 'split-object';
import { stringify } from 'query-string';
/* eslint react/jsx-filename-extension: 0 */


/* En caso de querer agregar un filtro, los archivos que se tienen que modificar son:
ActiveFilters (agregar el filtro al if)
FilterLists (Agregar el parseo correspondiente)
Modificar en el api el switch de rounter/index.js:398 y el metodo en general getFiltersAndTotalResult
Modificar la mutacion tanto en la api(dentro de PublicationTypes) como en ApolloQueries */

export default ({ searchData, history }) => split(searchData).map((filter) => {
  if (filter.key === 'fuel' ||
      filter.key === 'year' ||
      filter.key === 'state') {
    return (
      <Button
        color="defaul"
        style={{ cursor: 'pointer' }}
        name={filter.value}
        size="sm"
        onClick={() => {
            delete searchData[filter.key];
            history.push(`/SearchCars?${stringify(searchData)}`);
          }}
      >
        {filter.value}
        <img src="/assets/images/icon-close.svg" alt="icon-close" />
      </Button>);
  }
});
