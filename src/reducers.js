import { combineReducers } from 'redux';
import { resetStateReducer } from './resetStateReducer';
import { packages } from './components/PackageDashboard/packageReducer';
import actionNames from './actions/actionNames';
import loadedState from './initialState';

const appReducer = combineReducers({
  resetStateReducer,
  packages
});

const rootReducer = (state, action) => {
  if(action.type === actionNames.RESET_STATE) {
    state = loadedState;
  }
  return appReducer(state, action);
}

export default rootReducer;
