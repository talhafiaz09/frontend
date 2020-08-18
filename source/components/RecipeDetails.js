import React, {Component} from 'react';
import StarRating from 'react-native-star-rating';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  Animated,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
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
    };
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
                {this.props.route.params.rating}
              </Text>
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
                      progress={0.9}
                      width={null}
                      height={14}
                      color={'green'}
                    />
                  </View>
                  <View width={'15%'} style={{}}>
                    <Text style={Styles.nutrition_value}>32</Text>
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
                      progress={0.9}
                      width={null}
                      height={14}
                      color={'green'}
                    />
                  </View>
                  <View width={'15%'} style={{}}>
                    <Text style={Styles.nutrition_value}>32</Text>
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
                      progress={0.9}
                      width={null}
                      height={14}
                      color={'green'}
                    />
                  </View>
                  <View width={'15%'} style={{}}>
                    <Text style={Styles.nutrition_value}>32</Text>
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
                      progress={0.9}
                      width={null}
                      height={14}
                      color={'green'}
                    />
                  </View>
                  <View width={'15%'} style={{}}>
                    <Text style={Styles.nutrition_value}>32</Text>
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
                      progress={0.9}
                      width={null}
                      height={14}
                      color={'green'}
                    />
                  </View>
                  <View width={'15%'} style={{}}>
                    <Text style={Styles.nutrition_value}>32</Text>
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
            <View style={{marginBottom: 40}}></View>
          </ScrollView>
        </Animatable.View>
      </Animated.View>
    );
  }
}
export default RecipeDetails;
