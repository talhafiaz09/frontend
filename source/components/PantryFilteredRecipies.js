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
class PantryFilteredRecipies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toast_show: false,
      recipe_names: [],
      recipe_id: [],
      recipe_rating: [],
      recipe_ingredients: [],
      recipe_ingredients_quantity: [],
      recipe_steps: [],
      recipe_images: [],
      recipe_nutrition: [],
      recipe_video: [],
      ingredients_exist: [],
    };
  }
  UNSAFE_componentWillMount() {
    console.log(this.props.filteredResults);
    if (this.props.filteredResults != null) {
      var ia = [];
      var iq = [];
      var ex = [];
      for (var q = 0; q < this.props.filteredResults.length; q++) {
        this.state.recipe_names.push(this.props.filteredResults[q].name);
        this.state.recipe_id.push(this.props.filteredResults[q]._id);
        this.state.recipe_rating.push(this.props.filteredResults[q].rating);
        for (
          var w = 0;
          w < this.props.filteredResults[q].ingredients.length;
          w++
        ) {
          ia.push(this.props.filteredResults[q].ingredients[w].name);
          iq.push(this.props.filteredResults[q].ingredients[w].quantity);
        }
        this.state.recipe_ingredients.push(ia);
        this.state.recipe_ingredients_quantity.push(iq);
        this.state.recipe_steps.push(this.props.filteredResults[q].steps);
        this.state.recipe_images.push(this.props.filteredResults[q].imageURL);
        this.state.recipe_nutrition.push(
          this.props.filteredResults[q].nutrition,
        );
        this.state.recipe_video.push(this.props.filteredResults[q].video);
        for (var y = 0; y < this.props.ingredients_exist[q].length; y++) {
          ex.push(this.props.ingredients_exist[q][y].name);
        }
        this.state.ingredients_exist.push(ex);
        ex = [];
        ia = [];
        iq = [];
      }
      console.log();
    }
  }
  mapIngredients(index) {
    return this.state.ingredients_exist[index].map((data, key) => {
      return (
        <View key={key} style={Styles.ingredients_view_list_styling}>
          <Text style={Styles.ingredients_view_list_text_styling}>{data}</Text>
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
            <View style={{height: '10%'}}>
              <Text style={Styles.view_recipie_name}>
                {this.state.recipe_names[key]}
              </Text>
            </View>
            <View
              style={{
                height: '60%',
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
  render() {
    return (
      <View showsVerticalScrollIndicator={false}>{this.mapRecipies()}</View>
    );
  }
}
export default PantryFilteredRecipies;
