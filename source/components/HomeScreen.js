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
    };
    this.display_email();
  }
  async display_email() {
    try {
      var email = await AsyncStorage.getItem('username');
      this.setState({
        username: email,
      });
    } catch (err) {}
  }
  async clearAsyncStorage() {
    try {
      await AsyncStorage.removeItem('username');
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
        <Drawer.Screen
          name="Profile"
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
