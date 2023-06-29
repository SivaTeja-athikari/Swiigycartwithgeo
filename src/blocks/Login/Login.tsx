import {
  ImageBackground,
  Text,
  TextInput,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, {Component} from 'react';

import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

interface IProps {
  navigation?: any;
  //   route: any;
}
interface IState {
  email: string;
  password: string;
  defaultEmail: string;
  error: boolean;
  userDetails: object;
}

GoogleSignin.configure({
  webClientId:
    '187872385060-vc9oui0svivh5at383kg8mnjntpdb5c3.apps.googleusercontent.com',
});

class LoginPage extends Component<IProps, IState> {
  state = {
    email: '',
    password: '',
    defaultEmail: 'sivateja9490@gmail.com',
    error: false,
    userDetails: {},
  };

  componentDidMount() {}

  // componentDidMount(): void {
  //   GoogleSignin.configure();
  // }
  handleEmailText = (text: string) => {
    this.setState({email: text});
  };
  handlePassword = (text: string) => {
    this.setState({password: text});
  };
  handleSignUp = async () => {
    const {email, password} = this.state;

    auth().createUserWithEmailAndPassword;
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => console.log(response));
  };
  handleLogin = async () => {
    const {email, password} = this.state;
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => console.log(response));
  };
  handleFacebookLogin = async () => {
    // let result = await LoginManager.logInWithPermissions([
    //   'public_profile',
    //   'email',
    // ]);
    // console.log(result);
    // LoginManager.logInWithPermissions(['public_profile', 'email']).then(
    //   result => {
    //     if (result.isCancelled) {
    //       console.log('Login cancelled');
    //     } else {
    //       AccessToken.getCurrentAccessToken().then((data: any) => {
    //         const credential = firebase.auth.FacebookAuthProvider.credential(
    //           data.accessToken,
    //         );
    //         firebase
    //           .auth()
    //           .signInWithCredential(credential)
    //           .then(userCredential => {
    //             const user = userCredential.user;
    //             console.log('Authenticated with Facebook:', user);
    //             // You can perform additional actions with the authenticated user here
    //           })
    //           .catch(error => {
    //             console.log('Facebook authentication error:', error);
    //           });
    //       });
    //     }
    //   },
    //   error => {
    //     console.log('Facebook login error:', error);
    //   },
    // );
    // const provider = auth.FacebookAuthProvider.PROVIDER_ID;

    // const result = await LoginManager.logInWithPermissions([
    //   'public_profile',
    //   'email',
    // ]);

    // console.log(result, 'result');

    // if (result.isCancelled) {
    //   throw 'User cancelled the login process';
    // }

    // // Once signed in, get the users AccessToken
    // const data = await AccessToken.getCurrentAccessToken();

    // if (!data) {
    //   throw 'Something went wrong obtaining access token';
    // }

    // // Create a Firebase credential with the AccessToken
    // const facebookCredential = auth.FacebookAuthProvider.credential(
    //   data.accessToken,
    // );

    // // Sign-in the user with the credential
    // return auth().signInWithCredential(facebookCredential);

    console.log('Authenticated with Facebook:', firebase.auth().currentUser);

    if (firebase.auth().currentUser !== null) {
      this.props.navigation.navigate('Home');
    } else {
      try {
        const result = await LoginManager.logInWithPermissions([
          'public_profile',
          'email',
        ]);

        if (result.isCancelled) {
          throw new Error('Login cancelled');
        }

        const accessTokenData = await AccessToken.getCurrentAccessToken();

        if (!accessTokenData) {
          throw new Error('Failed to get access token');
        }

        const credential = firebase.auth.FacebookAuthProvider.credential(
          accessTokenData.accessToken,
        );

        await firebase.auth().signInWithCredential(credential);

        console.log(
          'Authenticated with Facebook:',
          firebase.auth().currentUser,
        );
        // You can perform additional actions with the authenticated user here
      } catch (error) {
        console.log('Facebook authentication error:', error);
      }
    }
  };
  handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = await auth.GoogleAuthProvider.credential(
        idToken,
      );
      const response = await auth()
        .signInWithCredential(googleCredential)
        .then(() => {
          this.props.navigation.navigate('Home');
        });
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
        console.log(error);
      }
    }
  };

  render() {
    console.log(this.state.userDetails);

    return (
      <KeyboardAvoidingView behavior="padding">
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#34282C',
          }}>
          <View
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
              justifyContent: 'center',
            }}>
            <View>
              <Text style={styles.loginText}>Log in</Text>
            </View>
            <View style={styles.cardContainer}>
              <TextInput
                placeholder="Email"
                placeholderTextColor={'#939999'}
                onChangeText={this.handleEmailText}
                style={{
                  borderWidth: 1,
                  backgroundColor: '#ffffff',
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 14,
                  color: 'black',
                }}
              />
              {this.state.email === '' ||
              !this.state.email.includes('@gmail.com') ? (
                <Text
                  style={{
                    color: 'red',
                    fontWeight: '800',
                    fontSize: 16,
                    padding: 0,
                    marginBottom: 14,
                  }}>
                  Email is required
                </Text>
              ) : (
                ''
              )}

              <TextInput
                placeholder="Password"
                placeholderTextColor={'#939999'}
                onChangeText={this.handlePassword}
                style={{
                  borderWidth: 1,
                  backgroundColor: '#ffffff',
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 14,
                  color: 'black',
                }}
              />
              {this.state.password === '' ? (
                <Text
                  style={{
                    color: 'red',
                    fontWeight: '800',
                    fontSize: 16,
                    padding: 0,
                    marginBottom: 14,
                  }}>
                  Password is required
                </Text>
              ) : (
                ''
              )}

              <Text
                onPress={() => this.handleLogin()}
                style={{
                  borderWidth: 1,
                  backgroundColor: '#CDE7BE',
                  borderRadius: 8,
                  color: '#313333',
                  padding: 12,
                  fontSize: 14,
                  textAlign: 'center',
                  fontWeight: '800',
                  marginBottom: 14,
                }}>
                Log In
              </Text>
              <TouchableOpacity>
                <Text
                  //   onPress={() =>
                  //     this.props.navigation.navigate('RecoverPassword', {
                  //       email: this.state.email,
                  //     })
                  //   }
                  style={{
                    textAlign: 'center',
                    color: '#CDE7BE',
                    fontWeight: '400',
                  }}>
                  Forgot password?
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                }}>
                <View
                  style={{
                    borderTopWidth: 1,
                    borderTopColor: '#313333',
                    width: 150,
                    marginRight: 10,
                  }}></View>
                <Text>Or</Text>
                <View
                  style={{
                    borderTopWidth: 1,
                    borderTopColor: '#313333',
                    width: 150,
                    marginLeft: 10,
                  }}></View>
              </View>

              <TouchableOpacity onPress={() => this.handleFacebookLogin()}>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#EAF4F4',
                    padding: 12,
                    alignItems: 'center',
                    borderRadius: 8,
                    marginBottom: 14,
                  }}>
                  <Image source={require('../../images/facebook.png')} />
                  <Text
                    style={{
                      textAlign: 'center',
                      paddingLeft: 50,
                      color: 'black',
                      fontSize: 14,
                      fontWeight: '700',
                    }}>
                    Login with Facebook
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.handleGoogleLogin()}>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: '#EAF4F4',
                    padding: 12,
                    alignItems: 'center',
                    borderRadius: 8,
                    marginBottom: 14,
                  }}>
                  <Image source={require('../../images/google.png')} />
                  <Text
                    style={{
                      textAlign: 'center',
                      paddingLeft: 50,
                      color: 'black',
                      fontSize: 14,
                      fontWeight: '700',
                    }}>
                    Login with Google
                  </Text>
                </View>
              </TouchableOpacity>

              {/* <View>
                <Text style={{textAlign: 'center'}}>
                  Don't have an account?
                  <Text
                    // onPress={() => this.props.navigation.navigate('SignUpPage')}
                    style={{color: '#CDE7BE', fontSize: 14, fontWeight: '700'}}>
                    Sign up
                  </Text>
                </Text>
              </View> */}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  loginText: {
    fontSize: 32,
    fontWeight: '900',
    paddingLeft: 32,
    paddingBottom: 20,
  },
  cardContainer: {
    backgroundColor: 'rgba(49, 51, 51, 0.5)',
    borderRadius: 12,
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 16,
    paddingRight: 16,
    marginLeft: 6,
    marginRight: 6,
  },
});
export default LoginPage;
