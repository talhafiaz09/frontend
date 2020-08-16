import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Styles from '../style/StyleSheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
class ShoppingList extends Component {
  render() {
    return (
      <View>
        <View>
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
        </View>
      </View>
    );
  }
}
export default ShoppingList;
