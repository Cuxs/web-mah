import React from 'react';
import { Button } from 'reactstrap';
import moment from 'moment';
import _ from 'lodash';
import { thousands } from '../Modules/functions';
/* eslint react/jsx-filename-extension: 0 */

const CardMessagge = ({
  admin, data, data: { Publication }, data: { Publication: { ImageGroup }, messages },
}) => {
  let unreadMessages = false;
  messages.map((msg) => {
    if (!msg.read) {
      unreadMessages = true;
    }
  });
  return (
    <div className="list-message">
      <div className="row">
        <div className="col-3">
          <img className="loading-gif" src={`${process.env.REACT_APP_API}/images/${ImageGroup.image1}`} style={{ width: '100%' }}alt="banner" />
        </div>
        <div className="col-9">
          <div className="row align-items-center">
            <div className="col-9">
              <p className="context-item" >{moment(_.last(messages).createdAt).format('DD/MM/YYYY hh:mm')}</p>

              <h4><b>{Publication.brand} {Publication.modelName}</b></h4>
              <p> {Publication.year} - {thousands(Publication.kms, 0, ',', '.')}km</p>
              <small>$ {thousands(Publication.price, 2, ',', '.')}</small>
              <p>Ultimo mensaje: {_.truncate((_.last(messages).content), { length: 40 })}</p>
            </div>
            <div className="col-3 text-center">
              <a href={`/inbox?ct_id=${data.id}`}className="btn btn-link-primary">
                <img src={unreadMessages ? '/assets/images/icon-envelop-red.svg' : '/assets/images/icon-envelop2-red.svg'} alt="" />
                {admin ? 'Ver' : 'Responder'}
              </a>
            </div>
          </div>
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
