import React from 'react';
import _ from 'lodash';
import { Col, Row } from 'reactstrap';

/* eslint react/jsx-filename-extension: 0 */
const prepareRow = (props) => {
  const newArray = [];
  const arrayLeft = [];
  const arrayRight = [];
  props.map((row, index) => {
    if (index % 2 === 0) {
      arrayLeft.push(row);
    }
    if (index % 2 !== 0) {
      arrayRight.push(row);
    }
  });
  newArray.left = arrayLeft;
  newArray.right = arrayRight;
  return newArray;
};


const items = props => (
  <div>
    <Row>
      {props.left.map(row => (
        <Col md="6" sm="12">
          <p className={row.state ? 'active' : 'disabled'} >{row.name}</p>
        </Col>
      ))}
      {props.right.map(row => (
        <Col md="6" sm="12">
          <p className={row.state ? 'active' : 'disabled'} >{row.name}</p>
        </Col>
      ))}
    </Row>
    <div className="underline" />
  </div>
);

export default props => props.groups.map(row => (
  <Row>
    <Col md="12" >
      <p className="title" >{row.title}</p>
      {items(prepareRow(row.specifications))}
      <style jsx>
        {`
          .title {
            margin-top: 40px;
            font-size: 16px;
            font-weight: bold;
          }
          .disabled {
            text-decoration: line-through;
            color: lightgrey;
          }
          .active {
            color: black
          }
          .underline {
            width: 100%;
            height: 2px;
            background-color: lightgray;
            margin-top: 20px;
            margin-bottom: 20px;
          }
        `}
      </style>
    </Col>
  </Row>
));

