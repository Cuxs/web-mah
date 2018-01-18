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
import { CountUnreadMessagesQuery, CountActivePublications } from '../../ApolloQueries/AdminHomeQuery';
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
  componentWillRecieveProps(nextProps) {
    if (nextProps.location.pathName !== this.props.location.pathName) {
      this.getGraphData();
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
      history, location, unreadMessages, activePub,
    } = this.props;
    const { CountUnreadMessages } = unreadMessages;
    const { AllPublications } = activePub;
    return (
      <div>
        <AdminBar history={history} />
        <Row>
          <Col md="3">
            <UserSideBar history={history} location={location} />
          </Col>
          <Col md="9">
            <Row>
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
                <Button
                  onClick={() => history.push('/userInbox')}
                  className="d-flex flex-row"
                >
                  <div className="d-flex flex-column">
                    {!unreadMessages.loading && <h4>{CountUnreadMessages[0]}</h4>}
                    <h6>Nuevos Mensajes</h6>
                  </div>
                  <div className="container-icon">
                    <span className="fa fa-commenting" />
                  </div>
                </Button>
                <Button
                  onClick={() => history.push('/userPublications')}
                  className="d-flex flex-row"
                >
                  <div className="d-flex flex-column">
                    {!activePub.loading && <h4>{AllPublications.length}</h4>}
                    <h6>Publicaciones activas</h6>
                  </div>
                  <div className="container-icon">
                    <span className="fa fa-car" />
                  </div>
                </Button>
                <Button
                  onClick={() => history.push('/userPublications')}
                  className="d-flex flex-row"
                >
                  <div className="d-flex flex-column">
                    {!activePub.loading && <h4>{AllPublications.filter(pub => pub.CurrentState.stateName === 'Destacada').length}</h4>}
                    <h6>Destacados</h6>
                  </div>
                  <div className="container-icon">
                    <span className="fa fa-star-o" />
                  </div>
                </Button>
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

const withUnreadMessagesData = graphql(CountUnreadMessagesQuery, { name: 'unreadMessages', options });
const withActivePublicationsCount = graphql(CountActivePublications, { name: 'activePub', options });
const withData = compose(withUnreadMessagesData, withActivePublicationsCount);

export default withData(UserAdmin);
