import { all, takeEvery, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { clearToken } from '../../helpers/utility';
import actions from './actions';
import { ENDPOINT, POST } from '../../helpers/api';

export function* loginRequest() {
  yield takeEvery(actions.LOGIN_REQUEST, function* (payload) {
    const { username, password } = payload.data;
    if (username === '' || password === '') {
      yield put({ type: actions.LOGIN_ERROR });
    } else {
      try {
        const res = yield POST(ENDPOINT.AUTH__LOGIN, {
          username: username,
          password: password
        }, {}, {});
        if (res.status === 200) {
          yield put({
            type: actions.LOGIN_SUCCESS,
            token: res.data.token,
          });
        } else {
          yield put({ type: actions.LOGIN_ERROR });
        }
      } catch (error) {
        yield put({ type: actions.LOGIN_ERROR });
      }
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function* (payload) {
    yield localStorage.setItem('jwt_token', payload.token);
    yield put(push('/dashboard'));
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function* () { });
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
