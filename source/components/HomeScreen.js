import React, {Component} from 'react';
import {View, Text, Dimensions} from 'react-native';
import Styles from '../style/StyleSheet';
import HomeScreenNavigation from '../navigations/HomeScreenNavigation';
import ProfileScreen from '../components/ProfileScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Sidebar} from '../navigations/CustomDrawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
const Drawer = createDrawerNavigator();
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      imageUri: '',
      info: null,
    };
  }
  UNSAFE_componentWillMount() {
    this.getUserInfo();
    this.getExtraInfo();
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
      profilepicture = 'data:image/png;base64,' + profilepicture;
      this.setState({
        username: email,
        imageUri: profilepicture,
      });
    } catch (err) {}
  }
  async clearAsyncStorage() {
    try {
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('profilepicture');
    } catch (err) {}
  }
  render() {
    return (
      <Drawer.Navigator
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
          />
        )}>
        <Drawer.Screen
          name="Home"
          component={this.Home}
          options={{
            drawerIcon: ({color}) => (
              <AntDesign color={color} name="home" size={20} />
            ),
          }}
        />
        {/* {this.state.info == null || this.state.info == '' ? ( */}
        <Drawer.Screen
          name="Edit profile"
          component={this.Profile}
          options={{
            drawerIcon: ({color}) => (
              <AntDesign color={color} name="user" size={20} />
            ),
          }}
        />
        <Drawer.Screen
          name="Add recipe"
          component={this.Setting}
          options={{
            drawerIcon: ({color}) => (
              <AntDesign color={color} name="addfile" size={20} />
            ),
          }}
        />
        <Drawer.Screen
          name="My recipes"
          component={this.Setting}
          options={{
            drawerIcon: ({color}) => (
              <AntDesign color={color} name="profile" size={20} />
            ),
          }}
        />
        <Drawer.Screen
          name="Image to Recipe"
          component={this.Image_to_text}
          options={{
            drawerIcon: ({color}) => (
              <AntDesign color={color} name="camerao" size={20} />
            ),
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={this.Setting}
          options={{
            drawerIcon: ({color}) => (
              <AntDesign color={color} name="setting" size={20} />
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
  Setting({navigation}) {
    return (
      <View animation="fadeInLeft" style={Styles.main_container}>
        <Text></Text>
      </View>
    );
  }
  Image_to_text({navigation}) {
    return (
      <View animation="fadeInLeft" style={Styles.main_container}>
        <Text></Text>
      </View>
    );
  }
}
export default HomeScreen;
