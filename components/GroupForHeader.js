import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Animated, { Value, useCode, block, cond, eq, set, add, multiply, Easing, call, neq, and } from 'react-native-reanimated';
import { State, TapGestureHandler } from 'react-native-gesture-handler';
import { onGestureEvent, timing, mix, withTransition } from 'react-native-redash';
import { CARD_GROUP_WIDTH, CARD_GROUP_MARGIN, COLORS } from '../CONSTANTS';

const GroupForHeader = ({ groups, i }) => {

    const state = new Value(State.UNDETERMINED);
    const gestureHandler = onGestureEvent({ state });
    const active = cond(eq(state, State.END), 1, 0);
    const transition = withTransition(active)
    const opacity = mix(transition, 0.4, 1);
    
    return (
        <TapGestureHandler {...gestureHandler}>
            <Animated.View
                style={{
                    margin: CARD_GROUP_MARGIN,
                    padding: 4,
                    width: CARD_GROUP_WIDTH,
                    height: 40,
                    borderRadius: 8,
                    borderWidth: 2,
                    borderColor: COLORS.softBlue,
                    overflow: 'hidden',
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity,
                }}>
                <Animated.Text style={{
                    color: COLORS.softBlue,
                }}>{ groups[i].title }</Animated.Text>
            </Animated.View>
        </TapGestureHandler>
    )
}

export default GroupForHeader
