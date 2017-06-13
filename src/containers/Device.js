import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  View,
  Text,
  Switch,
  Picker
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { MKButton, MKColor } from 'react-native-material-kit';

import * as config from '../config';

const isAndroid = Platform.OS === 'android'; // bool

const SendButton = MKButton.accentColoredButton()
  .withBackgroundColor(MKColor.LightGreen)
  .withStyle({
    width: 200,
    height: 50,
    borderRadius: 5,
    margin: 10
  })
  .build();

class AirConditioner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ac: {
        power: true,
        set_temp: 25,
        fan_speed: 1,
        fan_direction: 7
      },
      light: {
        power: true
      }
    };
  }

  _sendData(data) {
    const url = `${config.server}/air_conditioners/${data.id}/state`;
    console.log('url:', url);
    console.log('data', data);
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
    	  'Content-Type': 'application/json',
        'X-UIDC-Authorization-Token': config.access_token
      },
      body: JSON.stringify({ ...data })
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
      })
      .catch(err => console.error(err));
  }

  render() {
    console.log(this.state.ac);
    return (
      <View>
        <Text>Power</Text>
        <Switch
          onValueChange={power => this.setState({ ac: {
            power,
            set_temp: this.state.ac.set_temp,
            fan_speed: this.state.ac.fan_speed,
            fan_direction: this.state.ac.fan_direction
          }})}
          value={this.state.ac.power}
        />

        <Text>Temp</Text>
        <Picker
          selectedValue={this.state.ac.set_temp}
          onValueChange={set_temp => this.setState({ ac: {
            power: this.state.ac.power,
            set_temp,
            fan_speed: this.state.ac.fan_speed,
            fan_direction: this.state.ac.fan_direction
          }})}
        >
          <Picker.Item label="20" value={20} />
          <Picker.Item label="21" value={21} />
          <Picker.Item label="22" value={22} />
          <Picker.Item label="23" value={23} />
          <Picker.Item label="24" value={24} />
          <Picker.Item label="25" value={25} />
          <Picker.Item label="26" value={26} />
          <Picker.Item label="27" value={27} />
          <Picker.Item label="28" value={28} />
        </Picker>

        <Text>Fan Speed</Text>
        <Picker
          selectedValue={this.state.ac.fan_speed}
          onValueChange={fan_speed => this.setState({ ac: {
            power: this.state.ac.power,
            set_temp: this.state.ac.set_temp,
            fan_speed,
            fan_direction: this.state.ac.fan_direction
          }})}
        >
          <Picker.Item label="Low" value={0} />
          <Picker.Item label="Middle" value={1} />
          <Picker.Item label="High" value={2} />
        </Picker>

        <Text>Fan Direction</Text>
        <Picker
          selectedValue={this.state.ac.fan_direction}
          onValueChange={fan_direction => this.setState({ ac: {
            power: this.state.ac.power,
            set_temp: this.state.ac.set_temp,
            fan_speed: this.state.ac.fan_speed,
            fan_direction
          }})}
        >
          <Picker.Item label="Position-0" value={0} />
          <Picker.Item label="Position-1" value={1} />
          <Picker.Item label="Position-2" value={2} />
          <Picker.Item label="Position-3" value={3} />
          <Picker.Item label="Position-4" value={4} />
          <Picker.Item label="Swing" value={7} />
        </Picker>

        <SendButton onPress={() => {
          const data = {
            id: config.ucode.ac[this.props.room][this.props.deviceName],
            power: this.state.ac.power ? 1 : 0,
            set_temp: this.state.ac.set_temp,
            fan_speed: this.state.ac.fan_speed,
            fan_direction: this.state.ac.fan_direction
          };
          this._sendData(data);
        }}>
          <Text style={styles.btn_txt}>Send</Text>
        </SendButton>
      </View>
    );
  }
}

class Light extends Component {
  render() {
    return (
      <View>
        <Text>Power</Text>

        <SendButton onPress={() => {console.log('Send')}}>
          <Text style={styles.btn_txt}>Send</Text>
        </SendButton>
      </View>
    );
  }
}

function Content(props) {
  switch (props.deviceType) {
    case 'Air Conditioner':
      return <AirConditioner deviceName={props.deviceName} room={props.room} />
    case 'Light':
      return <Light deviceName={props.deviceName} room={props.room} />
    default:
      console.error('Undefined device type:', props.deviceType);
  }
}

export default class Device extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Content deviceName={this.props.title} deviceType={this.props.deviceType} room={this.props.room} />
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
