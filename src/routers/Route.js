import React, { Component } from 'react';
import { Platform, Text } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const RouterWithRedux = connect()(Router);
import rootReducer from '../reducers';
import Home from '../containers/Home';
import Room from '../containers/Room';
import DeviceList from '../containers/DeviceList';

/* create store */
const loggerMiddleware = createLogger();
const middleware = [thunkMiddleware, loggerMiddleware];
const store = compose(
  applyMiddleware(...middleware)
)(createStore)(rootReducer);

const isAndroid = Platform.OS === 'android'; // bool

const TabIcon = (props) => (
  <Text style={{color: props.selected ? "red" :"black"}}>{props.title}</Text>
);

export default class Route extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root">
            <Scene key="tabbar" tabs={true}>
              <Scene key="a304" component={Room} title="A304" icon={TabIcon} initial />
              <Scene key="a305" component={Room} title="A305" icon={TabIcon} />
            </Scene>
            <Scene key="device_list" component={DeviceList} title="Device List" />
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}
