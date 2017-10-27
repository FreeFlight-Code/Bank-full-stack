import { combineReducers, createStore, applyMiddleware } from 'redux';
import { userReducer } from './ducks/user';
import { accountReducer } from './ducks/account';
import promiseMiddleware from 'redux-promise-middleware';

const reducers = combineReducers({
    user: userReducer,
    account: accountReducer

})

const logger = (store) => (next) => (action) => {
console.log('action fired', action)
next(action)
}

const initialState = {
    user: {},
    account: 0
}

export const store = createStore(reducers, initialState, applyMiddleware(logger, promiseMiddleware()));

store.subscribe(() => {
    console.log('store changed', store.getState())
})

store.dispatch({ type: 'CHANGE_NAME', payload: 'David' })
store.dispatch({ type: 'CHANGE_NAME', payload: 'Will' })
store.dispatch({ type: 'CHANGE_NAME', payload: 'Scarlett' })
store.dispatch({ type: 'CHANGE_AGE', payload: 40 })
store.dispatch({ type: 'DEPOSIT', payload: 1000 })
store.dispatch({ type: 'WITHDRAWAL', payload: 40 })
store.dispatch({ type: 'WITHDRAWAL', payload: 10 })
