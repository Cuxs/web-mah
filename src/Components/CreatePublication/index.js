/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Input, Label, Button } from 'reactstrap';
import { graphql, compose, withApollo } from 'react-apollo';
import _ from 'lodash';
import { stringify, parse } from 'query-string';

import AdminBar from '../../stories/AdminBar';

import { AllBrandsQuery, GroupsQuery, ModelsQuery, YearsQuery } from '../../ApolloQueries/TautosQuery';

import style from '../../Styles/register';


class CreatePublication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: this.props.location.search === '' ? 0 : parse(this.props.location.search).brand,
      group: this.props.location.search === '' ? 0 : parse(this.props.location.search).group,
      model: this.props.location.search === '' ? 0 : parse(this.props.location.search).model,
      year: this.props.location.search === '' ? 0 : parse(this.props.location.search).year,
      kms: this.props.location.search === '' ? '' : parse(this.props.location.search).kms,
      price: this.props.location.search === '' ? '' : parse(this.props.location.search).price,
    };
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
    this.setState({ model: event.target.value });
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
      brand: this.state.brand,
      group: this.state.group,
      model: this.state.model,
      year: this.state.year,
      kms: this.state.kms,
      price: this.state.price,
      priceSuggested: this.state.priceSuggested,
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
        <AdminBar />
        <Row>
          <Col md="6" sm="12">
            <h4>Vendé tu auto ya!</h4>
            <h6>En muy simples pasos podés publicar tu auto.</h6>

            <h6>PASO 1</h6>
            <h4><b>Contanos de tu auto</b></h4>

            <div className="underline" />

            <h6>PASO 2</h6>
            <h4>Mostralo con fotos</h4>

          </Col>
          <Col md="4">
            <h4>Describe tu auto</h4>
            <FormGroup>
              <Label for="exampleSelect">¿Qué tipo de auto quieres vender?</Label>
              <Input type="select" name="select" id="exampleSelect">
                <option>Usado</option>
                <option>Nuevo</option>
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
              <Input type="select" name="select" onChange={event => this.onChangeModel(event)} value={this.state.model}>
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

            <div className="underline" />
            <Button color="primary" onClick={() => this.next()} >Siguiente</Button>
          </Col>
        </Row>
        <style jsx>{style}</style>
      </div>
    );
  }
}

const WithAllBrands = graphql(AllBrandsQuery, {
  name: 'ta3AllBrands',
});


const withData = compose(WithAllBrands);

export default withApollo(withData(CreatePublication));

