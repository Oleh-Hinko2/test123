import {combineReducers} from 'redux';

import emp from './Emp';
import user from './Login';

const rootReducer = combineReducers({
  emp,
  user
});


export default rootReducer;
