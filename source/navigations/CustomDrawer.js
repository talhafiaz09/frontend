import React from 'react';
import {View, Text, TouchableOpacity, Dimensions, Image} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Container, Content, Right, Footer, Button} from 'native-base';
import Styles from '../style/StyleSheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
let email = '';
let Image_Http_URL = {
  uri:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
};
export function Sidebar({...props}) {
  return (
    <Container>
      <Content>
        <View style={Styles.drawer_user_info_container}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.closeDrawer();
            }}>
            <AntDesign
              style={Styles.drawer_close}
              name="menu-unfold"
              color="white"
              size={30}
            />
          </TouchableOpacity>
          <View>
            <View style={Styles.drawer_user_profile_pic_container}>
              <View style={Styles.profile_picture_container}>
                <Image style={Styles.profile_picture} source={Image_Http_URL} />
              </View>
              <View style={Styles.user_name_container}>
                <Text style={Styles.user_name_styling}>
                  {props.username.substring(0, props.username.indexOf('@'))}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('Profile');
                  }}
                  style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <View style={Styles.profile_edit_button}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        color: 'white',
                        fontFamily: 'Comfortaa-Regular',
                        fontSize: 10,
                        paddingBottom: 2,
                      }}>
                      Edit
                    </Text>
                  </View>
                  <AntDesign
                    style={{alignSelf: 'center', marginTop: 8, marginLeft: 5}}
                    color="white"
                    name="edit"
                    size={18}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </Content>
      <Footer
        style={{
          backgroundColor: 'none',
          flexDirection: 'column',
          alignContent: 'center',
        }}>
        <View
          style={{flex: 1, borderTopWidth: 0.5, borderTopColor: 'gray'}}></View>
        <DrawerItem
          style={{alignSelf: 'center'}}
          onPress={() => {
            props.clearAsyncStorage();
            props.navigation.navigate('Login');
          }}
          label="Log out"
          labelStyle={{fontFamily: 'Comfortaa-Regular'}}
          icon={({color}) => (
            <AntDesign color={color} name="logout" size={20} />
          )}></DrawerItem>
      </Footer>
    </Container>
  );
}
