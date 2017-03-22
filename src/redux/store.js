import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import * as moduleReducers from './reducers';

const configureStore = () => {
  const initialState  = {};
  const reducers = combineReducers({ ...moduleReducers });
  return createStore(
    reducers,
    initialState,
    applyMiddleware(thunk)
  );
};

export default configureStore;
