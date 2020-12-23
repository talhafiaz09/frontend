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
import LottieView from 'lottie-react-native';
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
      premium: false,
      show: false,
      useremail: '',
      stepsArray: [],
      ingredientArray: [],
    };
  }
  componentDidMount = () => {
    this.getUserInfo();
  };
  async getUserInfo() {
    try {
      var email = await AsyncStorage.getItem('username');
      this.setState({
        useremail: email,
      });
      fetch(FETCH_URL.IP + '/user/finduser/' + this.state.useremail, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.success && data.result.premium) {
            this.setState({premium: true, show: true});
          } else {
            this.setState({premium: false, show: true});
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
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
      var steps = [];
      var ingredient = [];
      if (visionResp.length !== 0) {
        for (var i = 0; i < visionResp.length; i++) {
          if (
            visionResp[i].text === 'ingredients' ||
            visionResp[i].text === 'You will need:'
          ) {
            for (var j = i + 1; j < visionResp.length - 1; j++) {
              if (
                visionResp[j].text === 'steps' ||
                visionResp[j].text === 'What to do:'
              ) {
                j = visionResp.length;
              } else {
                ingredient.push(visionResp[j].text);
                // console.log(visionResp[j].text);
              }
            }
          } else if (
            visionResp[i].text === 'steps' ||
            visionResp[i].text === 'What to do:'
          ) {
            for (var j = i + 1; j < visionResp.length - 1; j++) {
              if (
                visionResp[j].text === 'ingredients' ||
                visionResp[j].text === 'You will need:'
              ) {
                j = visionResp.length;
              } else {
                steps.push(visionResp[j].text);
                // console.log(visionResp[j].text);
              }
            }
          }
        }
        this.setState({stepsArray: steps, ingredientArray: ingredient});
        this.props.navigation.navigate('ImagetoTextEdit', {
          ingredients: this.state.ingredientArray,
          steps: this.state.stepsArray,
          useremail: this.state.useremail,
          navigation: this.props.navigation,
        });
      }
      // console.log(steps);
      // console.log(ingredient);
      // console.log('visionResp', visionResp[0].text);
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
          {this.state.show === true ? (
            this.state.premium === false ? (
              <Animatable.View
                delay={500}
                duration={2000}
                animation="bounceIn"
                style={{height: '80%', alignItems: 'center'}}>
                <LottieView
                  style={Styles.lottie_carousel}
                  resizeMode="cover"
                  source={require('../assets/lottie_animations/foodcarousel.json')}
                  autoPlay
                  loop></LottieView>
                <Text
                  style={{
                    fontFamily: 'Comfortaa-Bold',
                    alignContent: 'center',
                    textAlign: 'center',
                    fontSize: 18,
                    color: '#fff',
                  }}>
                  You are a not a premium user{'\n'}You can't use this feature
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Payment');
                  }}
                  style={{width: '100%'}}>
                  <View
                    style={[
                      Styles.login_screen_buttons_container,
                      {width: '100%', height: 50},
                    ]}>
                    <LinearGradient
                      colors={['#003152', '#1D2951']}
                      style={
                        Styles.login_screen_buttons_container_linear_gradient
                      }>
                      <Text
                        style={
                          Styles.login_screen_buttons_container_linear_gradient_text
                        }>
                        Make payment
                      </Text>
                    </LinearGradient>
                  </View>
                </TouchableOpacity>
              </Animatable.View>
            ) : (
              <View>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.choosePhotoFromLibrary();
                  }}>
                  <Animated.View style={Styles.add_recipe_image_container}>
                    {this.state.imageUri == '' ? (
                      <AddImage
                        height={100}
                        width={100}
                        style={{marginLeft: 20}}
                      />
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
                      style={
                        Styles.login_screen_buttons_container_linear_gradient
                      }>
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
            )
          ) : (
            <View style={{justifyContent: 'center', height: '100%'}}>
              {show_loading_animation_pantry()}
            </View>
          )}
        </View>
      </View>
    );
  }
}
export default ImageToText;
