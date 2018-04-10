import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';

import Input from './Input';
/* eslint react/jsx-filename-extension: 0 */

class InputOrText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputShow: false,
    };
  }

  componentWillMount() {
    this.setState({ originalText: this.props.text });
  }

  cancel() {
    this.props.onChange(this.state.originalText);
    this.setState({ inputShow: false });
  }

  save() {
    this.setState({ originalText: this.props.text });
    this.setState({ inputShow: false });
  }

  renderText() {
    switch (this.props.type) {
      case 'h3':
        return <h3 className={this.props.style}>{this.props.text}</h3>;
      case 'h4':
        return <h4 className={this.props.style}>{this.props.text}</h4>;
      case 'h5':
        return <h5 className={this.props.style}>{this.props.text}</h5>;
      case 'h6':
        return <h6 className={this.props.style}>{this.props.text}</h6>;
      default:
        return <p className={this.props.style}>{this.props.text}</p>;
    }
  }

  render() {
    const container = {
      marginTop: this.state.inputShow ? 30 : 0,
      alignItems: this.state.inputShow ? 'flex-start' : 'center',
      justifyContent: 'space-between',
    };
    return (
      <Row style={container} >
        <Col sm="9">
          { this.state.inputShow ?
            <Input
              type="string"
              value={this.props.text}
              onChange={event => this.props.onChange(event.target.value)}
              validate={isValid => this.setState({ mountValid: isValid })}
            />
          :
            <div className="text-block">
              {this.renderText()}
            </div>
          }
        </Col>
        <Col sm="3">
          { this.state.inputShow ?
            <div className="d-flex flex-row" >
              <Button type="primary" className="btn-link-primary" style={{ marginRight: 5, padding: 2 }} onClick={() => this.save()} >
                OK
              </Button>
              <Button type="primary" className="btn-link-primary" style={{ margin: 0, padding: 2 }} onClick={() => this.cancel()} >
                <img src="/assets/images/icon-close.svg" alt="" style={{ width: 10, height: 10 }} />
              </Button>
            </div>
          :
            <Button type="primary" className="btn-link-primary" onClick={() => this.setState({ inputShow: true })} >
              <img src="/assets/images/icon-edit-red.svg" alt="" />
            </Button>
          }
        </Col>
      </Row>
    );
  }
}

export default InputOrText;

