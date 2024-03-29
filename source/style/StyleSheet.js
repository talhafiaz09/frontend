import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;
export const CELL_SIZE = 70;
export const CELL_BORDER_RADIUS = 8;
export const DEFAULT_CELL_BG_COLOR = '#fff';
export const NOT_EMPTY_CELL_BG_COLOR = 'black';
export const ACTIVE_CELL_BG_COLOR = '#f7fafe';
const Styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#EF6C00',
  },
  splash_screen_top_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  splash_screen_middle_container: {
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splash_screen_bottom_container: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splash_screen_top_container_text: {
    color: '#F5F5F5',
    fontSize: 40,
    fontFamily: 'Comfortaa-Bold',
    marginLeft: 10,
  },
  splash_screen_bottom_container_text: {
    color: '#F5F5F5',
    fontSize: 35,
    fontFamily: 'IndieFlower-Regular',
  },
  lottie_carousel: {
    height: '65%',
    width: '65%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  toast_styling: {
    height: 75,
    width: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    justifyContent: 'center',
  },
  toast_text: {
    marginTop: 18,
    marginLeft: 20,
    color: 'white',
    fontSize: 20,
    fontFamily: 'Comfortaa-Bold',
  },
  login_screen_header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  login_screen_footer: {
    flex: 2,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 30,
    paddingRight: 30,
    paddingLeft: 30,
  },
  login_screen_login_text: {
    alignSelf: 'center',
    fontFamily: 'Comfortaa-Bold',
    fontSize: 28,
    marginBottom: 20,
  },
  login_screen_input_fields_container: {
    flexDirection: 'row',
    borderWidth: 1.5,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
    borderColor: '#00000050',
  },
  input_field: {
    flex: 1,
    paddingLeft: 12,
    color: '#EF6C00',
    fontFamily: 'Comfortaa-Bold',
    fontSize: 16,
  },
  login_screen_forget_password: {
    marginTop: 10,
    paddingLeft: 2,
    color: '#F44336',
    marginBottom: 30,
    fontFamily: 'Comfortaa-Bold',
  },
  login_screen_buttons_container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  login_screen_buttons_container_linear_gradient: {
    alignSelf: 'center',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  login_screen_buttons_container_linear_gradient_round: {
    alignSelf: 'center',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  login_screen_buttons_container_linear_gradient_text: {
    fontSize: 18,
    fontFamily: 'Comfortaa-Bold',
    fontSize: 17,
    color: 'white',
  },
  login_screen_signup_text: {
    marginTop: 10,
    color: '#F44336',
    fontFamily: 'Comfortaa-Bold',
    alignSelf: 'center',
  },
  login_facebook_google_logo_container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  signup_screen_header: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signup_screen_top_container_text: {
    color: '#F5F5F5',
    fontSize: 30,
    fontFamily: 'Comfortaa-Bold',
    marginLeft: 10,
  },
  signup_screen_image_container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  signup_screen_image_uploader: {
    
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  navigation_label_Styles: {fontFamily: 'Comfortaa-Regular'},
  bottom_navigation_label_Styles: {
    fontFamily: 'Comfortaa-Regular',
    marginBottom: 10,
    fontSize: 8,
  },
  bottom_navigation_icon_Styles: {
    marginBottom: 10,
    marginTop: 17,
  },
  drawer_open: {
    marginLeft: 15,
    marginTop: 10,
  },
  drawer_close: {
    alignSelf: 'flex-end',
    marginRight: 15,
    marginTop: 10,
  },
  drawer_user_info_container: {
    backgroundColor: '#EF6C00',
    height: 170,
  },
  drawer_user_profile_pic_container: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
  },
  profile_picture_container: {
    height: 100,
    width: 100,
    marginLeft: 15,
    marginTop: 10,
  },
  profile_picture: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: 120,
  },
  user_name_container: {
    justifyContent: 'center',
    height: 100,
    flexDirection: 'column',
    width: '50%',
    paddingLeft: 20,
    marginTop: 10,
  },
  user_name_styling: {
    color: 'white',
    fontSize: 15,
    alignSelf: 'center',
    fontFamily: 'Comfortaa-Regular',
  },
  profile_edit_button: {
    width: 50,
    marginTop: 10,
    marginLeft: 10,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    alignSelf: 'center',
  },
  recipe_button_round: {
    backgroundColor: '#F44336',
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 72,
    borderRadius: 36,
    position: 'absolute',
    top: -60,
    shadowOffset: {height: 10},
  },
  home_screen_headers: {
    flexDirection: 'row',
  },
  home_screen_headers_text_container: {
    justifyContent: 'center',
    width: '80%',
  },
  home_screen_headers_text: {
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'Comfortaa-Bold',
    fontSize: 28,
  },
  home_screens_bottom: {
    flex: 3,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  bar_mic_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search_bars_container: {
    width: '70%',
    marginLeft: 20,
    marginRight: 10,
    flexDirection: 'row',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  mic_container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#32CD32',
    padding: 12,
    borderRadius: 100,
    marginRight: 20,
  },
  search_bar_styling: {
    flex: 1,
    paddingLeft: 12,
    color: '#EF6C00',
    fontFamily: 'Comfortaa-Bold',
    fontSize: 14,
  },
  ingredients_view_list_container: {
    backgroundColor: '#fcfcfd',
    borderColor: '#fcfcfd',
    borderWidth: 2,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginBottom: 30,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  ingredients_view_list_container_header: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '30%',
    height: 70,
    borderBottomColor: 'white',
    borderBottomWidth: 3,
  },
  ingredients_view_list_container_header_picture: {
    width: 45,
    height: 45,
    borderRadius: 120,
    marginLeft: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ingredients_view_list_styling: {
    backgroundColor: '#ffd23a',
    margin: 3,
    borderRadius: 5,
    justifyContent: 'center',
    padding: 5,
  },
  ingredients_view_list_text_styling: {
    alignSelf: 'center',
    fontFamily: 'Comfortaa-Medium',
    color: 'white',
    fontSize: 10,
  },
  pantry_screens_bottom: {
    flex: 3,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  add_container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#32CD32',
    padding: 12,
    height: 60,
    width: 60,
    borderRadius: 100,
  },
  pantry_modal_container: {
    height: 250,
    width: '80%',
    // backgroundColor: '#FFDEAD',
    backgroundColor: '#ffcc00',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 1,
    alignSelf: 'center',
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  modal_input_fields_container: {
    flexDirection: 'row',
    width: '90%',
    marginBottom: 25,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    marginTop: 20,
    elevation: 1,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  pantries_list_view: {
    width: '100%',
    backgroundColor: '#000',
    marginTop: 10,
    backgroundColor: '#fcfcfd',
    borderColor: '#fcfcfd',
    borderWidth: 2,
    borderRadius: 20,
    elevation: 5,
  },
  pantries_list_view_header_text: {
    fontFamily: 'Comfortaa-Bold',
    width: '50%',
    color: 'black',
    alignSelf: 'center',
    fontSize: 18,
  },
  pantries_list_view_header_icons: {
    alignSelf: 'center',
    margin: 0,
    flexDirection: 'row',
  },
  pantries_list_view_header: {
    flexDirection: 'row',
    height: 50,
    marginLeft: 20,
  },
  pantries_list_view_footer: {
    height: 0,
    overflow: 'hidden',
  },
  pantry_ingredients_view: {
    width: '90%',
    marginTop: 10,
    alignSelf: 'center',
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#ffd23a',
    borderColor: '#ffd23a',
    borderWidth: 2,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 1,
  },
  ingredient_modal_container: {
    height: 400,
    width: '80%',
    // backgroundColor: '#FFDEAD',
    backgroundColor: '#ffcc00',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 1,
    alignSelf: 'center',
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  pantries_list_view_ingredients_screen: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    marginTop: 10,
    backgroundColor: '#fcfcfd',
    borderRadius: 10,
    elevation: 1,
  },
  pantries_list_view_text_ingredients_screen: {
    fontFamily: 'Comfortaa-Bold',
    width: '70%',
    color: 'black',
    alignSelf: 'center',
    marginLeft: 20,
    fontSize: 18,
  },
  pantries_list_view_text_pantry_screen: {
    fontFamily: 'Comfortaa-Bold',
    width: '80%',
    color: 'white',
    alignSelf: 'center',
    marginLeft: 20,
    fontSize: 18,
  },
  pantries_list_view_ingredients_header_icons: {
    height: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  five_star_recipies: {
    height: 300,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },
  image_viewer_in_recipe: {
    borderRadius: 10,
    width: '100%',
    height: '90%',
  },
  five_star_recipe_text: {
    marginLeft: 8,
    fontFamily: 'Comfortaa-Bold',
    fontSize: 14,
  },
  other_recipies: {
    height: 250,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },
  other_recipies_image_viewer: {
    borderRadius: 10,
    backgroundColor: 'black',
    width: '100%',
    height: 200,
  },
  other_recipies_text: {
    marginLeft: 10,
    fontFamily: 'Comfortaa-Bold',
    fontSize: 14,
  },
  recipie_image_styling: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  recipe_detail_screens_bottom: {
    position: 'absolute',
    width: '100%',
    height: '65%',
    // flex: 2,
    bottom: 0,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  recipe_rating_container: {
    borderRadius: 20,
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#f5f5f5',
    elevation: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    height: 150,
    width: '100%',
    alignItems: 'center',
    top: -90,
  },
  rating_text: {
    marginLeft: 10,
    marginTop: 5,
    fontFamily: 'Comfortaa-Bold',
    fontSize: 18,
  },
  rating_view: {
    height: '50%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  recipe_detail_view_name_container: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
  },
  nutrition_bar_value_container: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
  },
  nutrition_value: {
    alignSelf: 'flex-end',
    fontFamily: 'Comfortaa-Medium',
    fontSize: 16,
  },
  nutrition_name: {
    fontFamily: 'Comfortaa-Medium',
    fontSize: 18,
    marginLeft: 10,
  },
  heart_styling: {
    alignSelf: 'flex-end',
    zIndex: 2,
    position: 'absolute',
    right: 20,
    top: 10,
  },
  heart_styling_favourite: {
    alignSelf: 'flex-end',
    zIndex: 2,
    position: 'absolute',
    right: 10,
    top: 5,
  },
  view_recipie_main_container: {
    backgroundColor: '#fcfcfd',
    borderColor: '#fcfcfd',
    marginBottom: 20,
    borderWidth: 2,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: 'row',
    height: 200,
    borderRadius: 20,
  },
  view_recipie_image: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  view_recipie_name: {
    alignSelf: 'center',
    fontFamily: 'Comfortaa-Bold',
    fontSize: 18,
  },
  view_recipie_detail: {
    alignSelf: 'flex-end',
    height: '30%',
    width: '100%',
    borderRadius: 10,
    borderColor: 'green',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeFieldRoot: {
    height: CELL_SIZE,
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  cell: {
    marginHorizontal: 8,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    ...Platform.select({web: {lineHeight: 65}}),
    fontSize: 30,
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,
    color: '#3759b8',
    backgroundColor: '#fff',

    // IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },

  // =======================

  root: {
    minHeight: 800,
    padding: 20,
  },
  title: {
    paddingTop: 50,
    color: '#000',
    fontFamily: 'Comfortaa-Bold',
    fontSize: 25,
    textAlign: 'center',
    paddingBottom: 40,
  },
  icon: {
    width: 217 / 2.4,
    height: 158 / 2.4,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  subTitle: {
    paddingTop: 30,
    color: '#000',
    fontFamily: 'Comfortaa-Bold',
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 30,
    borderRadius: 60,
    height: 60,
    backgroundColor: '#3557b7',
    justifyContent: 'center',
    marginBottom: 100,
  },
  nextButtonText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Comfortaa-Bold',
    color: '#fff',
  },
  pin_fields: {
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 30,
    borderRadius: 10,
    height: 60,
    width: 50,
  },
  change_password_field: {
    flexDirection: 'row',
    borderWidth: 1.5,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
    borderColor: '#ffffff',
    backgroundColor: '#ffffffff',
  },
  shopping_list_view: {
    width: '100%',
    marginTop: 10,
    borderBottomColor: 'green',
    borderBottomWidth: 1,
    borderTopColor: 'green',
    borderTopWidth: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 10,
  },
  shopping_list_view_text: {
    fontFamily: 'Comfortaa-Bold',
    width: '75%',
    color: 'black',
    alignSelf: 'center',
    fontSize: 18,
  },
  custom_text_field: {
    flexDirection: 'row',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  add_recipe_image_container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    height: WINDOW_WIDTH,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 20,
    borderStyle: 'dotted',
  },
  recipe_detail_meal_cuisine_tags: {
    backgroundColor: '#ffd23a',
    margin: 3,
    borderRadius: 5,
    justifyContent: 'center',
    padding: 5,
  },
  recipe_detail_meal_cuisine_tags_text: {
    alignSelf: 'center',
    fontFamily: 'Comfortaa-Medium',
    color: 'white',
    fontSize: 14,
  },
});
export default Styles;
