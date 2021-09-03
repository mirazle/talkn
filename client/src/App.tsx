import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Container from 'client/container/';

const Render = (dom, callback = () => {}) => {
  ReactDOM.render(
    <Provider store={dom.window.store}>
      <Container />
    </Provider>,
    document.querySelector('div#talkn'),
    callback
  );
};

export default Render;
