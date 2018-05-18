import React from 'react';
import { Row } from 'reactstrap';
/* eslint react/jsx-filename-extension: 0 */
import InputOrText from './InputOrText';
import { isAdminLogged } from '../Modules/sessionFunctions';
import { getSliders } from '../Modules/fetches';
import BannerCarousel from '../stories/BannerCarousel';

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title1: '',
      sliders: [],
    };
  }
  componentWillMount() {
    getSliders()
      .then((res) => {
        const sliders = res.data.map((row, index) => ({ src: `${process.env.REACT_APP_API}/images/${row.image}`, altText: `slider${index}` }));
        this.setState({
          sliders,
        });
      });
    const texts = {};
    texts.fetched = true;
    this.props.Texts.PageTexts.map(row => texts[row.section] = row.text);
    this.setState({ ...texts });
  }

  render() {
    return (
      <div className="container-fluid">
        <Row>
          <BannerCarousel
            photoGalery={this.state.sliders}
          />
          <div className="container">
            <Row className="align-items-center justify-content-between">
              <div className="col-lg-4 col-md-5 col-sm-12 col-xs-12">
                {isAdminLogged() ?
                  <InputOrText
                    style={{
                      fontSize: window.matchMedia("(max-width: 768px)").matches ? '13px !important': 'inherit',
                      position: 'absolute',
                      top: window.matchMedia("(max-width: 768px)").matches ? '-93px' : '-160px',
                      left: '80px',
                      color: 'white',
                      justifyContent: 'space-between',
                    }}
                    type="h3"
                    text={this.state.title1}
                    height="60px"
                    section="title1"
                    route="home"
                    onChange={title1 => this.setState({ title1 })}
                  />
                :
                  <h3 style={{
                    position: 'relative',
                    top: '-160px',
                    left: '80px',
                    color: 'white',
                    justifyContent: 'space-between',
                  }}
                  >{this.state.title1}
                  </h3>
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

