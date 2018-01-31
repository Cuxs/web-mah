/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import qs from 'query-string';
import { graphql, compose } from 'react-apollo';
import InfiniteScroll from 'react-infinite-scroller';

import AdminBar from '../../stories/AdminBar';
import UserSideBar from '../../stories/UserSideBar';
import AdminFilter from '../../stories/AdminFilter';
import CardPublication from '../../stories/CardPublication';
import NumberOfResult from '../../stories/NumberOfResult';
import { getUserToken } from '../../Modules/sessionFunctions';
import SearchUserPublicationQuery from '../../ApolloQueries/UserPublicationsQuery';

import style from '../../Styles/pledgeCredits';


class UserPublications extends React.Component {
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
      items.push(<CardPublication data={pub} key={pub.id} onHighlight={() => this.toggle()} />)));
    return items;
  }
  render() {
    const {
      history, location,
    } = this.props;
    return (<div>
      <AdminBar history={history} />
      <div className="container">
        <Row>
          <Col lg="3" md="12" sm="12" xs="12">
            <UserSideBar history={history} location={location} />
          </Col>
          <Col lg="9" md="12" sm="12" xs="12" className="mt-4">
            <NumberOfResult results={this.state.totalCount} />
            <AdminFilter history={history} location={location} />
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
              El pedido para destacar su publicación ha sido enviado. A la brevedad nos comunicaremos con usted.
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

export default withData(UserPublications);
