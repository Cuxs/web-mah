import React, { Component } from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

/* eslint react/jsx-filename-extension: 0 */

class InputSpecial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldValidation: true,
      errorMessage: '',
    };
  }

  validate(type) {
    let re = '';
    let errorMessage = '';

    switch (type) {
      case 'email':
        re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
        errorMessage = 'Por favor, ingrese un correo válido.';
        break;

      case 'text':
        re = /^[a-z A-Z \s ñÑáéíóúÁÉÍÓÚ]*$/;
        errorMessage = 'Por favor, ingrese solo letras';
        break;

      case 'textarea':
        re = /^[a-z A-Z \s ñÑáéíóúÁÉÍÓÚ]*$/;
        errorMessage = 'Por favor, ingrese solo letras';
        break;

      case 'string':
        re = /./;
        errorMessage = 'Por favor, ingrese correctamente el dato';
        break;

      case 'number':
        re = /^\d+$/;
        errorMessage = 'Por favor, ingrese solo números';
        break;

      case 'money':
        re = /^\d+$/;
        errorMessage = 'Por favor, ingrese solo números';
        break;
      case 'float':
        re = /^-?\d*(\,\d+)?$/;
        errorMessage = 'Requerido, separe los decimales con coma';
        break;

      case 'mapAddress':
        re = /^[a-zA-Z0-9]*$/;
        errorMessage = 'Datos inválidos';
        break;

      case 'longitude':
        re = /[-+]?([0-9]*\.[0-9]+|[0-9]+)/;
        errorMessage = 'La longitud ingresada tiene el formato erróneo';
        break;

      case 'telephone':
        re = /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/g;
        errorMessage = 'Por favor ingrese un número de teléfono válido';
        break;

      case 'password':
        re = /^.{6,}$/;
        errorMessage = 'Por favor ingrese un contraseña mayor a 6 caracteres';
        break;

      case 'latitude':
        re = /[-+]?([0-9]*\.[0-9]+|[0-9]+)/;
        errorMessage = 'La latitud ingresada tiene el formato erróneo';
        break;

      case 'url':
        re = /((http[s]?:)\/\/)?([^?:\/#]+)(:([0-9]+))?(\/[^?#]*)?(\?([^#]*))?(#.*)?/; // eslint-disable-line
        errorMessage = 'La url ingresada tiene el formato erróneo';
        break;
      case 'alphanumeric':
        re = /^[a-zA-Z 0-9 .\-]*$/;
        errorMessage = 'Datos inválidos, sólo números, letras y guión medio';
        break;
      default:
        break;
    }

    if (re.test(this.props.value) === true) {
      this.props.validate(true);
      this.setState({
        fieldValidation: true,
      });
    } else {
      this.props.validate(false);
      this.setState({
        fieldValidation: false,
        errorMessage,
      });
    }
  }

  render() {
    const iconDiv = {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '0px',
      paddingTop: '13px',
    };
    return (
      <FormGroup className={this.state.fieldValidation ? '' : 'has-danger'}>
        {this.props.label && <Label>{this.props.label}</Label>}
        <div className="row">
          <div className="col-12">
            <div className="row">
              {this.props.type === 'money' && <div className="col-1" style={iconDiv}>
                <img src="/assets/images/icon-money.svg" alt="" style={{ width: 20, height: 20 }} />
              </div>}
              <div className={this.props.type === 'money' ? 'col-11' : 'col-12'} style={{ paddingLeft: this.props.type === 'money' ? 0 : 15 }} >
                <Input
                  style={this.props.style}
                  placeholder={this.props.placeholder}
                  type={this.props.type}
                  value={this.props.value}
                  onChange={this.props.onChange}
                  onBlur={() => this.validate(this.props.type)}
                  validate={() => this.props.validate}
                />
                {!this.state.fieldValidation && <p style={{ color: 'red' }} ><small>{this.state.errorMessage}</small></p>}
              </div>
            </div>
          </div>
        </div>
      </FormGroup>
    );
  }
}

export default InputSpecial;
