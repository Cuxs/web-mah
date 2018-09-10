import React from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { graphql, compose, withApollo } from 'react-apollo';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import { getProvinces, getTowns } from '../Modules/fetches';
import { prepareArraySelect, generateYearPerModel, validate } from '../Modules/functions';
import { AllBrandsQuery, GroupsQuery, ModelsQuery, YearsQuery } from '../ApolloQueries/TautosQuery';

class Card123Seguros extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: null,
      group: null,
      codia: null,
      year: null,
      Groups: [],
      Models: [],
      Prices: [],
      provinceList: [],
      province_id: '',
      townList: [],
      town_id: '',
      showModal: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleQuoting = this.handleQuoting.bind(this);
  }

  onChangeProvince(newProvince) {
    getTowns(newProvince)
      .then((response) => {
        this.setState({
          province_id: newProvince,
          townList: response.data,
        });
      })
      .catch(error => console.log(error));
  }

  onChangeBrand(newBrand) {
    this.setState({
      brand: newBrand,
      group: null,
      codia: null,
      Models: [],
      Prices: [],
      year: null,
    });
    this.props.client.query({
      query: GroupsQuery,
      variables: {
        gru_nmarc: newBrand,
      },
    })
      .then(response => this.setState({ Groups: response.data.Group }));
  }
  onChangeGroup(newGroup) {
    this.setState({
      group: newGroup,
      Prices: [],
      year: null,
      codia: null,
    });
    this.props.client
      .query({
        query: ModelsQuery,
        variables: {
          ta3_nmarc: this.state.brand,
          ta3_cgrup: newGroup,
        },
      })
      .then(response => this.setState({ Models: response.data.Models }));
  }
  onChangeModel(newModel) {
    this.setState({
      codia: newModel,
    });
    this.props.client
      .query({
        query: YearsQuery,
        variables: {
          ta3_codia: newModel,
        },
      })
      .then(response => this.setState({ Prices: response.data.Price }));
  }
  onChangeYear(newYear) {
    this.setState({ year: newYear });
  }
  handleQuoting() {
    const {
      brand, group, codia, year,
    } = this.state;
    if (brand !== null && group !== null && codia !== null && year !== null) {
      getProvinces()
        .then((response) => {
          this.setState({ provinceList: response.data, showModal: true });
        })
        .catch(error => console.log(error));
    }
  }
  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    const { ta3AllBrands: { AllBrands } } = this.props;
    return (
      <div className="container">
        {this.props.isCarSelected && <button className="container-button" onClick={this.handleQuoting} >
          <Col md={10} className="d-flex align-items-start flex-column" >
            <label>Cotizá un seguro para tu auto</label>
            <img src="/assets/images/123seguro-logo.svg" alt="" className="logo" />
          </Col>
          <Col md={2}>
            <img src="/assets/images/icon-arrow-right.svg" alt="Ir al formulario" />
          </Col>
        </button>}
        {!this.props.isCarSelected && <div className="container-123">
          <Col lg={12}>
            <label>Cotizá un seguro para tu auto</label>
            <div className="d-flex flex-lg-row flex-column justify-content-md-start justify-content-lg-between align-items-center" >
              <div className="col-lg-3 col-md-6 p-0" >
                <Select
                  id="brand-select"
                  onBlurResetsInput={false}
                  onSelectResetsInput={false}
                  options={prepareArraySelect(AllBrands, 'ta3_nmarc', 'ta3_marca')}
                  simpleValue
                  clearable
                  name="selected-state"
                  value={this.state.brand}
                  placeholder="Marca"
                  onChange={newValue => this.onChangeBrand(newValue)}
                  searchable
                  noResultsText="No se encontraron resultados"
                />
              </div>
              <div className="col-lg-3 col-md-6 p-0" >
                <Select
                  id="groups-select"
                  onBlurResetsInput={false}
                  onSelectResetsInput={false}
                  options={prepareArraySelect(this.state.Groups, 'gru_cgrup', 'gru_ngrup')}
                  simpleValue
                  clearable
                  name="selected-state"
                  value={this.state.group}
                  placeholder="Modelo"
                  onChange={newValue => this.onChangeGroup(newValue)}
                  searchable
                  noResultsText="No se encontraron resultados"
                />
              </div>
              <div className="col-lg-3 col-md-6 p-0" >
                <Select
                  id="models-select"
                  onBlurResetsInput={false}
                  onSelectResetsInput={false}
                  options={prepareArraySelect(this.state.Models, 'ta3_codia', 'ta3_model')}
                  simpleValue
                  clearable
                  name="selected-state"
                  value={this.state.codia}
                  placeholder="Versión"
                  onChange={newValue => this.onChangeModel(newValue)}
                  searchable
                  noResultsText="No se encontraron resultados"
                />
              </div>
              <div className="col-lg-1 col-md-6 p-0" >
                <Select
                  id="year-select"
                  onBlurResetsInput={false}
                  onSelectResetsInput={false}
                  options={generateYearPerModel(this.state.Prices)}
                  simpleValue
                  clearable
                  required
                  name="selected-state"
                  value={this.state.year}
                  placeholder="Año"
                  onChange={newValue => this.setState({ year: newValue })}
                  searchable
                  noResultsText="No se encontraron resultados"
                />
              </div>
              <Button color="primary" className="btn-block" onClick={this.handleQuoting}>Cotizar</Button>
            </div>
            <div className="d-flex justify-content-end" >
              <img src="/assets/images/123seguro-logo.svg" alt="" className="logo" />
            </div>
          </Col>
        </div>}
        <Modal isOpen={this.state.showModal} toggle={this.toggleModal} size="lg">
          <ModalHeader toggle={this.toggleModal}>Completá tus datos, para obtener un precio preciso</ModalHeader>
          <ModalBody>
            <AvForm onSubmit={this.next} className="d-flex flex-lg-row flex-md-column" >
              <Col lg={6} md={12}>
                <label>Nombre y Apellido</label>
                <AvField
                  type="string"
                  value={this.state.name}
                  onChange={event => this.setState({ name: event.target.value })}
                  name="name"
                  id="name"
                  validate={validate('string')}
                  className="form-control"
                />
                <label>Provincia</label>
                <Select
                  id="province-select"
                  onBlurResetsInput={false}
                  onSelectResetsInput={false}
                  options={prepareArraySelect(this.state.provinceList, 'id', 'name')}
                  simpleValue
                  className="form-group"
                  clearable
                  name="selected-state"
                  value={this.state.province_id}
                  placeholder="Selecciona una provincia"
                  onChange={newValue => this.onChangeProvince(newValue)}
                  searchable
                  noResultsText="No se encontraron resultados"
                />
                <label>Localidad</label>
                <Select
                  id="city-select"
                  onBlurResetsInput={false}
                  onSelectResetsInput={false}
                  options={prepareArraySelect(this.state.townList, 'id', 'name')}
                  simpleValue
                  className="form-group"
                  clearable
                  name="selected-state"
                  value={this.state.town_id}
                  placeholder="Selecciona una localidad"
                  onChange={town_id => this.setState({ town_id })}
                  searchable
                  noResultsText="No se encontraron resultados"
                />
              </Col>
              <Col md={6} sm={12}>
                <label>Edad</label>
                <AvField
                  type="number"
                  value={this.state.age}
                  onChange={event => this.setState({ age: event.target.value })}
                  name="name"
                  id="name"
                  validate={validate('number')}
                  className="form-control"
                />
                <label>Email</label>
                <AvField
                  type="email"
                  value={this.state.email}
                  onChange={event => this.setState({ email: event.target.value })}
                  name="name"
                  id="name"
                  validate={validate('email')}
                  className="form-control"
                />
                <label>Teléfono de contacto</label>
                <AvField
                  type="number"
                  value={this.state.phone}
                  onChange={event => this.setState({ phone: event.target.value })}
                  name="name"
                  id="name"
                  validate={validate('number')}
                  className="form-control"
                />
              </Col>
            </AvForm>
          </ModalBody>
          <ModalFooter className="d-flex justify-content-end">
            <Button color="default" onClick={() => this.toggleModal()}>Salir</Button>
            <Button color="primary" onClick={() => this.toggleModal()}>Ver Cotización</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}


const WithAllBrands = graphql(AllBrandsQuery, {
  name: 'ta3AllBrands',
});

const withData = compose(WithAllBrands);

export default withApollo(withData(Card123Seguros));
