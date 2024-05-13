import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk'; // if you're using thunk middleware for handling async actions
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
