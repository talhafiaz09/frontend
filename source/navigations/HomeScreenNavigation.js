import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import Styles from '../style/StyleSheet';
import AsyncStorage from '@react-native-community/async-storage';
import IngredientsList from '../components/IngredientsList';
import Pantry from '../components/Pantry';
import Recipe from '../components/Recipe';
import FavoriteRecipies from '../components/FavouriteRecipies';
import ShoppingList from '../components/ShoppingList';
import * as Animatable from 'react-native-animatable';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RecipeButton from '../components/RecipeButton';
const Tabs = createBottomTabNavigator();
class HomeScreenNavigation extends Component {
  render() {
    return (
      <Tabs.Navigator
        // initialRouteName="Pantry"
        tabBarOptions={{
          activeTintColor: 'red',
          labelStyle: Styles.bottom_navigation_label_Styles,
          style: {
            height: 70,
            alignContent: 'center',
          },
          tabStyle: {
            justifyContent: 'center',
          },
        }}>
        <Tabs.Screen
          name="Ingredients"
          component={this.ingredients}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                color={color}
                style={Styles.bottom_navigation_icon_Styles}
                name="food-apple-outline"
                size={30}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Pantry"
          component={this.pantry}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                color={color}
                style={Styles.bottom_navigation_icon_Styles}
                name="fridge-outline"
                size={30}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Recipe"
          component={this.recipe}
          options={{
            unmountOnBlur: true,
            tabBarIcon: () => <RecipeButton />,
            tabBarLabel: () => {},
          }}
        />
        <Tabs.Screen
          name="Favourites"
          component={this.favourite_recipe}
          options={{
            unmountOnBlur: true,
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                color={color}
                style={Styles.bottom_navigation_icon_Styles}
                name="heart-outline"
                size={30}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Shopping List"
          component={this.shopping_list}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                color={color}
                style={Styles.bottom_navigation_icon_Styles}
                name="cart-outline"
                size={30}
              />
            ),
          }}
        />
      </Tabs.Navigator>
    );
  }
  ingredients({navigation, route}) {
    return (
      <Animatable.View animation="fadeIn" style={Styles.main_container}>
        <IngredientsList navigation={navigation} route={route} />
      </Animatable.View>
    );
  }
  pantry({navigation, route}) {
    return (
      <Animatable.View animation="fadeIn" style={Styles.main_container}>
        <Pantry navigation={navigation} route={route} />
      </Animatable.View>
    );
  }
  recipe({navigation, route}) {
    return (
      <Animatable.View animation="fadeIn" style={Styles.main_container}>
        <Recipe navigation={navigation} route={route} />
      </Animatable.View>
    );
  }
  shopping_list({navigation, route}) {
    return (
      <Animatable.View animation="fadeIn" style={Styles.main_container}>
        <ShoppingList navigation={navigation} route={route} />
      </Animatable.View>
    );
  }
  favourite_recipe({navigation, route}) {
    return (
      <Animatable.View animation="fadeIn" style={Styles.main_container}>
        <FavoriteRecipies navigation={navigation} route={route} />
      </Animatable.View>
    );
  }
}
export default HomeScreenNavigation;
