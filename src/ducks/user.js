// import axios from 'axios';

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        default:
            console.log('unknown input to userReducer')
            break;
        case 'GET_USER_INFO': {
            state = { ...state, profile: action.payload }
            break;
        }
        case 'CHANGE_NAME': {
            state = { ...state, user_name: action.payload }
            break;
        }
        case 'CHANGE_AGE': {
            state = { ...state, age: action.payload }
            break;
        }
    }
    return state;
};

// export function getUserInfo() {
//     const userInfo = axios.get('http://localhost:3005/auth/me').then( res => {
//         return res.data
//     })
//     return {
//         type: 'GET_USER_INFO',
//         payload: userInfo
//     }
// }





// import axios from 'axios';

// // Set up initial state
// const initialState = {
//     user: {}
// };

// // action types
// const GET_USER_INFO = 'GET_USER_INFO';

// // action creators

// // reducer function
// export default function UserReducer(state = initialState, action) {
//     switch (action.type) {
//         case GET_USER_INFO + '_FULFILLED':
//             return Object.assign({}, state, { user: action.payload });
//         default:
//             return state;
//     }

// }
