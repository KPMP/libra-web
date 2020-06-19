import 'babel-polyfill';
import React, { Component } from 'react';
import NavBar from './components/Nav/NavBar';
import NavFooter from './components/Nav/NavFooter';
import loadedState from './initialState';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';
import { Route, Switch, Router } from 'react-router-dom';
import ErrorBoundaryContainer from './components/Error/ErrorBoundaryContainer';
import Oops from './components/Error/Oops';
import PackageDashboardPageContainer from './components/PackageDashboard/PackageDashboardPageContainer';
import FilenameValidationPageContainer from './components/Validation/FilenameValidationPageContainer';
import PermissionDenied from './components/Error/PermissionDenied';
import NotRegistered from './components/Error/NotRegistered';

const cacheStore = window.sessionStorage.getItem('redux-store');
const initialState = cacheStore ? JSON.parse(cacheStore) : loadedState;
const store = applyMiddleware(thunk)(createStore)(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const saveState = () => {
  window.sessionStorage.setItem(
    'redux-store',
    JSON.stringify(store.getState())
  );
};

const GA_TRACKING_ID = 'UA-124331187-8';

if(process.env.NODE_ENV === 'production') {
  ReactGA.initialize(GA_TRACKING_ID);
}

function logPageView(location, action) {
  ReactGA.set({ page: location.pathname + location.search });
  ReactGA.pageview(location.pathname + location.search);
}
const history = createBrowserHistory();
history.listen((location, action) => {
  logPageView(location, action);
});

store.subscribe(function() {
  console.log(store.getState());
});

store.subscribe(saveState);

class App extends Component {
  componentWillMount() {
    logPageView(window.location, '');
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <ErrorBoundaryContainer>
            <NavBar />
            <Switch>
            	<Route exact path='/' component={PackageDashboardPageContainer} store={store} />
            	<Route exact path='/filenameValidation' component={FilenameValidationPageContainer} store={store}/>
            	<Route exact path='/oops' component={Oops} />
            	<Route exact path='/permissionDenied' component={PermissionDenied} />
            	<Route exact path='/notRegistered' component={NotRegistered} />
            </Switch>
            <NavFooter />
          </ErrorBoundaryContainer>
        </Router>
      </Provider>
    );
  }
}

export default App;
