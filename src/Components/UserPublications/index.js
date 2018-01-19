/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { Col, Row, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import qs from 'query-string';
import { graphql, compose } from 'react-apollo';

import AdminBar from '../../stories/AdminBar';
import PaginationAdmin from '../../stories/PaginationAdmin';
import UserSideBar from '../../stories/UserSideBar';
import AdminFilter from '../../stories/AdminFilter';
import CardPublication from '../../stories/CardPublication';
import { getUserToken, getUserDataFromToken } from '../../Modules/sessionFunctions';
import { CountActivePublications, GetPublicationData } from '../../ApolloQueries/AdminHomeQuery';

import style from '../../Styles/pledgeCredits';


class UserPublications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      data: [],
    };

    this.toggle = this.toggle.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathName !== this.props.location.pathName) {
      this.props.PubsPerPage.refetch({
        MAHtoken: getUserToken(),
        user_id: getUserDataFromToken().id,
        stateName: 'Activas',
        page: qs.parse(nextProps.location.search).page,
      });
    }
    return true;
  }
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  render() {
    const {
      history, location, activePubs: { AllPublications, loading }, PubsPerPage, PubsPerPage: { AllPublications: Publications },
    } = this.props;
    const { page } = qs.parse(this.props.location.search);
    return (
      <div>
        <AdminBar history={history} />

        <Row>
          <Col md="3">
            <UserSideBar history={history} location={location} />
          </Col>
          <Col md="9">
            <AdminFilter />
            {!PubsPerPage.loading &&
            <span>
              {Publications.map(pub => (
                <CardPublication data={pub} onHighlight={() => this.toggle()} />
              ))}
            </span>
          }
            {!loading && <PaginationAdmin numberOfResults={AllPublications.length} history={history} location={location} actualPage={page} />}

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
        <style jsx>{style}</style>
      </div>
    );
  }
}
const options = () => ({
  variables: {
    MAHtoken: getUserToken(),
    user_id: getUserDataFromToken().id,
    stateName: 'Activas',
  },
});
const withActivePublicationsCount = graphql(CountActivePublications, { name: 'activePubs', options });
const withPublicationsPerPage = graphql(GetPublicationData, {
  name: 'PubsPerPage',
  options: ({ location }) => ({
    variables: {
      MAHtoken: getUserToken(),
      user_id: getUserDataFromToken().id,
      stateName: 'Activas',
      page: qs.parse(location.search).page,
    },
  }),
});
const withData = compose(withActivePublicationsCount, withPublicationsPerPage);

export default withData(UserPublications);
