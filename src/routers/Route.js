import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Router, Scene, Modal, Actions } from 'react-native-router-flux';

import Home from '../containers/Home';
import Room from '../containers/Room';

const isAndroid = Platform.OS === 'android'; // bool

export default class Route extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="home" initial component={Home} title="Ubicon" />
          <Scene key="room" component={Room} title="Room" />
        </Scene>
      </Router>
    );
  }
}
