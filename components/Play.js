import React, { useState } from "react";
import { Dimensions, StyleSheet, View, TouchableOpacity, Text } from "react-native";

import Animated, {
  Extrapolate,
  add,
  interpolate,
} from "react-native-reanimated";

import { PanGestureHandler } from "react-native-gesture-handler";
import {
  diffClamp,
  usePanGestureHandler,
  withDecay,
} from "react-native-redash";
import { COLORS } from "../CONSTANTS";

const CARD_HEIGHT = 80;

const { height, width } = Dimensions.get("window");
const MARGIN = 5;
const HEIGHT = CARD_HEIGHT + MARGIN * 2;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    backgroundColor: COLORS.softBlue,
  },
  card: {
    marginVertical: MARGIN,
    width: width - 30,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
});

const Play = ({ setPlay, namesToPray }) => {
  const cards = namesToPray.reduce((arr, { title, data }, i) => {
    return [...arr, ...data];
  }, []);
  const [containerHeight, setContainerHeight] = useState(height);
  const visibleCards = Math.floor(containerHeight / HEIGHT);
  const {
    gestureHandler,
    translation,
    velocity,
    state,
  } = usePanGestureHandler();
  const y = diffClamp(
    withDecay({
      value: translation.y,
      velocity: velocity.y,
      state,
    }),
    -HEIGHT * cards.length + visibleCards * HEIGHT,
    0
  );
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={styles.container}
        onLayout={({
          nativeEvent: {
            layout: { height: h },
          },
        }) => setContainerHeight(h)}
      >
          <TouchableOpacity style={{...StyleSheet.absoluteFillObject, top: 20, left: 20, zIndex: 100, width: 70, height: 70}} onPress={() => setPlay(false)}>
            <Text style={{ fontSize: 34, color: COLORS.tigerlily, fontWeight: 'bold' }}>X</Text>
          </TouchableOpacity>
        {cards.map(({ name }, index) => {
          const positionY = add(y, index * HEIGHT);
          const isDisappearing = -HEIGHT;
          const isTop = 100;
          const isBottom = (HEIGHT * (visibleCards - 1)) - 50;
          const isAppearing = HEIGHT * visibleCards;
          const translateYWithScale = interpolate(positionY, {
            inputRange: [isBottom, isAppearing],
            outputRange: [0, -HEIGHT / 4],
            extrapolate: Extrapolate.CLAMP,
          });
          const translateY = add(
            interpolate(y, {
              inputRange: [-HEIGHT * index, 0],
              outputRange: [-HEIGHT * index, 0],
              extrapolate: Extrapolate.CLAMP,
            }),
            translateYWithScale
          );
          const scale = interpolate(positionY, {
            inputRange: [isDisappearing, isTop, isBottom, isAppearing],
            outputRange: [0.5, 1, 1, 0.5],
            extrapolate: Extrapolate.CLAMP,
          });
          const opacity = interpolate(positionY, {
            inputRange: [isDisappearing, isTop, isBottom, isAppearing],
            outputRange: [0, 1, 1, 0],
            extrapolate: Extrapolate.CLAMP,
          });
          return (
            <Animated.View
              style={[
                styles.card,
                { opacity, transform: [{ translateY }, { scale }] },
              ]}
              key={index}
            >
                <Text style={{ fontSize: 44, color: COLORS.rosyHightlight, fontWeight: '600' }}>{ name }</Text>
            </Animated.View>
          );
        })}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Play;