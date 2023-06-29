import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import HomeController from './HomeController';
import {Colors, Strings} from '../../components';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

export class Home extends HomeController {
  handleLogout = async () => {
    await GoogleSignin.signOut();
    await firebase.auth().signOut();
    await this.props.navigation.navigate('Login');
  };
  render() {
    console.log(this.state.message);
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <TouchableOpacity onPress={() => this.handleLogout()}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
});

export default Home;
