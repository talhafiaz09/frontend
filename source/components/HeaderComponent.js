import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from '../style/StyleSheet';
import * as Animatable from 'react-native-animatable';
import Logoimage from '../assets/images/logo.js';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {toast, callToast} from '../functions/Toast';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {
  width,
  email_regex,
  animationIn,
  animationOut,
  FETCH_URL,
  show_typing_animation_input_fields,
  show_typing_animation_button,
} from '../functions/FunctionHandler';
import FacebookLogo from '../assets/images/facebook.js';
import GoogleLogo from '../assets/images/google.js';
import ImgToBase64 from 'react-native-image-base64';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
var toast_type = '';
var toast_text = '';
class HeaderComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={Styles.home_screen_headers}>
        <Animatable.View animation="bounceInLeft" duration={1500}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.openDrawer();
            }}>
            <AntDesign
              style={Styles.drawer_open}
              name="menu-fold"
              color="white"
              size={30}
            />
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View
          animation="bounceInRight"
          duration={1500}
          style={Styles.home_screen_headers_text_container}>
          <Text style={Styles.home_screen_headers_text}>{this.props.name}</Text>
        </Animatable.View>
      </View>
    );
  }
}
export default HeaderComponent;
