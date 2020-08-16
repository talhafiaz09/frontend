import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, StatusBar, Text} from 'react-native';
import Styles from '../style/StyleSheet';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../components/SplashScreen';
import LoginScreen from '../components/LoginScreen';
import SignupScreen from '../components/SignupScreen';
import HomeScreen from '../components/HomeScreen';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
const Stack = createStackNavigator();
class SplashToLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }
  async display_email() {
    try {
      var email = await AsyncStorage.getItem('username');
      this.setState({
        username: email,
      });
    } catch (err) {}
  }
  componentDidCatch() {
    this.display_email();
  }
  render() {
    return (
      <View style={Styles.main_container}>
        <StatusBar backgroundColor={'#EF6C00'} />
        <NavigationContainer>
          <Stack.Navigator>
            {/* <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{headerShown: false}}
            /> */}
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
  SplashScreen() {
    return (
      <View>
        <SplashScreen />
      </View>
    );
  }
  LoginScreen() {
    return (
      <Animatable.View animation="fadeIn">
        <LoginScreen />
      </Animatable.View>
    );
  }
  SignupScreen() {
    return (
      <Animatable.View animation="fadeIn">
        <SignupScreen />
      </Animatable.View>
    );
  }
  HomeScreen() {
    return (
      <Animatable.View animation="fadeIn">
        <HomeScreen />
      </Animatable.View>
    );
  }
}
export default SplashToLogin;
