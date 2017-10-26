// import axios from 'axios';

// Set up initial state
const initialState = {
    account: 0
};

// action types
const GET_ACCOUNT_INFO = 'GET_ACCOUNT_INFO';

// action creators
export function getAccountInfo() {
    //axios call t0 get account balance
    // const userInfo = axios.get('/auth/me').then( res => {
    //     return res.data
    // })
    const accountInfo = '$' + 100;
    console.log(accountInfo)
    return {
        type: GET_ACCOUNT_INFO,
        payload: accountInfo
    }
}

// reducer function
export default function AccountReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ACCOUNT_INFO + '_FULFILLED':
            return Object.assign({}, state, { account: action.payload });
        // case ACCOUNT_DEPOSIT:
        //     return Object.assign({}, state, { account: action.payload });
        // case ACCOUNT_WITHDRAWAL:
        //     return Object.assign({}, state, { account: action.payload });
        default:
            return state;
    }

}
