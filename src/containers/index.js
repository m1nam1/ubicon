import React, { Component } from 'react';
import { AsyncStorage, Platform } from 'react-native';

import * as config from '../config';
import Route from '../routers/Route';

const isAndroid = Platform.OS === 'android'; // bool

export default class Ubicon extends Component {
  componentDidMount() {
    this._authentication();
  }

  _authentication() {
    console.info('_authentication()');
    const url = `${config.server}/auth/token`;
    console.log('url:', url);
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
    	  'Content-Type': 'application/json',
        'Authorization': `Basic ${config.auth.base64}`,
      },
      body: JSON.stringify({ email: config.auth.email })
    })
      .then(response => response.json())
      .then(json => {
        console.log('response', json);
        this._setToken(json.token);
      })
      .catch(err => console.error(err));
  }

  async _setToken(access_token) {
    console.info('_setToken()');
    try {
      await AsyncStorage.setItem('AccessToken', access_token);
    } catch (err) {
      console.log('Error saving data:', err);
      if (isAndroid) ToastAndroid.show('access token を取得できませんでした', ToastAndroid.SHORT);
    }
  }

  render() {
    return (
      <Route />
    );
  }
}
