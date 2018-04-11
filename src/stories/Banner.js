import React from 'react';
import { Row } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */
import InputOrText from './InputOrText';
import { isAdminLogged } from '../Modules/sessionFunctions';

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title1: '',
    };
  }
  componentWillMount() {
    const texts = {};
    texts.fetched = true;
    this.props.Texts.PageTexts.map(row => texts[row.section] = row.text);
    this.setState({ ...texts });
  }

  render() {
    return (
      <div className="container-fluid">
        <Row className="banner-home" style={{ background: 'url(/assets/images/image-home.png) no-repeat center center' }}>
          <div className="container">
            <Row className="align-items-center justify-content-between">
              <div className="col-lg-4 col-md-5 col-sm-12 col-xs-12">
                {isAdminLogged() ?
                  <InputOrText type="h3" text={this.state.title1} height="60px" section="title1" route="home" onChange={title1 => this.setState({ title1 })} />
                :
                  <h3>{this.state.title1}</h3>
                }
              </div>
            </Row>
          </div>
        </Row>
      </div>
    );
  }
}

export default Banner;

