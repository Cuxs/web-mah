import React from 'react';
import Anime from 'react-anime';
/* eslint react/jsx-filename-extension: 0 */

const LoadingComponent = () => (
  <div>
    <Anime
      easing="easeOutElastic"
      duration={1600}
      direction="alternate"
      loop
      scale={[1.25, 0.9]}
    >
      <div style={{ height: '100vh' }} className="d-flex justify-content-center align-items-center">
        <img src="/logo.png" alt="Cargando..." />
      </div>
    </Anime>
  </div>

);
export default LoadingComponent;
