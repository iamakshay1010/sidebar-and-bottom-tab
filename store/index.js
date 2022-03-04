import { combineReducers,createStore, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

//actions here
 export function onUserLogin({ email, password }) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/v1/users/login`, {
        email,
        password,
      });

      if (!response) {
        dispatch({
          type: 'ON_ERROR',
          payload: 'Login issue with API',
        });
      } else {
        dispatch({
          type: 'ON_LOGIN',
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: 'ON_ERROR',
        payload: error,
      });
    }
  };
}


//reducers here

const UserReducer = (state={} , action) => {
    switch (action.type) {
      case 'ON_LOGIN':
        return {
          ...state,
          user: action.payload,
        };
      case 'ON_ERROR':
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  

  //root reducers
 export const rootReducer = combineReducers({
    userReducer: UserReducer,
    //some more reducer will come
  });
  

//store
const store = createStore(rootReducer, applyMiddleware(thunk)); 
  