import React, { useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, Text } from "react-native";

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
const CARD_WIDTH = 150;

const { height, width } = Dimensions.get("window");
const MARGIN = 5;
const HEIGHT = CARD_HEIGHT + MARGIN * 2;
const WIDTH = CARD_WIDTH + MARGIN * 2;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    backgroundColor: COLORS.softBlue,
    flexDirection: 'row',
  },
  card: {
    marginVertical: MARGIN,
    width: WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
});

const Play = ({ setPlay, namesToPray }) => {
  const cards = namesToPray.reduce((arr, { title, data }, i) => {
    return [...arr, title];
  }, []);
  const [containerHeight, setContainerHeight] = useState(width);
  const visibleCards = Math.floor(containerHeight / WIDTH);
  const {
    gestureHandler,
    translation,
    velocity,
    state,
  } = usePanGestureHandler();
  const x = diffClamp(
    withDecay({
      value: translation.x,
      velocity: velocity.x,
      state,
    }),
    -WIDTH * cards.length + visibleCards * WIDTH,
    0
  );
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={styles.container}
        onLayout={({
          nativeEvent: {
            layout: { width: w },
          },
        }) => setContainerHeight(w)}
      >
          <TouchableOpacity style={{...StyleSheet.absoluteFillObject, top: 20, left: 20, zIndex: 100, width: 70, height: 70}} onPress={() => setPlay(false)}>
            <Text style={{ fontSize: 34, color: COLORS.tigerlily, fontWeight: 'bold' }}>X</Text>
          </TouchableOpacity>
        {cards.map((name, index) => {
          const positionX = add(x, index * WIDTH);
          const isDisappearing = -WIDTH;
          const isTop = 100;
          const isBottom = (WIDTH * (visibleCards - 1)) - 50;
          const isAppearing = WIDTH * visibleCards;
          const translateXWithScale = interpolate(positionX, {
            inputRange: [isBottom, isAppearing],
            outputRange: [0, -WIDTH / 4],
            extrapolate: Extrapolate.CLAMP,
          });
          const translateX = add(
            interpolate(x, {
              inputRange: [-WIDTH * index, 0],
              outputRange: [-WIDTH * index, 0],
              extrapolate: Extrapolate.CLAMP,
            }),
            translateXWithScale
          );
          const scale = interpolate(positionX, {
            inputRange: [isDisappearing, isTop, isBottom, isAppearing],
            outputRange: [0.5, 1, 1, 0.5],
            extrapolate: Extrapolate.CLAMP,
          });
          const opacity = interpolate(positionX, {
            inputRange: [isDisappearing, isTop, isBottom, isAppearing],
            outputRange: [0, 1, 1, 0],
            extrapolate: Extrapolate.CLAMP,
          });
          return (
            <Animated.View
              style={[
                styles.card,
                { opacity, transform: [{ translateX }, { scale }] },
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