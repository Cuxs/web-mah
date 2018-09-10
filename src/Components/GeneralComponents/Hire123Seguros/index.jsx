import React, { Component, Fragment } from 'react';
import ReactGA from 'react-ga';
import qs from 'query-string';
import ScrollToTop from 'react-scroll-up';
import {scroller} from 'react-scroll';
import ReactHyperResponsiveTable from 'react-hyper-responsive-table';
import { Col, Row, Button } from 'reactstrap';
import { graphql } from 'react-apollo';

import SearchMutation from '../../../ApolloQueries/SearchMutation';
import Footer from '../../../stories/Footer';
import BreadCrum from '../../../stories/BreadCrum';
import PublicityBanner from '../../../stories/PublicityBanner';
import SearchBar from '../../../stories/SearchBar';
import TopTopNav from '../../../stories/TopTopNav';

const logoCruz = <img src="/assets/images/icon-cruz.svg" alt="" className="logo" />;
const coverages = [
  {
    name: 'Sancor',
    image: 'sancor',
    coverage1: null,
    coverage2: {
      id: 12,
      price: 980,
      title: 'Terceros Completos',
      detail: [
        { description: 'Vigencia de Poliza: Semestral con refacturacion mensual' },
        { description: 'Daños físicos o materiales a terceros hasta $6.000.000' },
        { description: 'Cobertura en países limítrofes' },
        { description: 'Auxilio Mecánico' },
      ],
    },
    coverage3: null,
    coverage4: {
      id: 14,
      price: 2300,
      title: 'Terceros Completos Granizo',
      detail: [
        { description: 'Vigencia de Poliza: Semestral con refacturacion mensual' },
        { description: 'Daños físicos o materiales a terceros hasta $6.000.000' },
        { description: 'Cobertura en países limítrofes' },
        { description: 'Auxilio Mecánico' },
        { description: 'Destrucción Total' },
        { description: 'Incendio Total y Parcial' },
        { description: 'Robo Total y Parcial' },
        { description: 'Daños por robo o intento de robo' },
      ],
    },
    coverage5: null,
  },
  {
    name: 'Allianz',
    image: 'allianz',
    coverage1: {
      id: 21,
      price: 980,
      title: 'Responsabilidad Civil',
      detail: [
        { description: 'Vigencia de Poliza: Anual con actualizacion de cuota trimestral' },
        { description: 'Responsabilidad Civil hacia terceros hasta $6.000.000' },
        { description: 'Cobertura en países limítrofes' },
        { description: 'Auxilio Mecánico' },
      ],
    },
    coverage2: null,
    coverage3: {
      id: 23,
      price: 1900,
      title: 'Terceros Completos Full',
      detail: [
        { description: 'Vigencia de Poliza: Semestral con refacturacion mensual' },
        { description: 'Daños físicos o materiales a terceros hasta $6.000.000' },
        { description: 'Cobertura en países limítrofes' },
        { description: 'Auxilio Mecánico' },
        { description: 'Destrucción Total' },
        { description: 'Daños por robo o intento de robo' },
        { description: 'Granizo' },
        { description: 'Crislates laterales, Luneta y Parabrisas' },
      ],
    },
    coverage4: null,
    coverage5: null,
  },
  {
    name: 'Sura',
    image: 'sura',
    coverage1: null,
    coverage2: {
      id: 32,
      price: 890,
      title: 'Terceros Completos',
      detail: [
        { description: 'Daños físicos o materiales a terceros hasta $6.000.000 / Para comerciales $18.000.000' },
      ],
    },
    coverage3: null,
    coverage4: {
      id: 34,
      price: 2490,
      title: 'Terceros Completos Granizo',
      detail: [
        { description: 'Vigencia de Poliza: Anual con actualizacion de cuota cuatrimestral' },
        { description: 'Daños físicos o materiales a terceros hasta $6.000.000' },
        { description: 'Destrucción Total' },
        { description: 'Incendio Total' },
        { description: 'Robo Total y Parcial' },
        { description: 'Cobertura en países limítrofes' },
        { description: 'Auxilio Mecánico' },
      ],
    },
    coverage5: null,
  },
  {
    name: 'Zurich',
    image: 'zurich',
    coverage1: {
      id: 41,
      price: 1200,
      title: 'Responsabilidad Civil',
      detail: [
        { description: 'Vigencia de Poliza: Anual con actualizacion de cuota mensual' },
        { description: 'Daños físicos o materiales a terceros hasta $6.000.000' },
        { description: 'Destrucción Total' },
        { description: 'Incendio Total y Parcial' },
        { description: 'Robo Total y Parcial' },
        { description: 'Daños por robo o intento de robo' },
        { description: 'Cobertura en países limítrofes' },
        { description: 'Auxilio Mecánico' },
      ],
    },
    coverage2: null,
    coverage3: null,
    coverage4: null,
    coverage5: {
      id: 45,
      price: 3290,
      title: 'Todo Riesgo',
      detail: [
        { description: 'Vigencia de Poliza: Anual con actualizacion de cuota mensual' },
        { description: 'Daños físicos o materiales a terceros hasta $6.000.000' },
        { description: 'Destrucción Total' },
        { description: 'Incendio Total y Parcial' },
        { description: 'Robo Total y Parcial' },
        { description: 'Daños por robo o intento de robo' },
        { description: 'Granizo' },
        { description: 'Crislates laterales, Luneta y Parabrisas' },
        { description: 'Cobertura en países limítrofes' },
        { description: 'Auxilio Mecánico' },
      ],
    },
  },
];


