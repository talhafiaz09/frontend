import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Animated,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from '../style/StyleSheet';
import * as Animatable from 'react-native-animatable';
import Logoimage from '../assets/images/logo.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
GoogleSignin.configure({
  webClientId:
    '435077661070-fjbuude4c131o3imh2c36jigla7tdr14.apps.googleusercontent.com',
  offlineAccess: true,
});
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textfield_input_change_check: false,
      username: '',
      password: '',
      profilepictureBase64: '',
      username_check: '',
      toast_show: false,
      secureTextEntry: true,
      animationPress: new Animated.Value(1),
      animationPressFacebook: new Animated.Value(1),
      animationPressGoogle: new Animated.Value(1),
      roundButtonSize: new Animated.Value(width - 56),
      typing_animation_email: false,
      typing_animation_password: false,
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
  toogleSecureTextEntry() {
    if (this.state.secureTextEntry) {
      this.setState({
        secureTextEntry: false,
      });
    } else {
      this.setState({
        secureTextEntry: true,
      });
    }
  }
  checkInputs() {
    if (this.state.username == '' || this.state.password == '') {
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
    } else {
      return true;
    }
  }
  sendCredentials() {
    this.refs['email_input'].blur();
    this.refs['password_input'].blur();
    if (this.checkInputs()) {
      this.setState({
        disable_button: true,
        typing_animation_button: true,
      });
      fetch(FETCH_URL.IP + '/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username.toLowerCase(),
          password: this.state.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            typing_animation_button: false,
          });
          if (data.success) {
            this.setState({
              profilepictureBase64: data.user.profilepicture.data,
            });
            this.roundButtonAnimation();
          } else if (
            data.error.name == 'IncorrectUsernameError' ||
            data.error.name == 'IncorrectPasswordError'
          ) {
            this.setState({
              toast_show: true,
            });
            toast_type = 'error';
            toast_text = 'Wronge credentials';
            this.setState({
              disable_button: false,
            });
          } else {
            this.setState({
              toast_show: true,
            });
            toast_type = 'error';
            toast_text = 'Login unsuccessful';
            this.setState({
              disable_button: false,
            });
          }
        })
        .catch((error) => {
          if (
            error.message === 'Timeout' ||
            error.message === 'Network request failed'
          ) {
            this.setState({
              toast_show: true,
            });
            toast_type = 'error';
            toast_text = 'Network failure';
          }
          this.setState({
            toast_show: false,
          });
        });
      setTimeout(() => {
        this.setState({
          toast_show: false,
        });
      }, 250);
    }
  }
  save_to_AsyncStorage() {
    AsyncStorage.setItem('username', this.state.username.toLowerCase());
    AsyncStorage.setItem('profilepicture', this.state.profilepictureBase64);
  }
  async roundButtonAnimation() {
    this.save_to_AsyncStorage();
    this.setState({
      toast_show: true,
    });
    toast_type = 'success';
    toast_text = 'Login successful!';
    this.setState({
      setButtonBorderRoundCheck: true,
    });
    await Animated.timing(this.state.roundButtonSize, {
      toValue: 50,
      duration: 400,
      useNativeDriver: false,
    }).start();
    this.moveToHomeScreen();
  }
  moveToHomeScreen() {
    setTimeout(() => {
      this.props.navigation.replace('Home');
    }, 1000);
  }
  FBbasicInfo() {
    AccessToken.getCurrentAccessToken().then((data) => {
      const {accessToken} = data;
      let graphRequest = new GraphRequest(
        '/me',
        {
          accessToken,
          parameters: {
            fields: {
              string: 'email,picture.type(normal)',
            },
          },
        },
        (error, result) => {
          if (error) {
            console.log('Error: ', error);
          } else {
            this.setState({
              username: result.email,
            });
            this.image_to_base64(result.picture.data.url);
          }
        },
      );
      let graphRequestManager = new GraphRequestManager();
      graphRequestManager.addRequest(graphRequest).start();
    });
  }
  async image_to_base64(url) {
    await ImgToBase64.getBase64String(url)
      .then((base64String) => {
        this.setState({
          profilepictureBase64: base64String,
        });
        // console.log(this.state.profilepictureBase64);
      })
      .catch((err) => {
        console.log(err);
      });
    this.facebook_google_fetch_request();
  }
  extraInfo() {
    AsyncStorage.setItem('f_g_user', 'yes');
  }
  facebook_google_fetch_request() {
    this.extraInfo();
    fetch(FETCH_URL.IP + '/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username.toLowerCase(),
        password: 'facebook_or_google_account',
        profilepictureBase64: this.state.profilepictureBase64,
        contentType: 'image/png',
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success || data.error.name == 'UserExistsError') {
          console.log(data);
          this.roundButtonAnimation();
        } else {
          this.setState({
            toast_show: true,
          });
          toast_type = 'error';
          toast_text = 'Registration unsuccessful';
          this.setState({
            disable_button: false,
            typing_animation_button: false,
          });
        }
        this.setState({
          toast_show: false,
        });
      })
      .catch((error) => {
        console.log(error);
        if ('Timeout' || 'Network request failed') {
          this.setState({
            toast_show: true,
          });
          toast_type = 'error';
          toast_text = 'Network failure';
        }
        this.setState({
          disable_button: false,
          typing_animation_button: false,
          toast_show: false,
        });
      });
  }
  google_login = async () => {
    this.refs['email_input'].blur();
    this.refs['password_input'].blur();
    this.setState({
      disable_button: true,
      typing_animation_button: true,
    });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        // console.log(userInfo);
        this.setState({
          username: userInfo.user.email,
        });
        this.image_to_base64(userInfo.user.photo);
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        this.setState({
          toast_show: true,
          typing_animation_button: false,
        });
        toast_type = 'error';
        toast_text = 'Login cancelled';
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        this.setState({
          toast_show: true,
        });
        toast_type = 'error';
        toast_text = 'PLay services not available';
      } else {
        // some other error happened
        console.log(error);
      }
      this.setState({
        disable_button: false,
        typing_animation_button: false,
      });
    }
  };
  facebook_login() {
    this.refs['email_input'].blur();
    this.refs['password_input'].blur();
    this.setState({
      disable_button: true,
      typing_animation_button: true,
    });
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      (result) => {
        if (result.error) {
          this.setState({
            toast_show: true,
          });
          toast_type = 'error';
          toast_text = 'Login unsuccessful';
          this.setState({
            disable_button: false,
          });
        } else {
          if (result.isCancelled) {
            this.setState({
              toast_show: true,
            });
            toast_type = 'error';
            toast_text = 'Login cancelled';
            this.setState({
              disable_button: false,
              typing_animation_button: false,
            });
          } else {
            this.setState({
              disable_button: true,
            });
            this.FBbasicInfo();
          }
        }
      },
    );
  }
  getCode() {
    if (this.state.username == '') {
      this.setState({
        toast_show: true,
        typing_animation_button: false,
        disable_button: false,
      });
      toast_type = 'error';
      toast_text = 'Enter email';
    } else if (!this.state.textfield_input_change_check) {
      this.setState({
        toast_show: true,
        typing_animation_button: false,
        disable_button: false,
      });
      toast_type = 'error';
      toast_text = 'Enter valid email';
    } else {
      fetch(FETCH_URL.IP + '/user/getcode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // username: this.props.route.params.username.toLowerCase(),
          username: this.state.username.toLowerCase(),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.found) {
            // console.log(data.code);
            this.setState({
              toast_show: false,
              typing_animation_button: false,
              disable_button: false,
            });
            setTimeout(() => {
              this.props.navigation.navigate('Forgetpassword', {
                code: data.code,
                username: this.state.username,
              });
            }, 500);
          } else if (!data.success && !data.found) {
            toast_type = 'error';
            toast_text = "User doesn't exist";
            this.setState({
              toast_show: true,
              typing_animation_button: false,
              disable_button: false,
            });
          } else {
            this.setState({
              toast_show: true,
            });
            toast_type = 'error';
            toast_text = 'Code not sent';
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
    }
    setTimeout(() => {
      this.setState({
        toast_show: false,
      });
    }, 250);
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
          style={Styles.login_screen_header}>
          <Logoimage height={100} width={100} />
          <Animatable.Text
            delay={950}
            animation="bounceInRight"
            style={Styles.splash_screen_top_container_text}>
            MyFridge
          </Animatable.Text>
        </Animatable.View>

        <Animatable.View
          delay={400}
          duration={2000}
          animation="bounceInUp"
          style={Styles.login_screen_footer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Animatable.Text
              animation="rubberBand"
              iterationCount="infinite"
              iterationDelay={1000}
              style={Styles.login_screen_login_text}>
              LOGIN
            </Animatable.Text>
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
                    username_check: text,
                  });
                  this.textInputChange(text);
                }}
              />
              {this.state.textfield_input_change_check ? (
                <Feather name="check-circle" color="green" size={20} />
              ) : this.state.username_check != '' ? (
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
                secureTextEntry={this.state.secureTextEntry}
                onChangeText={(text) => {
                  this.setState({
                    password: text,
                  });
                }}
              />
              <TouchableOpacity onPress={() => this.toogleSecureTextEntry()}>
                {this.state.secureTextEntry ? (
                  <Feather name="eye-off" color="gray" size={20} />
                ) : (
                  <Feather name="eye" color="gray" size={20} />
                )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  typing_animation_button: true,
                  disable_button: true,
                });
                this.getCode();
              }}>
              <Text style={Styles.login_screen_forget_password}>
                Forget password?
              </Text>
            </TouchableOpacity>
            <TouchableWithoutFeedback
              disabled={this.state.disable_button ? true : false}
              onPress={() => {
                this.sendCredentials();
              }}
              onPressIn={() => {
                animationIn(this.state.animationPress);
              }}
              onPressOut={() => {
                animationOut(this.state.animationPress);
              }}>
              <Animated.View
                style={{
                  width: this.state.roundButtonSize,
                  alignSelf: 'center',
                }}>
                <Animated.View
                  style={
                    (Styles.login_screen_buttons_container,
                    {transform: [{scale: this.state.animationPress}]})
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
                          Log In
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
                this.props.navigation.navigate('Signup');
              }}
              style={Styles.login_screen_signup_text}>
              New user? SignUp
            </Text>
            <View style={Styles.login_facebook_google_logo_container}>
              <TouchableWithoutFeedback
                disabled={this.state.disable_button ? true : false}
                onPress={() => {
                  this.google_login();
                }}
                onPressIn={() => {
                  animationIn(this.state.animationPressGoogle);
                }}
                onPressOut={() => {
                  animationOut(this.state.animationPressGoogle);
                }}>
                <Animated.View
                  style={[
                    Styles.signup_screen_image_container,
                    {
                      transform: [{scale: this.state.animationPressGoogle}],
                      marginRight: 40,
                    },
                  ]}>
                  <GoogleLogo height={50} width={50} />
                </Animated.View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                disabled={this.state.disable_button ? true : false}
                onPress={() => {
                  this.facebook_login();
                }}
                onPressIn={() => {
                  animationIn(this.state.animationPressFacebook);
                }}
                onPressOut={() => {
                  animationOut(this.state.animationPressFacebook);
                }}>
                <Animated.View
                  style={[
                    Styles.signup_screen_image_container,
                    {
                      transform: [{scale: this.state.animationPressFacebook}],
                      marginLeft: 40,
                    },
                  ]}>
                  <FacebookLogo height={50} width={50} />
                </Animated.View>
              </TouchableWithoutFeedback>
            </View>
          </ScrollView>
        </Animatable.View>
      </KeyboardAvoidingView>
    );
  }
}
export default LoginScreen;
