import { getToken } from '../../helpers/utility';
import actions from './actions';

// const initState = new Map({
//   idToken: 'secret token',
//   response : {}
// });
const initState = {
  idToken: 'secret token',
  response : {}
}

export default function authReducer(
  state = initState,
  action
) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return {...state, idToken : getToken()}
      // return state.set('idToken', action.token);
    case actions.LOGIN_ERROR : 
      return {...state, response : action.data}
      // return state.set('response', action.data);
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
