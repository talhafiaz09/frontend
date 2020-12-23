import React, {Component} from 'react';
import {View, Text, Dimensions} from 'react-native';
import Styles from '../style/StyleSheet';
import HomeScreenNavigation from '../navigations/HomeScreenNavigation';
import ProfileScreen from '../components/ProfileScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Sidebar} from '../navigations/CustomDrawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import AddRecipe from '../components/AddRecipe';
import ImageToText from '../components/ImageToText';
import Payment from '../components/Payment';
import MyRecipies from '../components/MyRecipies';
import {
  width,
  email_regex,
  animationIn,
  animationOut,
  FETCH_URL,
  show_typing_animation_input_fields,
  show_loading_animation_pantry,
  show_typing_animation_button,
} from '../functions/FunctionHandler';
import Voice from '@react-native-community/voice';
const Drawer = createDrawerNavigator();
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      imageUri: '',
      info: null,
      off: null,
      premium: false,
    };
  }
  UNSAFE_componentWillMount() {
    this.getUserInfo();
  }
  async getExtraInfo() {
    try {
      var info_ = await AsyncStorage.getItem('f_g_user');
      this.setState({
        info: info_,
      });
    } catch (err) {}
  }
  async getUserInfo() {
    try {
      var email = await AsyncStorage.getItem('username');
      var profilepicture = await AsyncStorage.getItem('profilepicture');
      var check = await AsyncStorage.getItem('f_g_user');
      console.log(check);
      profilepicture = 'data:image/png;base64,' + profilepicture;
      this.setState({
        username: email,
        imageUri: profilepicture,
        off: check,
      });
      // console.log(this.state.off);
    } catch (err) {}
  }
  async clearAsyncStorage() {
    try {
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('profilepicture');
      await AsyncStorage.removeItem('f_g_user');
    } catch (err) {}
  }
  render() {
    return (
      <Drawer.Navigator
        // initialRouteName={'Image to Recipe'}
        drawerContentOptions={{
          activeTintColor: 'red',
          labelStyle: Styles.navigation_label_Styles,
        }}
        drawerContent={(props) => (
          <Sidebar
            {...props}
            username={this.state.username}
            imageUri={this.state.imageUri}
            info={this.state.info}
            clearAsyncStorage={this.clearAsyncStorage}
            off={this.state.off}
          />
        )}>
        <Drawer.Screen
          name="Home"
          component={this.Home}
          listeners={{}}
          options={{
            drawerIcon: ({color}) => (
              <AntDesign color={color} name="home" size={20} />
            ),
          }}
        />
        {this.state.off !== 'yes' ? (
          <Drawer.Screen
            name="Edit profile"
            component={this.Profile}
            options={{
              drawerIcon: ({color}) => (
                <AntDesign color={color} name="user" size={20} />
              ),
            }}
          />
        ) : null}
        <Drawer.Screen
          name="Add recipe"
          component={this.AddRecipe}
          options={{
            unmountOnBlur: true,
            drawerIcon: ({color}) => (
              <AntDesign color={color} name="addfile" size={20} />
            ),
          }}
        />
        <Drawer.Screen
          name="My recipes"
          component={this.MyRecipies}
          options={{
            unmountOnBlur: true,
            drawerIcon: ({color}) => (
              <AntDesign color={color} name="profile" size={20} />
            ),
          }}
        />
        <Drawer.Screen
          name="Image to Recipe"
          component={this.Image_to_text}
          options={{
            unmountOnBlur: true,
            drawerIcon: ({color}) => (
              <AntDesign color={color} name="camerao" size={20} />
            ),
          }}
        />
        <Drawer.Screen
          name="Payment"
          component={this.Payment}
          options={{
            unmountOnBlur: true,
            drawerIcon: ({color}) => (
              <AntDesign color={color} name="wallet" size={20} />
            ),
          }}
        />
      </Drawer.Navigator>
    );
  }
  Home({navigation}) {
    return (
      <View animation="fadeIn" style={Styles.main_container}>
        <HomeScreenNavigation navigation={navigation} />
      </View>
    );
  }
  Profile({navigation}) {
    return (
      <View animation="fadeInLeft" style={Styles.main_container}>
        <ProfileScreen navigation={navigation} />
      </View>
    );
  }
  AddRecipe({navigation}) {
    return (
      <View animation="fadeInLeft" style={Styles.main_container}>
        <AddRecipe navigation={navigation} />
      </View>
    );
  }
  MyRecipies({navigation}) {
    return (
      <View animation="fadeInLeft" style={Styles.main_container}>
        <MyRecipies navigation={navigation} />
      </View>
    );
  }
  Payment({navigation}) {
    return (
      <View animation="fadeInLeft" style={Styles.main_container}>
        <Payment navigation={navigation} />
      </View>
    );
  }
  Image_to_text({navigation}) {
    return (
      <View animation="fadeInLeft" style={Styles.main_container}>
        <ImageToText navigation={navigation} />
      </View>
    );
  }
}
export default HomeScreen;
