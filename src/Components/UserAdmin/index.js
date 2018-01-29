/* eslint react/jsx-filename-extension: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
} from 'reactstrap';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { graphql, compose } from 'react-apollo';
import { split } from 'split-object';

import AdminBar from '../../stories/AdminBar';
import UserSideBar from '../../stories/UserSideBar';

import style from '../../Styles/pledgeCredits';
import {
  CountUnreadMessagesQuery,
  CountActivePublications,
} from '../../ApolloQueries/AdminHomeQuery';
import { getUserToken, getUserDataFromToken } from '../../Modules/sessionFunctions';
import { getSoldPublications } from '../../Modules/fetches';

class UserAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      graphData: [],
    };

    this.toggle = this.toggle.bind(this);
  }
  componentWillMount() {
    this.getGraphData();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.unreadMessages.loading === false) {
      this.getGraphData();
    }
    return true;
  }
  getGraphData() {
    getSoldPublications().then((resp) => {
      const data = [];
      split(resp.data).map((obj) => {
        data.push({
          date: obj.key,
          ventas: obj.value,
        });
      });
      this.setState({ graphData: data });
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    const {
      history, location, unreadMessages, activePub,
    } = this.props;
    const { CountUnreadMessages } = unreadMessages;
    const { AllPublications } = activePub;
    return (
      <div>
        <AdminBar history={history} />
        <div className="container-fluid">
          <Row>
            <Col md="3">
              <UserSideBar history={history} location={location} />
            </Col>
            <Col md="9">
              <Row>
                <Col md="12">
                  <h1 className="title-division-primary">¡Hola {getUserDataFromToken().name}!</h1>
                </Col>
                <Col md="8">
                  <Label for="exampleEmail">Reporte de autos vendidos</Label>
                  <LineChart
                    width={600}
                    height={300}
                    data={this.state.graphData}
                    margin={{
                      top: 5,
                      right: 20,
                      bottom: 5,
                      left: 0,
                    }}
                  >
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="ventas" stroke="blue" />
                  </LineChart>
                </Col>
                <Col md="4">
                  <div className="data-graph">
                    <a
                      onClick={() => history.push('/userInbox')}
                      color="default"
                    >
                      <div className="row">
                        {unreadMessages.loading ? (
                          <img
                            style={{ height: '70px' }}
                            src="/loading.gif"
                            key={0}
                            alt="Loading..."
                          />
                        ) : (

                            <div className="col-8">
                              <h2>{CountUnreadMessages[0]}</h2>
                              <p>Mensajes sin leer</p>
                            </div>

                        )}
                        <div className="col-4">
                          <div className="container-icon">
                            <img src="/assets/images/icon-comments-white.svg" alt="" />
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>

                  <div className="data-graph">
                    <a
                      onClick={() => history.push('/userPublications')}
                      className="d-flex flex-row"
                    >
                      {activePub.loading ? (
                        <img
                          style={{ height: '70px' }}
                          src="/loading.gif"
                          key={0}
                          alt="Loading..."
                        />
                      ) : (
                        <div className="col-8">
                          <h2>{AllPublications.length}</h2>
                          <p>Publicaciones activas</p>
                        </div>
                      )}
                      <div className="col-4">
                        <div className="container-icon">
                          <img src="/assets/images/icon-car-white.svg" alt="" />
                        </div>
                      </div>
                    </a>
                  </div>

                  <div className="data-graph">
                    <a
                      onClick={() => history.push('/userPublications')}
                      className="d-flex flex-row"
                    >
                      {activePub.loading ? (
                        <img
                          style={{ height: '70px' }}
                          src="/loading.gif"
                          key={0}
                          alt="Loading..."
                        />
                      ) : (
                        <div className="col-8">
                          <h2>
                            {
                              AllPublications.filter(pub => pub.CurrentState.stateName === 'Destacada').length
                            }
                          </h2>
                          <p>Destacados</p>
                        </div>
                      )}
                      <div className="col-4">
                        <div className="container-icon">
                          <img src="/assets/images/icon-star-white.svg" alt="" />
                        </div>
                      </div>
                    </a>
                  </div>

                </Col>
              </Row>
            </Col>
          </Row>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>Felicitaciones</ModalHeader>
            <ModalBody>
              El pedido para destacar su publicación ha sido enviado. A la
              brevedad nos comunicaremos con usted.
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => this.toggle()}>
                OK
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

const options = () => ({
  variables: {
    MAHtoken: getUserToken(),
    state: 'Activas',
  },
});

const withUnreadMessagesData = graphql(CountUnreadMessagesQuery, {
  name: 'unreadMessages',
  options,
});
const withActivePublicationsCount = graphql(CountActivePublications, {
  name: 'activePub',
  options,
});
const withData = compose(withUnreadMessagesData, withActivePublicationsCount);

export default withData(UserAdmin);
