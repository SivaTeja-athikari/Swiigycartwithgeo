// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React from 'react';
// import HomeController from './HomeController';
// import {Colors, Strings} from '../../components';
// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';

// import firebase from '@react-native-firebase/app';
// import auth from '@react-native-firebase/auth';

// export class Home extends HomeController {
//   handleLogout = async () => {
//     await GoogleSignin.signOut();
//     await firebase.auth().signOut();
//     await this.props.navigation.navigate('Login');
//   };
//   render() {
//     console.log(this.state.message);
//     return (
//       <View style={styles.container}>
//         <Text>Home</Text>
//         <TouchableOpacity onPress={() => this.handleLogout()}>
//           <Text>Logout</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'grey',
//   },
// });

// export default Home;

import {
  FlatList,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React from 'react';

import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

import Geocoder from 'react-native-geocoding';
import HomeController from './HomeController';
import {moderateScale, verticalScale} from '../../../Metrics';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

Geocoder.init('AIzaSyA9mJZ_997tgVQAwSLlJGKNIlMAe0Xyqj4');

class Home extends HomeController {
  handleStatusDisplay = ({item}: any) => (
    <View>
      <View
        style={{
          flexDirection: 'row',
          padding: 20,
          justifyContent: 'flex-start',
        }}>
        <View>
          <Image
            resizeMode="contain"
            style={{width: 25, height: 25}}
            source={require('./assests/homewsiggy.png')}
          />
        </View>
        <View style={{width: '96%', paddingLeft: 20}}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: '400',
              paddingBottom: 7,
            }}>
            Home
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 14,
              paddingBottom: 7,
            }}>
            {item.address}
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 14,
              paddingBottom: 7,
            }}>
            Phone number: 9490797761
          </Text>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <Text
                style={{
                  color: 'orange',
                  fontSize: 16,
                  fontWeight: '500',
                  paddingRight: 20,
                }}>
                EDIT
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  color: 'orange',
                  fontSize: 16,
                  fontWeight: '500',
                  paddingRight: 20,
                }}>
                DELETE
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  color: 'orange',
                  fontSize: 16,
                  fontWeight: '500',
                  paddingRight: 20,
                }}>
                SHARE
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 20,
              borderBottomColor: 'grey',
              borderBottomWidth: 0.5,
              width: '96%',
            }}></View>
        </View>
      </View>
    </View>
  );
  render() {
    console.log(this.state.locations);
    return (
      <SafeAreaView style={{height: '100%'}}>
        <View style={style.address_container}>
          <Text style={style.addressText}>ADDRESSES</Text>
        </View>

        <View style={style.saved_address_container}>
          <Text style={style.savedaddressText}>SAVED ADDRESSES</Text>
        </View>

        <FlatList
          data={this.state.locations}
          renderItem={item => this.handleStatusDisplay(item)}
          keyExtractor={item => item.id}
        />
        {/* <View
 style={{
 flexDirection: 'row',
 padding: 20,
 justifyContent: 'flex-start',
 }}>
 <View>
 <Image
 resizeMode="contain"
 style={{width: 25, height: 25}}
 source={require('./assests/homewsiggy.png')}
 />
 </View>
 <View style={{width: '96%', paddingLeft: 20}}>
 <Text
 style={{
 color: 'black',
 fontSize: 18,
 fontWeight: '400',
 paddingBottom: 7,
 }}>
 Home
 </Text>
 <Text
 style={{
 color: 'grey',
 fontSize: 14,
 paddingBottom: 7,
 }}>
 Flat N0 101, srinagar, Gajuwaka, Visahakapatanm, Andhra pradesh,
 India
 </Text>
 <Text
 style={{
 color: 'grey',
 fontSize: 14,
 paddingBottom: 7,
 }}>
 Phone number: 9490797761
 </Text>

 <View style={{flexDirection: 'row'}}>
 <TouchableOpacity>
 <Text
 style={{
 color: 'orange',
 fontSize: 16,
 fontWeight: '500',
 paddingRight: 20,
 }}>
 EDIT
 </Text>
 </TouchableOpacity>
 <TouchableOpacity>
 <Text
 style={{
 color: 'orange',
 fontSize: 16,
 fontWeight: '500',
 paddingRight: 20,
 }}>
 DELETE
 </Text>
 </TouchableOpacity>
 <TouchableOpacity>
 <Text
 style={{
 color: 'orange',
 fontSize: 16,
 fontWeight: '500',
 paddingRight: 20,
 }}>
 SHARE
 </Text>
 </TouchableOpacity>
 </View>
 <View
 style={{
 marginTop: 20,
 borderBottomColor: 'grey',
 borderBottomWidth: 0.5,
 width: '96%',
 }}></View>
 </View>
 </View> */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            borderTopWidth: 0.5,
            borderTopColor: 'grey',
            width: '100%',
            height: 90,
          }}>
          <TouchableOpacity
            onPress={() => this.setState({modalVisible: true})}
            style={{
              height: 30,
              bottom: 20,
              width: '100%',
              paddingBottom: 20,
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#1AA260',
                padding: 20,
                textAlign: 'center',
                borderWidth: 1,
                borderColor: '#1AA260',
                height: 60,
                width: '80%',
              }}>
              ADD NEW ADDRESS
            </Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({modalVisible: !this.state.modalVisible});
          }}>
          <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
            <SafeAreaView style={style.container}>
              <MapView
                ref={this.mapRef}
                provider={
                  Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
                }
                style={style.map}
                showsUserLocation={true}
                showsMyLocationButton={true}
                zoomEnabled={true}
                region={this.state.region}
                onRegionChange={() => this.getExactLocation()}
                onRegionChangeComplete={region =>
                  this.setState({
                    marker: {
                      latitude: region.latitude,
                      longitude: region.longitude,
                    },
                    region: {
                      latitude: region.latitude,
                      longitude: region.longitude,
                      latitudeDelta: region.latitudeDelta,
                      longitudeDelta: region.longitudeDelta,
                    },
                  })
                }
                onPress={e =>
                  this.setState(
                    {
                      marker: {
                        latitude: e.nativeEvent.coordinate.latitude,
                        longitude: e.nativeEvent.coordinate.longitude,
                      },
                    },
                    this.getExactLocation,
                  )
                }>
                <Marker
                  draggable
                  onDragEnd={e => {
                    this.setState({
                      marker: {
                        latitude: e.nativeEvent.coordinate.latitude,
                        longitude: e.nativeEvent.coordinate.longitude,
                      },
                    });
                  }}
                  coordinate={this.state.marker}
                />
              </MapView>
              <TouchableOpacity
                onPress={() => this.getCurrentLatLong()}
                style={{
                  position: 'absolute',
                  bottom: 130,
                  zIndex: 2,
                  backgroundColor: '#f4f4f5',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#ffffff',
                    padding: 6,
                    borderRadius: 10,
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{width: 20, height: 20, tintColor: 'red'}}
                    source={require('./assests/locateme.png')}
                  />
                  <Text
                    style={{color: 'red', paddingLeft: 15, borderRadius: 10}}>
                    LOCATE ME
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.closeModal()}
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 0,
                  paddingLeft: 10,
                }}>
                <Image
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: 'grey',
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                  }}
                  source={require('./assests/back.png')}
                />
              </TouchableOpacity>
            </SafeAreaView>
            <View
              style={{
                backgroundColor: '#ffffff',
                height: 320,
                width: '100%',
                top: 500,
                padding: 20,
              }}>
              <Text>SELECT DELIVERY LOCATION</Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 15,
                  marginBottom: 15,
                  alignItems: 'center',
                  width: '100%',
                }}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 7,
                      width: '90%',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: '50%',
                      }}>
                      <Image
                        resizeMode="contain"
                        style={{height: 20, width: 20}}
                        source={require('./assests/location.png')}
                      />
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '600',
                          color: 'black',
                          paddingLeft: 7,
                        }}>
                        {this.state.locationDetails.area}
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => this.setState({modalOnChange: true})}
                      style={{
                        backgroundColor: '#f5f5f4',
                        borderRadius: 7,
                        marginLeft: 26,
                      }}>
                      <Text
                        style={{
                          color: '#e46c47',
                          padding: 7,
                        }}>
                        CHANGE
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text>
                    {this.state.locationDetails.address},{' '}
                    {this.state.locationDetails.area},{' '}
                    {this.state.locationDetails.road},{' '}
                    {this.state.locationDetails.city},{' '}
                    {this.state.locationDetails.state},{' '}
                    {this.state.locationDetails.country}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => this.setState({modalLocation: true})}
                style={{
                  width: '90%',
                  borderRadius: 9,
                  backgroundColor: '#e46c47',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '20%',
                  marginLeft: 10,
                  marginTop: 17,
                }}>
                <Text
                  style={{
                    color: '#ffffff',
                    fontSize: 13,
                    fontWeight: '500',
                    padding: 10,
                  }}>
                  Confirm Location
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalLocation}
          onRequestClose={() => {
            this.setState({modalVisible: !this.state.modalLocation});
          }}>
          <SafeAreaView style={{height: '100%', backgroundColor: '#ffffff'}}>
            <SafeAreaView>
              <TouchableOpacity
                onPress={() => this.closeModalLocation()}
                style={{
                  paddingLeft: 10,
                }}>
                <Image
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: 'grey',
                    backgroundColor: '#ffffff',
                    borderRadius: 15,
                  }}
                  source={require('./assests/back.png')}
                />
              </TouchableOpacity>
            </SafeAreaView>
            <View
              style={{
                backgroundColor: '#ffffff',
                padding: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 15,
                  marginBottom: 15,
                  alignItems: 'center',
                  width: '100%',
                }}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 7,
                      width: '90%',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: '50%',
                      }}>
                      <Image
                        resizeMode="contain"
                        style={{height: 20, width: 20}}
                        source={require('./assests/location.png')}
                      />
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '600',
                          color: 'black',
                          paddingLeft: 7,
                        }}>
                        {this.state.locationDetails.area}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={{
                        backgroundColor: '#f5f5f4',
                        borderRadius: 7,
                        marginLeft: 26,
                      }}>
                      <Text
                        style={{
                          color: '#e46c47',
                          padding: 7,
                        }}>
                        CHANGE
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text>
                    {this.state.locationDetails.address},{' '}
                    {this.state.locationDetails.area},{' '}
                    {this.state.locationDetails.road},{' '}
                    {this.state.locationDetails.city},{' '}
                    {this.state.locationDetails.state},{' '}
                    {this.state.locationDetails.country}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => this.handleLocations()}
                style={{
                  width: '90%',
                  borderRadius: 9,
                  backgroundColor: '#e46c47',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '20%',
                  marginLeft: 10,
                  marginTop: 17,
                }}>
                <Text
                  style={{
                    color: '#ffffff',
                    fontSize: 13,
                    fontWeight: '500',
                    padding: 10,
                  }}>
                  SAVE AND PROCEED
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={() => {
            this.setState({modalOnChange: !this.state?.modalOnChange});
          }}>
          <View style={{height: '100%', backgroundColor: '#ffffff'}}>
            <View style={{padding: verticalScale(20)}}>
              <View
                style={{
                  flexDirection: 'row',
                  // alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => this.setState({modalOnChange: false})}>
                  <Image
                    resizeMode="contain"
                    style={{height: 20, width: 20}}
                    source={require('./assests/backarrow.png')}
                  />
                </TouchableOpacity>
                <Text style={{paddingLeft: verticalScale(10)}}>
                  Search location to add address
                </Text>
              </View>

              <GooglePlacesAutocomplete
                styles={{
                  listView: {backgroundColor: '#ffffff'},
                  container: {
                    flex: 0,
                    position: 'absolute',
                    width: '100%',
                    zIndex: 1,
                    top: 40,
                  },
                }}
                placeholder="Search"
                fetchDetails={true}
                onPress={(data, details = null) => {
                  console.log(details?.geometry, 'triggered');
                }}
                query={{
                  key: 'AIzaSyA9mJZ_997tgVQAwSLlJGKNIlMAe0Xyqj4',
                  language: 'en',
                  rankby: 'country : India',

                  radius: 30000,
                  location: `${this.state?.region.latitude} , ${this.state?.region.longitude}`,
                }}
              />
              {/* <View>
                <Text
                  style={{
                    color: 'orange',
                    fontSize: 18,
                    paddingTop: 15,
                    fontWeight: '600',
                  }}>
                  Use my current location
                </Text>
              </View> */}
              {/* <View
                style={{
                  marginTop: 20,
                  borderBottomColor: 'grey',
                  borderBottomWidth: 0.5,
                }}></View> */}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  addressText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    marginBottom: 20,
    marginTop: 10,
  },
  address_container: {
    paddingLeft: 30,
    paddingTop: 10,
  },
  savedaddressText: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
  },
  saved_address_container: {
    padding: 20,
    backgroundColor: '#DADBDD',
  },
  add_new_addressText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1AA260',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 600,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: 500,
  },
  add_new_address_container: {
    top: 500,
    paddingTop: 6,
    paddingBottom: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    alignSelf: 'center',
    width: '90%',
    borderColor: '#1AA260',
  },
  get: {
    padding: 10,
    alignSelf: 'center',
    width: 100,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
  },
});

export default Home;
