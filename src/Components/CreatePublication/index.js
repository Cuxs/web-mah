/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Input, Label, Button } from 'reactstrap';
import { graphql, compose, withApollo } from 'react-apollo';
import { stringify, parse } from 'query-string';

import AdminBar from '../../stories/AdminBar';

import { AllBrandsQuery, GroupsQuery, ModelsQuery, YearsQuery } from '../../ApolloQueries/TautosQuery';

import style from '../../Styles/register';


class CreatePublication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carState: this.props.location.search === '' ? 'Nuevo' : parse(this.props.location.search).carState,
      brand: this.props.location.search === '' ? 0 : parse(this.props.location.search).brand,
      group: this.props.location.search === '' ? 0 : parse(this.props.location.search).group,
      codia: this.props.location.search === '' ? 0 : parse(this.props.location.search).codia,
      year: this.props.location.search === '' ? 0 : parse(this.props.location.search).year,
      kms: this.props.location.search === '' ? '' : parse(this.props.location.search).kms,
      price: this.props.location.search === '' ? '' : parse(this.props.location.search).price,
      observation: this.props.location.search === '' ? '' : parse(this.props.location.search).observation,
    };
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
          ta3_codia: parse(this.props.location.search).model,
        },
      })
        .then(response => this.setState({ Prices: response.data.Price }));
    }
  }

  disabled() {
    const {
      brand, group, codia, year, kms, price,
    } = this.state;
    return !(brand !== 0 && group !== 0 && codia !== 0 && year !== 0 && kms !== '' && price !== '');
  }

  onChangeBrand(event) {
    this.setState({ brand: event.target.value });
    this.props.client.query({
      query: GroupsQuery,
      variables: {
        gru_nmarc: event.target.value,
      },
    })
      .then(response => this.setState({ Groups: response.data.Group }));
  }

  onChangeGroup(event) {
    this.setState({ group: event.target.value });
    this.props.client.query({
      query: ModelsQuery,
      variables: {
        ta3_nmarc: this.state.brand,
        ta3_cgrup: event.target.value,
      },
    })
      .then(response => this.setState({ Models: response.data.Models }));
  }

  onChangeModel(event) {
    const index = event.nativeEvent.target.selectedIndex;
    this.setState({ codia: event.target.value, modelName: event.nativeEvent.target[index].text });
    this.props.client.query({
      query: YearsQuery,
      variables: {
        ta3_codia: event.target.value,
      },
    })
      .then(response => this.setState({ Prices: response.data.Price }));
  }

  onChangeYear(event) {
    this.setState({
      year: event.target.value,
      priceSuggested: this.state.Prices[this.state.Prices[0].anio - parseInt(event.target.value, 10)].precio,
    });
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
    this.props.history.push(`/createPublicationS1?${stringify(dataCar)}`);
  }

  render() {
    const {
      location,
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
                  <Input type="select" name="select" onChange={event => this.setState({ carState: event.target.value })} value={this.state.carState}>
                    <option value="Nuevo">Nuevo</option>
                    <option value="Usado">Usado</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelect">¿Cuál es la marca?</Label>
                  <Input type="select" name="select" onChange={event => this.onChangeBrand(event)} value={this.state.brand} >
                    <option value={0} >Selecciona una marca</option>
                    {!this.props.ta3AllBrands.loading && AllBrands.map(brand => <option value={brand.ta3_nmarc} >{brand.ta3_marca}</option>)}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelect">¿Cuál es el grupo?</Label>
                  <Input type="select" name="select" onChange={event => this.onChangeGroup(event)} value={this.state.group}>
                    <option>Selecciona un grupo</option>
                    {this.state.Groups && this.state.Groups.map(group => <option value={group.gru_cgrup} >{group.gru_ngrup}</option>)}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelect">¿Cuál es el modelo?</Label>
                  <Input type="select" name="select" onChange={event => this.onChangeModel(event)} value={this.state.codia}>
                    <option>Selecciona un modelo</option>
                    {this.state.Models && this.state.Models.map(model => <option value={model.ta3_codia} >{model.ta3_model}</option>)}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelect">¿Cuál es el año?</Label>
                  <Input type="select" name="select" onChange={event => this.onChangeYear(event)} value={this.state.year}>
                    <option>Selecciona un año</option>
                    {this.state.Prices && this.state.Prices.map((year) => {
                  if (year.precio !== 0) {
                    return (<option value={year.anio} >{year.anio}</option>);
                  }
                })}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">¿Cuántos kilometros tiene?</Label>
                  <Input type="numeric" value={this.state.kms} onChange={event => this.setState({ kms: event.target.value })} placeholder="Ingrese un número sin puntos ni comas" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleEmail">¿A qué precio lo querés vender?</Label>
                  <Input type="numeric" value={this.state.price} onChange={event => this.setState({ price: event.target.value })} placeholder="Ingrese un número sin puntos ni comas" />
                  {this.state.priceSuggested && <p>Precio Sugerido: <b>$ {this.state.priceSuggested}</b></p>}
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Observaciones</Label>
                  <Input type="textarea" value={this.state.observation} onChange={event => this.setState({ observation: event.target.value })} />
                </FormGroup>

                <div className="underline" />
                <Button color="primary" disabled={this.disabled()} onClick={() => this.next()} >Siguiente</Button>
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


const withData = compose(WithAllBrands);

export default withApollo(withData(CreatePublication));

