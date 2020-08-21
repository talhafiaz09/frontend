import {TouchableOpacity, Image, TextInput, Text, View} from 'react-native';
import React, {Component} from 'react';
import Styles from '../style/StyleSheet';
import {toast, callToast} from '../functions/Toast';
import {
  width,
  email_regex,
  animationIn,
  animationOut,
  FETCH_URL,
  show_typing_animation_input_fields,
  show_typing_animation_button,
} from '../functions/FunctionHandler';
var toast_type = '';
var toast_text = '';
class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: false,
      toast_show: false,
      pin1: '',
      pin2: '',
      pin3: '',
      pin4: '',
      typing_animation_button: false,
    };
  }
  //   changePassword() {
  //     fetch(FETCH_URL.IP + '/user/forgetpassword', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         username: this.props.route.params.username.toLowerCase(),
  //         password: this.props.route.params.password,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.success) {
  //           toast_type = 'success';
  //           toast_text = 'Password Changed';
  //           this.setState({
  //             toast_show: true,
  //           });
  //           setTimeout(() => {
  //             this.setState({
  //               toast_show: false,
  //             });
  //             this.props.navigation.pop();
  //           }, 500);
  //         } else {
  //           this.setState({
  //             toast_show: true,
  //           });
  //           toast_type = 'error';
  //           toast_text = 'Password not changed';
  //         }
  //       })
  //       .catch((error) => {
  //         if ('Timeout' || 'Network request failed') {
  //           this.setState({
  //             toast_show: true,
  //           });
  //           toast_type = 'error';
  //           toast_text = 'Network failure';
  //         }
  //       });
  //     setTimeout(() => {
  //       this.setState({
  //         toast_show: false,
  //       });
  //     }, 250);
  //   }
  render() {
    const {pin1, pin2, pin3, pin4} = this.state;
    return (
      <View flex={1}>
        <View style={Styles.toast_styling}>
          {toast(toast_type, toast_text)}
          {this.state.toast_show ? callToast() : null}
        </View>
        <View style={[Styles.main_container, {padding: 20}]}>
          <View flex={0.4}>
            <Text style={Styles.title}>Forget Password</Text>
            <Image
              style={Styles.icon}
              source={{
                uri:
                  'https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png',
              }}
            />
            <Text style={Styles.subTitle}>
              Please enter the verification code{'\n'}
              we send to your email address
            </Text>
          </View>
          <View flex={0.6} style={{}}>
            <View
              style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
              <TextInput
                keyboardType="numeric"
                ref={'pin1ref'}
                value={pin1}
                maxLength={1}
                onChangeText={(pin1) => {
                  this.setState({pin1: pin1});
                  if (pin1 != '') {
                    this.refs.pin2ref.focus();
                  }
                }}
                style={Styles.pin_fields}></TextInput>
              <TextInput
                keyboardType="numeric"
                ref={'pin2ref'}
                value={pin2}
                maxLength={1}
                onChangeText={(pin2) => {
                  this.setState({pin2: pin2});
                  if (pin2 != '') {
                    this.refs.pin3ref.focus();
                  }
                }}
                style={Styles.pin_fields}></TextInput>
              <TextInput
                keyboardType="numeric"
                ref={'pin3ref'}
                value={pin3}
                maxLength={1}
                onChangeText={(pin3) => {
                  this.setState({pin3: pin3});
                  if (pin3 != '') {
                    this.refs.pin4ref.focus();
                  }
                }}
                style={Styles.pin_fields}></TextInput>
              <TextInput
                keyboardType="numeric"
                ref={'pin4ref'}
                value={pin4}
                maxLength={1}
                onChangeText={(pin4) => {
                  this.setState({pin4: pin4});
                  if (pin4 != '') {
                    this.refs.pin4ref.blur();
                  }
                }}
                style={Styles.pin_fields}></TextInput>
            </View>

            <View style={Styles.nextButton}>
              <TouchableOpacity
                disabled={this.state.isDisabled}
                onPress={() => {
                  this.setState({
                    typing_animation_button: true,
                  });
                  var code =
                    this.state.pin1 +
                    this.state.pin2 +
                    this.state.pin3 +
                    this.state.pin4;
                  console.log(this.props);
                  if (code == this.props.route.params.code) {
                    this.setState({isDisabled: true});
                    this.setState({
                      toast_show: true,
                    });
                    toast_type = 'success';
                    toast_text = 'Correct code';
                    setTimeout(() => {
                      this.setState({toast_show: false});
                      this.props.navigation.replace('Changepasswordscreen', {
                        username: this.props.route.params.username,
                      });
                    }, 500);
                  } else {
                    this.setState({
                      isDisabled: false,
                      typing_animation_button: false,
                      toast_show: true,
                    });
                    toast_type = 'error';
                    toast_text = 'Wronge code';
                    setTimeout(() => {
                      this.setState({toast_show: false});
                    }, 250);
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
export default ForgetPassword;
