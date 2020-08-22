import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Styles from '../style/StyleSheet';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import AddImage from '../assets/images/add_image.js';
import Feather from 'react-native-vector-icons/Feather';
import {
  show_typing_animation_input_fields,
  show_typing_animation_button,
  show_loading_animation_pantry,
  show_loading_animation_ingredients,
  animationIn,
  animationOut,
  email_regex,
  FETCH_URL,
  width,
} from '../functions/FunctionHandler';
import {toast, callToast} from '../functions/Toast';
import {ScrollView} from 'react-native-gesture-handler';
var toast_type = '';
var toast_text = '';
class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textfield_input_change_check: false,
      profilepictureBase64: '',
      username: '',
      password: '',
      confirm_password: '',
      contentType: '',
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
        console.log(profilepicture);
        this.setState({
          profilepictureBase64: profilepicture.data,
          contentType: profilepicture.mime,
          imageUri: profilepicture.path,
        });
      })
      .catch((err) => {});
  }
  toggle_animation_values(value) {
    if (value == 'password' && this.state.typing_animation_password == false) {
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
  changeToastState() {
    this.setState({
      toast_show: false,
    });
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
  async getUserInfo() {
    try {
      var email = await AsyncStorage.getItem('username');
      var profilepicture = await AsyncStorage.getItem('profilepicture');
      profilepicture = 'data:image/png;base64,' + profilepicture;
      this.setState({
        username: email,
        imageUri: profilepicture,
      });
      console.log(profilepicture);
    } catch (err) {}
  }
  UNSAFE_componentWillMount() {
    this.getUserInfo();
  }
  render() {
    return (
      <View style={Styles.main_container}>
        <View style={Styles.toast_styling}>
          {toast(toast_type, toast_text)}
          {this.state.toast_show ? callToast() : null}
        </View>
        <View flex={0.5}>
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
              <Text style={Styles.home_screen_headers_text}>My Profile</Text>
            </Animatable.View>
          </View>
        </View>
        <Animatable.View
          delay={400}
          duration={1500}
          animation="bounceInUp"
          style={Styles.home_screens_bottom}>
          <Animatable.Text
            animation="rubberBand"
            iterationCount="infinite"
            iterationDelay={1000}
            style={Styles.login_screen_login_text}>
            Want to edit?
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
              {this.state.imageUri != '' ? (
                <Image
                  style={Styles.signup_screen_image_uploader}
                  source={{uri: this.state.imageUri}}
                />
              ) : null}
            </Animated.View>
          </TouchableWithoutFeedback>
          <View style={Styles.login_screen_input_fields_container}>
            {this.state.typing_animation_email ? (
              show_typing_animation_input_fields()
            ) : (
              <FontAwesome name="user" color="#EF6C00" size={30} />
            )}
            <TextInput
              editable={false}
              ref="email_input"
              value={this.state.username}
              style={Styles.input_field}
              placeholder="Email"
            />
            <Feather name="check-circle" color="green" size={20} />
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
              placeholder="Old password"
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
              placeholder="New assword"
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
        </Animatable.View>
      </View>
    );
  }
}
export default ProfileScreen;
