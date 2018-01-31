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
      <div className="data-input-group special">
        <Row>
          {array.left.map((row) => {
            if (typeof row.value === 'boolean' || row.value === null) {
              return (
                <Col md="6" sm="6" xs="12">
                  <p className={row.value ? 'active' : 'disable'}>{row.key}</p>
                </Col>
              );
            }
            return (
              <Col md="6" sm="6" xs="12">
                <p>
                  {row.key} : {row.value}
                </p>
              </Col>
            );
          })}
          {array.right.map((row) => {
            if (typeof row.value === 'boolean' || row.value === null) {
              return (
                <Col md="6" sm="6" xs="12">
                  <p className={row.value ? 'active' : 'disable'}>{row.key}</p>
                </Col>
              );
            }
            return (
              <Col md="6" sm="6" xs="12">
                <p>
                  {row.key} : {row.value}
                </p>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }

  render() {
    return (
      <Row>
        <Col sm="12" xs="12" className="container-data-input-group">
          <h5>Detalles</h5>
          {this.items(this.prepareRow(this.state.detailSpecs))}
          <h5>Seguridad</h5>
          {this.items(this.prepareRow(this.state.securitySpecs))}
          <h5>Confort</h5>
          {this.items(this.prepareRow(this.state.confortSpecs))}
          <h5>Extras</h5>
          {this.items(this.prepareRow(this.state.extraSpecs))}
        </Col>
      </Row>
    );
  }
}
export default CarSpecification;
