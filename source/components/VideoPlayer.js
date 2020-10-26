import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ToastAndroid,
  Text,
  BackHandler,
} from 'react-native';
import FloatingVideo from 'rn-floating-video-widget';

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      floating: false,
      granted: false,
    };
    // The Data Object
    this.data = {
      video: {
        url:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      },
      // seek: 10,
      // index: 0,
    };
    // BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   this.handleBackButton.bind(this),
    // );
  }
  handleBackButton = () => {
    // this.props.navigation.pop();
  };
  componentDidMount() {
    // Add event listeners
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
    return <SafeAreaView style={styles.container}>{}</SafeAreaView>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
