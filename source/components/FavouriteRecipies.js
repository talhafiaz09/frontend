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
import AsyncStorage from '@react-native-community/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
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
import {ScrollView} from 'react-native-gesture-handler';
var toast_type = '';
var toast_text = '';
class FavoriteRecipies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toast_show: false,
      useremail: '',
      isLoading: true,
      recipe_fav_id: [],
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
  async get_email() {
    try {
      var email = await AsyncStorage.getItem('username');
      this.setState({
        useremail: email,
      });
    } catch (err) {}
    this.getFavouriteRecipies();
  }
  componentDidMount() {
    setTimeout(() => {
      this.get_email();
    }, 500);
  }
  async getFavouriteRecipiesDetails() {
    await fetch(FETCH_URL.IP + '/recipe/getallfavouriterecipesfromdb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_array: {$in: this.state.recipe_fav_id},
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
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
          this.setState({isLoading: false});
          console.log(this.state.recipe_steps);
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
  async removeFromFavourite(index) {
    await fetch(FETCH_URL.IP + '/favourite/removefromfavourite', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        useremail: this.state.useremail,
        recipeId: this.state.recipe_id[index],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          this.setState({
            toast_show: true,
          });
          toast_type = 'success';
          toast_text = 'Removed from favourites';
          this.getFavouriteRecipies();
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
  async getFavouriteRecipies() {
    this.setState({
      recipe_fav_id: [],
      recipe_names: [],
      recipe_id: [],
      recipe_rating: [],
      recipe_ingredients: [],
      recipe_ingredients_quantity: [],
      recipe_steps: [],
      recipe_images: [],
      recipe_nutrition: [],
      recipe_video: [],
    });

    await fetch(FETCH_URL.IP + '/favourite/getallfavouriterecipies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        useremail: this.state.useremail,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          for (var q = 0; q < data.favourite.recipeId.length; q++) {
            this.state.recipe_fav_id.push(data.favourite.recipeId[q]);
          }
          this.getFavouriteRecipiesDetails();
        } else {
          console.log(data);
          this.setState({isLoading: false});
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
  mapIngredients(index) {
    return this.state.recipe_ingredients[index].map((data, key) => {
      return (
        <View key={key} style={Styles.ingredients_view_list_styling}>
          <Text style={Styles.ingredients_view_list_text_styling}>{data}</Text>
        </View>
      );
    });
  }
  mapRecipies() {
    return this.state.recipe_names.map((data, key) => {
      return (
        <View key={key} style={Styles.view_recipie_main_container}>
          <View style={{width: '40%'}}>
            <Image
              style={Styles.view_recipie_image}
              source={{
                uri: this.state.recipe_images[key],
              }}
            />
          </View>
          <View style={{width: '60%', height: '100%', padding: 10}}>
            <View style={Styles.heart_styling_favourite}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({isLoading: true});
                  this.removeFromFavourite(key);
                }}>
                <MaterialCommunityIcons color="red" name="heart" size={30} />
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 20, height: '5%'}}>
              <Text style={Styles.view_recipie_name}>
                {this.state.recipe_names[key]}
              </Text>
            </View>
            <View
              style={{
                height: '50%',
                justifyContent: 'flex-end',
                width: '100%',
              }}>
              <View style={{width: '100%'}}>
                <ScrollView
                  style={{padding: 10, width: '100%'}}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {this.mapIngredients(key)}
                  <View style={{marginRight: 30}}></View>
                </ScrollView>
              </View>
            </View>
            <TouchableOpacity
              style={Styles.view_recipie_detail}
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
              <Text style={{fontFamily: 'Comfortaa-Bold'}}>View details</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    });
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
              <Text style={Styles.home_screen_headers_text}>
                Favourite Recipies
              </Text>
            </Animatable.View>
          </View>
        </View>
        <Animatable.View
          delay={400}
          duration={1500}
          animation="bounceInUp"
          style={Styles.home_screens_bottom}>
          {this.state.isLoading ? (
            <View style={{height: '100%', justifyContent: 'center'}}>
              {show_loading_animation_pantry()}
            </View>
          ) : this.state.recipe_names.length == 0 ? (
            <View style={{height: '100%', justifyContent: 'center'}}>
              <Text
                style={{
                  fontFamily: 'Comfortaa-Bold',
                  fontSize: 18,
                  alignSelf: 'center',
                }}>
                No favourite recipies.
              </Text>
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              {this.mapRecipies()}
              <View style={{marginBottom: 30}}></View>
            </ScrollView>
          )}
        </Animatable.View>
      </View>
    );
  }
}
export default FavoriteRecipies;
