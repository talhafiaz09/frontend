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
class IngredientsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isLoading: true,
      toast_show: false,
      dairy_ingredients: [],
      vegetables_ingredients: [],
      fruits_ingredients: [],
      userpantries: '',
      userpantriesname: [],
      userpantriesid: [],
      ingredientKey: null,
      ingredientName: '',
      typing_animation_search_bar: false,
      show_model: false,
      showPantryLoading: true,
      // dairy_ingredient_container_height: new Animated.Value(150),
      dairy_ingredient_container_dropdown_clicked: false,
      // vegetables_ingredient_container_height: new Animated.Value(150),
      vegetables_ingredient_container_dropdown_clicked: false,
      // fruits_ingredient_container_height: new Animated.Value(150),
      fruits_ingredient_container_dropdown_clicked: false,
    };
  }
  async fetchUserPantries() {
    this.setState({
      userpantries: [],
      userpantriesname: [],
      userpantriesid: [],
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
          console.log(data);
          this.setState({
            userpantries: data.Pantry,
          });
          for (var i = 0; i < this.state.userpantries.length; i++) {
            this.state.userpantriesid.push(this.state.userpantries[i]._id);
            this.state.userpantriesname.push(this.state.userpantries[i].name);
          }
          this.setState({
            showPantryLoading: false,
          });
        } else {
          console.log(data);
          this.setState({
            showPantryLoading: false,
          });
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
          // this.setState({
          //   toast_show: true,
          // });
          // toast_type = 'success';
          // toast_text = 'Ingredients added!!';
          for (i = 0; i < data.Ingredients.length; i++) {
            if (data.Ingredients[i].name == 'Dairy') {
              this.setState({
                dairy_ingredients: data.Ingredients[i].ingredients,
              });
            } else if (data.Ingredients[i].name == 'Vegetables') {
              this.setState({
                vegetables_ingredients: data.Ingredients[i].ingredients,
              });
            } else if (data.Ingredients[i].name == 'Fruits') {
              this.setState({
                fruits_ingredients: data.Ingredients[i].ingredients,
              });
            }
          }
          this.setState({isLoading: false});
        } else {
          // this.setState({
          //   toast_show: true,
          // });
          // toast_type = 'error';
          // toast_text = 'Ingredients not added!!';
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
  // increase_container_height(value) {
  //   if (value == 'Dairy') {
  //     if (!this.state.dairy_ingredient_container_dropdown_clicked) {
  //       Animated.timing(this.state.dairy_ingredient_container_height, {
  //         toValue: 700,
  //         duration: 400,
  //         useNativeDriver: false,
  //       }).start();
  //       this.setState({dairy_ingredient_container_dropdown_clicked: true});
  //     } else {
  //       Animated.timing(this.state.dairy_ingredient_container_height, {
  //         toValue: 150,
  //         duration: 400,
  //         useNativeDriver: false,
  //       }).start();
  //       this.setState({dairy_ingredient_container_dropdown_clicked: false});
  //     }
  //   } else if (value == 'Vegetables') {
  //     if (!this.state.vegetables_ingredient_container_dropdown_clicked) {
  //       Animated.timing(this.state.vegetables_ingredient_container_height, {
  //         toValue: 700,
  //         duration: 400,
  //         useNativeDriver: false,
  //       }).start();
  //       this.setState({vegetables_ingredient_container_dropdown_clicked: true});
  //     } else {
  //       Animated.timing(this.state.vegetables_ingredient_container_height, {
  //         toValue: 150,
  //         duration: 400,
  //         useNativeDriver: false,
  //       }).start();
  //       this.setState({
  //         vegetables_ingredient_container_dropdown_clicked: false,
  //       });
  //     }
  //   } else if (value == 'Fruits') {
  //     if (!this.state.fruits_ingredient_container_dropdown_clicked) {
  //       Animated.timing(this.state.fruits_ingredient_container_height, {
  //         toValue: 700,
  //         duration: 400,
  //         useNativeDriver: false,
  //       }).start();
  //       this.setState({fruits_ingredient_container_dropdown_clicked: true});
  //     } else {
  //       Animated.timing(this.state.fruits_ingredient_container_height, {
  //         toValue: 150,
  //         duration: 400,
  //         useNativeDriver: false,
  //       }).start();
  //       this.setState({
  //         fruits_ingredient_container_dropdown_clicked: false,
  //       });
  //     }
  //   }
  //   this.setState({toast_show: false});
  // }
  componentDidMount() {
    this.display_email();
    setTimeout(() => {
      this.fetch_ingredients();
    }, 1000);
    // setTimeout(() => {
    //   this.fetchUserPantries();
    // }, 1500);
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
        this.state.userpantriesid[pantryKey],
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
        console.log(error);
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
    });
  }
  view_dairy_ingredients() {
    return this.state.dairy_ingredients.map((data, key) => {
      return (
        <TouchableOpacity
          key={data}
          onPress={() => {
            this.setState({
              ingredientName: this.state.dairy_ingredients[key],
              showPantryLoading: true,
              show_model: true,
            });
            this.fetchUserPantries();
            console.log(key);
          }}>
          <View style={Styles.ingredients_view_list_styling}>
            <Text style={Styles.ingredients_view_list_text_styling}>
              {data}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  }
  view_vegetable_ingredients() {
    return this.state.vegetables_ingredients.map((data, key) => {
      return (
        <TouchableOpacity
          key={data}
          onPress={() => {
            this.setState({
              ingredientName: this.state.vegetables_ingredients[key],
              showPantryLoading: true,
              show_model: true,
            });
            this.fetchUserPantries();
            console.log(key);
          }}>
          <View style={Styles.ingredients_view_list_styling}>
            <Text style={Styles.ingredients_view_list_text_styling}>
              {data}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  }
  view_fruits_ingredients() {
    return this.state.fruits_ingredients.map((data, key) => {
      return (
        <TouchableOpacity
          key={data}
          onPress={() => {
            this.setState({
              ingredientName: this.state.fruits_ingredients[key],
              showPantryLoading: true,
              show_model: true,
            });
            this.fetchUserPantries();
            console.log(key);
          }}>
          <View style={Styles.ingredients_view_list_styling}>
            <Text style={Styles.ingredients_view_list_text_styling}>
              {data}
            </Text>
          </View>
        </TouchableOpacity>
      );
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={Styles.ingredients_view_list_container}>
              <View style={Styles.ingredients_view_list_container_header}>
                <View
                  style={Styles.ingredients_view_list_container_header_picture}>
                  <Image source={require('../assets/images/dairy.png')} />
                </View>
                <View style={{flex: 1}}>
                  <Text style={{marginLeft: 10, fontFamily: 'Comfortaa-Bold'}}>
                    Dairy ingredients
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    if (
                      this.state.dairy_ingredient_container_dropdown_clicked
                    ) {
                      this.refs['dairyfooter'].setNativeProps({
                        height: 100,
                      });
                      this.setState({
                        dairy_ingredient_container_dropdown_clicked: false,
                      });
                    } else {
                      this.refs['dairyfooter'].setNativeProps({
                        height: 'auto',
                      });
                      this.setState({
                        dairy_ingredient_container_dropdown_clicked: true,
                      });
                    }
                  }}>
                  <View style={{marginRight: 10}}>
                    {this.state.dairy_ingredient_container_dropdown_clicked ? (
                      <MaterialCommunityIcons
                        color="black"
                        name="chevron-up-box"
                        size={35}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        color="black"
                        name="chevron-down-box"
                        size={35}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
              <Animated.View
                ref={'dairyfooter'}
                style={{
                  padding: 10,
                  height: 100,
                  overflow: 'hidden',
                }}>
                <View
                  style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                  }}>
                  {this.state.isLoading ? (
                    <View
                      style={{
                        height: 80,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {show_loading_animation_ingredients()}
                    </View>
                  ) : (
                    this.view_dairy_ingredients()
                  )}
                </View>
              </Animated.View>
            </View>
            <View
              style={[Styles.ingredients_view_list_container, {marginTop: 30}]}>
              <View style={Styles.ingredients_view_list_container_header}>
                <View
                  style={Styles.ingredients_view_list_container_header_picture}>
                  <Image source={require('../assets/images/vegetable.png')} />
                </View>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontFamily: 'Comfortaa-Bold',
                    }}>
                    Vegetables
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    if (
                      this.state
                        .vegetables_ingredient_container_dropdown_clicked
                    ) {
                      this.refs['vegetablefooter'].setNativeProps({
                        height: 100,
                      });
                      this.setState({
                        vegetables_ingredient_container_dropdown_clicked: false,
                      });
                    } else {
                      this.refs['vegetablefooter'].setNativeProps({
                        height: 'auto',
                      });
                      this.setState({
                        vegetables_ingredient_container_dropdown_clicked: true,
                      });
                    }
                  }}>
                  <View style={{marginRight: 10}}>
                    {this.state
                      .vegetables_ingredient_container_dropdown_clicked ? (
                      <MaterialCommunityIcons
                        color="black"
                        name="chevron-up-box"
                        size={35}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        color="black"
                        name="chevron-down-box"
                        size={35}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
              <Animated.View
                ref={'vegetablefooter'}
                style={{
                  padding: 10,
                  height: 100,
                  overflow: 'hidden',
                }}>
                <View
                  style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                  }}>
                  {this.state.isLoading ? (
                    <View
                      style={{
                        height: 80,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {show_loading_animation_ingredients()}
                    </View>
                  ) : (
                    this.view_vegetable_ingredients()
                  )}
                </View>
              </Animated.View>
            </View>
            <View
              style={[Styles.ingredients_view_list_container, {marginTop: 30}]}>
              <View style={Styles.ingredients_view_list_container_header}>
                <View
                  style={Styles.ingredients_view_list_container_header_picture}>
                  <Image source={require('../assets/images/fruit.png')} />
                </View>
                <View style={{flex: 1}}>
                  <Text style={{marginLeft: 10, fontFamily: 'Comfortaa-Bold'}}>
                    Fruits
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    if (
                      this.state.fruits_ingredient_container_dropdown_clicked
                    ) {
                      this.refs['fruitfooter'].setNativeProps({
                        height: 100,
                      });
                      this.setState({
                        fruits_ingredient_container_dropdown_clicked: false,
                      });
                    } else {
                      this.refs['fruitfooter'].setNativeProps({
                        height: 'auto',
                      });
                      this.setState({
                        fruits_ingredient_container_dropdown_clicked: true,
                      });
                    }
                  }}>
                  <View style={{marginRight: 10}}>
                    {this.state.fruits_ingredient_container_dropdown_clicked ? (
                      <MaterialCommunityIcons
                        color="black"
                        name="chevron-up-box"
                        size={35}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        color="black"
                        name="chevron-down-box"
                        size={35}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
              <Animated.View
                ref={'fruitfooter'}
                style={{
                  padding: 10,
                  height: 100,
                  overflow: 'hidden',
                }}>
                <View
                  style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                  }}>
                  {this.state.isLoading ? (
                    <View
                      style={{
                        height: 80,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {show_loading_animation_ingredients()}
                    </View>
                  ) : (
                    this.view_fruits_ingredients()
                  )}
                </View>
              </Animated.View>
            </View>
            <View style={{marginBottom: 40}}></View>
          </ScrollView>
        </Animatable.View>
      </View>
    );
  }
}
export default IngredientsList;
