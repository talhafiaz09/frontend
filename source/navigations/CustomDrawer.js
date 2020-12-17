import React from 'react';
import {View, Text, TouchableOpacity, Dimensions, Image} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Container, Content, Footer} from 'native-base';
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
                {props.imageUri != '' ? (
                  <Image
                    style={Styles.profile_picture}
                    source={{uri: props.imageUri}}
                  />
                ) : null}
              </View>

              <View style={Styles.user_name_container}>
                <Text style={Styles.user_name_styling}>
                  {props.username.substring(0, props.username.indexOf('@'))}
                </Text>
                {props.off == null ? (
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('Edit profile');
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
                ) : null}
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
          justifyContent: 'center',
        }}>
        <View
          style={{flex: 1, borderTopWidth: 0.5, borderTopColor: 'gray'}}></View>
        <DrawerItem
          style={
            {
              // justifyContent: 'center',
              // backgroundColor: 'red',
              // width: '100%',
            }
          }
          onPress={() => {
            props.clearAsyncStorage();
            props.navigation.replace('Login');
          }}
          label="Log out"
          labelStyle={{
            fontFamily: 'Comfortaa-Regular',
            // alignSelf: 'center',
          }}
          icon={({color}) => (
            <AntDesign color={color} name="logout" size={20} />
          )}
          iconStyle={{
            alignSelf: 'center',
            backgroundColor: 'red',
          }}></DrawerItem>
      </Footer>
    </Container>
  );
}
