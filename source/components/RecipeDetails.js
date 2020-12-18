import React, {Component} from 'react';
import StarRating from 'react-native-star-rating';
import {
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  Animated,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import VideoPlayer from '../components/VideoPlayer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from '../style/StyleSheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import {Dimensions} from 'react-native';
const WINDOW_WIDTH = Dimensions.get('window').width;
import {Bar} from 'react-native-progress';
import {
  show_typing_animation_input_fields,
  show_loading_animation_ingredients,
  show_loading_animation_pantry,
  FETCH_URL,
} from '../functions/FunctionHandler';
import {toast, callToast} from '../functions/Toast';
import {ScrollView} from 'react-native-gesture-handler';
var toast_type = '';
var toast_text = '';
class RecipeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toast_show: false,
      useremail: '',
      isFavourite: false,
    };
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButton.bind(this),
    );
  }
  handleBackButton = () => {
    // this.props.navigation.pop();
  };
  componentDidMount() {
    this.get_email();
    this.addToFavouritesHandler();
  }
  async get_email() {
    try {
      var email = await AsyncStorage.getItem('username');
      this.setState({
        useremail: email,
      });
    } catch (err) {}
    this.checkIfFavourite();
  }
  async checkIfFavourite() {
    // console.log(this.props.route.params.id);
    await fetch(FETCH_URL.IP + '/favourite/findfavouriterecipies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        useremail: this.state.useremail,
        recipeId: this.props.route.params.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.exist) {
          // console.log(data);
          this.setState({
            isFavourite: true,
          });
        } else if (data.success && !data.exist) {
          this.setState({
            isFavourite: false,
          });
        } else {
          // console.log(data);
        }
      })
      .catch((error) => {
        // console.log(error);
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
    }, 500);
  }
  async addToFavouritesHandler() {
    await fetch(FETCH_URL.IP + '/favourite/addtofavourite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        useremail: this.state.useremail,
        recipeId: this.props.route.params.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.status != 'Already exist') {
          // console.log(data);
          this.setState({
            toast_show: true,
            isFavourite: true,
          });
          toast_type = 'success';
          toast_text = 'Added to favourites';
        } else if (data.success && data.status == 'Already exist') {
          this.setState({
            isFavourite: true,
          });
        } else {
          // console.log(data);
        }
      })
      .catch((error) => {
        // console.log(error);
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
    }, 500);
  }
  async removeFromFavourite() {
    await fetch(FETCH_URL.IP + '/favourite/removefromfavourite', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        useremail: this.state.useremail,
        recipeId: this.props.route.params.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // console.log('here i am');
          this.setState({
            toast_show: true,
            isFavourite: false,
          });
          toast_type = 'success';
          toast_text = 'Removed from favourites';
        } else {
          // console.log(data);
        }
      })
      .catch((error) => {
        // console.log(error);
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
    }, 500);
  }
  mapIngredients() {
    return this.props.route.params.ingredients.map((data, key) => {
      return (
        <View
          key={key}
          style={{
            flexDirection: 'row',
            width: '100%',
            borderBottomWidth: 0.5,
            borderBottomColor: 'gray',
          }}>
          <View style={{width: '50%'}}>
            <Text
              style={{
                fontFamily: 'Comfortaa-Medium',
                fontSize: 18,
              }}>
              {this.props.route.params.ingredients[key]}
            </Text>
          </View>
          <View style={{width: '50%', justifyContent: 'center'}}>
            <Text
              style={{
                fontFamily: 'Comfortaa-Medium',
                fontSize: 18,
                color: 'green',
                alignSelf: 'flex-end',
              }}>
              {this.props.route.params.ingredients_quantity[key]}
            </Text>
          </View>
        </View>
      );
    });
  }
  mapMealType() {
    return this.props.route.params.mealtype.map((data, key) => {
      return (
        <View key={key} style={Styles.recipe_detail_meal_cuisine_tags}>
          <Text style={Styles.recipe_detail_meal_cuisine_tags_text}>
            {data}
          </Text>
        </View>
      );
    });
  }
  mapCuisineType() {
    return this.props.route.params.cuisine.map((data, key) => {
      return (
        <View key={key} style={Styles.recipe_detail_meal_cuisine_tags}>
          <Text style={Styles.recipe_detail_meal_cuisine_tags_text}>
            {data}
          </Text>
        </View>
      );
    });
  }
  mapSteps() {
    return this.props.route.params.steps.map((data, key) => {
      return (
        <View key={key} style={{flexDirection: 'row'}}>
          <Text style={{fontFamily: 'Comfortaa-Bold', fontSize: 18}}>
            {key + 1 + '. '}
          </Text>
          <Text style={{fontFamily: 'Comfortaa-Medium', fontSize: 18}}>
            {data}
          </Text>
        </View>
      );
    });
  }
  render() {
    return (
      <Animated.View animaton="bounceInLeft" style={Styles.main_container}>
        {/* {console.log(this.props.route.params.nutrition.proteins)} */}
        <View style={Styles.toast_styling}>
          {toast(toast_type, toast_text)}
          {this.state.toast_show ? callToast() : null}
        </View>
        <Animated.View flex={0.4}>
          <ImageBackground
            source={{
              uri: this.props.route.params.images,
            }}
            style={{
              flex: 1,
              resizeMode: 'cover',
            }}>
            <View style={Styles.home_screen_headers}>
              <Animatable.View animation="bounceInLeft" duration={1500}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.pop();
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
                <Text style={Styles.home_screen_headers_text}>
                  Recipie Detail
                </Text>
              </Animatable.View>
            </View>
          </ImageBackground>
        </Animated.View>
        <Animatable.View style={Styles.recipe_detail_screens_bottom}>
          <View style={Styles.recipe_rating_container}>
            <View style={Styles.recipe_detail_view_name_container}>
              <Text style={{fontFamily: 'Comfortaa-Bold', fontSize: 22}}>
                {this.props.route.params.name}
              </Text>
            </View>

            <View style={Styles.rating_view}>
              <StarRating
                disabled={true}
                maxStars={5}
                rating={parseInt(this.props.route.params.rating)}
                fullStarColor={'green'}
              />
              <Text style={Styles.rating_text}>
                {'('}
                {this.props.route.params.rating}
                {')'}
              </Text>
            </View>
            <View style={Styles.heart_styling}>
              <TouchableOpacity
                onPress={() => {
                  if (this.state.isFavourite) {
                    this.removeFromFavourite();
                  } else {
                    this.addToFavouritesHandler();
                  }
                }}>
                {this.state.isFavourite ? (
                  <MaterialCommunityIcons color="red" name="heart" size={40} />
                ) : (
                  <MaterialCommunityIcons
                    color="red"
                    name="heart-outline"
                    size={40}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{marginTop: 50}}>
              <View>
                <Text
                  style={{
                    fontFamily: 'Comfortaa-Bold',
                    fontSize: 24,
                    marginBottom: 10,
                  }}>
                  Ingredients:
                </Text>
              </View>
              <View>{this.mapIngredients()}</View>
            </View>
            <View style={{marginTop: 50}}>
              <View>
                <Text
                  style={{
                    fontFamily: 'Comfortaa-Bold',
                    fontSize: 24,
                    marginBottom: 10,
                  }}>
                  Time required:
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: 'Comfortaa-Bold',
                    fontSize: 24,
                    marginTop: 10,
                    color: 'blue',
                    alignSelf: 'center',
                  }}>
                  {this.props.route.params.timerequired + ' mins'}
                </Text>
              </View>
            </View>
            <View style={{marginTop: 50}}>
              <View>
                <Text
                  style={{
                    fontFamily: 'Comfortaa-Bold',
                    fontSize: 24,
                    marginBottom: 10,
                  }}>
                  Meal Type:
                </Text>
              </View>
              <View>
                {this.props.route.params.mealtype.length === 0 ? (
                  <Text
                    style={{
                      fontFamily: 'Comfortaa-Bold',
                      fontSize: 18,
                      marginTop: 10,
                      alignSelf: 'center',
                    }}>
                    No meal type specified.
                  </Text>
                ) : (
                  <View
                    style={{flexDirection: 'row', flexWrap: 'wrap', flex: 1}}>
                    {this.mapMealType()}
                  </View>
                )}
              </View>
            </View>
            <View style={{marginTop: 50}}>
              <View>
                <Text
                  style={{
                    fontFamily: 'Comfortaa-Bold',
                    fontSize: 24,
                    marginBottom: 10,
                  }}>
                  Cuisine:
                </Text>
              </View>
              <View>
                {this.props.route.params.cuisine.length === 0 ? (
                  <Text
                    style={{
                      fontFamily: 'Comfortaa-Bold',
                      fontSize: 18,
                      marginTop: 10,
                      alignSelf: 'center',
                    }}>
                    No cuisine specified.
                  </Text>
                ) : (
                  <View
                    style={{flexDirection: 'row', flexWrap: 'wrap', flex: 1}}>
                    {this.mapCuisineType()}
                  </View>
                )}
              </View>
            </View>
            <View style={{marginTop: 50}}>
              <View>
                <Text
                  style={{
                    fontFamily: 'Comfortaa-Bold',
                    fontSize: 24,
                    marginBottom: 10,
                  }}>
                  Nutritions Facts:
                </Text>
              </View>
              <View style={Styles.pantries_list_view}>
                <View style={{justifyContent: 'center', marginTop: 10}}>
                  <Text style={Styles.nutrition_name}>Proteins</Text>
                </View>
                <View style={Styles.nutrition_bar_value_container}>
                  <View
                    width={'80%'}
                    style={{marginLeft: 10, justifyContent: 'center'}}>
                    <Bar
                      animationType={'timing'}
                      useNativeDriver={false}
                      progress={
                        parseInt(this.props.route.params.nutrition.proteins) /
                        100
                      }
                      width={null}
                      height={14}
                      color={'green'}
                    />
                  </View>
                  <View width={'15%'} style={{}}>
                    <Text style={Styles.nutrition_value}>
                      {this.props.route.params.nutrition.proteins}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={Styles.pantries_list_view}>
                <View style={{justifyContent: 'center', marginTop: 10}}>
                  <Text style={Styles.nutrition_name}>Fats</Text>
                </View>
                <View style={Styles.nutrition_bar_value_container}>
                  <View
                    width={'80%'}
                    style={{marginLeft: 10, justifyContent: 'center'}}>
                    <Bar
                      animationType={'timing'}
                      useNativeDriver={false}
                      progress={
                        parseInt(this.props.route.params.nutrition.fats) / 100
                      }
                      width={null}
                      height={14}
                      color={'green'}
                    />
                  </View>
                  <View width={'15%'} style={{}}>
                    <Text style={Styles.nutrition_value}>
                      {this.props.route.params.nutrition.fats}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={Styles.pantries_list_view}>
                <View style={{justifyContent: 'center', marginTop: 10}}>
                  <Text style={Styles.nutrition_name}>Fiber</Text>
                </View>
                <View style={Styles.nutrition_bar_value_container}>
                  <View
                    width={'80%'}
                    style={{marginLeft: 10, justifyContent: 'center'}}>
                    <Bar
                      animationType={'timing'}
                      useNativeDriver={false}
                      progress={
                        parseInt(this.props.route.params.nutrition.fiber) / 100
                      }
                      width={null}
                      height={14}
                      color={'green'}
                    />
                  </View>
                  <View width={'15%'} style={{}}>
                    <Text style={Styles.nutrition_value}>
                      {this.props.route.params.nutrition.fiber}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={Styles.pantries_list_view}>
                <View style={{justifyContent: 'center', marginTop: 10}}>
                  <Text style={Styles.nutrition_name}>Vitamins</Text>
                </View>
                <View style={Styles.nutrition_bar_value_container}>
                  <View
                    width={'80%'}
                    style={{marginLeft: 10, justifyContent: 'center'}}>
                    <Bar
                      animationType={'timing'}
                      useNativeDriver={false}
                      progress={
                        parseInt(this.props.route.params.nutrition.vitamins) /
                        100
                      }
                      width={null}
                      height={14}
                      color={'green'}
                    />
                  </View>
                  <View width={'15%'} style={{}}>
                    <Text style={Styles.nutrition_value}>
                      {this.props.route.params.nutrition.vitamins}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={Styles.pantries_list_view}>
                <View style={{justifyContent: 'center', marginTop: 10}}>
                  <Text style={Styles.nutrition_name}>Carbohydrate</Text>
                </View>
                <View style={Styles.nutrition_bar_value_container}>
                  <View
                    width={'80%'}
                    style={{marginLeft: 10, justifyContent: 'center'}}>
                    <Bar
                      animationType={'timing'}
                      useNativeDriver={false}
                      progress={
                        parseInt(
                          this.props.route.params.nutrition.carbohydrate,
                        ) / 100
                      }
                      width={null}
                      height={14}
                      color={'green'}
                    />
                  </View>
                  <View width={'15%'} style={{}}>
                    <Text style={Styles.nutrition_value}>
                      {this.props.route.params.nutrition.carbohydrate}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{marginTop: 50}}>
              <View>
                <Text
                  style={{
                    fontFamily: 'Comfortaa-Bold',
                    fontSize: 24,
                    marginBottom: 10,
                  }}>
                  Steps:
                </Text>
              </View>
              <View>{this.mapSteps()}</View>
            </View>
            <View style={{marginTop: 50}}>
              <View>
                <Text
                  style={{
                    fontFamily: 'Comfortaa-Bold',
                    fontSize: 24,
                    marginBottom: 10,
                  }}>
                  Video:
                </Text>
              </View>
              <View>
                {this.props.route.params.video === '' ? (
                  <View style={{alignItems: 'center'}}>
                    <Text style={{fontFamily: 'Comfortaa-Bold', fontSize: 18}}>
                      No video to show
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Videoplayer', {
                        video: this.props.route.params.video,
                        navigation: this.props.route.params.navigation,
                      });
                    }}>
                    <View
                      style={[
                        Styles.login_screen_buttons_container,
                        {width: '100%', height: 50},
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
                          Watch Video
                        </Text>
                      </LinearGradient>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={{marginBottom: 40}}></View>
          </ScrollView>
        </Animatable.View>
      </Animated.View>
    );
  }
}
export default RecipeDetails;
