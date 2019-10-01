import { all, takeEvery, put, fork, takeLatest , call} from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { clearToken } from '../../helpers/utility';
import actions from './actions';
import { ENDPOINT, POST } from '../../helpers/api';

export function* loginRequest() {
  yield takeEvery(actions.LOGIN_REQUEST, function* (payload) {
    const { username, password } = payload.data;
    try {
      const res = yield call(loginWithUsernamePassword, {
        username: username,
        password: password
      })
      if (res.status === 200) {
        yield put({
          type: actions.LOGIN_SUCCESS,
          token: res.data.token,
        });
      } else {
        yield put({ type: actions.LOGIN_ERROR, data: res });
      }
    } catch (error) {
      yield put({ type: actions.LOGIN_ERROR, data : error });
    }
  });
}

async function loginWithUsernamePassword(obj) {
  return await POST(ENDPOINT.AUTH__LOGIN, obj, {}, {});
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function* (payload) {
    yield localStorage.setItem('jwt_token', payload.token);
    yield put(push('/dashboard'));
  });
}

export function* loginError() {
  yield takeLatest(actions.LOGIN_ERROR, function* (payload) {
    
   });
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function* () {
    clearToken();
    yield put(push('/'));
  });
}
export default function* rootSaga() {
  yield all([
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout)
  ]);
}
