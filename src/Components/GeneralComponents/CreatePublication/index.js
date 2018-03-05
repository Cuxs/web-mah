/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Label, Button } from 'reactstrap';
import { graphql, compose, withApollo } from 'react-apollo';
import { stringify, parse } from 'query-string';
import _ from 'lodash';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import moment from 'moment';

import AdminBar from '../../../stories/AdminBar';
import Input from '../../../stories/Input';

import { AllBrandsQuery, GroupsQuery, ModelsQuery, YearsQuery } from '../../../ApolloQueries/TautosQuery';
import { prepareArraySelect } from '../../../Modules/functions';

import style from '../../../Styles/register';
import LoginComponent from '../../../stories/LoginComponent';
import { branch, renderComponent } from 'recompose';
import { isUserLogged } from '../../../Modules/sessionFunctions';

const renderForUnloggedUser = (component, propName = 'data') =>
  branch(
    props => !isUserLogged(),
    renderComponent(component),
  );

class CreatePublication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carState: this.props.location.search === '' ? '' : parse(this.props.location.search).carState,
      brand: this.props.location.search === '' ? '' : parse(this.props.location.search).brand,
      group: this.props.location.search === '' ? '' : parse(this.props.location.search).group,
      codia: this.props.location.search === '' ? '' : parse(this.props.location.search).codia,
      year: this.props.location.search === '' ? '' : parse(this.props.location.search).year,
      kms: this.props.location.search === '' ? '' : parse(this.props.location.search).kms,
      kmsDisabled: false,
      kmsValidate: !(this.props.location.search === ''),
      price: this.props.location.search === '' ? '' : parse(this.props.location.search).price,
      priceValidate: !(this.props.location.search === ''),
      observation: this.props.location.search === '' ? '' : parse(this.props.location.search).observation,
      Groups: [],
      Models: [],
      Prices: [],
    };
    this.generateYearArray = this.generateYearArray.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== '') {
      this.props.client.query({
        query: GroupsQuery,
        variables: {
          gru_nmarc: parse(this.props.location.search).brand,
        },
      })
        .then(response => this.setState({ Groups: response.data.Group }));
      this.props.client.query({
        query: ModelsQuery,
        variables: {
          ta3_nmarc: parse(this.props.location.search).brand,
          ta3_cgrup: parse(this.props.location.search).group,
        },
      })
        .then(response => this.setState({ Models: response.data.Models }));
      this.props.client.query({
        query: YearsQuery,
        variables: {
          ta3_codia: parse(this.props.location.search).codia,
        },
      })
        .then(response => this.setState({ Prices: response.data.Price }));
    }
  }
  generateYearArray() {
    const yearArray = [];
    const actualYear = moment().format('YYYY');
    yearArray.push({ value: actualYear, label: actualYear });
    for (let i = 0; i < 41; i += 1) {
      const passYears = moment().subtract(i, 'years').format('YYYY');
      yearArray.push({ value: passYears, label: passYears });
    }
    return yearArray;
  }

  onChangeBrand(newBrand) {
    this.setState({
      brand: newBrand,
      group: '',
      codia: '',
      Models: [],
      modelName: '',
      Prices: [],
      year: '',
      priceSuggested: '',
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
      modelName: '',
      Prices: [],
      year: '',
      priceSuggested: '',
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
    this.setState({ codia: newModel, modelName: _.find(this.state.Models, ['ta3_codia', newModel]).ta3_model });
    this.props.client.query({
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
      priceSuggested: this.state.Prices[this.state.Prices[0].anio - parseInt(newYear, 10)] ? `$${this.state.Prices[this.state.Prices[0].anio - parseInt(newYear, 10)].precio}` : 'No encontramos uno para ese año.',
    });
  }
  disabled() {
    const {
      brand, group, codia, year, kms, price,
    } = this.state;
    return !(brand !== 0 && group !== 0 && codia !== 0 && year !== 0 && kms !== '' && price !== '');
  }

  disabled() {
    const {
      brand, group, codia, year, kmsValidate, priceValidate,
    } = this.state;
    return !(brand !== 0 && group !== 0 && codia !== 0 && year !== 0 && kmsValidate && priceValidate);
  }

  next() {
    const dataCar = {
      carState: this.state.carState,
      brand: this.state.brand,
      group: this.state.group,
      codia: this.state.codia,
      modelName: this.state.modelName,
      year: this.state.year,
      kms: this.state.kms,
      price: this.state.price,
      priceSuggested: this.state.priceSuggested,
      observation: this.state.observation,
    };
    if (parse(this.props.location.search).userId) {
      dataCar.userId = parse(this.props.location.search).userId;
    }
    this.props.history.push(`/createPublicationS1?${stringify(dataCar)}`);
  }
  carStateChange(newValue) {
    if (newValue === 'Nuevo') {
      this.setState({
        kms: 0,
        carState: newValue,
        kmsDisabled: true,
      });
    } else {
      this.setState({
        carState: newValue,
        kmsDisabled: false,
        kms: '',
      });
    }
  }

  render() {
    const {
      ta3AllBrands: { AllBrands },
    } = this.props;
    return (
      <div>
        <AdminBar history={this.props.history} />
        <div className="container-fluid register-steps">
          <Row>
            <Col md="6" sm="12" xs="12" className="bg">
              <div className="col-md-8 float-right">
                <div className="text-block">
                  <h4 className="title-division-primary">Vendé tu auto ya!</h4>
                  <p>En muy simples pasos podés publicar tu auto.</p>
                </div>

                <div className="steps">
                  <div className="step">
                    <h6>PASO 1</h6>
                    <h4>Contanos de tu auto</h4>
                    <a className="link">Modificar datos</a>
                  </div>

                  <div className="step disable">
                    <h6>PASO 2</h6>
                    <h4>Mostralo con fotos</h4>
                    <a className="link">Modificar datos</a>
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6" sm="12" xs="12">
              <div className="col-md-9 float-left pb-4">
                <h4 className="title-division">Describe tu auto</h4>
                <FormGroup>
                  <Label for="exampleSelect">¿Qué tipo de auto quieres vender?</Label>
                  <Select
                    id="carState-select"
                    ref={(ref) => { this.select = ref; }}
                    onBlurResetsInput={false}
                    autoFocus
                    clearable={false}
                    onSelectResetsInput={false}
                    placeholder="Selecciona un estado"
                    options={[{ value: 'Nuevo', label: 'Nuevo' }, { value: 'Usado', label: 'Usado' }]}
                    simpleValue
                    name="selected-state"
                    value={this.state.carState}
                    onChange={newValue => this.carStateChange(newValue)}
                  />
                </FormGroup>

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
                <FormGroup>
                  <Label for="exampleSelect">¿Cuál es el año?</Label>
                  <Select
                    id="year-select"
                    ref={(ref) => { this.select = ref; }}
                    onBlurResetsInput={false}
                    onSelectResetsInput={false}
                    options={this.generateYearArray()}
                    simpleValue
                    clearable
                    name="selected-state"
                    value={this.state.year}
                    placeholder="Selecciona un año"
                    onChange={newValue => this.onChangeYear(newValue)}
                    searchable
                    noResultsText="No se encontraron resultados"
                  />
                </FormGroup>
                <Input
                  label="¿Cuántos kilometros tiene?"
                  type="numeric"
                  value={this.state.kms}
                  onChange={event => this.setState({ kms: event.target.value })}
                  validate={isValid => this.setState({ kmsValidate: isValid })}
                  placeholder="Ingrese un número sin puntos ni comas"
                  disabled={this.state.kmsDisabled}
                />
                <Input
                  label="¿A qué precio lo querés vender?"
                  type="numeric"
                  value={this.state.price}
                  onChange={event => this.setState({ price: event.target.value })}
                  validate={isValid => this.setState({ priceValidate: isValid })}
                  placeholder="Ingrese un número sin puntos ni comas"
                />
                {this.state.priceSuggested && <p>Precio Sugerido: <b>{this.state.priceSuggested}</b></p>}
                <Input
                  label="Observaciones (Opcional)"
                  type="textarea"
                  value={this.state.observation}
                  onChange={event => this.setState({ observation: event.target.value })}
                  validate={isValid => this.setState({ observationValidate: isValid })}
                />

                <div className="underline" />
                <Button color="primary" className="float-right" disabled={this.disabled()} onClick={() => this.next()} >Siguiente</Button>
              </div>
            </Col>
          </Row>
          <style jsx>{style}</style>
        </div>
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

export default withApollo(withData(CreatePublication));

