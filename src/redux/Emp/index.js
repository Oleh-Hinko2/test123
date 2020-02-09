import { takeEvery, put, call } from 'redux-saga/effects';
//import { fetchUsers, addNewUser, editUserById, fetchUser, removeUserById } from '../../http/admin/users';
import rsf from '../../firebaseConfig';

const EMP_LOAD_SUCCESS = 'EMP_LOAD_SUCCESS';
const EMPS_LOAD_SUCCESS = 'EMPS_LOAD_SUCCESS';
const EMPS_LOADING = 'EMPS_LOADING';
const EMPS_LOAD_FAILED = 'EMPS_LOAD_FAILED';
const EMP_GET = 'EMP_GET';
const EMPS_LOAD = 'EMPS_LOAD';
const EMP_EDIT = 'EMP_EDIT';
const EMP_ADD = 'EMP_ADD';
const EMP_REMOVE = 'EMP_REMOVE';
const EMP_SET_INITIAL = 'EMP_SET_INITIAL';

const initialState = {
  initialValues: {
    name: '',
    active: '',
    department: '',
  },
  data: [],
  loading: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case EMPS_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case EMP_SET_INITIAL: {
      return {
        ...state,
        loading: false,
        initialValues: initialState.initialValues
      };
    }
    case EMPS_LOAD_SUCCESS: {
      const {QCkKKzVecR0kIgdPAi1F} = action.data
      return {
        ...state,
        loading: false,
        data: [QCkKKzVecR0kIgdPAi1F]
      };
    }
    case EMP_LOAD_SUCCESS: {
      return {
        ...state,
        loading: false,
        initialValues: action.data
      };
    }
    case EMPS_LOAD_FAILED: {
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
export const getAllEmps = () => ({ type: EMPS_LOAD })
export const getEmp = id => ({ type: EMP_GET, id })
export const editEmp = ({ id, data }) => ({ type: EMP_EDIT, data: { id, data } })
export const addEmp = payload => ({ type: EMP_ADD, id: Math.random(1000), name: payload.name, active: payload.active, department: payload.department })
export const setInitialEmp = payload => ({ type: EMP_SET_INITIAL, data: payload })
export const removeEmp = id => ({ type: EMP_REMOVE, id })

// <<<WORKERS>>>

function* getCollection() {
  yield put({ type: EMPS_LOADING })
  const snapshot = yield call(rsf.firestore.getCollection, 'users');
  let users;
  snapshot.forEach(user => {
      users = {
        ...users,
        [user.id]: user.data()
      }
  });
  yield put({ type: EMPS_LOAD_SUCCESS, data: users })
  console.log(users)
};


function* getDocument(id) {
  const snapshot = yield call(rsf.firestore.getDocument, `users/${id}`);
  console.log(snapshot)
  const user = snapshot.data();
  console.log(user)
  //yield put(gotUser(user));
}


function* addDocument({id, name, active, department}) {
  console.log(id)
  const doc = yield call(
    rsf.firestore.addDocument,
    'users',
    {
      id,
      name,
      active,
      department,
    }
  );
}


function* deleteDocument(id) {
  yield call(rsf.firestore.deleteDocument, `users/${id}`);
}

function* setDocument() {
  yield call(
    rsf.firestore.setDocument,
    'users/1',
    { firstName: 'Leonardo' }
  );
}


// function* getEmpData({ id }) {
//   try {
//     yield put({ type: EMPS_LOADING })
//     const response = yield call(fetchUser, id);
//     if (response.status === 200) {
//       yield put({ type: EMP_LOAD_SUCCESS, data: response.data })
//     }
//     if (response.status >= 400) {
//       yield put({ type: EMPS_LOAD_FAILED })
//     }
//   } catch (error) {
//     console.log(error)
//   }
// };

// function* addData(payload) {
//   try {
//     yield put({ type: EMPS_LOADING })

//     const response = yield call(addNewUser, payload.data);
//     if (response.status === 200) {
//       yield put({ type: EMPS_LOAD })
//       yield put({ type: setInitialEmp })
//     }
//     if (response.status >= 400) {
//       yield put({ type: EMPS_LOAD_FAILED })
//     }
//   } catch (error) {
//     console.log(error)
//   }
// };

// function* editData({ data: { id, data } }) {
//   try {
//     yield put({ type: EMPS_LOADING })
//     const response = yield call(editUserById, id, data);
//     if (response.status === 200) {
//       yield put({ type: EMPS_LOAD })
//     }
//     if (response.status >= 400) {
//       yield put({ type: EMPS_LOAD_FAILED })
//     }
//   } catch (error) {
//     console.log(error)
//   }
// };
// function* removeData({ id }) {
//   try {
//     yield put({ type: EMPS_LOADING })
//     const response = yield call(removeUserById, id);
//     if (response.status === 200) {
//       yield put({ type: EMPS_LOAD })
//     }
//     if (response.status >= 400) {
//       yield put({ type: EMPS_LOAD_FAILED }
//         )
//     }

//   } catch (error) {
//     console.log(error)
//   }
// };

// <<<WATCHERS>>>
export function* watchEmps() {
   yield takeEvery(EMPS_LOAD, getCollection);
   yield takeEvery(EMP_GET, getDocument);
   yield takeEvery(EMP_ADD, addDocument);
   yield takeEvery(EMP_EDIT, setDocument);
   yield takeEvery(EMP_REMOVE, deleteDocument);
}
