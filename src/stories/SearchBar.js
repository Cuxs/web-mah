import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { Input, Col, Row, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import style from '../Styles/search';
import autocompleteStyles from '../Styles/autocompleteInput';
import { getSuggestions, getSuggestionValue, renderSectionTitle, renderSuggestion, getSectionSuggestions } from '../Modules/autocompleteData';

/* eslint react/jsx-filename-extension: 0 */

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      suggestions: [],
      dropdownOpen: false,
      carState: 'Usado',
      value: this.props.text === undefined ? '' : this.props.text,
    };
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event, { newValue, method }) {
    this.setState({
      value: newValue,
    });
  }
  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: getSuggestions(value),
    });
  }
  onSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }
  submitSearch() {
    this.props.history.push(`/SearchCars?text=${this.state.value}&carState=${this.state.carState}`);
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Busca tu auto',
      value,
      onChange: this.onChange,
    };
    console.log(this.props);
    return (
      <Row style={style.header} >
        <Col md="6">
          <Row >
            <Col md="3">
              <p >Mi auto Hoy</p>
            </Col>
            <Col md="5">
              {/* <Input type="text" id="search" value={this.state.text} onChange={(e) => { this.setState({ text: e.target.value }); }} /> */}
              <Autosuggest
                multiSection
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                renderSectionTitle={renderSectionTitle}
                getSectionSuggestions={getSectionSuggestions}
                inputProps={inputProps}
              />
              <style jsx>{autocompleteStyles}</style>
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
      </Row>
    );
  }
}
export default SearchBar;
