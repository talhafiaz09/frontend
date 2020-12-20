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
import {CheckBox} from 'react-native-elements';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from '../style/StyleSheet';
import * as Animatable from 'react-native-animatable';
import Video from 'react-native-video';
import Logoimage from '../assets/images/logo.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import RNFetchBlob from 'rn-fetch-blob';
import {toast, callToast} from '../functions/Toast';
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
import FacebookLogo from '../assets/images/facebook.js';
import GoogleLogo from '../assets/images/google.js';
import ImgToBase64 from 'react-native-image-base64';
import CustomTextField from './CustomTextField';
import NutritionFields from './NutritionFields';
import HeaderComponent from '../components/HeaderComponent';
import AddImage from '../assets/images/add_image.js';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
var toast_type = '';
var toast_text = '';
class EditRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUri: '',
      videoUri: '',
      cusine_name: [
        'Asian',
        'Caribbean',
        'Chinese',
        'French',
        'German',
        'Indian & Thai',
        'Italian',
        'Mediterranean',
        'Mexican',
        'Pakistani',
      ],
      cusine_check: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      meal_type: [
        'Dessert',
        'Breakfast',
        'Dinner',
        'Lunch',
        'Juices & Milkshakes',
        'Vegiterian',
      ],
      meal_check: [false, false, false, false, false, false],
      steps: [],
      ingredients: [],
      imageData: null,
      imageName: '',
      videoData: null,
      videoName: '',
      toast_show: false,
      useremail: '',
      showModal: false,
      name: '',
      mealtype: [],
      cuisine: [],
      timerequired: [],
      imageURL: '',
      nutrition: {
        proteins: '',
        fats: '',
        fiber: '',
        vitamins: '',
        carbohydrate: '',
      },
      video: '',
      show_model: false,
      uploaderror: false,
      recipeId: '',
    };
  }
  componentDidMount = () => {
    console.log(this.props.route.params.mealtype);
    for (var i = 0; i < this.props.route.params.ingredients.length; i++) {
      this.state.ingredients.push({name: '', quantity: ''});
      this.state.ingredients[i].name = this.props.route.params.ingredients[i];
      this.state.ingredients[
        i
      ].quantity = this.props.route.params.ingredients_quantity[i];
    }
    if (this.props.route.params.cuisine.includes('Asian')) {
      this.state.cusine_check[0] = true;
    }
    if (this.props.route.params.cuisine.includes('Caribbean')) {
      this.state.cusine_check[1] = true;
    }
    if (this.props.route.params.cuisine.includes('Chinese')) {
      this.state.cusine_check[2] = true;
    }
    if (this.props.route.params.cuisine.includes('French')) {
      this.state.cusine_check[3] = true;
    }
    if (this.props.route.params.cuisine.includes('German')) {
      this.state.cusine_check[4] = true;
    }
    if (this.props.route.params.cuisine.includes('Indian & Thai')) {
      this.state.cusine_check[5] = true;
    }
    if (this.props.route.params.cuisine.includes('Italian')) {
      this.state.cusine_check[6] = true;
    }
    if (this.props.route.params.cuisine.includes('Mediterranean')) {
      this.state.cusine_check[7] = true;
    }
    if (this.props.route.params.cuisine.includes('Mexican')) {
      this.state.cusine_check[8] = true;
    }
    if (this.props.route.params.cuisine.includes('Pakistani')) {
      this.state.cusine_check[9] = true;
    }
    if (this.props.route.params.mealtype.includes('Dessert')) {
      this.state.meal_check[0] = true;
    }
    if (this.props.route.params.mealtype.includes('Breakfast')) {
      this.state.meal_check[1] = true;
    }
    if (this.props.route.params.mealtype.includes('Dinner')) {
      this.state.meal_check[2] = true;
    }
    if (this.props.route.params.mealtype.includes('Lunch')) {
      this.state.meal_check[3] = true;
    }
    if (this.props.route.params.mealtype.includes('Juices & Milkshakes')) {
      this.state.meal_check[4] = true;
    }
    if (this.props.route.params.mealtype.includes('Vegiterian')) {
      this.state.meal_check[5] = true;
    }
    // this.state.name = this.props.route.params.name;
    // this.state.nutrition = this.props.route.params.nutrition;
    this.setState({
      recipeId: this.props.route.params.id,
      name: this.props.route.params.name,
      imageUri: this.props.route.params.imageURl,
      videoUri: this.props.route.params.videoURl,
      ingredients: this.state.ingredients,
      steps: this.props.route.params.steps,
      imageURL: this.props.route.params.imageURl,
      video: this.props.route.params.videoURl,
      nutrition: this.props.route.params.nutrition,
      useremail: this.props.route.params.useremail,
      timerequired: this.props.route.params.timerequired,
      meal_check: this.state.meal_check,
      cusine_check: this.state.cusine_check,
      mealtype: this.props.route.params.mealtype,
      cuisine: this.props.route.params.cuisine,
    });
    // console.log(this.state.nutrition.proteins);
  };
  async getUserInfo() {
    try {
      var name = await AsyncStorage.getItem('username');
      this.setState({
        useremail: name,
      });
    } catch (err) {}
  }
  stepFieldsChangeTextHandler = (text, key) => {
    this.state.steps[key] = text;
    this.setState({steps: this.state.steps});
  };
  stepFieldsDeleteHandler = (key) => {
    this.state.steps.splice(key, 1);
    this.setState({
      steps: this.state.steps,
    });
  };
  ingredientFieldsChangeTextHandlerName = (text, key) => {
    this.state.ingredients[key].name = text;
    this.setState({ingredients: this.state.ingredients});
  };
  ingredientFieldsChangeTextHandlerQuantity = (text, key) => {
    this.state.ingredients[key].quantity = text;
    this.setState({ingredients: this.state.ingredients});
  };
  ingredientFieldsDeleteHandler = (key) => {
    this.state.ingredients.splice(key, 1);
    this.setState({
      ingredients: this.state.ingredients,
    });
  };
  mapstepFields = () => {
    return this.state.steps.map((value, key) => {
      return (
        <Animatable.View
          animation="bounceInLeft"
          duration={1000}
          key={key}
          style={{flexDirection: 'row'}}>
          <View style={[Styles.custom_text_field, {flex: 1}]}>
            <FontAwesome name={'pencil'} color="#EF6C00" size={23} />
            <TextInput
              onChangeText={(text) => {
                this.stepFieldsChangeTextHandler(text, key);
              }}
              value={this.state.steps[key]}
              style={[Styles.search_bar_styling]}
              placeholder={'Step ' + (key + 1)}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                this.stepFieldsDeleteHandler(key);
              }}>
              <Text
                style={{
                  color: 'blue',
                  fontFamily: 'Comfortaa-Bold',
                  fontSize: 18,
                  paddingLeft: 10,
                }}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      );
    });
  };
  mapingredientFields = () => {
    return this.state.ingredients.map((value, key) => {
      return (
        <Animatable.View
          animation="bounceInLeft"
          duration={1000}
          key={key}
          style={{flexDirection: 'row'}}>
          <View style={[Styles.custom_text_field, {flex: 1}]}>
            <FontAwesome name={'pencil'} color="#EF6C00" size={23} />
            <TextInput
              onChangeText={(text) => {
                this.ingredientFieldsChangeTextHandlerName(text, key);
              }}
              value={this.state.ingredients[key].name}
              style={[Styles.search_bar_styling]}
              placeholder={'Ingredient ' + (key + 1)}
            />
          </View>
          <View
            style={{paddingLeft: 5, paddingRight: 5, justifyContent: 'center'}}>
            <Text style={{fontFamily: 'Comfortaa-Bold', fontSize: 16}}>-</Text>
          </View>
          <View style={[Styles.custom_text_field, {flex: 1}]}>
            <FontAwesome name={'pencil'} color="#EF6C00" size={23} />
            <TextInput
              onChangeText={(text) => {
                this.ingredientFieldsChangeTextHandlerQuantity(text, key);
              }}
              value={this.state.ingredients[key].quantity}
              style={[Styles.search_bar_styling]}
              placeholder="Quantity"
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                this.ingredientFieldsDeleteHandler(key);
              }}>
              <Text
                style={{
                  color: 'blue',
                  fontFamily: 'Comfortaa-Bold',
                  fontSize: 18,
                  paddingLeft: 10,
                }}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      );
    });
  };
  choosePhotoFromLibrary() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      mediaType: 'photo',
      cropping: true,
    })
      .then((profilepicture) => {
        // console.log(profilepicture);
        this.setState({
          imageName: profilepicture.path.split('/').slice(-1)[0],
          imageData: profilepicture,
          imageUri: profilepicture.path,
        });
      })
      .catch((err) => {});
  }
  chooseVideoFromLibrary() {
    ImagePicker.openPicker({
      mediaType: 'video',
      // duration: 60000,
    })
      .then((video) => {
        // console.log(video);
        this.setState({
          videoUri: video.path,
          videoName: video.path.split('/').slice(-1)[0],
          videoData: video,
        });
      })
      .catch((err) => {});
  }
  cusinrarrayhandler(index) {
    let array = this.state.cusine_check;
    array[index] = !array[index];
    this.state.cuisine = [];
    this.setState({cusine_check: array, cuisine: this.state.cuisine});
    let arraynames = this.state.cusine_check.reduce(
      (out, bool, index) => (bool ? out.concat(index) : out),
      [],
    );
    // console.log(arraynames);

    for (var i = 0; i < arraynames.length; i++) {
      var x = this.state.cusine_name[arraynames[i]];
      this.state.cuisine.push(x);
      this.setState({
        cuisine: this.state.cuisine,
      });
    }
    // console.log(this.state.cuisine);
  }
  mealarrayhandler(index) {
    let array = this.state.meal_check;
    array[index] = !array[index];
    this.state.mealtype = [];
    this.setState({meal_check: array, mealtype: this.state.mealtype});
    let arraynames = this.state.meal_check.reduce(
      (out, bool, index) => (bool ? out.concat(index) : out),
      [],
    );
    for (var i = 0; i < arraynames.length; i++) {
      // var x = this.state.mealtype.push(i);
      var x = this.state.meal_type[arraynames[i]];
      this.state.mealtype.push(x);
      this.setState({
        mealtype: this.state.mealtype,
      });
    }
    // console.log(this.state.mealtype);
  }
  addRecipe = () => {
    this.setState({show_model: true});
    let image = {
      uri: this.state.imageData.path,
      type: this.state.imageData.mime,
      name: this.state.imageName,
    };
    let video = {
      uri: this.state.videoData.path,
      type: this.state.videoData.mime,
      name: this.state.videoName,
    };
    console.log(image);
    console.log(video);
    const dataImage = new FormData();
    dataImage.append('file', image);
    dataImage.append('upload_preset', 'my_fridge');
    dataImage.append('cloud_name', 'talhafiaz09');
    const dataVideo = new FormData();
    dataVideo.append('file', video);
    dataVideo.append('upload_preset', 'my_fridge');
    dataVideo.append('cloud_name', 'talhafiaz09');
    console.log(dataImage);
    console.log(dataVideo);
    fetch('https://api.cloudinary.com/v1_1/talhafiaz09/image/upload', {
      method: 'post',
      body: dataImage,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.secure_url);
        this.setState({imageURL: data.secure_url});
        fetch('https://api.cloudinary.com/v1_1/talhafiaz09/video/upload', {
          method: 'post',
          body: dataVideo,
        })
          .then((res) => res.json())
          .then((_data) => {
            console.log(_data);
            this.setState({video: _data.secure_url});
          })
          .catch((error) => {
            this.setState({uploaderror: true});
            console.log(error);
          });
      })
      .catch((error) => {
        this.setState({uploaderror: true});
        console.log(error);
      });
  };
  updateData = () => {
    this.setState({show_model: true});
    // console.log(this.state.mealtype);
    fetch(
      FETCH_URL.IP + '/recipe/updatemyrecipie/' + this.props.route.params.id,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          ingredients: this.state.ingredients,
          mealtype: this.state.mealtype,
          steps: this.state.steps,
          cuisine: this.state.cuisine,
          timerequired: this.state.timerequired,
          imageURL: this.state.imageURL,
          nutrition: this.state.nutrition,
          video: this.state.video,
          useremail: this.state.useremail,
        }),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success) {
          this.setState({show_model: false, uploaderror: false});
          this.props.route.params.navigation.pop(2);
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({uploaderror: true});
        if (
          error.message === 'Timeout' ||
          error.message === 'Network request failed'
        ) {
        }
      });
  };
  nameFieldTextHandler = (text) => {
    // console.log(text);
    this.setState({name: text});
  };
  timerequiredFieldTextHandler = (text) => {
    // console.log(text);
    this.setState({timerequired: text});
  };
  proteinfieldTextHandler = (text) => {
    this.state.nutrition.proteins = text;
    this.setState({nutrition: this.state.nutrition});
    // console.log(this.state.nutrition);
  };
  fatsfieldTextHandler = (text) => {
    this.state.nutrition.fats = text;
    this.setState({nutrition: this.state.nutrition});
    // console.log(this.state.nutrition);
  };
  fiberfieldTextHandler = (text) => {
    this.state.nutrition.fiber = text;
    this.setState({nutrition: this.state.nutrition});
    // console.log(this.state.nutrition);
  };
  vitaminsfieldTextHandler = (text) => {
    this.state.nutrition.vitamins = text;
    this.setState({nutrition: this.state.nutrition});
    // console.log(this.state.nutrition);
  };
  carbohydratefieldTextHandler = (text) => {
    this.state.nutrition.carbohydrate = text;
    this.setState({nutrition: this.state.nutrition});
    // console.log(this.state.nutrition);
  };
  checkInputs = () => {
    // console.log(this.state.name.length);
    if (
      this.state.name.length < 1 ||
      this.state.imageUri.length < 1 ||
      this.state.videoUri.length < 1 ||
      this.state.cuisine.length < 1 ||
      this.state.mealtype.length < 1 ||
      this.state.timerequired.length < 1
    ) {
      toast_type = 'error';
      toast_text = 'Fields missing';
      this.setState({
        toast_show: true,
      });
    } else {
      //   this.addRecipe();
      this.updateData();
    }
    setTimeout(() => {
      this.setState({
        toast_show: false,
      });
    }, 500);
  };
  render() {
    return (
      <View flex={1} style={{backgroundColor: '#EF6C00'}}>
        <View style={Styles.toast_styling}>
          {toast(toast_type, toast_text)}
          {this.state.toast_show ? callToast() : null}
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.show_model}>
          <KeyboardAvoidingView
            behavior="height"
            style={{justifyContent: 'center', width: '100%', height: '100%'}}>
            <View
              style={{
                height: 200,
                width: '80%',
                // backgroundColor: '#FFDEAD',
                backgroundColor: '#ffcc00',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 1,
                shadowRadius: 5,
                elevation: 1,
                alignSelf: 'center',
                borderRadius: 20,
                paddingLeft: 10,
                alignItems: 'center',
                // justifyContent: 'center',
                paddingRight: 10,
              }}>
              {this.state.uploaderror ? (
                <View width="100%" style={{marginRight: 20, marginTop: 10}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({show_model: false, uploaderror: false});
                    }}>
                    <MaterialCommunityIcons
                      name="close-box"
                      size={30}
                      style={{alignSelf: 'flex-end'}}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}
              {this.state.uploaderror ? (
                <View
                  style={{
                    height: '70%',
                    justifyContent: 'center',
                    // backgroundColor: 'red',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Comfortaa-Bold',
                      fontSize: 18,
                      color: 'red',
                    }}>
                    Updating error
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    height: '100%',
                    justifyContent: 'center',
                    // backgroundColor: 'red',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Comfortaa-Bold',
                      fontSize: 18,
                      marginBottom: 40,
                    }}>
                    Updating...
                  </Text>
                  {show_loading_animation_pantry()}
                </View>
              )}
            </View>
          </KeyboardAvoidingView>
        </Modal>
        <View style={Styles.home_screen_headers}>
          <Animatable.View animation="bounceInLeft" duration={1500}>
            <TouchableOpacity
              onPress={() => {
                this.props.route.params.navigation.pop();
              }}>
              <AntDesign
                style={Styles.drawer_open}
                name="arrowleft"
                color="white"
                size={35}
              />
            </TouchableOpacity>
          </Animatable.View>
          <Animatable.View
            animation="bounceInRight"
            duration={1500}
            style={Styles.home_screen_headers_text_container}>
            <Text style={Styles.home_screen_headers_text}>Edit Recipie</Text>
          </Animatable.View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingTop: 20, paddingLeft: 20, paddingRight: 20}}>
            <Animatable.View
              animation="bounceInRight"
              duration={1500}
              delay={200}>
              <View>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Comfortaa-Bold',
                    fontSize: 20,
                    paddingLeft: 5,
                  }}>
                  Add image:
                </Text>
              </View>
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
                      style={Styles.signup_screen_image_uploader}
                      source={{uri: this.state.imageUri}}
                    />
                  )}
                </Animated.View>
              </TouchableWithoutFeedback>
            </Animatable.View>
            <CustomTextField
              iconName={'pencil'}
              placeholder={'Enter name'}
              headingName={'Name:'}
              nameFieldTextHandler={this.nameFieldTextHandler}
              value={this.state.name}
            />

            <Animatable.View
              animation="bounceInRight"
              duration={1500}
              delay={200}>
              <View>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Comfortaa-Bold',
                    fontSize: 20,
                    paddingLeft: 5,
                  }}>
                  Cuisine:
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <CheckBox
                  title={this.state.cusine_name[0]}
                  checked={this.state.cusine_check[0]}
                  onPress={() => {
                    this.cusinrarrayhandler(0);
                  }}
                  fontFamily="Comfortaa-Bold"
                  checkedColor={'#ffffff'}
                  uncheckedColor={'#ffffff'}
                  containerStyle={{
                    backgroundColor: 'trans',
                    borderColor: '#00000000',
                    width: '50%',
                  }}
                />
                <CheckBox
                  title={this.state.cusine_name[1]}
                  checked={this.state.cusine_check[1]}
                  onPress={() => {
                    this.cusinrarrayhandler(1);
                  }}
                  fontFamily="Comfortaa-Bold"
                  checkedColor={'#ffffff'}
                  uncheckedColor={'#ffffff'}
                  containerStyle={{
                    backgroundColor: 'trans',
                    borderColor: '#00000000',
                    width: '50%',
                  }}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <CheckBox
                  title={this.state.cusine_name[2]}
                  checked={this.state.cusine_check[2]}
                  onPress={() => {
                    this.cusinrarrayhandler(2);
                  }}
                  fontFamily="Comfortaa-Bold"
                  checkedColor={'#ffffff'}
                  uncheckedColor={'#ffffff'}
                  containerStyle={{
                    backgroundColor: 'trans',
                    borderColor: '#00000000',
                    width: '50%',
                  }}
                />
                <CheckBox
                  title={this.state.cusine_name[3]}
                  checked={this.state.cusine_check[3]}
                  onPress={() => {
                    this.cusinrarrayhandler(3);
                  }}
                  fontFamily="Comfortaa-Bold"
                  checkedColor={'#ffffff'}
                  uncheckedColor={'#ffffff'}
                  containerStyle={{
                    backgroundColor: 'trans',
                    borderColor: '#00000000',
                    width: '50%',
                  }}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <CheckBox
                  title={this.state.cusine_name[4]}
                  checked={this.state.cusine_check[4]}
                  onPress={() => {
                    this.cusinrarrayhandler(4);
                  }}
                  fontFamily="Comfortaa-Bold"
                  checkedColor={'#ffffff'}
                  uncheckedColor={'#ffffff'}
                  containerStyle={{
                    backgroundColor: 'trans',
                    borderColor: '#00000000',
                    width: '50%',
                  }}
                />
                <CheckBox
                  title={this.state.cusine_name[5]}
                  checked={this.state.cusine_check[5]}
                  onPress={() => {
                    this.cusinrarrayhandler(5);
                  }}
                  fontFamily="Comfortaa-Bold"
                  checkedColor={'#ffffff'}
                  uncheckedColor={'#ffffff'}
                  containerStyle={{
                    backgroundColor: 'trans',
                    borderColor: '#00000000',
                    width: '50%',
                  }}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <CheckBox
                  title={this.state.cusine_name[6]}
                  checked={this.state.cusine_check[6]}
                  onPress={() => {
                    this.cusinrarrayhandler(6);
                  }}
                  fontFamily="Comfortaa-Bold"
                  checkedColor={'#ffffff'}
                  uncheckedColor={'#ffffff'}
                  containerStyle={{
                    backgroundColor: 'trans',
                    borderColor: '#00000000',
                    width: '50%',
                  }}
                />
                <CheckBox
                  title={this.state.cusine_name[7]}
                  checked={this.state.cusine_check[7]}
                  onPress={() => {
                    this.cusinrarrayhandler(7);
                  }}
                  fontFamily="Comfortaa-Bold"
                  checkedColor={'#ffffff'}
                  uncheckedColor={'#ffffff'}
                  containerStyle={{
                    backgroundColor: 'trans',
                    borderColor: '#00000000',
                    width: '50%',
                  }}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <CheckBox
                  title={this.state.cusine_name[8]}
                  checked={this.state.cusine_check[8]}
                  onPress={() => {
                    this.cusinrarrayhandler(8);
                  }}
                  fontFamily="Comfortaa-Bold"
                  checkedColor={'#ffffff'}
                  uncheckedColor={'#ffffff'}
                  containerStyle={{
                    backgroundColor: 'trans',
                    borderColor: '#00000000',
                    width: '50%',
                  }}
                />
                <CheckBox
                  title={this.state.cusine_name[9]}
                  checked={this.state.cusine_check[9]}
                  onPress={() => {
                    this.cusinrarrayhandler(9);
                  }}
                  fontFamily="Comfortaa-Bold"
                  checkedColor={'#ffffff'}
                  uncheckedColor={'#ffffff'}
                  containerStyle={{
                    backgroundColor: 'trans',
                    borderColor: '#00000000',
                    width: '50%',
                  }}
                />
              </View>
            </Animatable.View>

            <Animatable.View
              animation="bounceInRight"
              duration={1500}
              delay={200}>
              <View>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Comfortaa-Bold',
                    fontSize: 20,
                    paddingLeft: 5,
                  }}>
                  Meal type:
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <CheckBox
                  title={this.state.meal_type[0]}
                  checked={this.state.meal_check[0]}
                  onPress={() => {
                    this.mealarrayhandler(0);
                  }}
                  fontFamily="Comfortaa-Bold"
                  checkedColor={'#ffffff'}
                  uncheckedColor={'#ffffff'}
                  containerStyle={{
                    backgroundColor: 'trans',
                    borderColor: '#00000000',
                    width: '50%',
                  }}
                />
                <CheckBox
                  title={this.state.meal_type[1]}
                  checked={this.state.meal_check[1]}
                  onPress={() => {
                    this.mealarrayhandler(1);
                  }}
                  fontFamily="Comfortaa-Bold"
                  checkedColor={'#ffffff'}
                  uncheckedColor={'#ffffff'}
                  containerStyle={{
                    backgroundColor: 'trans',
                    borderColor: '#00000000',
                    width: '50%',
                  }}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <CheckBox
                  title={this.state.meal_type[2]}
                  checked={this.state.meal_check[2]}
                  onPress={() => {
                    this.mealarrayhandler(2);
                  }}
                  fontFamily="Comfortaa-Bold"
                  checkedColor={'#ffffff'}
                  uncheckedColor={'#ffffff'}
                  containerStyle={{
                    backgroundColor: 'trans',
                    borderColor: '#00000000',
                    width: '50%',
                  }}
                />
                <CheckBox
                  title={this.state.meal_type[3]}
                  checked={this.state.meal_check[3]}
                  onPress={() => {
                    this.mealarrayhandler(3);
                  }}
                  fontFamily="Comfortaa-Bold"
                  checkedColor={'#ffffff'}
                  uncheckedColor={'#ffffff'}
                  containerStyle={{
                    backgroundColor: 'trans',
                    borderColor: '#00000000',
                    width: '50%',
                  }}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <CheckBox
                  title={this.state.meal_type[4]}
                  checked={this.state.meal_check[4]}
                  onPress={() => {
                    this.mealarrayhandler(4);
                  }}
                  fontFamily="Comfortaa-Bold"
                  checkedColor={'#ffffff'}
                  uncheckedColor={'#ffffff'}
                  containerStyle={{
                    backgroundColor: 'trans',
                    borderColor: '#00000000',
                    width: '50%',
                  }}
                />
                <CheckBox
                  title={this.state.meal_type[5]}
                  checked={this.state.meal_check[5]}
                  onPress={() => {
                    this.mealarrayhandler(5);
                  }}
                  fontFamily="Comfortaa-Bold"
                  checkedColor={'#ffffff'}
                  uncheckedColor={'#ffffff'}
                  containerStyle={{
                    backgroundColor: 'trans',
                    borderColor: '#00000000',
                    width: '50%',
                  }}
                />
              </View>
            </Animatable.View>
            <CustomTextField
              iconName={'pencil'}
              placeholder={'Enter time (mins)'}
              keyboardType={'numeric'}
              headingName={'Time required(in mins):'}
              timerequiredFieldTextHandler={this.timerequiredFieldTextHandler}
              value={this.state.timerequired}
            />
            <Animatable.View
              animation="bounceInRight"
              duration={1500}
              delay={200}>
              <View>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Comfortaa-Bold',
                    fontSize: 20,
                    paddingLeft: 5,
                  }}>
                  Add Video:
                </Text>
              </View>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.chooseVideoFromLibrary();
                }}>
                <Animated.View style={Styles.add_recipe_image_container}>
                  {this.state.videoUri == '' ? (
                    <AddImage
                      height={100}
                      width={100}
                      style={{marginLeft: 20}}
                    />
                  ) : (
                    <Video
                      source={{uri: this.state.videoUri}}
                      ref={(ref) => {
                        this.player = ref;
                      }}
                      muted={true}
                      resizeMode={'contain'}
                      // controls={true}
                      style={{width: '100%', height: '50%'}}
                      onBuffer={this.onBuffer}
                      onError={this.videoError}
                    />
                  )}
                </Animated.View>
              </TouchableWithoutFeedback>
            </Animatable.View>
            <Animatable.View
              animation="bounceInRight"
              duration={1500}
              delay={200}>
              <View>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Comfortaa-Bold',
                    fontSize: 20,
                    paddingLeft: 5,
                  }}>
                  Steps:
                </Text>
              </View>
              {this.mapstepFields()}
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    steps: [...this.state.steps, ''],
                  });
                }}>
                <View
                  style={[
                    Styles.login_screen_buttons_container,
                    {width: '60%', height: 50},
                  ]}>
                  <LinearGradient
                    colors={['#EF5350', '#F44336']}
                    style={
                      Styles.login_screen_buttons_container_linear_gradient
                    }>
                    <Text
                      style={
                        Styles.login_screen_buttons_container_linear_gradient_text
                      }>
                      Add step field
                    </Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            </Animatable.View>
            <Animatable.View
              animation="bounceInRight"
              duration={1500}
              delay={200}>
              <View>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Comfortaa-Bold',
                    fontSize: 20,
                    paddingLeft: 5,
                  }}>
                  Ingredients:
                </Text>
              </View>
              {this.mapingredientFields()}
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    ingredients: [
                      ...this.state.ingredients,
                      {name: '', quantity: ''},
                    ],
                  });
                }}>
                <View
                  style={[
                    Styles.login_screen_buttons_container,
                    {width: '60%', height: 50},
                  ]}>
                  <LinearGradient
                    colors={['#EF5350', '#F44336']}
                    style={
                      Styles.login_screen_buttons_container_linear_gradient
                    }>
                    <Text
                      style={
                        Styles.login_screen_buttons_container_linear_gradient_text
                      }>
                      Add Ingredient field
                    </Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            </Animatable.View>
            <Animatable.View animation="bounceInRight" duration={1500}>
              <View>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Comfortaa-Bold',
                    fontSize: 20,
                    paddingLeft: 5,
                  }}>
                  Nutritions:
                </Text>
              </View>
            </Animatable.View>
            <NutritionFields
              iconName={'pencil'}
              placeholder={'Enter value '}
              headingName={'Proteins =>'}
              proteinfieldTextHandler={this.proteinfieldTextHandler}
              value={this.state.nutrition.proteins}
            />
            <NutritionFields
              iconName={'pencil'}
              placeholder={'Enter value '}
              headingName={'Fats =>'}
              fatsfieldTextHandler={this.fatsfieldTextHandler}
              value={this.state.nutrition.fats}
            />
            <NutritionFields
              iconName={'pencil'}
              placeholder={'Enter value '}
              headingName={'Fiber =>'}
              fiberfieldTextHandler={this.fiberfieldTextHandler}
              value={this.state.nutrition.fiber}
            />
            <NutritionFields
              iconName={'pencil'}
              placeholder={'Enter value '}
              vitaminsfieldTextHandler={this.vitaminsfieldTextHandler}
              headingName={'Vitamins =>'}
              value={this.state.nutrition.vitamins}
            />
            <NutritionFields
              iconName={'pencil'}
              placeholder={'Enter value '}
              carbohydratefieldTextHandler={this.carbohydratefieldTextHandler}
              headingName={'Carbohydrates =>'}
              value={this.state.nutrition.carbohydrate}
            />
            <TouchableOpacity
              onPress={() => {
                // this.addRecipe();
                this.checkInputs();
              }}>
              <View
                style={[
                  Styles.login_screen_buttons_container,
                  {width: '100%', height: 50, marginTop: 30},
                ]}>
                <LinearGradient
                  colors={['#EF5350', '#F44336']}
                  style={Styles.login_screen_buttons_container_linear_gradient}>
                  <Text
                    style={
                      Styles.login_screen_buttons_container_linear_gradient_text
                    }>
                    Save Recipe
                  </Text>
                </LinearGradient>
              </View>
            </TouchableOpacity>
            <View style={{marginBottom: 20}}></View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default EditRecipe;
