import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const RouterWithRedux = connect()(Router);
import rootReducer from '../reducers';
import Home from '../containers/Home';
import Room from '../containers/Room';

// create store
const loggerMiddleware = createLogger();
const middleware = [thunkMiddleware, loggerMiddleware];
const store = compose(
  applyMiddleware(...middleware)
)(createStore)(rootReducer);

const isAndroid = Platform.OS === 'android'; // bool

export default class Route extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root">
            <Scene key="home" initial component={Home} title="Ubicon" />
            <Scene key="room" component={Room} title="Room" />
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}
