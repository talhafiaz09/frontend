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
class FavoriteRecipies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toast_show: false,
      isLoading: true,
    };
  }
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
              <Text style={Styles.home_screen_headers_text}>
                Favourite Recipies
              </Text>
            </Animatable.View>
          </View>
        </View>
        <Animatable.View
          delay={400}
          duration={1500}
          animation="bounceInUp"
          style={Styles.home_screens_bottom}>
          {this.state.isLoading ? (
            <View style={{height: '100%', justifyContent: 'center'}}>
              {show_loading_animation_pantry()}
            </View>
          ) : (
            <View style={Styles.view_recipie_main_container}>
              <View style={{width: '40%'}}>
                <Image
                  style={Styles.view_recipie_image}
                  source={{
                    uri:
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2b_pfr07lGLpshLd1CsXUDNV9V13-AOvXyFMx5cY24GCWFsA&s',
                  }}
                />
              </View>
              <View style={{width: '60%', height: '100%', padding: 10}}>
                <View style={Styles.heart_styling_favourite}>
                  <TouchableOpacity onPress={() => {}}>
                    {this.state.isFavourite ? (
                      <MaterialCommunityIcons
                        color="red"
                        name="heart"
                        size={30}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        color="red"
                        name="heart-outline"
                        size={30}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 30, height: '5%'}}>
                  <Text style={Styles.view_recipie_name}>Recipie name</Text>
                </View>
                <View style={{height: '45%'}}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}></ScrollView>
                </View>
                <View style={Styles.view_recipie_detail}>
                  <Text style={{fontFamily: 'Comfortaa-Bold'}}>
                    View details
                  </Text>
                </View>
              </View>
            </View>
          )}
        </Animatable.View>
      </View>
    );
  }
}
export default FavoriteRecipies;
