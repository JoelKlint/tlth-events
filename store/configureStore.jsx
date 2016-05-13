import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers/RootReducer.jsx';

import Immutable from 'immutable';

const stateTransformer = (state) => {
	return Immutable.fromJS(state).toJS();
};

const logger = createLogger({ stateTransformer });

const createStoreWithMiddleware = applyMiddleware(thunk, apiMiddleware, logger)(createStore);

export default function configureStore(initialState) {
	return createStoreWithMiddleware(reducer, initialState);
};
