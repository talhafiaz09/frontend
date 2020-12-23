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
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from '../style/StyleSheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import Voice from '@react-native-community/voice';
import {
  show_typing_animation_input_fields,
  show_loading_animation_ingredients,
  show_loading_animation_pantry,
  FETCH_URL,
} from '../functions/FunctionHandler';
import {toast, callToast} from '../functions/Toast';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
var toast_type = '';
var toast_text = '';
class RecipieVoiceSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spokenText: [],
      showAnimation: this.props.microphonePressed,
      toast_show: false,
    };
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
  }
  onSpeechResults(e) {
    this.setState({
      spokenText: e.value,
      showAnimation: false,
    });
    console.log(this.state.spokenText);
    console.log(this.state.showAnimation);
  }
  componentDidMount() {
    this.onSpeechStart();
  }
  onSpeechStart() {
    console.log('PressedIn');
    Voice.start('en');
  }
  onSpeechEnd() {
    console.log('PressedOut');
    Voice.stop();
  }

  render() {
    return (
      <View>
        <View style={Styles.toast_styling}>
          {toast(toast_type, toast_text)}
          {this.state.toast_show ? callToast() : null}
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.props.microphonePressed}>
          <KeyboardAvoidingView
            behavior="height"
            style={{justifyContent: 'center', width: '100%', height: '100%'}}>
            <View style={Styles.ingredient_modal_container}>
              <View style={{alignItems: 'center', height: 90}}>
                <View width="100%" style={{marginRight: 20, marginTop: 10}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({spokenText: []});
                      this.onSpeechEnd();
                      this.props.microphonePressedHandler();
                    }}>
                    <MaterialCommunityIcons
                      name="close-box"
                      size={30}
                      style={{alignSelf: 'flex-end'}}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text
                    style={{
                      marginTop: 5,
                      fontFamily: 'Comfortaa-Bold',
                      fontSize: 24,
                    }}>
                    Listening
                  </Text>
                </View>
              </View>
              {this.state.showAnimation === false ? (
                this.state.spokenText.length === 0 ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '70%',
                    }}>
                    <Text
                      style={{
                        marginTop: 5,
                        fontFamily: 'Comfortaa-Bold',
                        fontSize: 18,
                      }}>
                      Word not recognized
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text
                      style={{
                        alignSelf: 'center',
                        marginTop: 5,
                        fontFamily: 'Comfortaa-Bold',
                        textAlign: 'center',
                        fontSize: 18,
                        marginTop: 20,
                      }}>
                      You said "{this.state.spokenText[0]}"
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        // this.addRecipe();
                        this.props.typingvoiceSearch(this.state.spokenText[0]);
                        this.props.textHandler(this.state.spokenText[0]);
                        this.onSpeechEnd();
                        this.props.microphonePressedHandler();
                      }}>
                      <View
                        style={[
                          Styles.login_screen_buttons_container,
                          {width: '100%', height: 50, marginTop: 30},
                        ]}>
                        <LinearGradient
                          colors={['#003152', '#1D2951']}
                          style={
                            Styles.login_screen_buttons_container_linear_gradient
                          }>
                          <Text
                            style={
                              Styles.login_screen_buttons_container_linear_gradient_text
                            }>
                            Search
                          </Text>
                        </LinearGradient>
                      </View>
                    </TouchableOpacity>
                  </View>
                )
              ) : (
                <View
                  style={{
                    height: '80%',
                    justifyContent: 'center',
                  }}>
                  {show_loading_animation_pantry()}
                </View>
              )}
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    );
  }
}
export default RecipieVoiceSearch;
