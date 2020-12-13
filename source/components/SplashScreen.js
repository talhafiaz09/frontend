import React, {Component} from 'react';
import Styles from '../style/StyleSheet';
import {View, Text, StatusBar} from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Logoimage from '../assets/images/logo.js';
import * as Animatable from 'react-native-animatable';
class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
    this.display_email();
    setTimeout(() => {
      // console.log(this.state.username);
      if (this.state.username == '' || this.state.username == null) {
        this.props.navigation.replace('Login');
      } else {
        this.props.navigation.replace('Home');
      }
    }, 5000);
  }
  async display_email() {
    try {
      var email = await AsyncStorage.getItem('username');
      var check = await AsyncStorage.getItem('f_g_name');
      console.log(check);
      this.setState({
        username: email,
      });
    } catch (err) {}
  }
  render() {
    return (
      <View style={Styles.main_container}>
        <Animatable.View
          delay={150}
          duration={2000}
          animation="bounceInLeft"
          style={Styles.splash_screen_top_container}>
          <Logoimage height={100} width={100} />
          <Animatable.Text
            delay={950}
            animation="bounceInRight"
            style={Styles.splash_screen_top_container_text}>
            MyFridge
          </Animatable.Text>
        </Animatable.View>
        <Animatable.View
          delay={850}
          duration={2000}
          animation="bounceIn"
          style={Styles.splash_screen_middle_container}>
          <LottieView
            style={Styles.lottie_carousel}
            resizeMode="cover"
            source={require('../assets/lottie_animations/foodcarousel.json')}
            autoPlay
            loop></LottieView>
        </Animatable.View>
        <View style={Styles.splash_screen_bottom_container}>
          <Animatable.Text
            delay={600}
            duration={2000}
            animation="bounceInUp"
            style={Styles.splash_screen_bottom_container_text}>
            #LetsEat
          </Animatable.Text>
        </View>
      </View>
    );
  }
}
export default SplashScreen;
