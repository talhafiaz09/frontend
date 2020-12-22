import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Animated,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Styles from '../style/StyleSheet';
import HeaderComponent from '../components/HeaderComponent';
import {toast, callToast} from '../functions/Toast';
import stripe from 'react-native-stripe-payments';
stripe.setOptions({
  publishingKey:
    'pk_test_51I0nR6IpSAU7SrUWXLAhMpV7VWmeaeJst4UUMybOcM3aO7U6K7quubVd5QgJFihUzvX6kOHQHgDPLHKKj9oYY9p8006zpwihJV',
});
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {
  width,
  email_regex,
  animationIn,
  animationOut,
  FETCH_URL,
  show_typing_animation_input_fields,
  show_loading_animation_pantry,
  show_typing_animation_button,
} from '../functions/FunctionHandler';
import AsyncStorage from '@react-native-community/async-storage';
import {
  CreditCardInput,
  LiteCreditCardInput,
} from 'react-native-credit-card-input';
var toast_type = '';
var toast_text = '';
export default class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      toast_show: false,
      number: '',
      expiry: '',
      cvc: '',
      useremail: '',
    };
  }
  _onChange = (form) => {
    if (form.valid === true) {
      this.setState({
        disabled: false,
        cvc: form.values.cvc,
        number: form.values.number,
        expiry: form.values.expiry,
      });
    } else if (form.valid === false) {
    }
  };
  validCard = () => {
    const isCardValid = stripe.isCardValid({
      number: '4242424242424242',
      expMonth: 10,
      expYear: 21,
      cvc: '888',
    });
    if (isCardValid) {
      toast_type = 'success';
      toast_text = 'Payment made';
      this.setState({
        toast_show: true,
      });
      this.updateUser();
    } else {
      toast_type = 'error';
      toast_text = 'Invalid card';
      this.setState({
        toast_show: true,
      });
    }
    setTimeout(() => {
      this.setState({
        toast_show: false,
      });
    }, 500);
  };
  componentDidMount = () => {
    this.getUserInfo();
  };
  async getUserInfo() {
    try {
      var email = await AsyncStorage.getItem('username');
      this.setState({
        useremail: email,
      });
    } catch (err) {}
  }
  updateUser = () => {
    fetch(FETCH_URL.IP + '/user/updateuserpremium', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({useremail: this.state.useremail}),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTimeout(() => {
            this.setState({
              toast_show: false,
            });
            this.props.navigation.navigate('Home');
          }, 500);
        }
      })
      .catch((error) => {
        if ('Timeout' || 'Network request failed') {
          toast_type = 'error';
          toast_text = 'Network failure';
          this.setState({
            toast_show: true,
          });
        }
      });
  };
  render() {
    return (
      <View>
        <View style={Styles.toast_styling}>
          {toast(toast_type, toast_text)}
          {this.state.toast_show ? callToast() : null}
        </View>
        <HeaderComponent navigation={this.props.navigation} name={'Payment'} />
        <View style={{marginTop: 20}}>
          <CreditCardInput
            onChange={this._onChange}
            inputStyle={{color: '#fff'}}
            labelStyle={{fontFamily: 'Comfortaa-Bold'}}
          />
        </View>
        <View style={{padding: 30}}>
          <TouchableOpacity
            disabled={this.state.disabled}
            onPress={() => {
              this.validCard();
            }}>
            <View
              style={[
                Styles.login_screen_buttons_container,
                {width: '100%', height: 50},
              ]}>
              <LinearGradient
                colors={['#003152', '#1D2951']}
                style={Styles.login_screen_buttons_container_linear_gradient}>
                <Text
                  style={
                    Styles.login_screen_buttons_container_linear_gradient_text
                  }>
                  Pay Rs: 200/-
                </Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
