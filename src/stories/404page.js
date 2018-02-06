import React from 'react';
/* eslint react/jsx-filename-extension: 0 */


export default () => (
  <div className="wrapper row2">
    <div id="container" className="clear">
      <section id="fof" className="clear">
        <div className="positioned">
          <div className="hgroup">
            <h1>!</h1>
            <h2>404<br />
            Error
            </h2>
          </div>
          <p>La página requerida no se encuentra en el servidor</p>
          <p>Pero puedes volver a la <a href=" javascript:history.go(-1)">Página anterior </a> <strong>o</strong> visitar nuestra <a href="/">Home</a></p>
        </div>
      </section>
    </div>
  </div>
);
