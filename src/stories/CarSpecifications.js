import React, { Component } from 'react';
import _ from 'lodash';
import { Col, Row } from 'reactstrap';
import split from 'split-object';
/* eslint react/jsx-filename-extension: 0 */
/* eslint class-methods-use-this: 0 */
class CarSpecification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailSpecs: [],
      securitySpecs: [],
      extraSpecs: [],
      confortSpecs: [],
    };
  }
  componentWillMount() {
    const detailSpecs = []; // 0 - 16
    const securitySpecs = []; // 17- 26
    const extraSpecs = []; // 27 -36
    const confortSpecs = []; // 37- 49
    split(this.props.data).map((row, index) => {
      if (index <= 16 && row.key !== '__typename') {
        detailSpecs.push(row);
      }
      if (index >= 17 && index <= 26 && row.key !== '__typename') {
        securitySpecs.push(row);
      }
      if (index >= 27 && index <= 36 && row.key !== '__typename') {
        extraSpecs.push(row);
      }
      if (index > 36 && row.key !== '__typename') {
        confortSpecs.push(row);
      }
    });
    this.setState({
      detailSpecs,
      securitySpecs,
      extraSpecs,
      confortSpecs,
    });
  }

  prepareRow(specifications) {
    const newArray = [];
    const arrayLeft = [];
    const arrayRight = [];
    specifications.map((row, index) => {
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
  }
  items(array) {
    return (
      <div>
        <Row>
          {array.left.map((row) => {
            if (typeof row.value === 'boolean' || row.value === null) {
              return (
                <Col md="6" sm="12">
                  <p className={row.value ? 'active' : 'disabled'}>{row.key}</p>
                </Col>
              );
            }
            return (
              <Col md="6" sm="12">
                <p>
                  {row.key} : {row.value}
                </p>
              </Col>
            );
          })}
          {array.right.map((row) => {
            if (typeof row.value === 'boolean' || row.value === null) {
              return (
                <Col md="6" sm="12">
                  <p className={row.value ? 'active' : 'disabled'}>{row.key}</p>
                </Col>
              );
            }
            return (
              <Col md="6" sm="12">
                <p>
                  {row.key} : {row.value}
                </p>
              </Col>
            );
          })}
        </Row>
        <div className="underline" />
      </div>
    );
  }

  render() {
    return (
      <Row>
        <Col md="12">
          <p className="title">Detalles</p>
          {this.items(this.prepareRow(this.state.detailSpecs))}
          <p className="title">Seguridad</p>
          {this.items(this.prepareRow(this.state.securitySpecs))}
          <p className="title">Confort</p>
          {this.items(this.prepareRow(this.state.confortSpecs))}
          <p className="title">Extras</p>
          {this.items(this.prepareRow(this.state.extraSpecs))}
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
                color: black;
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
    );
  }
}
export default CarSpecification;
