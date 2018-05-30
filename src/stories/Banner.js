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
      sliders: [{src:''}],
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
    let backgroundImage = this.state.sliders[0].src;
    return (
      <div className="container-fluid">
        <Row>
      {
        window.matchMedia("(max-width: 550px)").matches 
          ?
          <div style={{
            backgroundImage:`url(${backgroundImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50% 50%',
            width:'100vw',
            height:'200px'
          }}/> 
          // <div id='tuhermana' style={{ backgroundColor: 'red', width:'100vw', height:'100vh'}}/> 
          : 
          <BannerCarousel
            photoGalery={this.state.sliders}/>
      }
          <div className="container">
            <Row className="align-items-center justify-content-between">
              <div className="col-lg-4 col-md-5 col-sm-12 col-xs-12">
                {isAdminLogged() ?
                  <InputOrText
                    style={{
                      position: 'absolute',
                      top: '-160px',
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
                    left: window.matchMedia("(max-width: 550px)").matches ? '0px' : '80px' ,                    
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

