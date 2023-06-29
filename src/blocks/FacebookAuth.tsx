// import React, {Component} from 'react';
// import {View, Text, TouchableOpacity} from 'react-native';
// import {
//   AccessToken,
//   GraphRequest,
//   GraphRequestManager,
//   LoginManager,
// } from 'react-native-fbsdk';

// export default class FackbookAuth extends Component {
//   state = {userInfo: {}};

//   logoutWithFacebook = () => {
//     LoginManager.logOut();
//     this.setState({userInfo: {}});
//   };

//   getInfoFromToken = (token: any) => {
//     const PROFILE_REQUEST_PARAMS = {
//       fields: {
//         string: 'id,name,first_name,last_name',
//       },
//     };
//     const profileRequest = new GraphRequest(
//       '/me',
//       {token, parameters: PROFILE_REQUEST_PARAMS},
//       (error, user) => {
//         if (error) {
//           console.log('login info has error: ' + error);
//         } else {
//           this.setState({userInfo: user});
//           console.log('result:', user);
//         }
//       },
//     );
//     new GraphRequestManager().addRequest(profileRequest).start();
//   };

//   loginWithFacebook = () => {
//     // Attempt a login using the Facebook login dialog asking for default permissions.
//     LoginManager.logInWithPermissions(['public_profile']).then(
//       login => {
//         if (login.isCancelled) {
//           console.log('Login cancelled');
//         } else {
//           AccessToken.getCurrentAccessToken().then(data => {
//             const accessToken = data?.accessToken.toString();
//             this.getInfoFromToken(accessToken);
//           });
//         }
//       },
//       error => {
//         console.log('Login fail with error: ' + error);
//       },
//     );
//   };

//   //   state = {userInfo: {}};

//   render() {
//     console.log(this.state.userInfo);
//     const isLogin = this.state.userInfo.name;
//     const buttonText = isLogin ? 'Logout With Facebook' : 'Login From Facebook';
//     const onPressButton = isLogin
//       ? this.logoutWithFacebook
//       : this.loginWithFacebook;
//     return (
//       <View style={{flex: 1, margin: 50}}>
//         <TouchableOpacity
//           onPress={onPressButton}
//           style={{
//             backgroundColor: 'blue',
//             padding: 16,
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}>
//           <Text>{buttonText}</Text>
//         </TouchableOpacity>
//         {this.state.userInfo.name && (
//           <Text style={{fontSize: 16, marginVertical: 16}}>
//             Logged in As {this.state.userInfo.name}
//           </Text>
//         )}
//       </View>
//     );
//   }
// }

// Example of Facebook Sign In integration in React Native
// https://aboutreact.com/react-native-facebook-login/

// // Import React in our code
// import React, {useState} from 'react';

// // Import all the components we are going to use
// import {SafeAreaView, View, StyleSheet, Text, Image} from 'react-native';

// // Import FBSDK
// import {
//   LoginButton,
//   AccessToken,
//   GraphRequest,
//   GraphRequestManager,
// } from 'react-native-fbsdk';

// const App = () => {
//   const [userName, setUserName] = useState('');
//   const [token, setToken] = useState('');
//   const [profilePic, setProfilePic] = useState('');

//   const getResponseInfo = (error, result) => {
//     if (error) {
//       //Alert for the Error
//       alert('Error fetching data: ' + error.toString());
//     } else {
//       //response alert
//       console.log(JSON.stringify(result));
//       setUserName('Welcome ' + result.name);
//       setToken('User Token: ' + result.id);
//       setProfilePic(result.picture.data.url);
//     }
//   };

