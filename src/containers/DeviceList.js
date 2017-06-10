import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  View,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { MKButton, MKColor } from 'react-native-material-kit';

import * as config from '../config';

const isAndroid = Platform.OS === 'android'; // bool

const DeviceButton = MKButton.coloredButton()
  .withBackgroundColor(MKColor.Amber)
  .withStyle({
    width: 200,
    height: 70,
    borderRadius: 5,
    margin: 10
  })
  .build();

class AirConditioner extends Component {
  render() {
    return (
      <View>
        {this.props.room == 'A304' ? (
          <View style={styles.content}>
            <DeviceButton onPress={() => Actions.device({title: 'AC-RoomA304-1'})}>
              <Text style={styles.btn_txt}>AC-RoomA304-1</Text>
            </DeviceButton>
            <DeviceButton onPress={() => Actions.device({title: 'AC-RoomA304-2'})}>
              <Text style={styles.btn_txt}>AC-RoomA304-2</Text>
            </DeviceButton>
            <DeviceButton onPress={() => Actions.device({title: 'H-RoomA304'})}>
              <Text style={styles.btn_txt}>H-RoomA304</Text>
            </DeviceButton>
          </View>
        ) : (
          <View style={styles.content}>
            <DeviceButton onPress={() => Actions.device({title: 'AC-RoomA305-1'})}>
              <Text style={styles.btn_txt}>AC-RoomA305-1</Text>
            </DeviceButton>
            <DeviceButton onPress={() => Actions.device({title: 'AC-RoomA305-2'})}>
              <Text style={styles.btn_txt}>AC-RoomA305-2</Text>
            </DeviceButton>
            <DeviceButton onPress={() => Actions.device({title: 'H-RoomA305'})}>
              <Text style={styles.btn_txt}>H-RoomA305</Text>
            </DeviceButton>
          </View>
        )}
      </View>
    );
  }
}

class Light extends Component {
  render() {
    return (
      <View>
        {this.props.room == 'A304' ? (
          <View style={styles.content}>
            <DeviceButton onPress={() => Actions.device({title: 'LightRoomA304'})}>
              <Text style={styles.btn_txt}>LightRoomA304</Text>
            </DeviceButton>
            <DeviceButton onPress={() => Actions.device({title: 'LightRoomA304-1'})}>
              <Text style={styles.btn_txt}>LightRoomA304-1</Text>
            </DeviceButton>
            <DeviceButton onPress={() => Actions.device({title: 'LightRoomA304-2'})}>
              <Text style={styles.btn_txt}>LightRoomA304-2</Text>
            </DeviceButton>
            <DeviceButton onPress={() => Actions.device({title: 'LightRoomA304-3'})}>
              <Text style={styles.btn_txt}>LightRoomA304-3</Text>
            </DeviceButton>
            <DeviceButton onPress={() => Actions.device({title: 'LightRoomA304-4'})}>
              <Text style={styles.btn_txt}>LightRoomA304-4</Text>
            </DeviceButton>
          </View>
        ) : (
          <View style={styles.content}>
            <DeviceButton onPress={() => Actions.device({title: 'LightRoomA305'})}>
              <Text style={styles.btn_txt}>LightRoomA305</Text>
            </DeviceButton>
            <DeviceButton onPress={() => Actions.device({title: 'LightRoomA305-1'})}>
              <Text style={styles.btn_txt}>LightRoomA305-1</Text>
            </DeviceButton>
            <DeviceButton onPress={() => Actions.device({title: 'LightRoomA305-2'})}>
              <Text style={styles.btn_txt}>LightRoomA305-2</Text>
            </DeviceButton>
            <DeviceButton onPress={() => Actions.device({title: 'LightRoomA305-3'})}>
              <Text style={styles.btn_txt}>LightRoomA305-3</Text>
            </DeviceButton>
            <DeviceButton onPress={() => Actions.device({title: 'LightRoomA305-4'})}>
              <Text style={styles.btn_txt}>LightRoomA305-4</Text>
            </DeviceButton>
          </View>
        )}
      </View>
    );
  }
}

function SelectedDeviceType(props) {
  switch (props.deviceType) {
    case 'Air Conditioner':
      return <AirConditioner room={props.room} />;
    case 'Light':
      return <Light room={props.room} />;
    default:
      console.error('Undefined device type:', props.deviceType);
  }
}

export default class DeviceList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SelectedDeviceType deviceType={this.props.title} room={this.props.room} />
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
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_txt: {
    fontWeight: 'bold'
  }
});
