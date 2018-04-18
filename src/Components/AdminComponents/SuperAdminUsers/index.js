/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row } from 'reactstrap';
import { withApollo } from 'react-apollo';
import InfiniteScroll from 'react-infinite-scroller';
import _ from 'lodash';
import Fuse from 'fuse.js';

import AdminBar from '../../../stories/AdminBar';
import SuperAdminFilterUser from '../../../stories/SuperAdminFilterUser';
import SuperAdminSideBar from '../../../stories/SuperAdminSideBar';
import SACardUser from '../../../stories/SACardUser';
import { AllUsersQuery } from '../../../ApolloQueries/UserQuery';
import { isAdminLogged } from '../../../Modules/sessionFunctions';

class SuperAdminUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      totalCount: 0,
      hasNextPage: true,
      renderedData: 0,
    };

    this.doSearch = this.doSearch.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    if (!isAdminLogged()) {
      this.props.history.push('/loginAdmin');
    }
    this.props.client.query({
      query: AllUsersQuery,
      variables: {
        page: 1,
      },
    })
      .then(response => this.setState({
        users: response.data.AllUsersResume.Users,
        totalCount: response.data.AllUsersResume.totalCount,
        renderedData: this.state.renderedData + response.data.AllUsersResume.Users.length,
      }));
  }

  doSearch(page, newSearch) {
    this.props.client.query({
      query: AllUsersQuery,
      variables: {
        page,
      },
    })
      .then(({ data: { AllUsersResume: { totalCount } }, data: { AllUsersResume: { Users } }, data: { AllUsersResume: { hasNextPage } } }) => {
        let existingUser = [];
        existingUser = JSON.parse(JSON.stringify(this.state.users));
        existingUser = _.uniqBy(existingUser, 'id');
        Users.map(user => existingUser.push(user));
        this.setState({
          users: existingUser,
          hasNextPage,
          totalCount,
          loading: false,
          renderedData: this.state.renderedData + Users.length,
        });
      });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  onChangeSearch(value) {
    if (value === '') {
      return this.setState({ budgetsSearched: this.state.budgets, inputSearch: value });
    }
    const options = {
      threshold: 0.1,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        'PreTomadorNombre',
        'PreFormaPago',
        'PrePremio',
        'PreNumero',
        'SegCertificado',
        'PreEstado',
        'SegEstado',
      ],
    };
    const fuse = new Fuse(this.state.budgets, options);
    const resultFuzzy = fuse.search(value);
    return this.setState({ budgetsSearched: resultFuzzy, inputSearch: value });
  }

  renderData() {
    if (this.state.loading) {
      return <p>Cargando...</p>;
    }
    const {
      users, totalCount,
    } = this.state;
    if (totalCount === 0) {
      return 'No hay resultados, pruebe con otros filtros';
    }
    const items = [];
    users.map(user => (
      items.push(<SACardUser data={user} key={user.id} onHighlight={() => this.toggle()} />)));
    return items;
  }

  render() {
    console.log(this.state.users)
    return (
      <div>
        <AdminBar history={this.props.history} />
        <div className="container-fluid">
          <Row>
            <Col md="3">
              <SuperAdminSideBar history={this.props.history} location={this.props.location} />
            </Col>
            <Col md="9">
              <SuperAdminFilterUser history={this.props.history} location={this.props.location} />
              <div className="container-box-item">
                <div className="col-12">
                  <InfiniteScroll
                    pageStart={0}
                    loadMore={this.doSearch}
                    hasMore={this.state.hasNextPage}
                    loader={<img src="/loading.gif" className="loading-gif" key={0} alt="Loading..." />}
                  >
                    <Row>
                      {this.renderData()}
                    </Row>
                  </InfiniteScroll>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withApollo(SuperAdminUsers);
