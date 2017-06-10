import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  View,
  Text,
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

export default class Device extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.title}</Text>
        <SendButton onPress={() => {console.log('Send')}}>
          <Text style={styles.btn_txt}>Send</Text>
        </SendButton>
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
