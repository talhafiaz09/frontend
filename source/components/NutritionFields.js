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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
import HeaderComponent from './HeaderComponent';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
var toast_type = '';
var toast_text = '';
class CustomTextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typing_animation_textfield: false,
    };
  }
  toogle_typing_animation_textfield() {
    this.state.typing_animation_textfield
      ? this.setState({typing_animation_textfield: false})
      : this.setState({typing_animation_textfield: true});
  }
  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        <Animatable.View
          animation="bounceInRight"
          duration={1500}
          flex={1.2}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Comfortaa-Bold',
              fontSize: 16,
              paddingLeft: 5,
            }}>
            {this.props.headingName}
          </Text>
        </Animatable.View>
        <Animatable.View
          animation="bounceInRight"
          duration={1500}
          delay={100}
          style={[Styles.custom_text_field, {flex: 1}]}>
          {this.state.typing_animation_textfield ? (
            show_typing_animation_input_fields()
          ) : (
            <FontAwesome name={this.props.iconName} color="#EF6C00" size={23} />
          )}
          <TextInput
            ref="search_bar"
            keyboardType={'numeric'}
            onFocus={() => {
              this.toogle_typing_animation_textfield();
            }}
            onBlur={() => {
              this.toogle_typing_animation_textfield();
            }}
            onChangeText={(text) => {
              if (this.props.proteinfieldTextHandler) {
                this.props.proteinfieldTextHandler(text);
              } else if (this.props.fatsfieldTextHandler) {
                this.props.fatsfieldTextHandler(text);
              } else if (this.props.fiberfieldTextHandler) {
                this.props.fiberfieldTextHandler(text);
              } else if (this.props.vitaminsfieldTextHandler) {
                this.props.vitaminsfieldTextHandler(text);
              } else if (this.props.carbohydratefieldTextHandler) {
                this.props.carbohydratefieldTextHandler(text);
              }
            }}
            style={Styles.search_bar_styling}
            placeholder={this.props.placeholder}
          />
        </Animatable.View>
      </View>
    );
  }
}
export default CustomTextField;