class Hire123Seguros extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail: false,
    };
    this.selectCoverage = this.selectCoverage.bind(this);
    ReactGA.pageview('/RECUPERAR CONTRASEÑA');
  }

  getCoveragePrice(item, image) {
    return (
      <Fragment>
        <div className="coverage">
          <span>${item.price}</span>
          <button onClick={() => this.selectCoverage(item, image)} >Ver detalle</button>
        </div>
        <div className="coverage-mobile">
          <button onClick={() => this.selectCoverage(item, image)} >${item.price}</button>
        </div>
      </Fragment>
    );
  }

  selectCoverage(item, image) {
    scroller.scrollTo('card-coverage', {
      duration: 600,
      smooth: true,
      offset: -120,
    });
    this.setState({
      showDetail: true,
      coverageSelected: item,
      imageSelected: image,
    });
  }

  render() {
    console.log(this.props)
    const headers = {
      image: <img src="/assets/images/123seguro-logo.svg" alt="" className="logo" />,
      coverage1: 'Responsabilidad Civil',
      coverage2: 'Terceros Completos',
      coverage3: 'Terceros Completos Full',
      coverage4: 'Terceros Completos Granizo',
      coverage5: 'Todo Riesgo',
    };
    const rows = coverages.map(item => ({
      image: <div className="td-image"><img src={`/assets/images/aseguradora-${item.image}.png`} alt="" className="logo" /></div>,
      coverage1: item.coverage1 !== null ? this.getCoveragePrice(item.coverage1, item.image) : logoCruz,
      coverage2: item.coverage2 !== null ? this.getCoveragePrice(item.coverage2, item.image) : logoCruz,
      coverage3: item.coverage3 !== null ? this.getCoveragePrice(item.coverage3, item.image) : logoCruz,
      coverage4: item.coverage4 !== null ? this.getCoveragePrice(item.coverage4, item.image) : logoCruz,
      coverage5: item.coverage5 !== null ? this.getCoveragePrice(item.coverage5, item.image) : logoCruz,
    }));
    const keyGetter = row => row.name;
    const {
      text,
    } = qs.parse(this.props.location.search);
    const { history, location } = this.props;
    return (
      <div>
        <TopTopNav history={history} />
        <SearchBar
          text={text}
          history={history}
          location={location}
        />
        <div className="container mb-4 mt-4">
          <Row>
            <Col md="8" sm="12" xs="12">
              <BreadCrum url={window.location.href} history={history} />
            </Col>
            <Col md="4" sm="12" xs="12">
              <PublicityBanner history={history} />
            </Col>
          </Row>
        </div>
        <div className="container">
          <h4 className="title-hire123">Elegí un seguro para tu auto</h4>
          <ReactHyperResponsiveTable
            headers={headers}
            rows={rows}
            keyGetter={keyGetter}
            breakpoint={578}
            tableStyling={({ narrow }) => (narrow ? 'narrowtable' : 'widetable')}
          />
          {this.state.showDetail && <div className="card-coverage" id="card-coverage" >
            <div className="card-coverage-title">
              <img src={`/assets/images/aseguradora-${this.state.imageSelected}.png`} alt="" className="logo" />
              <div className="card-coverage-title1" >
                <p>${this.state.coverageSelected.price}</p>
                <Button color="primary">CONTRATAR</Button>
              </div>
            </div>
            <ul className="card-coverage-detail">
              <h3>{this.state.coverageSelected.title}</h3>
              {this.state.coverageSelected.detail.map(item => <li>{item.description}</li>)}
            </ul>
          </div>
          }
        </div>
        <Footer history={history} />
        <ScrollToTop showUnder={320}>
          <img style={{ width: '30px' }} src="/assets/images/icon-arrow-top.svg" alt="Inicio" />
        </ScrollToTop>
      </div>
    );
  }
}


export default graphql(SearchMutation)(Hire123Seguros);

