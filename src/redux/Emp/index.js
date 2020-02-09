import { takeEvery, put, call } from 'redux-saga/effects';
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
const SET_DATA = 'SET_DATA';
const SHOW_MODAL = 'SHOW_MODAL';
const HIDE_MODAL = 'HIDE_MODAL';
const CLEAR_DATA = "CLEAR_DATA"

const initialState = {
  initialValues: {
    name: '',
    active: '',
    department: '',
  },
  data: [],
  searchData: [],
  loading: false,
  modalVisible: false
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
      let data = action.data;
      let updateData = [];
      let propertyData = [];
      for (const property in data) {
        propertyData.push(property)
      }
      propertyData.forEach(item => {
        const newData = data[item]
        newData.dataID = item
        updateData.push(newData)
      })
      return {
        ...state,
        loading: false,
        data: updateData,
        searchData: []
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
    case SET_DATA: {
      return {
        ...state,
        searchData: action.data,
      };
    }
    case SHOW_MODAL: {
      return {
        ...state,
        modalVisible: true,
      };
    }
    case HIDE_MODAL: {
      return {
        ...state,
        modalVisible: false,
      };
    }
    default:
      return state;
  }
}

// <<<ACTIONS>>>
export const getAllEmps = () => ({ type: EMPS_LOAD })
export const getEmp = id => ({ type: EMP_GET, id })
export const editEmp = (payload, push) => ({ 
                        type: EMP_EDIT, 
                        dataID: payload.dataID, 
                        id: payload.id, 
                        name: payload.name, 
                        active: payload.active, 
                        department: payload.department,
                        push
                      })
export const addEmp = (payload, push) => ({ 
                        type: EMP_ADD, 
                        id: Math.floor(Math.random() * 1000), 
                        name: payload.name, 
                        active: payload.active, 
                        department: payload.department, 
                        push 
                      })
export const setInitialEmp = payload => ({ type: EMP_SET_INITIAL, data: payload })
export const removeEmp = id => ({ type: EMP_REMOVE, id })
export const setData = data => ({ type: SET_DATA, data})
export const clearData = data => ({ type: CLEAR_DATA, data})
export const showModal = () => ({ type: SHOW_MODAL})
export const hideModal = () => ({ type: HIDE_MODAL})

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
};

function* getDocument({id}) {
  try {
    const snapshot = yield call(rsf.firestore.getDocument, `users/${id}`);
    const user = snapshot.data();
    yield put({ type: EMP_LOAD_SUCCESS, data: user })
  } catch (error) {
    console.log(error)
  }
}

function* addDocument({id, name, active, department, push}) {
  try {
    yield put({ type: EMPS_LOADING })
    yield call(
      rsf.firestore.addDocument,
      'users',
      {
        id,
        name,
        active,
        department,
      }
    );
    yield put({ type: EMPS_LOAD })
    push('/')
  } catch (error) {
    console.log(error)
  }
}

function* deleteDocument({ id }) {
  try {
    yield call(rsf.firestore.deleteDocument, `users/${id}`);
    yield put({ type: EMPS_LOAD })
  } catch (error) {
    console.log(error)
  }
}

function* setDocument({dataID,  id, name, active, department, push}) {
  try {
    yield call(
      rsf.firestore.setDocument,
      `users/${dataID}`,
      {
        id,
        name,
        active,
        department,
      }
    );
    yield put({ type: EMPS_LOAD })
    push('/')
  } catch (error) {
    console.log(error)
  }
  
}

// <<<WATCHERS>>>
export function* watchEmps() {
   yield takeEvery(EMPS_LOAD, getCollection);
   yield takeEvery(EMP_GET, getDocument);
   yield takeEvery(EMP_ADD, addDocument);
   yield takeEvery(EMP_EDIT, setDocument);
   yield takeEvery(EMP_REMOVE, deleteDocument);
}
