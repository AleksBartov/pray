import React, { useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, Text } from "react-native";

import Animated, {
  Extrapolate,
  add,
  interpolate,
  sub,
} from "react-native-reanimated";

import { PanGestureHandler } from "react-native-gesture-handler";
import {
  diffClamp,
  usePanGestureHandler,
  withDecay,
} from "react-native-redash";
import { COLORS, MIN_HEADER_HEIGHT } from "../CONSTANTS";

const CARD_HEIGHT = 40;
const CARD_WIDTH = 80;

const { height, width } = Dimensions.get("window");
const MARGIN = 5;
const HEIGHT = CARD_HEIGHT + MARGIN * 2;
const WIDTH = CARD_WIDTH + MARGIN * 2;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    backgroundColor: COLORS.pencilLead,
    flexDirection: 'row',
    top: MIN_HEADER_HEIGHT,
    paddingLeft: width/2 - WIDTH/2,
    height: HEIGHT,
    zIndex: 300,
  },
  card: {
    marginVertical: MARGIN,
    width: WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: COLORS.pencilLead,
  },
});

const GroupsInHeader = ({ groups, opacity: op }) => {
  const cards = groups.reduce((arr, { title, data }, i) => {
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
        style={[styles.container, { opacity: op }]}
      >
        {cards.map((name, index) => {
          const positionX = add(x, index * WIDTH);
          const isDisappearing = -WIDTH;
          const isLeft = 100;
          const isRight = (WIDTH * (visibleCards - 1)) - 50;
          const isAppearing = WIDTH * visibleCards;
          const translateXWithScale = interpolate(positionX, {
            inputRange: [isRight, isAppearing],
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
            inputRange: [isDisappearing, isLeft, isRight, isAppearing],
            outputRange: [0.5, 1, 1, 0.5],
            extrapolate: Extrapolate.CLAMP,
          });
          const opacity = interpolate(positionX, {
            inputRange: [isDisappearing, isLeft, isRight, isAppearing],
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
                <Text style={{ fontSize: 14, color: COLORS.rosyHightlight, fontWeight: '600' }}>{ name }</Text>
            </Animated.View>
          );
        })}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default GroupsInHeader;