import React, {Component} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Styles from '../style/StyleSheet';
import * as Animatable from 'react-native-animatable';
class RecipeButton extends Component {
  render() {
    return (
      <Animatable.View
        animation="rubberBand"
        iterationCount="infinite"
        iterationDelay={1000}
        style={{position: 'absolute', alignItems: 'center'}}>
        <View style={Styles.recipe_button_round}>
          <TouchableHighlight>
            <View>
              <MaterialCommunityIcons
                color="white"
                name="format-list-bulleted"
                size={30}
              />
            </View>
          </TouchableHighlight>
        </View>
      </Animatable.View>
    );
  }
}
export default RecipeButton;
