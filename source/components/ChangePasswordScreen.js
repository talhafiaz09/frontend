import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import Styles from '../style/StyleSheet';
import * as Animatable from 'react-native-animatable';
import Logoimage from '../assets/images/logo.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import VerificationCodeScreen from '../components/VerificationCodeScreen';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import {toast, callToast} from '../functions/Toast';
import AddImage from '../assets/images/add_image.js';
import {
  width,
  email_regex,
  FETCH_URL,
  animationIn,
  animationOut,
  show_typing_animation_input_fields,
  show_typing_animation_button,
} from '../functions/FunctionHandler';
var toast_type = '';
var toast_text = '';
class ChangePasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: false,
      toast_show: false,
      password: '',
      typing_animation_button: false,
      typing_animation_password: false,
      secureTextEntryPasswordField: true,
    };
  }
  tochangePassword() {
    fetch(FETCH_URL.IP + '/user/forgetpassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.props.route.params.username.toLowerCase(),
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast_type = 'success';
          toast_text = 'Password Changed';
          this.setState({
            toast_show: true,
          });
          setTimeout(() => {
            this.setState({
              toast_show: false,
            });
            this.props.navigation.pop();
          }, 500);
        } else {
          this.setState({
            toast_show: true,
            isDisabled: false,
          });
          toast_type = 'error';
          toast_text = 'Password not changed';
        }
      })
      .catch((error) => {
        if ('Timeout' || 'Network request failed') {
          this.setState({
            toast_show: true,
          });
          toast_type = 'error';
          toast_text = 'Network failure';
        }
      });
    setTimeout(() => {
      this.setState({
        toast_show: false,
      });
    }, 250);
  }
  toggle_animation_values() {
    if (this.state.typing_animation_password == false) {
      this.setState({
        typing_animation_password: true,
      });
    } else {
      this.setState({
        typing_animation_password: false,
      });
    }
  }
  toogleSecureTextEntryPasswordView() {
    if (this.state.secureTextEntryPasswordField) {
      this.setState({
        secureTextEntryPasswordField: false,
      });
    } else {
      this.setState({
        secureTextEntryPasswordField: true,
      });
    }
  }
  render() {
    return (
      <View flex={1}>
        <View style={Styles.toast_styling}>
          {toast(toast_type, toast_text)}
          {this.state.toast_show ? callToast() : null}
        </View>
        <View style={[Styles.main_container, {padding: 20}]}>
          <View>
            <Text style={Styles.title}>New Password</Text>
            <Image
              style={Styles.icon}
              source={{
                uri:
                  'https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png',
              }}
            />
            <Text style={Styles.subTitle}>
              Please enter the new password{'\n'}
              to reset your password
            </Text>
          </View>
          <View style={Styles.change_password_field}>
            {this.state.typing_animation_password ? (
              show_typing_animation_input_fields()
            ) : (
              <FontAwesome
                name="lock"
                color="#EF6C00"
                size={30}
                style={{paddingLeft: 2.2}}
              />
            )}
            <TextInput
              editable={this.state.isDisabled ? false : true}
              ref="password_input"
              onFocus={() => {
                this.toggle_animation_values();
              }}
              onBlur={() => {
                this.toggle_animation_values();
              }}
              style={Styles.input_field}
              placeholder="Password"
              secureTextEntry={this.state.secureTextEntryPasswordField}
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
            />
            <TouchableOpacity
              onPress={() => this.toogleSecureTextEntryPasswordView()}>
              {this.state.secureTextEntryPasswordField ? (
                <Feather name="eye-off" color="gray" size={20} />
              ) : (
                <Feather name="eye" color="gray" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <View style={Styles.nextButton}>
              <TouchableOpacity
                disabled={this.state.isDisabled}
                onPress={() => {
                  this.refs.password_input.blur();
                  this.setState({
                    typing_animation_button: true,
                  });
                  if (this.state.password == '') {
                    this.setState({
                      typing_animation_button: false,
                      toast_show: true,
                    });
                    toast_type = 'error';
                    toast_text = 'Password empty';
                    setTimeout(() => {
                      this.setState({toast_show: false});
                    }, 250);
                  } else if (this.state.password.length < 8) {
                    this.setState({
                      typing_animation_button: false,
                      toast_show: true,
                    });
                    toast_type = 'error';
                    toast_text = 'Password weak';
                    setTimeout(() => {
                      this.setState({toast_show: false});
                    }, 250);
                  } else {
                    this.tochangePassword();
                  }
                }}>
                {this.state.typing_animation_button ? (
                  <View style={{alignSelf: 'center'}}>
                    {show_typing_animation_button()}
                  </View>
                ) : (
                  <Text style={Styles.nextButtonText}>Verify</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default ChangePasswordScreen;
