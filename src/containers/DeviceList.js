import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  View,
  Button,
  Text,
  Picker
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modalbox';

import * as config from '../config';

const isAndroid = Platform.OS === 'android'; // bool

class AirConditioner extends Component {
  render() {
    return (
      <View>
        {this.props.room == 'A304' ? (
          <View>
            <Button title="AC-RoomA304-1" onPress={() => console.log('AC-RoomA304-1')} />
            <Button title="AC-RoomA304-2" onPress={() => console.log('AC-RoomA304-2')} />
            <Button title="H-RoomA304" onPress={() => console.log('H-RoomA304')} />
          </View>
        ) : (
          <View>
            <Button title="AC-RoomA305-1" onPress={() => console.log('AC-RoomA305-1')} />
            <Button title="AC-RoomA305-2" onPress={() => console.log('AC-RoomA305-2')} />
            <Button title="H-RoomA305" onPress={() => console.log('H-RoomA305')} />
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
          <View>
            <Button title="LightRoomA304" onPress={() => console.log('LightRoomA304')} />
            <Button title="LightRoomA304-1" onPress={() => console.log('LightRoomA304-1')} />
            <Button title="LightRoomA304-2" onPress={() => console.log('LightRoomA304-2')} />
            <Button title="LightRoomA304-3" onPress={() => console.log('LightRoomA304-3')} />
            <Button title="LightRoomA304-4" onPress={() => console.log('LightRoomA304-4')} />
          </View>
        ) : (
          <View>
            <Button title="LightRoomA305" onPress={() => console.log('LightRoomA305')} />
            <Button title="LightRoomA305-1" onPress={() => console.log('LightRoomA305-1')} />
            <Button title="LightRoomA305-2" onPress={() => console.log('LightRoomA305-2')} />
            <Button title="LightRoomA305-3" onPress={() => console.log('LightRoomA305-3')} />
            <Button title="LightRoomA305-4" onPress={() => console.log('LightRoomA305-4')} />
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
    backgroundColor: '#F5FCFF',
    marginTop: (isAndroid ? 54 : 64)
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 2,
    height: 300,
    width: 300,
    padding: 10
  }
});
