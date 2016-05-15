import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers/index.js';

import Immutable from 'immutable';

const stateTransformer = (state) => {
	return Immutable.fromJS(state).toJS();
};

const logger = createLogger({ stateTransformer });

const createStoreWithMiddleware = applyMiddleware(thunk, apiMiddleware, logger)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(reducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
