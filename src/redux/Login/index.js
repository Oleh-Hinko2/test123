import { takeEvery, put, call } from 'redux-saga/effects';
import {notification } from 'antd';
import rsf from '../../firebaseConfig';

const USER_LOADING = "USER_LOADING";
const CREATE_USER = "CREATE_USER";
const USER_SIGN_IN = "USER_SIGN_IN";
const GET_USER_DATA = "GET_USER_DATA";
const USER_LOAD_SUCCESS = "USER_LOAD_SUCCESS"
const USER_LOAD_FAILED = 'USER_LOAD_FAILED';
const SAVE_USER = 'SAVE_USER';
const CLEAR_USER_DATA = "CLEAR_USER_DATA"
const EMP_INITIAL_DATA = "EMP_INITIAL_DATA"

const initialState = {
  isAuth: false,
  email: '',
  uid: '',
  loading: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case USER_LOAD_SUCCESS: {
      return {
        ...state,
        loading: false,
        isAuth: true
      };
    }
    case EMP_INITIAL_DATA: {
      return {
        ...state,
        loading: false,
        initialValues: initialState.initialValues
      };
    }
    case SAVE_USER: {
      return {
        ...state,
        email: action.email,
        uid: action.uid
      };
    }
    case USER_LOAD_FAILED: {
      return {
        ...state,
        loading: false,
        email: '',
        uid: '',
        isAuth: false
      };
    }
    case CLEAR_USER_DATA: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
}


// <<<ACTIONS>>>
export const createUser = ({email, password}, callback) => ({ type: CREATE_USER, email, password, callback})
export const userSignIn = ({email, password}, callback) => ({ type: USER_SIGN_IN, email, password, callback })
export const getUserData = () => ({ type: GET_USER_DATA})
export const clearUserData = () => ({ type: CLEAR_USER_DATA})
export const setInitialData = payload => ({ type: EMP_INITIAL_DATA, data: payload })

function* createUserSaga({email, password, callback}) {
  try {
    yield put({ type: USER_LOADING })
    yield call(rsf.auth.createUserWithEmailAndPassword, email, password);
    yield put({ type: USER_LOAD_SUCCESS })
    yield put({ type: GET_USER_DATA })
    callback("/")
  }
  catch(error) {
    yield put({ type: USER_LOAD_FAILED })
    notification.error({
      message: 'Error',
      description: error.message
    });
  }
}

function* loginSaga({email, password, callback}) {
  try {
    yield put({ type: USER_LOADING })
    yield call(rsf.auth.signInWithEmailAndPassword, email, password);
    yield put({ type: USER_LOAD_SUCCESS })
    yield put({ type: GET_USER_DATA })
    callback("/")
  }
  catch(error) {
    yield put({ type: USER_LOAD_FAILED })
    notification.error({
      message: 'Error',
      description: error.message
    });
  }
}

function* signOutSaga() {
  try {
    yield call(rsf.auth.signOut);
    yield put({ type: USER_LOAD_FAILED })
  }
  catch(error) {
    notification.error({
      message: 'Error',
      description: error.message
    });
  }
}

export function* watchUserLogin() {
  yield takeEvery(CREATE_USER, createUserSaga);
  yield takeEvery(USER_SIGN_IN, loginSaga);
  yield takeEvery(CLEAR_USER_DATA, signOutSaga)
}