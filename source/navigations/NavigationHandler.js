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
import VerificationCodeScreen from '../components/VerificationCodeScreen';
import ChangePasswordScreen from '../components/ChangePasswordScreen';
import ForgetPassword from '../components/ForgetPassword';
import RecipeDetails from '../components/RecipeDetails';
import VideoPlayer from '../components/VideoPlayer';
import EditRecipe from '../components/EditRecipe';
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
          <Stack.Navigator
          // initialRouteName="VerificationCodeScreen"
          >
            <Stack.Screen
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
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="RecipeDetails"
              component={RecipeDetails}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="VerificationCodeScreen"
              component={VerificationCodeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Forgetpassword"
              component={ForgetPassword}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Changepasswordscreen"
              component={ChangePasswordScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Videoplayer"
              component={VideoPlayer}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Editrecipe"
              component={EditRecipe}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}
export default SplashToLogin;
