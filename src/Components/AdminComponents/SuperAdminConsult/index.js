/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React, { Component } from 'react';
import { Col, Row, Button, Label, FormGroup, ModalHeader, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { graphql, compose } from 'react-apollo';
import { parse } from 'query-string';
import { branch, renderComponent } from 'recompose';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import _ from 'lodash';
import ScrollToTop from 'react-scroll-up';
import { animateScroll as scroll } from 'react-scroll';

import AdminBar from '../../../stories/AdminBar';

import SuperAdminSideBar from '../../../stories/SuperAdminSideBar';
import { uploadAgencyImages } from '../../../Modules/fetches';
import parseError from '../../../Modules/errorParser';
import Breadcrumb from '../../../stories/BreadCrum';

import {
  AllBrandsQuery,
  GroupsQuery,
  ModelsQuery,
  YearsQuery,
} from '../../../ApolloQueries/TautosQuery';

import LoginComponent from '../../../stories/LoginComponent';
import { isUserLogged } from '../../../Modules/sessionFunctions';
import {
  thousands,
  generateYearPerModel,
  prepareArraySelect,
} from '../../../Modules/functions';

const renderForUnloggedUser = (component, propName = 'data') =>
  branch(props => !isUserLogged(), renderComponent(component));

class SuperAdminConsult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: '',
      group: '',
      codia: '',
      year: '',
      price: '',
      Groups: [],
      Models: [],
      Prices: [],
      carError: false,
      stateError: false,
    };
    ReactGA.pageview('/CREAR-PUBLICACION');
    this.next = this.next.bind(this);
  }

  componentWillReceiveProps({ agencyData }) {
    if (!agencyData.loading) {
      const {
        agencyAdress,
        agencyEmail,
        agencyName,
        agencyPhone,
        bannerImage,
        profileImage,
      } = agencyData.User;
      scroll.scrollToTop({ duration: 300 });
      this.setState({
        agencyAdress,
        agencyEmail,
        agencyName,
        agencyPhone,
        previewProfileImage: _.isNull(profileImage) ? 'default.jpg' : profileImage,
        previewBannerImage: _.isNull(bannerImage) ? 'default.jpg' : bannerImage,
      });
    }
  }
  onChangeBrand(newBrand) {
    this.setState({
      brand: newBrand,
      brandName:
        newBrand !== null
          ? _.find(this.props.ta3AllBrands.AllBrands, ['ta3_nmarc', newBrand])
            .ta3_marca
          : '',
      group: '',
      codia: '',
      Models: [],
      modelName: '',
      groupName: '',
      Prices: [],
      year: '',
      priceSuggested: '',
    });
    this.props.client
      .query({
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
      groupName:
        newGroup !== null
          ? _.find(this.state.Groups, ['gru_cgrup', newGroup]).gru_ngrup
          : '',
      modelName: '',
      Prices: [],
      year: '',
      priceSuggested: '',
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
      modelName:
        newModel !== null
          ? _.find(this.state.Models, ['ta3_codia', newModel]).ta3_model
          : '',
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
    this.setState({
      year: newYear,
      priceSuggested: this.state.Prices[
        this.state.Prices[0].anio - parseInt(newYear, 10)
      ]
        ? `$${thousands(
          this.state.Prices[this.state.Prices[0].anio - parseInt(newYear, 10)]
            .precio,
          0,
          ',',
          '.',
        )}`
        : 'No encontramos uno para ese año.',
    });
  }

  render() {
    const { history, location } = this.props;
    return (
      <div>
        <AdminBar history={this.props.history} />
        <div className="container">
          <Row>
            <Col lg="3" md="12" sm="12" xs="12">
              <SuperAdminSideBar history={this.props.history} location={this.props.location} />
            </Col>
            <Col lg="9" md="12" sm="12" xs="12" className="mt-4">
              <Breadcrumb history={this.props.history} />
              <Row>
                <Col lg="6" md="12" sm="12" xs="12" className="container-data-input-group">
                  <FormGroup>
                    <Label for="exampleSelect">¿Cuál es la marca?</Label>
                    <Select
                      id="brand-select"
                      ref={(ref) => {
                        this.select = ref;
                      }}
                      onBlurResetsInput={false}
                      onSelectResetsInput={false}
                      options={prepareArraySelect(
                        AllBrands,
                        'ta3_nmarc',
                        'ta3_marca',
                      )}
                      simpleValue
                      clearable
                      name="selected-state"
                      value={this.state.brand}
                      placeholder="Selecciona una marca"
                      onChange={newValue => this.onChangeBrand(newValue)}
                      searchable
                      noResultsText="No se encontraron resultados"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleSelect">¿Cuál es el modelo?</Label>
                    <Select
                      id="groups-select"
                      ref={(ref) => {
                        this.select = ref;
                      }}
                      onBlurResetsInput={false}
                      onSelectResetsInput={false}
                      options={prepareArraySelect(
                        this.state.Groups,
                        'gru_cgrup',
                        'gru_ngrup',
                      )}
                      simpleValue
                      clearable
                      name="selected-state"
                      value={this.state.group}
                      placeholder="Selecciona un modelo"
                      onChange={newValue => this.onChangeGroup(newValue)}
                      searchable
                      noResultsText="No se encontraron resultados"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleSelect">¿Cuál es la versión?</Label>
                    <Select
                      id="models-select"
                      ref={(ref) => {
                        this.select = ref;
                      }}
                      onBlurResetsInput={false}
                      onSelectResetsInput={false}
                      options={prepareArraySelect(
                        this.state.Models,
                        'ta3_codia',
                        'ta3_model',
                      )}
                      simpleValue
                      clearable
                      name="selected-state"
                      value={this.state.codia}
                      placeholder="Selecciona un tipo"
                      onChange={newValue => this.onChangeModel(newValue)}
                      searchable
                      noResultsText="No se encontraron resultados"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleSelect">¿Cuál es el año?</Label>
                    <Select
                      disabled={this.state.codia === ''}
                      id="year-select"
                      ref={(ref) => {
                        this.select = ref;
                      }}
                      onBlurResetsInput={false}
                      onSelectResetsInput={false}
                      options={generateYearPerModel(this.state.Prices)}
                      simpleValue
                      clearable
                      required
                      name="selected-state"
                      value={this.state.year}
                      placeholder="Selecciona un año"
                      onChange={newValue => this.onChangeYear(newValue)}
                      searchable
                      noResultsText="No se encontraron resultados"
                    />
                  </FormGroup>
                  {this.state.priceSuggested && (
                    <p>
                      Precio Sugerido: <b>{this.state.priceSuggested}</b>
                    </p>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
          <ScrollToTop showUnder={320} >
            <img style={{ width: '30px' }} src="/assets/images/icon-arrow-top.svg" alt="Inicio" />
          </ScrollToTop>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>{this.state.responseTitle}</ModalHeader>
          <ModalBody>
            <div className="col-md-6 offset-md-3">
              <h5>{this.state.responseMsg}</h5>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.toggleModal()}>OK</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const WithAllBrands = graphql(AllBrandsQuery, {
  name: 'ta3AllBrands',
});

const withData = compose(
  WithAllBrands,
  renderForUnloggedUser(LoginComponent, 'userProfile'),
);

export default withData(SuperAdminConsult);
