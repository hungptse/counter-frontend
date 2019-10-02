import { validateToken } from '../../helpers/utility';
import actions from './actions';


const initState = {
  isLoggedIn: validateToken(),
  response : {}
}



export default function authReducer(
  state = initState,
  action
) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return {...state, isLoggedIn : true}
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
