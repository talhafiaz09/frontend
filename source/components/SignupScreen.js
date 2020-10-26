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
let toast_type = '';
let toast_text = '';
class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textfield_input_change_check: false,
      profilepictureBase64: '',
      username: '',
      password: '',
      confirm_password: '',
      contentType: '',
      showModal: false,
      toast_show: false,
      secureTextEntryPasswordField: true,
      secureTextEntryConfirmPasswordField: true,
      animationPressButton: new Animated.Value(1),
      animationPressPicture: new Animated.Value(1),
      roundButtonSize: new Animated.Value(width - 56),
      typing_animation_email: false,
      typing_animation_password: false,
      typing_animation_confirm_password: false,
      imageUri: '',
      setButtonBorderRoundCheck: false,
      typing_animation_button: false,
      disable_button: false,
    };
  }
  changeToastState() {
    this.setState({
      toast_show: false,
    });
  }
  toggle_animation_values(value) {
    if (value == 'email' && this.state.typing_animation_email == false) {
      this.setState({
        typing_animation_email: true,
      });
    } else if (value == 'email' && this.state.typing_animation_email == true) {
      this.setState({
        typing_animation_email: false,
      });
    } else if (
      value == 'password' &&
      this.state.typing_animation_password == false
    ) {
      this.setState({
        typing_animation_password: true,
      });
    } else if (
      value == 'password' &&
      this.state.typing_animation_password == true
    ) {
      this.setState({
        typing_animation_password: false,
      });
    } else if (
      value == 'confirm_password' &&
      this.state.typing_animation_confirm_password == false
    ) {
      this.setState({
        typing_animation_confirm_password: true,
      });
    } else if (
      value == 'confirm_password' &&
      this.state.typing_animation_confirm_password == true
    ) {
      this.setState({
        typing_animation_confirm_password: false,
      });
    }
    this.changeToastState();
  }
  textInputChange(value) {
    if (email_regex.test(value)) {
      this.setState({
        textfield_input_change_check: true,
      });
    } else {
      this.setState({
        textfield_input_change_check: false,
      });
    }
  }
  toogleSecureTextEntryPasswordView(value) {
    if (value == 'password') {
      if (this.state.secureTextEntryPasswordField) {
        this.setState({
          secureTextEntryPasswordField: false,
        });
      } else {
        this.setState({
          secureTextEntryPasswordField: true,
        });
      }
    } else {
      if (this.state.secureTextEntryConfirmPasswordField) {
        this.setState({
          secureTextEntryConfirmPasswordField: false,
        });
      } else {
        this.setState({
          secureTextEntryConfirmPasswordField: true,
        });
      }
    }
  }
  choosePhotoFromLibrary() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      compressImageQuality: 0.7,
      includeBase64: true,
      mediaType: 'photo',
      cropping: true,
    })
      .then((profilepicture) => {
        // console.log(profilepicture);
        this.setState({
          profilepictureBase64: profilepicture.data,
          contentType: profilepicture.mime,
          imageUri: profilepicture.path,
        });
      })
      .catch((err) => {});
  }
  checkInputs() {
    if (
      this.state.username == '' ||
      this.state.password == '' ||
      this.state.confirm_password == '' ||
      this.state.imageUri == ''
    ) {
      this.setState({
        toast_show: true,
      });
      toast_type = 'error';
      toast_text = 'Some fields are missing';
      return false;
    } else if (!this.state.textfield_input_change_check) {
      this.setState({
        toast_show: true,
      });
      toast_type = 'error';
      toast_text = 'Enter valid email';
      return false;
    } else if (this.state.password.length < 8) {
      this.setState({
        toast_show: true,
      });
      toast_type = 'error';
      toast_text = 'Weak password';
      return false;
    } else if (this.state.password != this.state.confirm_password) {
      this.setState({
        toast_show: true,
      });
      toast_type = 'error';
      toast_text = "Password doesn't match";
      return false;
    } else {
      return true;
    }
  }
  sendCredentials() {
    this.refs['email_input'].blur();
    this.refs['password_input'].blur();
    this.refs['confirm_password_input'].blur();
    if (this.checkInputs()) {
      this.setState({
        disable_button: true,
        typing_animation_button: true,
      });
      fetch(FETCH_URL.IP + '/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username.toLowerCase(),
          password: this.state.password,
          profilepictureBase64: this.state.profilepictureBase64,
          contentType: this.state.contentType,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            typing_animation_button: false,
          });
          // console.log(data);
          if (data.success) {
            this.props.navigation.replace('VerificationCodeScreen', {
              check: 'signup',
              code: data.code,
              username: this.state.username.toLowerCase(),
              password: this.state.password,
              profilepictureBase64: this.state.profilepictureBase64,
              contentType: this.state.contentType,
            });
          } else if (!data.success && data.exist) {
            this.setState({
              toast_show: true,
            });
            toast_type = 'error';
            toast_text = 'User exits';
            this.setState({
              disable_button: false,
            });
          } else {
            this.setState({
              toast_show: true,
            });
            toast_type = 'error';
            toast_text = 'Registration unsuccessful';
            this.setState({
              disable_button: false,
            });
          }
        })
        .catch((error) => {
          this.setState({
            typing_animation_button: false,
          });
          if ('Timeout' || 'Network request failed') {
            this.setState({
              toast_show: true,
            });
            toast_type = 'error';
            toast_text = 'Network failure';
          }
          this.setState({
            disable_button: false,
          });
        });
      setTimeout(() => {
        this.setState({
          toast_show: false,
        });
      }, 250);
    }
  }
  async roundButtonAnimation() {
    this.setState({
      toast_show: true,
    });
    toast_type = 'success';
    toast_text = 'Registration successful!';
    this.setState({
      setButtonBorderRoundCheck: true,
    });
    await Animated.timing(this.state.roundButtonSize, {
      toValue: 50,
      duration: 400,
      useNativeDriver: false,
    }).start();
    this.moveToLoginScreen();
  }
  moveToLoginScreen() {
    setTimeout(() => {
      this.props.navigation.replace('Login');
    }, 1000);
  }
  render() {
    return (
      <KeyboardAvoidingView style={Styles.main_container} behavior="heading">
        <View style={Styles.toast_styling}>
          {toast(toast_type, toast_text)}
          {this.state.toast_show ? callToast() : null}
        </View>
        <Animatable.View
          delay={400}
          duration={2000}
          animation="bounceInLeft"
          style={Styles.signup_screen_header}>
          <Logoimage height={70} width={70} />
          <Animatable.Text
            delay={950}
            animation="bounceInRight"
            style={Styles.signup_screen_top_container_text}>
            MyFridge
          </Animatable.Text>
        </Animatable.View>
        <Animatable.View
          delay={400}
          duration={2000}
          animation="bounceInUp"
          style={Styles.login_screen_footer}>
          <Animatable.Text
            animation="rubberBand"
            iterationCount="infinite"
            iterationDelay={1000}
            style={Styles.login_screen_login_text}>
            SIGN UP
          </Animatable.Text>
          <TouchableWithoutFeedback
            disabled={this.state.disable_button ? true : false}
            onPress={() => {
              this.choosePhotoFromLibrary();
            }}
            onPressIn={() => {
              animationIn(this.state.animationPressPicture);
            }}
            onPressOut={() => {
              animationOut(this.state.animationPressPicture);
            }}>
            <Animated.View
              style={[
                Styles.signup_screen_image_container,
                {transform: [{scale: this.state.animationPressPicture}]},
              ]}>
              {this.state.imageUri == '' ? (
                <AddImage height={100} width={100} style={{marginLeft: 20}} />
              ) : (
                <Image
                  style={Styles.signup_screen_image_uploader}
                  source={{uri: this.state.imageUri}}
                />
              )}
            </Animated.View>
          </TouchableWithoutFeedback>
          <View style={Styles.login_screen_input_fields_container}>
            {this.state.typing_animation_email ? (
              show_typing_animation_input_fields()
            ) : (
              <FontAwesome name="user" color="#EF6C00" size={30} />
            )}
            <TextInput
              editable={!this.state.disable_button ? true : false}
              ref="email_input"
              onFocus={() => {
                this.toggle_animation_values('email');
              }}
              onBlur={() => {
                this.toggle_animation_values('email');
              }}
              style={Styles.input_field}
              placeholder="Email"
              onChangeText={(text) => {
                this.setState({
                  username: text,
                });
                this.textInputChange(text);
              }}
            />
            {this.state.textfield_input_change_check ? (
              <Feather name="check-circle" color="green" size={20} />
            ) : this.state.username != '' ? (
              <Feather name="x-circle" color="red" size={20} />
            ) : null}
          </View>
          <View style={Styles.login_screen_input_fields_container}>
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
              editable={!this.state.disable_button ? true : false}
              ref="password_input"
              onFocus={() => {
                this.toggle_animation_values('password');
              }}
              onBlur={() => {
                this.toggle_animation_values('password');
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
              onPress={() =>
                this.toogleSecureTextEntryPasswordView('password')
              }>
              {this.state.secureTextEntryPasswordField ? (
                <Feather name="eye-off" color="gray" size={20} />
              ) : (
                <Feather name="eye" color="gray" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View style={Styles.login_screen_input_fields_container}>
            {this.state.typing_animation_confirm_password ? (
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
              editable={!this.state.disable_button ? true : false}
              ref="confirm_password_input"
              onFocus={() => {
                this.toggle_animation_values('confirm_password');
              }}
              onBlur={() => {
                this.toggle_animation_values('confirm_password');
              }}
              style={Styles.input_field}
              placeholder="Confirm Password"
              secureTextEntry={this.state.secureTextEntryConfirmPasswordField}
              onChangeText={(text) => {
                this.setState({
                  confirm_password: text,
                });
              }}
            />
            <TouchableOpacity
              onPress={() =>
                this.toogleSecureTextEntryPasswordView('confirm_password')
              }>
              {this.state.secureTextEntryConfirmPasswordField ? (
                <Feather name="eye-off" color="gray" size={20} />
              ) : (
                <Feather name="eye" color="gray" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <TouchableWithoutFeedback
            disabled={this.state.disable_button ? true : false}
            onPress={() => {
              this.sendCredentials();
            }}
            onPressIn={() => {
              animationIn(this.state.animationPressButton);
            }}
            onPressOut={() => {
              animationOut(this.state.animationPressButton);
            }}>
            <Animated.View
              style={{width: this.state.roundButtonSize, alignSelf: 'center'}}>
              <Animated.View
                style={
                  (Styles.login_screen_buttons_container,
                  {
                    transform: [{scale: this.state.animationPressButton}],
                    marginTop: 20,
                  })
                }>
                <LinearGradient
                  colors={['#EF5350', '#F44336']}
                  style={
                    !this.state.setButtonBorderRoundCheck
                      ? Styles.login_screen_buttons_container_linear_gradient
                      : Styles.login_screen_buttons_container_linear_gradient_round
                  }>
                  {!this.state.setButtonBorderRoundCheck ? (
                    this.state.typing_animation_button ? (
                      show_typing_animation_button()
                    ) : (
                      <Text
                        style={
                          Styles.login_screen_buttons_container_linear_gradient_text
                        }>
                        Sign Up
                      </Text>
                    )
                  ) : (
                    <FontAwesome name="check" color="#58d68d" size={40} />
                  )}
                </LinearGradient>
              </Animated.View>
            </Animated.View>
          </TouchableWithoutFeedback>
          <Text
            onPress={() => {
              this.props.navigation.pop();
            }}
            style={Styles.login_screen_signup_text}>
            Already a user? LogIn
          </Text>
        </Animatable.View>
      </KeyboardAvoidingView>
    );
  }
}
export default SignupScreen;
