import React from 'react';
import {Dimensions} from 'react-native';
import {Animated} from 'react-native';
import {TypingAnimation} from 'react-native-typing-animation';
export const FETCH_URL = {
  //Phone
  // IP : "http://192.168.100.19:3000",
  //Emulator
  IP: 'http://10.0.2.2:3000',
};
export const width = Dimensions.get('screen').width;
export const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export function animationIn(value) {
  Animated.timing(value, {
    toValue: 0.5,
    duration: 500,
    delay: 0,
    useNativeDriver: false,
  }).start();
}
export function animationOut(value) {
  Animated.timing(value, {
    toValue: 1,
    duration: 200,
    delay: 0,
    useNativeDriver: false,
  }).start();
}
export function show_typing_animation_input_fields() {
  return (
    <TypingAnimation
      dotColor="#EF6C00"
      dotMargin={3.5}
      dotAmplitude={3}
      dotSpeed={0.17}
      dotRadius={3.5}
      dotX={8}
      dotY={-1.5}
      style={{paddingRight: 21.5}}
    />
  );
}
export function show_typing_animation_button() {
  return (
    <TypingAnimation
      dotColor="white"
      dotMargin={7}
      dotAmplitude={4}
      dotSpeed={0.2}
      dotRadius={5}
      dotX={0}
      dotY={-2.5}
    />
  );
}
export function show_loading_animation_ingredients() {
  return (
    <TypingAnimation
      dotColor="#F44336"
      dotMargin={7}
      dotAmplitude={4}
      dotSpeed={0.2}
      dotRadius={5}
      dotX={0}
      dotY={-2.5}
    />
  );
}
export function show_loading_animation_pantry() {
  return (
    <TypingAnimation
      style={{alignSelf: 'center'}}
      dotColor="#F44336"
      dotMargin={20}
      dotAmplitude={5}
      dotSpeed={0.2}
      dotRadius={10}
      dotX={0}
      dotY={-2.5}
    />
  );
}
