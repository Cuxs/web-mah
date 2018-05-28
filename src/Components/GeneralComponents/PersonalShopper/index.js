/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Label, Button } from 'reactstrap';
import { graphql, compose, withApollo } from 'react-apollo';
import { stringify, parse } from 'query-string';
import _ from 'lodash';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import ReactGA from 'react-ga';
import {scroller} from 'react-scroll';

import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';
import {validate} from '../../../Modules/functions';

import SearchBar from '../../../stories/SearchBar';
import InputOrText from '../../../stories/InputOrText';

import {
  GetTextsQuery,
} from '../../../ApolloQueries/TextsQueries';
import { AllBrandsQuery, GroupsQuery, ModelsQuery } from '../../../ApolloQueries/TautosQuery';
import { prepareArraySelect, generateYearArray } from '../../../Modules/functions';
import { isAdminLogged } from '../../../Modules/sessionFunctions';

ReactGA.initialize(process.env.REACT_APP_ANALYTICS);

class PersonalShopper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kms: '0km',
      year: 2018,
      price: '',
      priceValidate: false,
      brand: '',
      group: '',
      codia: '',
      Groups: [],
      Models: [],
      observation: '',
      title1: '',
      text1: '',
    };
    this.next = this.next.bind(this);
    ReactGA.pageview('/PERSONAL-SHOPPER');
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.Texts.loading) {
      const texts = {};
      texts.fetched = true;
      nextProps.Texts.PageTexts.map(row => texts[row.section] = row.text);
      this.setState({ ...texts });
    }
  }

  onChangeBrand(newBrand) {
    this.setState({
      brand: newBrand,
      group: '',
      codia: '',
      Models: [],
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
    });
    this.props.client.query({
      query: ModelsQuery,
      variables: {
        ta3_nmarc: this.state.brand,
        ta3_cgrup: newGroup,
      },
    })
      .then(response => this.setState({ Models: response.data.Models }));
  }

  onChangeModel(newModel) {
    this.setState({ codia: newModel });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  next(event, errors) {
    if (!_.isEmpty(errors)) {
      scroller.scrollTo(errors[0], {
        duration: 600,
        smooth: true,
        offset: -100
      });
      return false;
    } 
    const {
      priceValidate, brand, group, codia,
    } = this.state;

    const dataCredit = {
      kms: this.state.kms,
      year: this.state.year,
      price: this.state.price || 'No especificado',
      brand: this.state.brand,
      group: this.state.group,
      codia: this.state.codia,
      observation: this.state.observation,
    };
    return this.props.history.push(`/personalShopperS2?${stringify(dataCredit)}`);
  }

  renderCar(AllBrands) {
    return (
      <div>
        <FormGroup>
          <Label for="exampleSelect">¿Cuál es la marca?</Label>
          <Select
            id="brand-select"
            ref={(ref) => { this.select = ref; }}
            onBlurResetsInput={false}
            onSelectResetsInput={false}
            options={prepareArraySelect(AllBrands, 'ta3_nmarc', 'ta3_marca')}
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
            ref={(ref) => { this.select = ref; }}
            onBlurResetsInput={false}
            onSelectResetsInput={false}
            options={prepareArraySelect(this.state.Groups, 'gru_cgrup', 'gru_ngrup')}
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
            ref={(ref) => { this.select = ref; }}
            onBlurResetsInput={false}
            onSelectResetsInput={false}
            options={prepareArraySelect(this.state.Models, 'ta3_codia', 'ta3_model')}
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
      </div>
    );
  }

  render() {
    const {
      ta3AllBrands: { AllBrands },
    } = this.props;
    return (
      <div>
        <SearchBar history={this.props.history} location={this.props.location} />
        <div className="container-fluid register-steps">
          <Row>
            <Col md="6" sm="12" xs="12" className="bg">
              <div className="col-md-8 float-right">
                {isAdminLogged() ?
                 this.state.fetched &&
                 <div>
                   <InputOrText section="title1" height="50px" route={this.props.location.pathname.slice(1)} type="p" text={this.state.title1} style="title-division-primary" onChange={title1 => this.setState({ title1 })} />
                   <InputOrText section="text1" height="80px" route={this.props.location.pathname.slice(1)} text={this.state.text1} onChange={text1 => this.setState({ text1 })} />
                 </div>
                :
                 <div className="text-block">
                   <h4 className="title-division-primary">{this.state.title1}</h4>
                   <p>{this.state.text1}</p>
                 </div>
                }

                <div className="steps">
                  <div className="step">
                    <h6>PASO 1</h6>
                    <h4>Contanos lo que buscás</h4>
                    <a className="link">Modificar datos</a>
                  </div>

                  <div className="step disable">
                    <h6>PASO 2</h6>
                    <h4>Dejá tus datos de contacto para recibir mensajes de los interesados</h4>
                    <a className="link">Modificar datos</a>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" sm="12" xs="12">
              <div className="col-md-9 float-left pb-4">
                <h4 className="title-division">Datos del auto que comprarías</h4>
                <AvForm onSubmit={this.next}>
                <FormGroup>
                  <Label for="exampleEmail">Cantidad de kilómetros</Label>
                  <Select
                    id="kms-select"
                    ref={(ref) => { this.select = ref; }}
                    onBlurResetsInput={false}
                    autoFocus
                    clearable={false}
                    onSelectResetsInput={false}
                    options={[{ value: '0km', label: '0km' }, { value: '1km - 25.000km', label: '1km - 25.000km' }, { value: '25.000km - 50.000km', label: '25.000km - 50.000km' }, { value: '50.000km - 100.000km', label: '50.000km - 100.000km' }, { value: 'Más de 100.000km', label: 'Más de 100.000km' }]}
                    simpleValue
                    name="selected-state"
                    value={this.state.kms}
                    onChange={newValue => this.setState({ kms: newValue })}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">Año</Label>
                  <Select
                    id="year-select"
                    ref={(ref) => { this.select = ref; }}
                    onBlurResetsInput={false}
                    autoFocus
                    clearable={false}
                    onSelectResetsInput={false}
                    options={generateYearArray()}
                    simpleValue
                    name="selected-state"
                    value={this.state.year}
                    onChange={newValue => this.setState({ year: newValue })}
                  />
                </FormGroup>
                <label>Precio aproximado</label>
                <AvField
                  type="money"
                  placeholder="Ingrese un número sin puntos ni comas"
                  value={this.state.price}
                  onChange={event => this.setState({ price: event.target.value })}
                  name="price"
                  id="price"
                  validate={validate('number')} 
                  className="form-control"
                />
                <div className="simulator-container">
                  {this.renderCar(AllBrands)}
                  {/* <Button color="secondary"> Añadir otro</Button> */}
                </div>
                <label>Descripción</label>
                <AvField
                  type="textarea"
                  name="observation"
                  id="observation"
                  value={this.state.observation}
                  onChange={event => this.setState({ observation: event.target.value })}
                />
                <Button color="primary" type="submit" className="float-right"> Siguiente</Button>
                </AvForm>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const WithAllBrands = graphql(AllBrandsQuery, {
  name: 'ta3AllBrands',
});
const withTextsQuery = graphql(GetTextsQuery, { options: { variables: { route: 'personalShopperS1' } }, name: 'Texts' });


const withData = compose(WithAllBrands, withTextsQuery);

export default withApollo(withData(PersonalShopper));

