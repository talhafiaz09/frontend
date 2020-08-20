import {TouchableOpacity, Image, TextInput, Text, View} from 'react-native';
import React, {Component} from 'react';
import Styles from '../style/StyleSheet';
import {toast, callToast} from '../functions/Toast';
var toast_type = '';
var toast_text = '';
class VerificationCodeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      toast_show: false,
      pin1: '',
      pin2: '',
      pin3: '',
      pin4: '',
    };
  }
  saveUser() {
    fetch(FETCH_URL.IP + '/user/signupAfterConfirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.props.route.params.username,
        password: this.props.route.params.password,
        profilepictureBase64: this.props.route.params.profilepictureBase64,
        contentType: this.props.route.params.contentType,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          this.setState({
            toast_show: true,
          });
          toast_type = 'success';
          toast_text = 'Registration successful';
        } else {
          this.setState({
            toast_show: true,
          });
          toast_type = 'error';
          toast_text = 'Registration unsuccessful';
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
  render() {
    const {pin1, pin2, pin3, pin4} = this.state;
    return (
      <View style={[Styles.main_container, {padding: 20}]}>
        <View style={Styles.toast_styling}>
          {toast(toast_type, toast_text)}
          {this.state.toast_show ? callToast() : null}
        </View>
        <View flex={0.4}>
          <Text style={Styles.title}>Verification</Text>
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
          <View style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
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
              disabled={false}
              onPress={() => {
                var code =
                  this.state.pin1 +
                  this.state.pin2 +
                  this.state.pin3 +
                  this.state.pin4;
                console.log(this.props);
                if (code == this.props.route.params.code) {
                  this.saveUser();
                } else {
                  this.setState({
                    toast_show: true,
                  });
                  toast_type = 'error';
                  toast_text = 'Wronge code';
                  setTimeout(() => {
                    this.setState({toast_show: false});
                  }, 250);
                }
              }}>
              <Text style={Styles.nextButtonText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
export default VerificationCodeScreen;
