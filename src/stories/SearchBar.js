import React, { Component } from 'react';
import { Input, Col, Row, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import { graphql } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import style from '../Styles/search';
import SearchMutation from '../ApolloQueries/SearchMutation';
/* eslint react/jsx-filename-extension: 0 */

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      carState: 'Usado',
      text: '',
      dataArrived: false,
      data: [],
    };
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  submitSearch() {
    this.props.mutate({
      variables: {
        text: this.state.text,
        carState: this.state.carState,
      },
    })
      .then(({ data }) => {
        this.setState({
          data,
          dataArrived: true,
        });
      })
      .catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }
  render() {
    return (
      <Row style={style.header} >
        <Col md="6">
          <Row >
            <Col md="3">
              <p >Mi auto Hoy</p>
            </Col>
            <Col md="5">
              <Input type="text" id="search" value={this.state.text} onChange={(e) => { this.setState({ text: e.target.value }); }} />
            </Col>
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle caret>
                {this.state.carState}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem value="Nuevo" onClick={e => this.setState({ carState: e.target.value })}>Nuevo</DropdownItem>
                <DropdownItem value="Usado" onClick={e => this.setState({ carState: e.target.value })}>Usado</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
            <Button style={{ cursor: 'pointer' }} className="icon is-small" onClick={() => { this.submitSearch(); }}>
              <i className="fa fa-search" aria-hidden="true" />
            </Button>
          </Row>

        </Col>
        <Col md="6" className="flex-row-reverse" >
          <Button color="primary"> Solicitá tu crédito</Button>
          <Button color="secondary"> Ver Consecionarias</Button>
          <strong>Publicá gratis</strong> | <a> Iniciá Sesión </a>
        </Col>
        {this.state.dataArrived &&
        <Redirect to={{
          pathname: '/SearchCars',
          data: this.state.data.searchPublication,
        }}
        />}
      </Row>
    );
  }
}
export default graphql(SearchMutation)(SearchBar);
