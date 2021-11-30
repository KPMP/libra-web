import { combineReducers } from 'redux';
import { resetStateReducer } from './resetStateReducer';
import { packages } from './components/PackageDashboard/packageReducer';
import { stateDisplayMap } from './components/PackageDashboard/stateDisplayMapReducer';
import { filenameValidation } from './components/Validation/filenameValidationReducer';
import actionNames from './actions/actionNames';
import loadedState from './initialState';

const appReducer = combineReducers({
	filenameValidation,
	resetStateReducer,
	stateDisplayMap,
	packages
});

const rootReducer = (state, action) => {
  if(action.type === actionNames.RESET_STATE) {
    state = loadedState;
  }
  return appReducer(state, action);
}

export default rootReducer;
