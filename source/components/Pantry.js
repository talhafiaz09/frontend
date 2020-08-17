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
class Pantry extends Component {
  constructor(props) {
    super(props);
    this.isFooterOpen = [];
    this.labelName = [];
    this.state = {
      toast_show: false,
      show_Model: false,
      useremail: '',
      pantryname: '',
      ingredients: [],
      userpantries: '',
      userpantriesname: [],
      userpantriesningredients: [],
      userpantriesid: [],
      loading_animation: true,
      disable_button: false,
      typing_animation_button: false,
      typing_animation_add_pantry: false,
      setButtonBorderRoundCheck: false,
      showchangenamemodal: false,
      customindex: '',
      animationPress: new Animated.Value(1),
      roundButtonSize: new Animated.Value(width - 200),
      me: 0,
      view2LayoutProps: {
        left: 0,
        top: 0,
        width: '100%',
        height: 0,
      },
    };
  }
  async fetchUserPantries() {
    await fetch(
      FETCH_URL.IP + '/pantry/userallpantries/' + this.state.useremail,
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
            this.state.userpantriesname.push(this.state.userpantries[i].name);
            this.state.userpantriesningredients.push(
              this.state.userpantries[i].ingredients,
            );
            this.state.userpantriesid.push(this.state.userpantries[i]._id);
          }
        } else {
          console.log(data);
        }
        this.setState({
          toast_show: false,
          loading_animation: false,
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
        });
      });
  }

  componentDidMount() {
    this.getUserEmail();
    setTimeout(() => {
      this.fetchUserPantries();
    }, 1500);
  }

  async getUserEmail() {
    try {
      var email = await AsyncStorage.getItem('username');
      this.setState({
        useremail: email,
      });
    } catch (err) {}
  }
  checkPantryname() {
    if (this.state.pantryname == '') {
      console.log;
      this.setState({
        toast_show: true,
      });
      toast_type = 'error';
      toast_text = 'Pantry name empty';
      return false;
    } else {
      return true;
    }
  }
  addtoPantry() {
    if (this.checkPantryname()) {
      this.setState({
        typing_animation_button: true,
        userpantries: [],
        userpantriesname: [],
        userpantriesningredients: [],
        userpantriesid: [],
      });
      this.isFooterOpen = [];
      fetch(FETCH_URL.IP + '/pantry/addIngredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pantryname: this.state.pantryname,
          useremail: this.state.useremail,
          ingredients: this.state.ingredients,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            typing_animation_button: false,
          });
          console.log(data);
          if (data.success) {
            this.roundButtonAnimation();
          } else {
            toast_type = 'error';
            toast_text = 'Pantry not added';
            this.setState({
              toast_show: true,
              disable_button: false,
            });
          }
          this.setState({
            toast_show: false,
          });
        })
        .catch((error) => {
          if (
            error.message === 'Timeout' ||
            error.message === 'Network request failed'
          ) {
            toast_type = 'error';
            toast_text = 'Network failure';
            this.setState({
              toast_show: true,
              disable_button: false,
            });
          }
          this.setState({
            toast_show: false,
          });
        });
      setTimeout(() => {
        this.fetchUserPantries();
      }, 1000);
    }
    setTimeout(() => {
      this.toogletoast();
    }, 500);
  }
  deletePantry(pantryid) {
    this.setState({
      loading_animation: true,
      userpantries: [],
      userpantriesname: [],
      userpantriesningredients: [],
      userpantriesid: [],
    });
    this.isFooterOpen = [];
    fetch(FETCH_URL.IP + '/pantry/userallpantries/' + pantryid, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast_type = 'success';
          toast_text = 'Pantry deleted';
          this.setState({
            toast_show: true,
          });
        } else {
          toast_type = 'error';
          toast_text = 'Pantry not deleted';
          this.setState({
            toast_show: true,
          });
        }
        this.setState({
          toast_show: false,
        });
      })
      .catch((error) => {
        if (
          error.message === 'Timeout' ||
          error.message === 'Network request failed'
        ) {
          toast_type = 'error';
          toast_text = 'Network failure';
          this.setState({
            toast_show: true,
          });
        }
        this.setState({
          toast_show: false,
        });
      });
    setTimeout(() => {
      this.fetchUserPantries();
    }, 500);
  }
  async roundButtonAnimation() {
    this.setState({
      toast_show: true,
      disable_button: false,
      pantryname: '',
    });
    toast_type = 'success';
    toast_text = 'Pantry added!';
    this.setState({
      setButtonBorderRoundCheck: true,
    });
    await Animated.timing(this.state.roundButtonSize, {
      toValue: 50,
      duration: 400,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      this.settingStates();
    }, 1000);
  }
  settingStates() {
    this.setState({
      toast_show: false,
      setButtonBorderRoundCheck: false,
      typing_animation_add_pantry: false,
      show_Model: false,
      showchangenamemodal: false,
      roundButtonSize: new Animated.Value(width - 200),
    });
  }
  pushFalseValues() {
    this.isFooterOpen.push(false);
    this.labelName.push('chevron-down-box');
  }
  getlabelName(key) {
    if (this.isFooterOpen[key]) {
      this.labelName[key] = 'chevron-up-box';
    } else {
      this.labelName[key] = 'chevron-down-box';
    }
  }
  view_user_pantries() {
    var keys = 0;
    var array = [];
    return this.state.userpantriesname.map((data, key) => {
      keys++;
      return (
        <View key={keys} style={Styles.pantries_list_view}>
          {this.pushFalseValues()}
          {this.getlabelName(key)}
          <View style={Styles.pantries_list_view_header}>
            <Text style={Styles.pantries_list_view_header_text}>{data}</Text>
            <View style={Styles.pantries_list_view_header_icons}>
              <TouchableOpacity
                onPress={() => {
                  this.deletePantry(this.state.userpantriesid[key]);
                }}>
                <MaterialCommunityIcons color="black" name="delete" size={30} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginLeft: 15}}
                onPress={() => {
                  this.setState({
                    showchangenamemodal: true,
                    customindex: key,
                  });
                }}>
                <MaterialCommunityIcons color="black" name="pencil" size={30} />
              </TouchableOpacity>
              <TouchableOpacity
                key={keys}
                onPress={() => {
                  if (this.isFooterOpen[key]) {
                    this.isFooterOpen[key] = false;
                    this.labelName[key] = 'chevron-down-box';
                    this.refs['footer' + key].setNativeProps({
                      borderTopWidth: 0,
                      height: 0,
                    });
                  } else {
                    this.isFooterOpen[key] = true;
                    this.labelName[key] = 'chevron-up-box';

                    this.refs['footer' + key].setNativeProps({
                      borderTopColor: 'white',
                      borderTopWidth: 3,
                      height: 'auto',
                    });
                  }
                }}
                style={{marginLeft: 15}}>
                <MaterialCommunityIcons
                  color="black"
                  name={this.labelName[key]}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={Styles.pantries_list_view_footer} ref={'footer' + key}>
            {this.state.userpantriesningredients[key].length == 0 ? (
              <View
                style={{
                  height: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontFamily: 'Comfortaa-Bold'}}>
                  No ingredients added
                </Text>
              </View>
            ) : (
              this.mapPantriesIngredients(key)
            )}
          </View>
        </View>
      );
    });
  }
  mapPantriesIngredients(index) {
    return this.state.userpantriesningredients[index].map((data, key) => {
      return (
        <View key={key} style={{marginBottom: 10}}>
          <View style={Styles.pantry_ingredients_view}>
            <Text style={Styles.pantries_list_view_text_ingredients_screen}>
              {data}
            </Text>
            <View style={{alignSelf: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  this.deleteIngredientFromSelectedPantry(index, key);
                }}>
                <MaterialCommunityIcons color="black" name="delete" size={30} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    });
  }
  async deleteIngredientFromSelectedPantry(pantryID, tobedeleted) {
    this.setState({
      loading_animation: true,
    });
    await fetch(
      FETCH_URL.IP +
        '/pantry/deleteingredientfrompantry/' +
        this.state.userpantriesid[pantryID],
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredientindex: tobedeleted,
        }),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          toast_type = 'success';
          toast_text = 'Ingredient deleted';
          this.setState({
            toast_show: true,
          });
          this.setState({
            userpantries: [],
            userpantriesname: [],
            userpantriesningredients: [],
            userpantriesid: [],
          });
          this.isFooterOpen = [];
          this.fetchUserPantries();
        } else {
          console.log(data);
          toast_type = 'error';
          toast_text = 'Ingredient not deleted';
          this.setState({
            toast_show: true,
          });
        }
        this.setState({
          toast_show: false,
          loading_animation: false,
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
        });
      });
  }
  nameTobeEdited(index) {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.showchangenamemodal}>
        <KeyboardAvoidingView
          behavior="height"
          style={{justifyContent: 'center', width: '100%', height: '100%'}}>
          <View style={Styles.pantry_modal_container}>
            <View style={{alignItems: 'center'}}>
              <View width="100%" style={{marginRight: 20, marginTop: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      showchangenamemodal: false,
                      toast_show: false,
                      typing_animation_add_pantry: false,
                    });
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
                Change Pantry
              </Text>
              <View>
                <View style={Styles.modal_input_fields_container}>
                  {this.state.typing_animation_add_pantry ? (
                    show_typing_animation_input_fields()
                  ) : (
                    <FontAwesome name="list-ul" color="#EF6C00" size={30} />
                  )}
                  <TextInput
                    ref={'textfield'}
                    editable={!this.state.disable_button ? true : false}
                    onChangeText={(text) => {
                      this.setState({
                        pantryname: text,
                      });
                    }}
                    onFocus={() => {
                      this.setState({
                        typing_animation_add_pantry: true,
                      });
                    }}
                    onBlur={() => {
                      this.setState({
                        typing_animation_add_pantry: false,
                      });
                    }}
                    style={Styles.input_field}
                    placeholder="Pantry name"
                  />
                </View>
                <TouchableWithoutFeedback
                  disabled={this.state.disable_button ? true : false}
                  onPress={() => {
                    this.refs['textfield'].blur();
                    this.updatePantryName(index);
                  }}
                  onPressIn={() => {
                    animationIn(this.state.animationPress);
                  }}
                  onPressOut={() => {
                    animationOut(this.state.animationPress);
                  }}>
                  <Animated.View
                    style={{
                      width: this.state.roundButtonSize,
                      alignSelf: 'center',
                    }}>
                    <Animated.View
                      style={
                        (Styles.login_screen_buttons_container,
                        {transform: [{scale: this.state.animationPress}]})
                      }>
                      <LinearGradient
                        colors={['#EF5350', '#F44336']}
                        style={
                          !this.state.setButtonBorderRoundCheck
                            ? Styles.login_screen_buttons_container_linear_gradient
                            : Styles.login_screen_buttons_container_linear_gradient_round
                        }>
                        {!this.state.setButtonBorderRoundCheck ? (
                          this.state.typing_animation_button ? (
                            show_typing_animation_button()
                          ) : (
                            <Text
                              style={
                                Styles.login_screen_buttons_container_linear_gradient_text
                              }>
                              Change
                            </Text>
                          )
                        ) : (
                          <FontAwesome name="check" color="#58d68d" size={40} />
                        )}
                      </LinearGradient>
                    </Animated.View>
                  </Animated.View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
  updatePantryName(id) {
    console.log(id);
    this.setState({
      loading_animation: true,
    });
    if (this.checkPantryname()) {
      this.setState({
        typing_animation_button: true,
      });
      fetch(
        FETCH_URL.IP +
          '/pantry/updatepantryname/' +
          this.state.userpantriesid[id],
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pantryname: this.state.pantryname,
          }),
        },
      )
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            typing_animation_button: false,
          });
          console.log(data);
          if (data.success) {
            this.setState({
              userpantries: [],
              userpantriesname: [],
              userpantriesningredients: [],
              userpantriesid: [],
            });
            this.isFooterOpen = [];
            this.roundButtonAnimationSecond();
          } else {
            toast_type = 'error';
            toast_text = 'Pantry name not updated';
            this.setState({
              toast_show: true,
              disable_button: false,
            });
          }
          this.setState({
            toast_show: false,
          });
        })
        .catch((error) => {
          if (
            error.message === 'Timeout' ||
            error.message === 'Network request failed'
          ) {
            toast_type = 'error';
            toast_text = 'Network failure';
            this.setState({
              toast_show: true,
              disable_button: false,
            });
          }
          this.setState({
            toast_show: false,
          });
        });
    }
    setTimeout(() => {
      this.toogletoast();
    }, 500);
  }
  toogletoast() {
    this.setState({
      toast_show: false,
    });
  }
  async roundButtonAnimationSecond() {
    this.setState({
      toast_show: true,
      disable_button: false,
      pantryname: '',
    });
    toast_type = 'success';
    toast_text = 'Pantry name updated';
    this.setState({
      setButtonBorderRoundCheck: true,
    });
    await Animated.timing(this.state.roundButtonSize, {
      toValue: 50,
      duration: 400,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      this.settingStates();
    }, 1000);
    setTimeout(() => {
      this.fetchUserPantries();
    }, 1100);
  }
  render() {
    return (
      <View style={Styles.main_container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.show_Model}>
          <KeyboardAvoidingView
            behavior="height"
            style={{justifyContent: 'center', width: '100%', height: '100%'}}>
            <View style={Styles.pantry_modal_container}>
              <View style={{alignItems: 'center'}}>
                <View width="100%" style={{marginRight: 20, marginTop: 10}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        show_Model: false,
                        toast_show: false,
                        typing_animation_add_pantry: false,
                      });
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
                  Add Pantry
                </Text>
                <View>
                  <View style={Styles.modal_input_fields_container}>
                    {this.state.typing_animation_add_pantry ? (
                      show_typing_animation_input_fields()
                    ) : (
                      <FontAwesome name="list-ul" color="#EF6C00" size={30} />
                    )}
                    <TextInput
                      ref={'textfield'}
                      editable={!this.state.disable_button ? true : false}
                      onChangeText={(text) => {
                        this.setState({
                          pantryname: text,
                        });
                      }}
                      onFocus={() => {
                        this.setState({
                          typing_animation_add_pantry: true,
                        });
                      }}
                      onBlur={() => {
                        this.setState({
                          typing_animation_add_pantry: false,
                        });
                      }}
                      style={Styles.input_field}
                      placeholder="Pantry name"
                    />
                  </View>
                  <TouchableWithoutFeedback
                    disabled={this.state.disable_button ? true : false}
                    onPress={() => {
                      this.refs['textfield'].blur();
                      this.addtoPantry();
                    }}
                    onPressIn={() => {
                      animationIn(this.state.animationPress);
                    }}
                    onPressOut={() => {
                      animationOut(this.state.animationPress);
                    }}>
                    <Animated.View
                      style={{
                        width: this.state.roundButtonSize,
                        alignSelf: 'center',
                      }}>
                      <Animated.View
                        style={
                          (Styles.login_screen_buttons_container,
                          {transform: [{scale: this.state.animationPress}]})
                        }>
                        <LinearGradient
                          colors={['#EF5350', '#F44336']}
                          style={
                            !this.state.setButtonBorderRoundCheck
                              ? Styles.login_screen_buttons_container_linear_gradient
                              : Styles.login_screen_buttons_container_linear_gradient_round
                          }>
                          {!this.state.setButtonBorderRoundCheck ? (
                            this.state.typing_animation_button ? (
                              show_typing_animation_button()
                            ) : (
                              <Text
                                style={
                                  Styles.login_screen_buttons_container_linear_gradient_text
                                }>
                                Add pantry
                              </Text>
                            )
                          ) : (
                            <FontAwesome
                              name="check"
                              color="#58d68d"
                              size={40}
                            />
                          )}
                        </LinearGradient>
                      </Animated.View>
                    </Animated.View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
        {this.state.showchangenamemodal
          ? this.nameTobeEdited(this.state.customindex)
          : null}
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
              <Text style={Styles.home_screen_headers_text}>My Pantry</Text>
            </Animatable.View>
          </View>
        </View>
        <Animatable.View
          delay={400}
          duration={1500}
          animation="bounceInUp"
          style={Styles.home_screens_bottom}>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Comfortaa-Bold',
                color: 'black',
                alignSelf: 'center',
                fontSize: 24,
              }}>
              List of pantries
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  show_Model: true,
                });
              }}>
              <View style={Styles.add_container}>
                <MaterialCommunityIcons color="white" name="plus" size={30} />
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
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
            ) : this.state.userpantriesname.length == 0 ? (
              <View style={{height: 400, justifyContent: 'center'}}>
                <Text style={{alignSelf: 'center'}}>
                  There is no pantry add new pantry!!
                </Text>
              </View>
            ) : (
              <View>{this.view_user_pantries()}</View>
            )}
          </ScrollView>
          <View style={{marginBottom: 30}}></View>
        </Animatable.View>
      </View>
    );
  }
}
export default Pantry;
