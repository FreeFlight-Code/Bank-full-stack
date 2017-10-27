import { combineReducers, createStore, applyMiddleware } from 'redux';
import UserReducer from './ducks/user';
import AccountReducer from './ducks/account';
import promiseMiddleware from 'redux-promise-middleware';

export default createStore(UserReducer, {}, applyMiddleware(promiseMiddleware()));


// const reducers= {
//     user: UserReducer,
//     account: AccountReducer

// }
// const reducer = combineReducers(reducers);

// export default createStore(reducer, {}, applyMiddleware(promiseMiddleware()));