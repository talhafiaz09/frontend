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
import {FlatList, ScrollView} from 'react-native-gesture-handler';
var toast_type = '';
var toast_text = '';
class IngredientsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isLoading: true,
      toast_show: false,
      ingredients_names: [],
      ingredients_list: [],
      ingredient_footer_opened: [],
      ingredient_footer_height: [],
      userpantries: '',
      userpantriesId: [],
      userpantriesname: [],
      ingredientKey: null,
      ingredientName: '',
      typing_animation_search_bar: false,
      show_model: false,
      loading_animation: true,
      showPantryLoading: true,
    };
  }
  async fetchUserPantries() {
    this.setState({
      userpantriesId: [],
      userpantriesname: [],
    });
    await fetch(
      FETCH_URL.IP + '/pantry/userallpantries/' + this.state.username,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          for (var i = 0; i < data.Pantry.length; i++) {
            this.state.userpantriesId.push(data.Pantry[i]._id);
            this.state.userpantriesname.push(data.Pantry[i].name);
          }
          this.setState({
            showPantryLoading: false,
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
  async fetch_ingredients() {
    await fetch(FETCH_URL.IP + '/ingredient/allingredients', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          for (i = 0; i < data.Ingredients.length; i++) {
            this.state.ingredient_footer_opened.push(false);
            this.state.ingredient_footer_height.push(100);
            this.state.ingredients_names.push(data.Ingredients[i].name);
            this.state.ingredients_list.push(data.Ingredients[i].ingredients);
          }
          this.setState({
            loading_animation: false,
          });
        } else {
          // this.setState({
          //   toast_show: true,
          // });
          // toast_type = 'error';
          // toast_text = 'Ingredients not added!!';
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
  componentDidMount() {
    this.display_email();
    setTimeout(() => {
      this.fetch_ingredients();
    }, 1000);
  }
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
          ingredientname: this.state.ingredientName,
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
        } else {
          if (data.status == 'Ingredient exist') {
            toast_type = 'error';
            toast_text = 'Ingredient already exist';
            this.setState({
              toast_show: true,
            });
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
          show_model: false,
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
          show_model: false,
        });
      });
    this.setState({
      toast_show: false,
      ingredientName: null,
    });
  }
  addtoShoppingList() {
    fetch(FETCH_URL.IP + '/shoppinglist/addtoshoppinglist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredientname: this.state.ingredientName,
        useremail: this.state.username,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast_type = 'success';
          toast_text = 'Ingredient added!!';
          this.setState({
            toast_show: true,
          });
        } else {
          if (data.status == 'Ingredient exist') {
            toast_type = 'error';
            toast_text = 'Ingredient already exist';
            this.setState({
              toast_show: true,
            });
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
          show_model: false,
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
          show_model: false,
        });
      });
    this.setState({
      toast_show: false,
      ingredientName: null,
    });
  }
  async display_email() {
    try {
      var email = await AsyncStorage.getItem('username');
      this.setState({
        username: email,
      });
    } catch (err) {}
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
  view_ingredients_list = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({
            ingredientName: item,
            show_model: true,
          });
          this.fetchUserPantries();
        }}>
        <View style={Styles.ingredients_view_list_styling}>
          <Text style={Styles.ingredients_view_list_text_styling}>{item}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  mapIngredients = ({item, index}) => {
    return (
      <View style={Styles.ingredients_view_list_container}>
        <View style={Styles.ingredients_view_list_container_header}>
          <View style={Styles.ingredients_view_list_container_header_picture}>
            <Image source={require('../assets/images/dairy.png')} />
          </View>
          <View style={{flex: 1}}>
            <Text style={{marginLeft: 10, fontFamily: 'Comfortaa-Bold'}}>
              {item}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              var array1 = this.state.ingredient_footer_opened;
              var array2 = this.state.ingredient_footer_height;
              if (this.state.ingredient_footer_opened[index]) {
                array1[index] = false;
                array2[index] = 100;
                this.setState({ingredient_footer_opened: [...array1]});
                this.setState({ingredient_footer_height: [...array2]});
              } else {
                array1[index] = true;
                array2[index] = 'auto';
                this.setState({ingredient_footer_opened: [...array1]});
                this.setState({ingredient_footer_height: [...array2]});
              }
            }}>
            <View style={{marginRight: 10}}>
              {this.state.ingredient_footer_opened[index] ? (
                <MaterialCommunityIcons
                  color="black"
                  name="arrow-up"
                  size={30}
                />
              ) : (
                <MaterialCommunityIcons
                  color="black"
                  name="arrow-down"
                  size={30}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
        <Animated.View
          style={{
            padding: 10,
            height: this.state.ingredient_footer_height[index],
            overflow: 'hidden',
          }}>
          <FlatList
            columnWrapperStyle={{flexWrap: 'wrap', flex: 1}}
            // contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}
            horizontal={false}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={this.state.ingredients_list[index]}
            renderItem={this.view_ingredients_list}
            keyExtractor={(item, index) => index.toString()}
            extraData={index}
          />
        </Animated.View>
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
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.show_model}>
          <KeyboardAvoidingView
            behavior="height"
            style={{justifyContent: 'center', width: '100%', height: '100%'}}>
            <View style={Styles.ingredient_modal_container}>
              <View style={{alignItems: 'center', height: 90}}>
                <View width="100%" style={{marginRight: 20, marginTop: 10}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({show_model: false});
                    }}>
                    <MaterialCommunityIcons
                      name="close-box"
                      size={30}
                      style={{alignSelf: 'flex-end'}}
                    />
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    marginTop: 5,
                    fontFamily: 'Comfortaa-Bold',
                    fontSize: 24,
                  }}>
                  All Pantries
                </Text>
              </View>
              <View style={{height: 300, justifyContent: 'center'}}>
                {this.state.showPantryLoading ? (
                  <View style={{alignSelf: 'center'}}>
                    {show_loading_animation_pantry()}
                  </View>
                ) : !this.state.showPantryLoading &&
                  this.state.userpantriesname.length == 0 ? (
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontFamily: 'Comfortaa-Bold',
                      fontSize: 18,
                    }}>
                    There are no pantries
                  </Text>
                ) : (
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {this.mapPantries()}
                  </ScrollView>
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
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
              <Text style={Styles.home_screen_headers_text}>Ingredients</Text>
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
                placeholder="Search ingredients"
              />
              <MaterialCommunityIcons
                onPress={() => {
                  this.refs['search_bar'].blur();
                }}
                style={{paddingLeft: 10}}
                name="send"
                color="#EF6C00"
                size={25}
              />
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
          {this.state.loading_animation ? (
            <View
              style={{
                width: '100%',
                height: 400,
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              {show_loading_animation_pantry()}
            </View>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.ingredients_names}
              renderItem={this.mapIngredients}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={null}
              onEndReachedThreshold={this.state.ingredients_names.length - 2}
            />
          )}
          <View style={{marginBottom: 0}}></View>
        </Animatable.View>
      </View>
    );
  }
}
export default IngredientsList;
