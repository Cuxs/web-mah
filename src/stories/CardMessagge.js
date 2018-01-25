import React from 'react';
import { Button } from 'reactstrap';
import moment from 'moment';
import _ from 'lodash';
import { thousands } from '../Modules/functions';
/* eslint react/jsx-filename-extension: 0 */

const CardMessagge = ({ data, data: { Publication }, data: { Publication: { ImageGroup }, messages } }) => {
  let unreadMessages = false;
  messages.map((msg) => {
    if (!msg.read) {
      unreadMessages = true;
    }
  });
  return (
    <div className="d-flex flex-row card" >
      {unreadMessages && <p> UNREAD </p>}
      <img src={`${process.env.REACT_APP_API}/images/${ImageGroup.image1}`} style={{ width: '100px' }}alt="banner" />
      <div className="info-container">
        <div className="d-flex flex-row justify-content-between" >
          <div className="d-flex flex-column align-items-end" >
            <h6>{moment(_.last(messages).createdAt).format('DD/MM/YYYY hh:mm')}</h6>
            <h6><b>{Publication.brand} {Publication.modelName}</b> {Publication.year} - {thousands(Publication.kms, 0, ',', '.')}km</h6>
            <h4>$ {thousands(Publication.price, 2, ',', '.')}</h4>
            <h6>Ultimo mensaje: {_.truncate((_.last(messages).content), { length: 40 })}</h6>
          </div>
          <Button type="secondary" href={`/inbox?ct_id=${data.id}`} >Responder</Button>
        </div>
      </div>
      <style jsx>{
      `
      .card {
        margin-bottom: 30px;
        padding: 15px;
        background-color: lightgray;
      }
      .info-container {
        display: flex;
        flex-direction: column;
        flex: 1;
      }
      .underline {
        width: 100%;
        height: 2px;
        background-color: lightgray;
        margin-top: 20px;
        margin-bottom: 20px;
      }
      `
    }
      </style>
    </div>
  );
};

export default CardMessagge;