//   const onLogout = () => {
//     //Clear the state after logout
//     setUserName(null);
//     setToken(null);
//     setProfilePic(null);
//   };

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <Text style={styles.titleText}>
//         Example of Facebook Sign In integration in React Native
//       </Text>
//       <View style={styles.container}>
//         {profilePic ? (
//           <Image source={{uri: profilePic}} style={styles.imageStyle} />
//         ) : null}
//         <Text style={styles.textStyle}> {userName} </Text>
//         <Text style={styles.textStyle}> {token} </Text>
//         <LoginButton
//           readPermissions={['public_profile']}
//           onLoginFinished={(error, result) => {
//             if (error) {
//               alert(error);
//               console.log('Login has error: ' + result.error);
//             } else if (result.isCancelled) {
//               alert('Login is cancelled.');
//             } else {
//               AccessToken.getCurrentAccessToken().then(data => {
//                 console.log(data.accessToken.toString());
//                 const processRequest = new GraphRequest(
//                   '/me?fields=name,picture.type(large)',
//                   null,
//                   getResponseInfo,
//                 );
//                 // Start the graph request.
//                 new GraphRequestManager().addRequest(processRequest).start();
//               });
//             }
//           }}
//           onLogoutFinished={onLogout}
//         />
//       </View>
//       <Text style={styles.footerHeading}>
//         Facebook Sign In integration in React Native
//       </Text>
//       <Text style={styles.footerText}>www.aboutreact.com</Text>
//     </SafeAreaView>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   textStyle: {
//     fontSize: 20,
//     color: '#000',
//     textAlign: 'center',
//     padding: 10,
//   },
//   imageStyle: {
//     width: 200,
//     height: 300,
//     resizeMode: 'contain',
//   },
//   titleText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     padding: 20,
//   },
//   footerHeading: {
//     fontSize: 18,
//     textAlign: 'center',
//     color: 'grey',
//   },
//   footerText: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: 'grey',
//   },
// });

// import React, {Component} from 'react';
// import {View, Button} from 'react-native';
// import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';
// import firebase from '@react-native-firebase/app';
// import auth from '@react-native-firebase/auth';

// class FacebookAuth extends Component {
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       isLoggedIn: false,
//     };
//     this.onFacebookButtonPress = this.onFacebookButtonPress.bind(this);
//     this.onLogoutButtonPress = this.onLogoutButtonPress.bind(this);
//   }

//   async componentDidMount() {
//     firebase.auth().onAuthStateChanged(user => {
//       if (user) {
//         this.setState({isLoggedIn: true});
//       } else {
//         this.setState({isLoggedIn: false});
//       }
//     });
//   }

//   async onFacebookButtonPress() {
//     try {
//       const result = await LoginManager.logInWithPermissions([
//         'public_profile',
//         'email',
//       ]);

//       if (result.isCancelled) {
//         throw new Error('Login cancelled');
//       }

//       const accessTokenData = await AccessToken.getCurrentAccessToken();

//       if (!accessTokenData) {
//         throw new Error('Failed to get access token');
//       }

//       const credential = firebase.auth.FacebookAuthProvider.credential(
//         accessTokenData.accessToken,
//       );

//       await firebase.auth().signInWithCredential(credential);

//       console.log('Authenticated with Facebook:', firebase.auth().currentUser);
//       this.setState({isLoggedIn: true});
//     } catch (error) {
//       console.log('Facebook authentication error:', error);
//     }
//   }

//   async onLogoutButtonPress() {
//     try {
//       await firebase.auth().signOut();
//       this.setState({isLoggedIn: false});
//       console.log('Logged out');
//     } catch (error) {
//       console.log('Logout error:', error);
//     }
//   }

//   render() {
//     const {isLoggedIn} = this.state;

//     return (
//       <View>
//         {isLoggedIn ? (
//           <Button title="Logout" onPress={this.onLogoutButtonPress} />
//         ) : (
//           <LoginButton
//             permissions={['public_profile', 'email']}
//             onLoginFinished={(error, result) => {
//               if (error) {
//                 console.log('Facebook login error:', error);
//               } else if (result.isCancelled) {
//                 console.log('Login cancelled');
//               } else {
//                 this.onFacebookButtonPress();
//               }
//             }}
//             onLogoutFinished={() => console.log('Logged out')}
//           />
//         )}
//       </View>
//     );
//   }
// }

// export default FacebookAuth;

import React, {Component} from 'react';
import {View} from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk';

export default class Login extends Component {
  render() {
    return (
      <View>
        <LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              console.log('login has error: ' + result.error);
            } else if (result.isCancelled) {
              console.log('login is cancelled.');
            } else {
              AccessToken.getCurrentAccessToken().then(data => {
                console.log(data.accessToken.toString());
              });
            }
          }}
          onLogoutFinished={() => console.log('logout.')}
        />
      </View>
    );
  }
}
