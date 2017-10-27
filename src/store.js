import { combineReducers, createStore } from 'redux';
// import UserReducer from './ducks/user';
// import AccountReducer from './ducks/account';
// import promiseMiddleware from 'redux-promise-middleware';

// export default createStore(UserReducer, {}, applyMiddleware(promiseMiddleware()));
const userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_NAME': {
            state = { ...state, name: action.payload }
            break;
        }
        case 'CHANGE_AGE': {
            state = { ...state, age: action.payload }
            break;
        }
    }
    return state;
};


const accountReducer = (state =0, action) => {
    switch (action.type) {
        case 'WITHDRAWAL': {
            state-=action.payload
            break;
        }
        case 'DEPOSIT': {
            state+=action.payload
            break;
        }
    }
    return state;
};

const reducers = combineReducers({
    user: userReducer,
    account: accountReducer

})
export const store = createStore(reducers);


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

// const reducer = combineReducers(reducers);

// export default store = createStore(reducers, {}, applyMiddleware(promiseMiddleware()));