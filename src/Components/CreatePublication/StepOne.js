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
                <h4 className="title-division">¿Qué extras tiene?</h4>
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
              </div>
            </Col>
          </Row>
          <style jsx>{style}</style>
        </div>
      </div>
    );
  }
}

export default CreatePublication;
