import {all, fork} from 'redux-saga/effects';

import {watchEmps} from './Emp';
import {watchUserLogin} from './Login';

export default function* rootSaga() {
  yield all([
    fork(watchEmps),
    fork(watchUserLogin)
  ]);
}
