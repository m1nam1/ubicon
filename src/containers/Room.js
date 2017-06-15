import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Platform,
  View,
  StatusBar,
  Text,
  Alert,
  ToastAndroid
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { MKButton, MKColor } from 'react-native-material-kit';

import * as config from '../config';
import DeviceList from '../containers/DeviceList';

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

const AccentButton = MKButton.accentColoredButton()
  .withBackgroundColor(MKColor.LightGreen)
  .withStyle({
    width: 200,
    height: 70,
    borderRadius: 5,
    margin: 10
  })
  .build();

export default class Room extends Component {
  async _getToken() {
    console.info('_getToken()');
    try {
      return await AsyncStorage.getItem('AccessToken');
    } catch (err) {
      console.log('Error retrieving data:', err);
      if (isAndroid) ToastAndroid.show('access token を取得できませんでした', ToastAndroid.SHORT);
    }
  }

  /**
   * 指定された部屋のプリセット設定を適用
   * @param {string} room_name 指定する部屋名
   */
  _preset(room_name) {
    console.info(`_preset(room_name="${room_name}")`);
    Alert.alert(
      'Preset',
      'この部屋のプリセットを適用しますか？',
      [
        {text: 'Cancel', onPress: () => console.log('Canceled'), style: 'cancel'},
        {text: 'OK', onPress: () => {
          const presets = config.preset[room_name];
          this._getToken().then(access_token => {
            /* Air Conditioner */
            for (var device_name in presets.ac) {
              if (presets.ac.hasOwnProperty(device_name)) {
                const preset = presets.ac[device_name];
                console.log(`preset[${device_name}]:`, preset);
                const device_id = config.ucode.ac[room_name][device_name];
                preset['id'] = device_id; // add device_id into preset
                this._sendData('air_conditioners', preset, access_token);
              }
            }

            /* Light */
            for (var device_name in presets.light) {
              if (presets.light.hasOwnProperty(device_name)) {
                const preset = presets.light[device_name];
                console.log(`preset[${device_name}]:`, preset);
                const device_id = config.ucode.light[room_name][device_name];
                const is_power = preset.power === 1 ? true : false;
                this._powerSwitch('lights', device_id, is_power, access_token);
              }
            }
          });
        }},
      ]
    );
  }

  /**
   * 指定された部屋の全デバイスの電源を切る
   * @param {string} room_name 指定する部屋名
   */
  _allOff(room_name) {
    console.info(`_allOff(room_name="${room_name}")`);
    Alert.alert(
      'All OFF',
      'この部屋の全ての電気とエアコンの電源をオフにしますか？',
      [
        {text: 'Cancel', onPress: () => console.log('Canceled'), style: 'cancel'},
        {text: 'OK', onPress: () => {
          this._getToken().then(access_token => {
            const device_type_list = ['Air Conditioner', 'Light'];
            for (device_type of device_type_list) {
              switch (device_type) {
                case 'Air Conditioner':
                  const device_list = config.ucode.ac[room_name];
                  for (let key in device_list) {
                    if (device_list.hasOwnProperty(key)) {
                      const device_id = device_list[key];
                      this._powerSwitch('air_conditioners', device_id, false, access_token);
                    }
                  }
                  break;
                case 'Light':
                  const device_id = config.ucode.light[room_name][`LightRoom${room_name}`];
                  this._powerSwitch('lights', device_id, false, access_token);
                  break;
                default:
                  console.error('Undefined device type:', device_type);
              }
            }
            if (isAndroid) ToastAndroid.show('送信しました', ToastAndroid.SHORT);
          });
        }}
      ]
    );
  }

  /**
   * デバイスにデータを送信
   * @param {string} device_type 指定するデバイスの種類
   * @param {object} data 送信するデータ
   * @param {string} access_token アクセストークン
   */
  _sendData(device_type, data, access_token) {
    console.info('_sendData()');
    const url = `${config.server}/${device_type}/${data.id}/state`;
    console.log('url:', url);
    console.log('data:', data);
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-UIDC-Authorization-Token': access_token
      },
      body: JSON.stringify({ ...data })
    })
      .then(response => response.json())
      .then(json => {
        console.log('response', json);
        if (isAndroid) ToastAndroid.show('送信しました', ToastAndroid.SHORT);
      })
      .catch(err => console.error(err));
  }

  /**
   * 指定されたデバイスの電源を操作
   * @param {string} device_type 指定するデバイスの種類
   * @param {string} device_id 指定するデバイスのID
   * @param {bool} power true: on, false: off
   * @param {string} access_token アクセストークン
   */
  _powerSwitch(device_type, device_id, power, access_token) {
    console.info(`_powerSwitch(device_id="${device_id}", power=${power})`);
    const url = `${config.server}/${device_type}/${device_id}/state`;
    console.log('url:', url);
    const data = { id: device_id, power: power ? 1 : 0 };
    console.log('data:', data);
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-UIDC-Authorization-Token': access_token
      },
      body: JSON.stringify({ ...data })
    })
      .then(response => response.json())
      .then(json => console.log('response', json))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#FFA000" />
        <AccentButton onPress={() => this._preset(this.props.title)}>
          <Text style={styles.btn_txt}>Preset</Text>
        </AccentButton>
        <AccentButton onPress={() => this._allOff(this.props.title)}>
          <Text style={styles.btn_txt}>All OFF</Text>
        </AccentButton>
        <View style={{ marginBottom: 15 }}></View>
        <DeviceButton onPress={() => Actions.device_list({title: 'Air Conditioner', room: this.props.title})}>
          <Text style={styles.btn_txt}>Air Conditioner</Text>
        </DeviceButton>
        <DeviceButton onPress={() => Actions.device_list({title: 'Light', room: this.props.title})}>
          <Text style={styles.btn_txt}>Light</Text>
        </DeviceButton>
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
