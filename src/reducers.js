import { combineReducers } from 'redux';
import { resetStateReducer } from './resetStateReducer';
import { packages } from './components/PackageDashboard/packageReducer';

const appReducer = combineReducers({
  resetStateReducer,
  packages
});

export default appReducer;
