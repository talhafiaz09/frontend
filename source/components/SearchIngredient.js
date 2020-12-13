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
import Voice from '@react-native-community/voice';
import {
  show_typing_animation_input_fields,
  show_loading_animation_ingredients,
  show_loading_animation_pantry,
  FETCH_URL,
} from '../functions/FunctionHandler';
import {toast, callToast} from '../functions/Toast';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
var toast_type = '';
var toast_text = '';
class SearchIngredient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userpantriesId: [],
      userpantriesname: [],
      showAnimation: true,
      wordFound: '',
      toast_show: false,
    };
  }
  getResults() {
    if (this.props.ingredientsList) {
      this.props.ingredientsList.forEach((array) => {
        let intersection = array.filter((x) => x === this.props.inputtext);
        if (intersection.length > 0) {
          this.setState({
            wordFound: intersection[0],
          });
        }
      });
    }
    console.log(this.state.wordFound);
    console.log(this.props.username);
  }
  componentDidMount() {
    this.fetchUserPantries();
  }

  async fetchUserPantries() {
    await fetch(
      FETCH_URL.IP + '/pantry/userallpantries/' + this.props.username,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success) {
          for (var i = 0; i < data.Pantry.length; i++) {
            this.state.userpantriesId.push(data.Pantry[i]._id);
            this.state.userpantriesname.push(data.Pantry[i].name);
          }
        }
      })
      .catch((error) => {});
    this.getResults();
  }
  addtoPantry(pantryKey) {
    fetch(
      FETCH_URL.IP +
        '/pantry/addingingredienttopantry/' +
        this.state.userpantriesId[pantryKey],
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredientname: this.state.wordFound,
        }),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast_type = 'success';
          toast_text = 'Ingredient added!!';
          this.setState({
            toast_show: true,
          });
          this.props.searchedHandlerFunction();
        } else {
          if (data.status == 'Ingredient exist') {
            toast_type = 'error';
            toast_text = 'Ingredient already exist';
            this.setState({
              toast_show: true,
            });
            this.props.searchedHandlerFunction();
          } else {
            toast_type = 'error';
            toast_text = 'Ingredient not added!!';
            this.setState({
              toast_show: true,
            });
          }
          this.setState({
            toast_show: false,
          });
        }
        this.setState({
          toast_show: false,
        });
      })
      .catch((error) => {
        if ('Timeout' || 'Network request failed') {
          this.setState({
            toast_show: true,
          });
          toast_type = 'error';
          toast_text = 'Network failure';
        }
        this.setState({
          toast_show: false,
        });
      });
  }
  addtoShoppingList() {
    fetch(FETCH_URL.IP + '/shoppinglist/addtoshoppinglist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredientname: this.state.wordFound,
        useremail: this.props.username,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          toast_type = 'success';
          toast_text = 'Ingredient added!!';
          this.setState({
            toast_show: true,
          });
          this.props.searchedHandlerFunction();
        } else {
          if (data.status == 'Ingredient exist') {
            toast_type = 'error';
            toast_text = 'Ingredient already exist';
            this.setState({
              toast_show: true,
            });
            this.props.searchedHandlerFunction();
          } else {
            toast_type = 'error';
            toast_text = 'Ingredient not added!!';
            this.setState({
              toast_show: true,
            });
          }
          this.setState({
            toast_show: false,
          });
        }
        this.setState({
          toast_show: false,
          // show_model: false,
        });
      })
      .catch((error) => {
        if ('Timeout' || 'Network request failed') {
          this.setState({
            toast_show: true,
          });
          toast_type = 'error';
          toast_text = 'Network failure';
        }
        this.setState({
          toast_show: false,
          // show_model: false,
        });
      });
    this.setState({
      toast_show: false,
      // ingredientName: null,
    });
  }
  mapPantries() {
    return this.state.userpantriesname.map((data, key) => {
      return (
        <View key={key} style={Styles.pantries_list_view_ingredients_screen}>
          <Text style={Styles.pantries_list_view_text_ingredients_screen}>
            {data}
          </Text>
          <View style={{flexWrap: 'wrap'}}>
            <View style={Styles.pantries_list_view_ingredients_header_icons}>
              <TouchableOpacity
                onPress={() => {
                  this.addtoShoppingList();
                }}>
                <MaterialCommunityIcons
                  color="green"
                  name="cart-plus"
                  size={30}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.addtoPantry(key);
                }}>
                <MaterialCommunityIcons color="black" name="plus" size={30} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    });
  }
  render() {
    return (
      <View>
        <View style={Styles.toast_styling}>
          {toast(toast_type, toast_text)}
          {this.state.toast_show ? callToast() : null}
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.props.microphonePressed}>
          <KeyboardAvoidingView
            behavior="height"
            style={{justifyContent: 'center', width: '100%', height: '100%'}}>
            <View style={Styles.ingredient_modal_container}>
              <View style={{alignItems: 'center', height: 90}}>
                <View width="100%" style={{marginRight: 20, marginTop: 10}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.searchedHandlerFunction();
                    }}>
                    <MaterialCommunityIcons
                      name="close-box"
                      size={30}
                      style={{alignSelf: 'flex-end'}}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text
                    style={{
                      marginTop: 5,
                      fontFamily: 'Comfortaa-Bold',
                      fontSize: 24,
                    }}>
                    Searching
                  </Text>
                </View>
              </View>
              {this.state.wordFound == null || this.state.wordFound == '' ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '70%',
                  }}>
                  <Text
                    style={{
                      marginTop: 5,
                      fontFamily: 'Comfortaa-Bold',
                      fontSize: 18,
                    }}>
                    Ingredient not found
                  </Text>
                </View>
              ) : (
                <View>
                  <Text
                    style={{
                      alignSelf: 'center',
                      marginTop: 5,
                      fontFamily: 'Comfortaa-Bold',
                      fontSize: 18,
                    }}>
                    You typed "{this.state.wordFound}"
                  </Text>
                  {this.props.ingredientsList &&
                  this.state.wordFound != '' &&
                  this.state.wordFound != null ? (
                    this.state.userpantriesname != null ? (
                      <ScrollView showsVerticalScrollIndicator={false}>
                        {this.mapPantries()}
                      </ScrollView>
                    ) : (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '70%',
                        }}>
                        <Text
                          style={{
                            marginTop: 5,
                            fontFamily: 'Comfortaa-Bold',
                            fontSize: 18,
                          }}>
                          No pantries added
                        </Text>
                      </View>
                    )
                  ) : null}
                </View>
              )}
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    );
  }
}
export default SearchIngredient;
