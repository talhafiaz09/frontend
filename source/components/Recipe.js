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
import PantryFilteredRecipies from '../components/PantryFilteredRecipies';
import {
  show_typing_animation_input_fields,
  show_loading_animation_ingredients,
  show_loading_animation_pantry,
  FETCH_URL,
} from '../functions/FunctionHandler';
import {toast, callToast} from '../functions/Toast';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import SearchedTypedData from '../components/SearchedTypedData';
import RecipieVoiceSearch from './RecipieVoiceSearch';
var toast_type = '';
var toast_text = '';
class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toast_show: false,
      typing_animation_search_bar: false,
      gotParams: false,
      gotdataFromParams: false,
      filteredResults: null,
      ingredients_exist: null,
      recipe_names: [],
      recipe_id: [],
      recipe_rating: [],
      recipe_ingredients: [],
      recipe_ingredients_quantity: [],
      recipe_steps: [],
      recipe_images: [],
      recipe_nutrition: [],
      meal_type: [],
      cuisine_type: [],
      recipe_video: [],
      user_email: [],
      timerequired: [],
      searchbarText: '',
      searchedTyped: false,
      searchedTypedResult: [],
      microphonePressed: false,
      arrayDessert: [],
      arrayBreakfast: [],
      arrayDinner: [],
      arrayLunch: [],
      arrayJuicesMilkshakes: [],
      arrayVegiterian: [],
    };
  }
  microphonePressedHandler = () => {
    this.state.microphonePressed
      ? this.setState({microphonePressed: false})
      : this.setState({microphonePressed: true});
  };
  typingvoiceSearch = (text) => {
    this.setState({
      searchedTypedResult: [],
    });
    console.log(text);
    fetch(FETCH_URL.IP + '/recipe/typedvoicesearch/' + text, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          this.setState({
            searchedTyped: true,
            searchedTypedResult: data.filtered,
          });
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
  textHandler = (text) => {
    this.setState({searchbarText: text});
  };
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
  toogle_typing_animation_search_bar() {
    if (this.state.typing_animation_search_bar) {
      this.setState({
        typing_animation_search_bar: false,
      });
    } else {
      this.setState({
        typing_animation_search_bar: true,
      });
    }
  }
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
            this.state.meal_type.push(data.recipies[q].mealtype);
            this.state.cuisine_type.push(data.recipies[q].cuisine);
            this.state.user_email.push(data.recipies[q].useremail);
            this.state.timerequired.push(data.recipies[q].timerequired);
            ia = [];
            iq = [];
          }
          var aDessert = data.recipies.filter((I) => {
            return I.mealtype.includes('Dessert');
          });
          var aBreakfast = data.recipies.filter((I) => {
            return I.mealtype.includes('Breakfast');
          });
          var aDinner = data.recipies.filter((I) => {
            return I.mealtype.includes('Dinner');
          });
          var aLunch = data.recipies.filter((I) => {
            return I.mealtype.includes('Lunch');
          });
          var aJuicesMilkshakes = data.recipies.filter((I) => {
            return I.mealtype.includes('Juices & Milkshakes');
          });
          var aVegiterian = data.recipies.filter((I) => {
            return I.mealtype.includes('Vegiterian');
          });
          this.setState({
            arrayDessert: aDessert,
            arrayBreakfast: aBreakfast,
            arrayDinner: aDinner,
            arrayLunch: aLunch,
            arrayJuicesMilkshakes: aJuicesMilkshakes,
            arrayVegiterian: aVegiterian,
          });
          // console.log(this.state.arrayDessert.length);
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
    mealtype,
    cuisine,
    useremail,
    timerequired,
  ) {
    // console.log(video);
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
      mealtype: mealtype,
      cuisine: cuisine,
      useremail: useremail,
      timerequired: timerequired,
      navigation: this.props.navigation,
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
                this.state.meal_type[key],
                this.state.cuisine_type[key],
                this.state.user_email[key],
                this.state.timerequired[key],
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
    // console.log(this.props.route.params);
    if (this.props.route.params != null) {
      this.setState({
        gotParams: true,
      });
      this.getFilteredPantryResult();
    } else {
      this.getRecipiesfromDatabase();
    }
  }
  async getFilteredPantryResult() {
    await fetch(
      FETCH_URL.IP +
        '/recipe/getrecipesonbaseofpantry/' +
        this.props.route.params.pantryid,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.found) {
          // console.log(data.filteredResults);
          this.setState({
            gotdataFromParams: true,
            filteredResults: data.filteredResults,
            ingredients_exist: data.ingredients_exist,
          });
          this.getRecipiesfromDatabase();
        } else if (data.success && !data.found) {
          this.setState({gotdataFromParams: false});
          // console.log('Nothing to show');
          this.getRecipiesfromDatabase();
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
  mapDessert = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            var arr1 = [];
            var arr2 = [];
            for (var i = 0; i < item.ingredients.length; i++) {
              arr2.push(item.ingredients.quantity);
              arr1.push(item.ingredients.name);
            }
            this.viewRecipeDetails(
              item._id,
              item.name,
              item.rating,
              arr1,
              arr2,
              item.steps,
              item.imageURL,
              item.nutrition,
              item.video,
              item.mealtype,
              item.cuisine,
              item.useremail,
              item.timerequired,
            );
          }}>
          <View
            style={{
              width: 200,
              marginRight: 20,
            }}>
            <View style={Styles.other_recipies_image_viewer}>
              <Image
                style={Styles.recipie_image_styling}
                source={{
                  uri: item.imageURL,
                }}
              />
            </View>
            <Text style={Styles.other_recipies_text}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  mapDinner = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            var arr1 = [];
            var arr2 = [];
            for (var i = 0; i < item.ingredients.length; i++) {
              arr2.push(item.ingredients.quantity);
              arr1.push(item.ingredients.name);
            }
            this.viewRecipeDetails(
              item._id,
              item.name,
              item.rating,
              arr1,
              arr2,
              item.steps,
              item.imageURL,
              item.nutrition,
              item.video,
              item.mealtype,
              item.cuisine,
              item.useremail,
              item.timerequired,
            );
          }}>
          <View
            style={{
              width: 200,
              marginRight: 20,
            }}>
            <View style={Styles.other_recipies_image_viewer}>
              <Image
                style={Styles.recipie_image_styling}
                source={{
                  uri: item.imageURL,
                }}
              />
            </View>
            <Text style={Styles.other_recipies_text}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  mapBreakfast = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            var arr1 = [];
            var arr2 = [];
            for (var i = 0; i < item.ingredients.length; i++) {
              arr2.push(item.ingredients.quantity);
              arr1.push(item.ingredients.name);
            }
            this.viewRecipeDetails(
              item._id,
              item.name,
              item.rating,
              arr1,
              arr2,
              item.steps,
              item.imageURL,
              item.nutrition,
              item.video,
              item.mealtype,
              item.cuisine,
              item.useremail,
              item.timerequired,
            );
          }}>
          <View
            style={{
              width: 200,
              marginRight: 20,
            }}>
            <View style={Styles.other_recipies_image_viewer}>
              <Image
                style={Styles.recipie_image_styling}
                source={{
                  uri: item.imageURL,
                }}
              />
            </View>
            <Text style={Styles.other_recipies_text}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  mapLunch = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            var arr1 = [];
            var arr2 = [];
            for (var i = 0; i < item.ingredients.length; i++) {
              arr2.push(item.ingredients.quantity);
              arr1.push(item.ingredients.name);
            }
            this.viewRecipeDetails(
              item._id,
              item.name,
              item.rating,
              arr1,
              arr2,
              item.steps,
              item.imageURL,
              item.nutrition,
              item.video,
              item.mealtype,
              item.cuisine,
              item.useremail,
              item.timerequired,
            );
          }}>
          <View
            style={{
              width: 200,
              marginRight: 20,
            }}>
            <View style={Styles.other_recipies_image_viewer}>
              <Image
                style={Styles.recipie_image_styling}
                source={{
                  uri: item.imageURL,
                }}
              />
            </View>
            <Text style={Styles.other_recipies_text}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
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
                value={this.state.searchbarText}
                onFocus={() => {
                  this.setState({toast_show: false});
                  this.toogle_typing_animation_search_bar();
                }}
                onChangeText={(text) => {
                  this.setState({searchbarText: text});
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
                  this.typingvoiceSearch(this.state.searchbarText);
                  // console.log(this.state.searchbarText);
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
                this.setState({microphonePressed: true});
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
        {this.state.microphonePressed ? (
          <RecipieVoiceSearch
            microphonePressed={this.state.microphonePressed}
            microphonePressedHandler={this.microphonePressedHandler}
            typingvoiceSearch={this.typingvoiceSearch}
            textHandler={this.textHandler}
          />
        ) : null}
        <Animatable.View
          delay={400}
          duration={1500}
          animation="bounceInUp"
          style={Styles.home_screens_bottom}>
          {/* <View style={{height: 60}}> */}
          {/* <ScrollView */}
          {/* // horizontal={true} */}
          {/* // showsHorizontalScrollIndicator={false}> */}
          {/* Copy this view from here */}
          {/* <View style={{}}><Text>Tags here</Text></View> */}
          {/* Copy this view ti here*/}
          {/* </ScrollView> */}
          {/* </View> */}
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
            <View style={{flex: 1}}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {this.state.searchedTyped &&
                this.state.searchedTypedResult.length === 0 ? (
                  <View style={{}}>
                    <View style={{height: 50, justifyContent: 'center'}}>
                      <Text
                        style={{fontFamily: 'Comfortaa-Bold', fontSize: 24}}>
                        Searched:
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{fontFamily: 'Comfortaa-Bold', fontSize: 18}}>
                        Oops no recipie to show
                      </Text>
                    </View>
                  </View>
                ) : this.state.searchedTyped &&
                  this.state.searchedTypedResult.length !== 0 ? (
                  <View style={{}}>
                    <View
                      style={{
                        height: 50,
                        justifyContent: 'center',
                        marginBottom: 20,
                      }}>
                      <Text
                        style={{fontFamily: 'Comfortaa-Bold', fontSize: 24}}>
                        Searched:
                      </Text>
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <SearchedTypedData
                        navigation={this.props.navigation}
                        filteredResults={this.state.searchedTypedResult}
                      />
                    </View>
                  </View>
                ) : null}
                {this.state.gotParams && !this.state.gotdataFromParams ? (
                  <View style={{}}>
                    <View style={{height: 50, justifyContent: 'center'}}>
                      <Text
                        style={{fontFamily: 'Comfortaa-Bold', fontSize: 24}}>
                        Pantry Searched:
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{fontFamily: 'Comfortaa-Bold', fontSize: 18}}>
                        Oops no recipie to show
                      </Text>
                    </View>
                  </View>
                ) : this.state.gotParams && this.state.gotdataFromParams ? (
                  <View style={{}}>
                    <View
                      style={{
                        height: 50,
                        justifyContent: 'center',
                        marginBottom: 20,
                      }}>
                      <Text
                        style={{fontFamily: 'Comfortaa-Bold', fontSize: 24}}>
                        Pantry Searched:
                      </Text>
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <PantryFilteredRecipies
                        navigation={this.props.navigation}
                        filteredResults={this.state.filteredResults}
                        ingredients_exist={this.state.ingredients_exist}
                      />
                    </View>
                  </View>
                ) : null}
                <View style={{}}>
                  <View style={{height: 50, justifyContent: 'center'}}>
                    <Text style={{fontFamily: 'Comfortaa-Bold', fontSize: 24}}>
                      Common recipies:
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
                {this.state.arrayDessert.length > 0 ? (
                  <View style={{flex: 1}}>
                    <View style={{height: 50, justifyContent: 'center'}}>
                      <Text
                        style={{fontFamily: 'Comfortaa-Bold', fontSize: 20}}>
                        Desserts:
                      </Text>
                    </View>
                    <View>
                      <FlatList
                        horizontal={true}
                        style={{height: '100%'}}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.arrayDessert}
                        renderItem={this.mapDessert}
                        keyExtractor={(item, index) => index.toString()}
                      />
                    </View>
                  </View>
                ) : null}
                {this.state.arrayDinner.length > 0 ? (
                  <View style={{flex: 1}}>
                    <View style={{height: 50, justifyContent: 'center'}}>
                      <Text
                        style={{fontFamily: 'Comfortaa-Bold', fontSize: 20}}>
                        Dinner:
                      </Text>
                    </View>
                    <View>
                      <FlatList
                        horizontal={true}
                        style={{height: '100%'}}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.arrayDinner}
                        renderItem={this.mapDinner}
                        keyExtractor={(item, index) => index.toString()}
                      />
                    </View>
                  </View>
                ) : null}
                {this.state.arrayBreakfast.length > 0 ? (
                  <View style={{flex: 1}}>
                    <View style={{height: 50, justifyContent: 'center'}}>
                      <Text
                        style={{fontFamily: 'Comfortaa-Bold', fontSize: 20}}>
                        Breakfast:
                      </Text>
                    </View>
                    <View>
                      <FlatList
                        horizontal={true}
                        style={{height: '100%'}}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.arrayBreakfast}
                        renderItem={this.mapBreakfast}
                        keyExtractor={(item, index) => index.toString()}
                      />
                    </View>
                  </View>
                ) : null}
                {this.state.arrayLunch.length > 0 ? (
                  <View style={{flex: 1}}>
                    <View style={{height: 50, justifyContent: 'center'}}>
                      <Text
                        style={{fontFamily: 'Comfortaa-Bold', fontSize: 20}}>
                        Lunch:
                      </Text>
                    </View>
                    <View>
                      <FlatList
                        horizontal={true}
                        style={{height: '100%'}}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.arrayLunch}
                        renderItem={this.mapLunch}
                        keyExtractor={(item, index) => index.toString()}
                      />
                    </View>
                  </View>
                ) : null}
                <View style={{margin: 20}}></View>
              </ScrollView>
            </View>
          )}
        </Animatable.View>
      </View>
    );
  }
}
export default Recipe;
