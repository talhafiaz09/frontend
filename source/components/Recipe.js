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
class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toast_show: false,
      typing_animation_search_bar: false,
    };
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
  render() {
    return (
      <View style={Styles.main_container}>
        <View style={Styles.toast_styling}>
          {toast(toast_type, toast_text)}
          {this.state.toast_show ? callToast() : null}
        </View>
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
              <Text style={Styles.home_screen_headers_text}>Recipies</Text>
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
                placeholder="Search recipe"
              />
              <TouchableOpacity
                onPress={() => {
                  this.refs['search_bar'].blur();
                }}>
                <MaterialCommunityIcons
                  style={{paddingLeft: 10}}
                  name="send"
                  color="#EF6C00"
                  size={25}
                />
              </TouchableOpacity>
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
          <View style={{height: 60}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View style={{flexDirection: 'row'}}></View>
            </ScrollView>
          </View>
          <View style={{}}>
            <View style={{height: 50, justifyContent: 'center'}}>
              <Text style={{fontFamily: 'Comfortaa-Bold', fontSize: 24}}>
                5 star recipies:
              </Text>
            </View>
            <View style={{width: '100%'}}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{
                  height: 300,
                  width: '100%',
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingRight: 10,
                }}>
                <View
                  style={{
                    width: 250,
                    marginRight: 20,
                  }}>
                  <View
                    style={{
                      borderRadius: 10,
                      backgroundColor: 'black',
                      width: '100%',
                      height: '90%',
                    }}></View>
                  <Text
                    style={{
                      marginLeft: 10,
                      fontFamily: 'Comfortaa-Bold',
                      fontSize: 14,
                    }}>Salam</Text>
                </View>
              </ScrollView>
            </View>
          </View>
        </Animatable.View>
      </View>
    );
  }
}
export default Recipe;
