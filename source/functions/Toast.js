import React, {Component} from 'react';
import {View, Animated, Text} from 'react-native';
import Styles from '../style/StyleSheet';
let toast_color = '';
let toast_text = '';
let animatedValue = new Animated.Value(-80);
export function callToast() {
  Animated.timing(animatedValue, {
    toValue: 0,
    duration: 350,
    useNativeDriver: false,
  }).start(closeToast());
}

function closeToast() {
  setTimeout(() => {
    Animated.timing(animatedValue, {
      toValue: -80,
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, 800);
}
export function toast(type, text) {
  toast_text = text;
  if (type == 'error') {
    toast_color = 'red';
  } else if (type == 'success') {
    toast_color = 'green';
  }

  return (
    <Animated.View
      style={{
        transform: [{translateY: animatedValue}],
        backgroundColor: toast_color,
        flex: 1,
        zIndex: 0.5,
      }}>
      <Text style={Styles.toast_text}>{toast_text}</Text>
    </Animated.View>
  );
}
