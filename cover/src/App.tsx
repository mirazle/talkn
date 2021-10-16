import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Container from 'cover/container';

const Render = (dom, callback = () => {}) => {
  ReactDOM.render(
    <Provider store={dom.window.store}>
      <Container api={dom.window.api} />
    </Provider>,
    document.querySelector('div#talkn'),
    callback
  );
};

export default Render;
