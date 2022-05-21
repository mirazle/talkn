import React from 'react';
import ReactDOM from 'react-dom';

import Container from 'cover/container';

const Render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Container />
    </React.StrictMode>,
    document.querySelector('div#talkn')
  );
};

export default Render;
