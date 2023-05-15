import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import FontFaceObserver from 'fontfaceobserver';
import history from 'utils/history';
import 'sanitize.css/sanitize.css';

import App from 'containers/App';

import './main.css/apex-charts.css'
import './main.css/core.css'
import './main.css/theme-default.css'
import './main.css/demo.css'
import './main.css/datatables.bootstrap5.css'
import './main.css/datatables.checkboxes.css'
import './main.css/responsive.bootstrap5.css'
import './main.css/node-waves.css'
import './main.css/perfect-scrollbar.css'
import './main.css/swiper.css'
import './main.css/typeahead.css'
import './main.css/cards-advance.css'

import './main.css/tabler-icons.css'
import './main.css/fontawesome.css'

import 'file-loader?name=.htaccess!./.htaccess'; 

import configureStore from './configureStore';

import { translationMessages } from './i18n';

const openSansObserver = new FontFaceObserver('Open Sans', {});

openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      {/* <LanguageProvider messages={messages}> */}
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      {/* </LanguageProvider> */}
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() =>
      Promise.all([
        import('intl/locale-data/jsonp/en.js'),
        import('intl/locale-data/jsonp/de.js'),
      ]),
    ) 
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); 
}
