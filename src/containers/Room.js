import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  View,
  StatusBar,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { MKButton, MKColor } from 'react-native-material-kit';

import * as config from '../config';
import DeviceList from '../containers/DeviceList';

const isAndroid = Platform.OS === 'android'; // bool

const MainButton = MKButton.coloredButton()
  .withBackgroundColor(MKColor.Amber)
  .withStyle({
    width: 200,
    height: 70,
    borderRadius: 5,
    margin: 10
  })
  .build();

export default class Room extends Component {
  _getRoomDevices() {
    const ucode = this.props.title == 'A304'
      ? config.ucode.room.A304
      : config.ucode.room.A305;
    const url = `${config.server}/rooms/${ucode}/attribute/`;
    console.log(url);
    return fetch(url, {
        method: 'GET',
        headers: { 'X-UIDC-Authorization-Token': config.access_token }
    })
      .then(response => {
          if (!response.ok) throw Error(response.statusText);
          return response.json();
      })
      .then(json => console.log(json))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#FFA000" />
        <MainButton onPress={() => console.log('PRESET')}>
          <Text style={styles.btn_txt}>PRESET</Text>
        </MainButton>
        <MainButton onPress={() => console.log('All OFF')}>
          <Text style={styles.btn_txt}>ALL OFF</Text>
        </MainButton>
        <MainButton onPress={() => this._getRoomDevices()}>
          <Text style={styles.btn_txt}>Fetch Device List</Text>
        </MainButton>
        <MainButton onPress={() => Actions.device_list({title: 'Air Conditioner', room: this.props.title})}>
          <Text style={styles.btn_txt}>Air Conditioner</Text>
        </MainButton>
        <MainButton onPress={() => Actions.device_list({title: 'Light', room: this.props.title})}>
          <Text style={styles.btn_txt}>Light</Text>
        </MainButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFECB3',
    marginTop: (isAndroid ? 54 : 64)
  },
  btn_txt: {
    fontWeight: 'bold'
  }
});
