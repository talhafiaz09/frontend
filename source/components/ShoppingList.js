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
import {FlatList, ScrollView} from 'react-native-gesture-handler';
var toast_type = '';
var toast_text = '';
class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toast_show: false,
      isLoading: true,
      username: '',
      shopping_list: [],
      buy: [],
    };
  }
  componentDidMount() {
    this.getEmail();
    setTimeout(() => {
      this.fetchShoppingList();
    }, 1000);
  }
  async getEmail() {
    try {
      var email = await AsyncStorage.getItem('username');
      this.setState({
        username: email,
      });
    } catch (err) {}
  }
  fetchShoppingList() {
    setTimeout(() => {
      this.setState({
        toast_show: false,
      });
    }, 500);
    fetch(
      FETCH_URL.IP + '/shoppinglist/allshoppinglist/' + this.state.username,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success && data.shoppingList != null) {
          for (i = 0; i < data.shoppingList.ingredients.length; i++) {
            this.state.shopping_list.push(data.shoppingList.ingredients[i]);
            this.state.buy.push(data.shoppingList.buy[i]);
          }
          // console.log(this.state.shopping_list);
          this.setState({
            isLoading: false,
          });
        } else if (data.success && data.shoppingList == null) {
          this.setState({
            isLoading: false,
          });
        } else {
          toast_type = 'error';
          toast_text = 'Error';
          this.setState({
            toast_show: true,
          });
        }
      })
      .catch((error) => {
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
  removeFromShoppingList(key) {
    fetch(FETCH_URL.IP + '/shoppinglist/removefromshoppinglist', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        useremail: this.state.username,
        index: key,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast_type = 'success';
          toast_text = 'Ingredient removed';
          this.setState({
            toast_show: true,
            isLoading: true,
            buy: [],
            shopping_list: [],
          });
          this.fetchShoppingList();
        } else {
          toast_type = 'error';
          toast_text = 'Error';
          this.setState({
            toast_show: true,
          });
        }
      })
      .catch((error) => {
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
  mapShoppingList = ({item, index}) => {
    return (
      <View style={Styles.shopping_list_view}>
        <Text style={Styles.shopping_list_view_text}>{item}</Text>
        <View style={Styles.pantries_list_view_header_icons}>
          <TouchableOpacity
            onPress={() => {
              this.removeFromShoppingList(index);
            }}>
            <MaterialCommunityIcons color="red" name="delete" size={30} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 6}}
            onPress={() => {
              var array = this.state.buy;
              if (this.state.buy[index]) {
                array[index] = false;
              } else {
                array[index] = true;
              }
              this.setState({
                buy: [...array],
              });
            }}>
            <MaterialCommunityIcons
              color="green"
              name={this.state.buy[index] ? 'cart-off' : 'cart-arrow-down'}
              size={30}
            />
          </TouchableOpacity>
        </View>
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
              <Text style={Styles.home_screen_headers_text}>Shopping List</Text>
            </Animatable.View>
          </View>
        </View>
        <Animatable.View
          delay={400}
          duration={1500}
          animation="bounceInUp"
          style={Styles.home_screens_bottom}>
          {this.state.isLoading ? (
            <View
              style={{
                width: '100%',
                flex: 1,
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              {show_loading_animation_pantry()}
            </View>
          ) : this.state.shopping_list.length == 0 ? (
            <View style={{height: '100%', justifyContent: 'center'}}>
              <Text style={{alignSelf: 'center'}}>
                There is no shopping list to show!!
              </Text>
            </View>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.shopping_list}
              renderItem={this.mapShoppingList}
              keyExtractor={(item, index) => index.toString()}
              extraData={this.state.buy}
            />
          )}
        </Animatable.View>
      </View>
    );
  }
}
export default ShoppingList;
