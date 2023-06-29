import {
  Button,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyA9mJZ_997tgVQAwSLlJGKNIlMAe0Xyqj4');
class MapsGeoLoacation extends Component {
  state = {
    region: {
      latitude: 17.45071910374192,
      longitude: 78.39152913540602,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    },
    marker: {
      latitude: 17.45071910374192,
      longitude: 78.39152913540602,
    },
    locationDetails: {
      faltNo: '',
      road: '',
      country: '',
      state: '',
      city: '',
      area: '',
      address: '',
    },
  };
  componentDidMount = async () => {
    await this.requestLocationPermission();
    await this.getCurrentLatLong();
    await this.getExactLocation();
  };
  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geo Maps',
          message: 'You can acceess the location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can access the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  getCurrentLatLong = () => {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          marker: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  getLocation = (location: any) => {
    console.log('Getting location', location);
    this.setState({region: location});
  };
  getExactLocation = () => {
    Geocoder.from(this.state.marker.latitude, this.state.marker.longitude).then(
      json => {
        let addressComponent = json.results[0].formatted_address;
        let adresss = addressComponent.split(',');
        // console.log(adresss);

        this.setState({
          locationDetails: {
            flatNo: adresss[0],
            road: adresss[1],
            address: adresss[2],
            area: adresss[3],
            city: adresss[4],
            state: adresss[5],
            country: adresss[6],
          },
        });
      },
    );
  };
  render() {
    // console.log(this.state.locationDetails);
    console.log(this.state.locationDetails, this.state.marker);
    return (
      <View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={true}
          zoomEnabled={true}
          region={this.state.region}
          onRegionChange={() => this.getLocation}
          onRegionChangeComplete={region => this.setState({region})}
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
        <View
          style={{
            backgroundColor: '#ffffff',
            height: 320,
            top: 400,
            padding: 20,
          }}>
          <View>
            <Text style={{color: 'grey', paddingLeft: 10}}>ADDRESS</Text>
            <TextInput
              style={{color: 'black', backgroundColor: '#e0e0e0'}}
              value={
                this.state.locationDetails.road +
                ', ' +
                this.state.locationDetails.area
              }
            />
          </View>
          <View>
            <Text style={{color: 'grey', paddingLeft: 10}}>HOUSE/ FLAT NO</Text>
            <TextInput
              style={{color: 'black', backgroundColor: '#e0e0e0'}}
              value={
                this.state.locationDetails.address +
                ', ' +
                this.state.locationDetails.city
              }
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 1,
            }}>
            <View>
              <Text style={{color: 'grey', paddingLeft: 5}}>State</Text>
              <TextInput
                style={{
                  color: 'black',
                  backgroundColor: '#e0e0e0',
                  width: 320,
                }}
                value={
                  this.state.locationDetails.state +
                  ' ' +
                  this.state.locationDetails.country
                }
              />
            </View>
          </View>
          <TouchableOpacity
            style={{
              width: '90%',
              borderRadius: 9,
              backgroundColor: 'orange',
              alignItems: 'center',
              justifyContent: 'center',
              height: '10%',
              marginLeft: 10,
              marginTop: 17,
            }}>
            <Text>Confirm Location</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
  },
});

export default MapsGeoLoacation;
