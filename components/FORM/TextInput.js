import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, Dimensions, TextInput, Alert } from 'react-native'
import { COLORS } from '../../CONSTANTS'
import { TapGestureHandler, State } from 'react-native-gesture-handler'
import { onGestureEvent, withTransition, mix } from 'react-native-redash'
import Animated, { Value, eq, cond, interpolate, Extrapolate, and, neq, block, set, useCode, call } from 'react-native-reanimated'
import InnerInput from './InnerInput'

const { width } = Dimensions.get('window')
const basePadding = 30

const styles = StyleSheet.create({
    main: {
        width: width - ( basePadding * 2),
        height: 60,
        marginTop: 20,
        borderColor: COLORS.rosyHightlight,
        borderWidth: 1,
        borderRadius: 10,
    },
    placeholder: {
        position: 'relative',
        marginTop: 10,
        height: 40,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 10,
    }
})

const SimpleTextInput = ({ title }) => {
    const setIsActive = bool => Alert.alert(`done with ${bool}`);
    const state = new Value(State.UNDETERMINED);
    const isActive = new Value(false);
    const opened = new Value(false);
    const gestureHandler = onGestureEvent({ state });
    const duration = cond(isActive, 250, 2500);
    const progress = withTransition(isActive, { duration });
    const translateY = mix(progress, 0, -32);
    const fontSize = interpolate(translateY, {
        inputRange: [-32, 0],
        outputRange: [ 14, 20 ],
        extrapolate: Extrapolate.CLAMP,
    });
    const opacity = interpolate(translateY, {
        inputRange: [-32, 0],
        outputRange: [ 1, .4 ],
        extrapolate: Extrapolate.CLAMP,
    });
    useCode(() => block([
        cond(and(eq(state, State.BEGAN), neq(opened, true)),
        [
            set(isActive, true),
            set(opened, true),
        ])
    ]), []);
    
    return (
        <TapGestureHandler {...gestureHandler}>
            <Animated.View style={styles.main}>
                <View style={styles.placeholder}>
                    <Animated.Text style={{ 
                        fontSize,
                        backgroundColor: COLORS.biscay,
                        paddingHorizontal: 4,
                        opacity,
                        color: COLORS.rosyHightlight,
                        transform:[
                            {
                                translateY
                            }
                        ] }} >{title}</Animated.Text>
                </View>
                <InnerInput {...{isActive, setIsActive}} />
            </Animated.View>
        </TapGestureHandler>
    )
}

export default SimpleTextInput
