/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, FormGroup, Input, Label, Button } from 'reactstrap';
import { parse } from 'query-string';

import AdminBar from '../../stories/AdminBar';
import { InfoCarQuery } from '../../ApolloQueries/TautosQuery';

import style from '../../Styles/register';

class CreatePublication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.client.query({
      query: InfoCarQuery,
      variables: {
        ta3_codia: parse(this.props.location.search).model,
      },
    })
      .then(response => this.setState({ Models: response.data.Models }));
  }

  render() {
    const {
      location,
      ta3InfoCarQuery: { InfoCarQuery },
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
            <h4>¿Qué extrass tiene?</h4>
            <FormGroup check className="d-flex flex-column" >
              <Label>Características</Label>

              {console.log(InfoCarQuery)}

              <Label check>
                <Input type="checkbox" />{' '} Aire Acondicionado
              </Label>
              <Label check>
                <Input type="checkbox" />{' '} Alarma
              </Label>
              <Label check>
                <Input type="checkbox" />{' '} Asiento rebatible
              </Label>
              <Label check>
                <Input type="checkbox" />{' '} Cierre centralizado
              </Label>
              <Label check>
                <Input type="checkbox" />{' '} Tapizado de cuero
              </Label>
              <Label check>
                <Input type="checkbox" />{' '} Velocidad crucero
              </Label>
              <Label check>
                <Input type="checkbox" />{' '} Volante regulable
              </Label>
            </FormGroup>

            <FormGroup check className="d-flex flex-column" >
              <Label>Seguridad</Label>

              <Label check>
                <Input type="checkbox" />{' '} Airbag
              </Label>
              <Label check>
                <Input type="checkbox" />{' '} Cierre automático
              </Label>
              <Label check>
                <Input type="checkbox" />{' '} Control de estabilidad
              </Label>
              <Label check>
                <Input type="checkbox" />{' '} Faros antiniebla
              </Label>
              <Label check>
                <Input type="checkbox" />{' '} Frenos ABS
              </Label>
              <Label check>
                <Input type="checkbox" />{' '} Sensor de estacionamiento
              </Label>
            </FormGroup>

            <FormGroup check className="d-flex flex-column" >
              <Label>Audio/Multimedia</Label>

              <Label check>
                <Input type="checkbox" />{' '} Bluetooth
              </Label>
              <Label check>
                <Input type="checkbox" />{' '} Entrada auxiliar
              </Label>
            </FormGroup>

            <div>
              <div className="underline" />
              <Button color="secondary" onClick={() => this.props.history.push(`/createPublication${(this.props.location.search)}`)}>Volver</Button>
              <Button color="primary" onClick={() => this.props.history.push('/createPublicationS2')}>Registrarme</Button>
            </div>
          </Col>
        </Row>
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default CreatePublication;
