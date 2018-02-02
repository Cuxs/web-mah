/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button, Label } from 'reactstrap';
import qs from 'query-string';
import { graphql, compose } from 'react-apollo';
import InfiniteScroll from 'react-infinite-scroller';

import AdminBar from '../../stories/AdminBar';
import SuperAdminFilter from '../../stories/SuperAdminFilter';
import SuperAdminSideBar from '../../stories/SuperAdminSideBar';
import SACardPublication from '../../stories/SACardPublication';
import { getUserToken } from '../../Modules/sessionFunctions';
import { SearchUserPublicationQuery } from '../../ApolloQueries/UserPublicationsQuery';

class SuperAdminPublications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      publications: [],
      totalCount: 0,
      hasNextPage: false,
      renderedData: 0,
    };

    this.doSearch = this.doSearch.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    this.props.PubsPerPage()
      .then(({ data: { searchPublication: { hasNextPage, totalCount } }, data: { searchPublication: { Publications } } }) => {
        const existingPubs = this.state.publications;
        Publications.map((pub) => {
          existingPubs.push(pub);
        });
        this.setState({
          publications: existingPubs,
          hasNextPage,
          totalCount,
          loading: false,
          renderedData: this.state.renderedData + Publications.length,
        });
      })
      .catch(err => console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.doSearch(1, true, nextProps);
    }
  }

  doSearch(page, newSearch, nextProps) {
    let location;
    if (nextProps) { location = nextProps.location; } else {
      location = this.props.location;
    }
    this.props.PubsPerPage({
      variables: {
        MAHtoken: getUserToken(),
        state: qs.parse(location.search).stateName,
        carState: qs.parse(location.search).carState,
        page,
      },
    })
      .then(({ data: { searchPublication: { hasNextPage, totalCount } }, data: { searchPublication: { Publications } } }) => {
        const existingPubs = this.state.publications;
        Publications.map((pub) => {
          existingPubs.push(pub);
        });
        if (newSearch) {
          this.setState({
            publications: Publications,
            hasNextPage,
            totalCount,
            loading: false,
            renderedData: this.state.renderedData + Publications.length,
          });
        } else {
          this.setState({
            publications: existingPubs,
            hasNextPage,
            totalCount,
            loading: false,
            renderedData: this.state.renderedData + Publications.length,
          });
        }
      });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  renderData() {
    const {
      hasNextPage,
    } = this.state;

    if (hasNextPage === false) {
      return <p>No hay más publicaciones que mostrar</p>;
    }
    if (this.state.loading) {
      return <p>Cargando...</p>;
    }
    const {
      publications, totalCount,
    } = this.state;
    if (totalCount === 0) {
      return 'No hay resultados, pruebe con otros filtros';
    }
    const items = [];
    publications.map(pub => (
      items.push(<SACardPublication data={pub} key={pub.id} onHighlight={() => this.toggle()} />)));
    return items;
  }

  render() {
    return (
      <div>
        <AdminBar history={this.props.history} />
        <div className="container-fluid">
          <Row>
            <Col md="3">
              <SuperAdminSideBar history={this.props.history} location={this.props.location} />
            </Col>
            <Col md="9">
              <SuperAdminFilter history={this.props.history} location={this.props.location} />
              <div className="container-box-item">
                <div className="col-12">
                  <InfiniteScroll
                    pageStart={1}
                    loadMore={this.doSearch}
                    hasMore={this.state.renderedData < this.state.totalCount}
                    loader={<img src="/loading.gif" key={0} alt="Loading..." />}
                  >
                    {this.renderData()}
                  </InfiniteScroll>
                </div>
              </div>
            </Col>
          </Row>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Felicitaciones</ModalHeader>
            <ModalBody>
              <div className="col-md-6 offset-md-3">
              El pedido para destacar su publicación ha sido enviado. A la brevedad nos comunicaremos con usted.
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => this.toggle()}>OK</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

const options = ({ location }) => ({
  variables: {
    MAHtoken: getUserToken(),
    state: qs.parse(location.search).stateName,
    carState: qs.parse(location.search).carState,
    page: 1,
  },
});
const withPublicationsPerPage = graphql(SearchUserPublicationQuery, {
  name: 'PubsPerPage',
  options,
});
const withData = compose(withPublicationsPerPage);

export default withData(SuperAdminPublications);
