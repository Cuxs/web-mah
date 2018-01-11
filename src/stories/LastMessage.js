import React from 'react';
import { Input, FormGroup, Button } from 'reactstrap';

/* eslint react/jsx-filename-extension: 0 */

export default ({ message }) => (
  <div className="col-md-12" >
    <h4>ÚLTIMO MENSAJE</h4>
    <div className="d-flex flex-row">
      <h4>{message.author}</h4>
      <h6>{message.date}</h6>
    </div>
    <h5>{message.body}</h5>
    <h4>YO</h4>
    <FormGroup>
      <Input type="textarea" name="text" id="exampleText" />
    </FormGroup>
    <Button color="primary">Responder</Button>
  </div>
);

