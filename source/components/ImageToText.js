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
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import Styles from '../style/StyleSheet';
import AsyncStorage from '@react-native-community/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import HeaderComponent from '../components/HeaderComponent';
import {
  show_typing_animation_input_fields,
  show_typing_animation_button,
  show_loading_animation_pantry,
  show_loading_animation_ingredients,
  animationIn,
  animationOut,
  FETCH_URL,
  width,
} from '../functions/FunctionHandler';
import {toast, callToast} from '../functions/Toast';
import AddImage from '../assets/images/add_image.js';
import {ScrollView} from 'react-native-gesture-handler';
import RNTextDetector from 'react-native-text-detector';
var toast_type = '';
var toast_text = '';
class ImageToText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUri: '',
    };
  }
  choosePhotoFromLibrary() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      compressImageQuality: 0.7,
      mediaType: 'photo',
      base64: true,
      cropping: true,
    })
      .then((profilepicture) => {
        this.setState({
          //   imageName: profilepicture.path.split('/').slice(-1)[0],
          //   imageData: profilepicture,
          imageUri: profilepicture.path,
        });
      })
      .catch((err) => {});
  }
  detectText = async () => {
    try {
      const options = {
        quality: 0.8,
        base64: true,
        skipProcessing: true,
      };
      //   const {uri} = await this.camera.takePictureAsync(options);
      const visionResp = await RNTextDetector.detectFromUri(
        this.state.imageUri,
      );
      console.log('visionResp', visionResp);
    } catch (e) {
      console.warn(e);
    }
  };
  render() {
    return (
      <View>
        <HeaderComponent
          navigation={this.props.navigation}
          name={'Image to Recipie'}
        />
        <View style={{paddingTop: 20, paddingLeft: 20, paddingRight: 20}}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.choosePhotoFromLibrary();
            }}>
            <Animated.View style={Styles.add_recipe_image_container}>
              {this.state.imageUri == '' ? (
                <AddImage height={100} width={100} style={{marginLeft: 20}} />
              ) : (
                <Image
                  style={[
                    Styles.signup_screen_image_uploader,
                    {width: '100%', height: '100%'},
                  ]}
                  source={{uri: this.state.imageUri}}
                />
              )}
            </Animated.View>
          </TouchableWithoutFeedback>
          <TouchableOpacity
            disabled={this.state.disabled}
            onPress={() => {
              this.detectText();
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
                  Scrap recipie
                </Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default ImageToText;
