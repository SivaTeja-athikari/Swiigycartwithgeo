// import {Component} from 'react';

// interface IProps {
//   navigation: any;
// }

// export default class HomeController extends Component<IProps, {}> {
//   state = {
//     message: 'Hello World',
//   };
// }

import {PermissionsAndroid} from 'react-native';
import React, {Component} from 'react';

import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyA9mJZ_997tgVQAwSLlJGKNIlMAe0Xyqj4');

export class HomeController extends Component {
  mapRef: React.RefObject<unknown>;
  constructor(props: any) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      modalVisible: false,
      modalLocation: false,
      modalOnChange: false,
      locations: [],
      region: {
        latitude: 37.4219983,
        longitude: -122.084,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      marker: {
        latitude: 37.4219983,
        longitude: -122.084,
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
  }
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
        }),
          () => this.getLocation;
      },
      error => {
        console.log(error.code, error.message, 'getting geolocation');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  getLocation = (location: any) => {
    console.log('Getting location', location);
    this.setState({region: location});
  };
  closeModal = () => {
    this.setState({modalVisible: false});
  };
  closeModalLocation = () => {
    this.setState({modalLocation: false});
  };
  handleLocations = () => {
    let newLocation = {
      id: Date.now(),
      ...this.state.locationDetails,
    };
    this.setState({locations: [...this.state.locations, newLocation]});
  };
  getExactLocation = () => {
    Geocoder.from(this.state.marker.latitude, this.state.marker.longitude).then(
      json => {
        let addressComponent = json.results[0].formatted_address;
        let adresss = addressComponent.split(','); // console.log(adresss);
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
}

export default HomeController;
