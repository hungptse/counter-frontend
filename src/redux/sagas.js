import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import contactSagas from './contacts/saga';
import notesSagas from './notes/saga';
import todosSagas from './todos/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    contactSagas(),
    notesSagas(),
    todosSagas(),
  ]);
}
