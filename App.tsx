import {Text, View} from 'react-native';
import React, {Component} from 'react';
import Login from './src/blocks/Login/Login';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/blocks/Home/Home';
import FackbookAuth from './src/blocks/FacebookAuth';
import MapsGeoLoacation from './src/blocks/MapsGeoLoacation/MapsGeoLoacation';

const Stack = createNativeStackNavigator();

class App extends Component {
  render() {
    return (
      // <NavigationContainer>
      //   <Stack.Navigator screenOptions={{headerShown: false}}>
      //     {/* <Stack.Screen name="Login" component={Login} />
      //     <Stack.Screen name="Home" component={Home} /> */}

      //     <Stack.Screen name="FackbookAuth" component={FackbookAuth} />
      //   </Stack.Navigator>
      // </NavigationContainer>
      <MapsGeoLoacation />
    );
  }
}

export default App;
