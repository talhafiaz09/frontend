import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
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
class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toast_show: false,
      typing_animation_search_bar: false,
      recipe_names: [],
      recipe_id: [],
      recipe_rating: [],
      recipe_ingredients: [],
      recipe_ingredients_quantity: [],
      recipe_steps: [],
      recipe_images: [],
      recipe_nutrition: [],
      recipe_video: [],
    };
  }
  // async getRecipeApiData() {
  //   await fetch(FETCH_URL.IP + '/recipe/getrecipiesfromapi', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.success) {
  //       } else {
  //         console.log(data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       if ('Timeout' || 'Network request failed') {
  //         this.setState({
  //           toast_show: true,
  //         });
  //         toast_type = 'error';
  //         toast_text = 'Network failure';
  //       }
  //     });
  //   setTimeout(() => {
  //     this.setState({
  //       toast_show: false,
  //     });
  //   }, 500);
  // }
  // toogle_typing_animation_search_bar() {
  //   if (this.state.typing_animation_search_bar) {
  //     this.setState({
  //       typing_animation_search_bar: false,
  //     });
  //   } else {
  //     this.setState({
  //       typing_animation_search_bar: true,
  //     });
  //   }
  // }
  async getRecipiesfromDatabase() {
    await fetch(FETCH_URL.IP + '/recipe/getallrecipiefromdb/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // console.log(data.recipies);
          var ia = [];
          var iq = [];
          for (var q = 0; q < data.recipies.length; q++) {
            this.state.recipe_names.push(data.recipies[q].name);
            this.state.recipe_id.push(data.recipies[q]._id);
            this.state.recipe_rating.push(data.recipies[q].rating);
            for (var w = 0; w < data.recipies[q].ingredients.length; w++) {
              ia.push(data.recipies[q].ingredients[w].name);
              iq.push(data.recipies[q].ingredients[w].quantity);
            }
            this.state.recipe_ingredients.push(ia);
            this.state.recipe_ingredients_quantity.push(iq);
            this.state.recipe_steps.push(data.recipies[q].steps);
            this.state.recipe_images.push(data.recipies[q].imageURL);
            this.state.recipe_nutrition.push(data.recipies[q].nutrition);
            this.state.recipe_video.push(data.recipies[q].video);
            ia = [];
            iq = [];
          }
          // console.log(this.state.recipe_images);
        } else {
          console.log(data);
        }
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
      });
    setTimeout(() => {
      this.setState({
        toast_show: false,
      });
    }, 500);
  }
  viewRecipeDetails(
    id,
    name,
    rating,
    ingredients,
    ingredients_quantity,
    steps,
    images,
    nutrition,
    video,
  ) {
    console.log(ingredients);
    this.props.navigation.navigate('RecipeDetails', {
      id: id,
      name: name,
      rating: rating,
      ingredients: ingredients,
      ingredients_quantity: ingredients_quantity,
      steps: steps,
      images: images,
      nutrition: nutrition,
      video: video,
    });
  }
  mapRecommendedRecipies() {
    return this.state.recipe_names.map((data, key) => {
      return (
        <View
          key={key}
          style={{
            width: 250,
            marginRight: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              this.viewRecipeDetails(
                this.state.recipe_id[key],
                this.state.recipe_names[key],
                this.state.recipe_rating[key],
                this.state.recipe_ingredients[key],
                this.state.recipe_ingredients_quantity[key],
                this.state.recipe_steps[key],
                this.state.recipe_images[key],
                this.state.recipe_nutrition[key],
                this.state.recipe_video[key],
              );
            }}>
            <View style={Styles.image_viewer_in_recipe}>
              <Image
                style={Styles.recipie_image_styling}
                source={{
                  uri: this.state.recipe_images[key],
                }}
              />
            </View>
          </TouchableOpacity>
          <Text style={Styles.five_star_recipe_text}>
            {this.state.recipe_names[key]}
          </Text>
        </View>
      );
    });
  }
  componentDidMount() {
    // this.getRecipeApiData();
    // console.log(this.props);
    this.getRecipiesfromDatabase();
  }
  render() {
    return (
      <View style={Styles.main_container}>
        <View style={Styles.toast_styling}>
          {toast(toast_type, toast_text)}
          {this.state.toast_show ? callToast() : null}
        </View>
        <View flex={1}>
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
              <Text style={Styles.home_screen_headers_text}>Recipies</Text>
            </Animatable.View>
          </View>
          <View style={Styles.bar_mic_container}>
            <Animatable.View
              animation="bounceInLeft"
              duration={1500}
              style={Styles.search_bars_container}>
              {this.state.typing_animation_search_bar ? (
                show_typing_animation_input_fields()
              ) : (
                <FontAwesome name="search" color="#EF6C00" size={23} />
              )}
              <TextInput
                ref="search_bar"
                onFocus={() => {
                  this.setState({toast_show: false});
                  this.toogle_typing_animation_search_bar();
                }}
                onBlur={() => {
                  this.toogle_typing_animation_search_bar();
                }}
                style={Styles.search_bar_styling}
                placeholder="Search recipe"
              />
              <TouchableOpacity
                onPress={() => {
                  this.refs['search_bar'].blur();
                }}>
                <MaterialCommunityIcons
                  style={{paddingLeft: 10}}
                  name="send"
                  color="#EF6C00"
                  size={25}
                />
              </TouchableOpacity>
            </Animatable.View>
            <TouchableOpacity
              onPress={() => {
                this.refs['search_bar'].blur();
              }}>
              <Animatable.View
                animation="bounceInRight"
                duration={1500}
                style={Styles.mic_container}>
                <Animatable.View>
                  <MaterialCommunityIcons
                    color="white"
                    name="microphone"
                    size={30}
                  />
                </Animatable.View>
              </Animatable.View>
            </TouchableOpacity>
          </View>
        </View>
        <Animatable.View
          delay={400}
          duration={1500}
          animation="bounceInUp"
          style={Styles.home_screens_bottom}>
          <View style={{height: 60}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {/* Copy this view from here*/}
              <View style={{}}>
                <Text>Filter Tags</Text>
              </View>
              {/* Copy this view ti here*/}
            </ScrollView>
          </View>
          {this.state.recipe_names.length == 0 ? (
            <View
              style={{
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {show_loading_animation_pantry()}
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{}}>
                <View style={{height: 50, justifyContent: 'center'}}>
                  <Text style={{fontFamily: 'Comfortaa-Bold', fontSize: 24}}>
                    Recommended recipies:
                  </Text>
                </View>
                <View style={{width: '100%'}}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={Styles.five_star_recipies}>
                    {/* Copy this view from here*/}
                    {this.mapRecommendedRecipies()}
                    {/* Copy this view to here*/}
                  </ScrollView>
                </View>
              </View>
              <View style={{}}>
                <View style={{height: 50, justifyContent: 'center'}}>
                  <Text style={{fontFamily: 'Comfortaa-Bold', fontSize: 20}}>
                    Desserts:
                  </Text>
                </View>
                <View style={{width: '100%'}}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={Styles.other_recipies}>
                    {/* Copy this view from here*/}
                    <View
                      style={{
                        width: 200,
                        marginRight: 20,
                      }}>
                      <View style={Styles.other_recipies_image_viewer}></View>
                      <Text style={Styles.other_recipies_text}>
                        Salam Walikum
                      </Text>
                    </View>
                    {/* Copy this view to here*/}
                  </ScrollView>
                </View>
              </View>
              <View style={{}}>
                <View style={{height: 50, justifyContent: 'center'}}>
                  <Text style={{fontFamily: 'Comfortaa-Bold', fontSize: 20}}>
                    Fast Food:
                  </Text>
                </View>
                <View style={{width: '100%'}}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={Styles.other_recipies}>
                    {/* Copy this view from here*/}
                    <View
                      style={{
                        width: 200,
                        marginRight: 20,
                      }}>
                      <View style={Styles.other_recipies_image_viewer}></View>
                      <Text style={Styles.other_recipies_text}>
                        Salam Walikum
                      </Text>
                    </View>
                    {/* Copy this view to here*/}
                  </ScrollView>
                </View>
              </View>
              <View style={{}}>
                <View style={{height: 50, justifyContent: 'center'}}>
                  <Text style={{fontFamily: 'Comfortaa-Bold', fontSize: 20}}>
                    Des:
                  </Text>
                </View>
                <View style={{width: '100%'}}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={Styles.other_recipies}>
                    {/* Copy this view from here*/}
                    <View
                      style={{
                        width: 200,
                        marginRight: 20,
                      }}>
                      <View style={Styles.other_recipies_image_viewer}></View>
                      <Text style={Styles.other_recipies_text}>
                        Salam Walikum
                      </Text>
                    </View>
                    {/* Copy this view to here*/}
                  </ScrollView>
                </View>
              </View>
              <View style={{}}>
                <View style={{height: 50, justifyContent: 'center'}}>
                  <Text style={{fontFamily: 'Comfortaa-Bold', fontSize: 20}}>
                    Sweet:
                  </Text>
                </View>
                <View style={{width: '100%'}}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={Styles.other_recipies}>
                    {/* Copy this view from here*/}
                    <View
                      style={{
                        width: 200,
                        marginRight: 20,
                      }}>
                      <View style={Styles.other_recipies_image_viewer}></View>
                      <Text style={Styles.other_recipies_text}>
                        Salam Walikum
                      </Text>
                    </View>
                    {/* Copy this view to here*/}
                  </ScrollView>
                </View>
              </View>
              <View style={{}}>
                <View style={{height: 50, justifyContent: 'center'}}>
                  <Text style={{fontFamily: 'Comfortaa-Bold', fontSize: 20}}>
                    Sweet:
                  </Text>
                </View>
                <View style={{width: '100%'}}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={Styles.other_recipies}>
                    {/* Copy this view from here*/}
                    <View
                      style={{
                        width: 200,
                        marginRight: 20,
                      }}>
                      <View style={Styles.other_recipies_image_viewer}></View>
                      <Text style={Styles.other_recipies_text}>
                        Salam Walikum
                      </Text>
                    </View>
                    {/* Copy this view to here*/}
                  </ScrollView>
                </View>
              </View>
            </ScrollView>
          )}
        </Animatable.View>
      </View>
    );
  }
}
export default Recipe;
