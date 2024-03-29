import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
  Text,
  View,
  BackHandler,
} from 'react-native';
import FloatingVideo from 'rn-floating-video-widget';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Styles from '../style/StyleSheet';
import HeaderComponent from '../components/HeaderComponent';
export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      floating: false,
      granted: false,
    };
    this.data = {
      video: {
        url: this.props.route.params.video,
      },
    };
  }
  componentDidMount() {
    console.log(this.props.route.params.video);
    FloatingVideo.onClose((data) => console.log(data));
    FloatingVideo.onOpen((data) => console.log(data));
    FloatingVideo.onPlay((data) => console.log(data));
    FloatingVideo.onPause((data) => console.log(data));
    FloatingVideo.onNext((data) => console.log(data));
    FloatingVideo.onPrev((data) => console.log(data));
    FloatingVideo.onError((data) => console.log(data));
    this.showFloatingView();
  }
  showFloatingView = () => {
    FloatingVideo.requestOverlayPermission()
      .then(() => {
        this.setState({
          floating: true,
          granted: true,
        });
        FloatingVideo.open(this.data);
      })
      .catch((e) => {
        ToastAndroid.show(
          'Please grant draw over other apps permission' + JSON.stringify(e),
          800,
        );
      });
  };
  componentWillUnmount() {
    FloatingVideo.removeAllListeners();
  }
  render() {
    const floating = this.state.floating;
    return (
      <SafeAreaView style={styles.container}>
        <View style={Styles.home_screen_headers}>
          <Animatable.View animation="bounceInLeft" duration={1500}>
            <TouchableOpacity
              onPress={() => {
                this.props.route.params.navigation.pop();
              }}>
              <AntDesign
                style={Styles.drawer_open}
                name="arrowleft"
                color="white"
                size={35}
              />
            </TouchableOpacity>
          </Animatable.View>
          <Animatable.View
            animation="bounceInRight"
            duration={1500}
            style={Styles.home_screen_headers_text_container}>
            <Text style={Styles.home_screen_headers_text}>Video</Text>
          </Animatable.View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EF6C00',
  },
});
