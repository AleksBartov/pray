import React, { useRef, useState, useEffect } from 'react'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { COLORS } from '../CONSTANTS'
import { Ionicons } from '@expo/vector-icons';
import { Transitioning, Transition } from 'react-native-reanimated';
const { width, height } = Dimensions.get('window')

const TabBottomNavigator = ({ setSettings, setPlay, setAdd }) => {
    const [ ready, setReady ] = useState(false);

    const ref = useRef();
    const transition = <Transition.Together>
        <Transition.In type='fade' durationMs={400} delayMs={1000} interpolation='easeInOut' />
    </Transition.Together>
    useEffect(() => {
        ref.current.animateNextTransition();
        setReady(true);
    }, []);
    return (<Transitioning.View transition={transition} ref={ref} style={{
        ...StyleSheet.absoluteFillObject,
        flexDirection: 'row',
        width: width - 30,
        height: 56,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        top: height - 64,
        marginLeft: 15,
    }}>
        {
            ready && <View style={{
                ...StyleSheet.absoluteFillObject,
                flexDirection: 'row',
                width: width - 30,
                height: 56,
                backgroundColor: 'rgba(48, 57, 82,.7)',
                borderRadius: 20,
                justifyContent: 'space-around',
                alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => setSettings(true)}>
                <Ionicons name="ios-settings" size={34} color={COLORS.purpleMountainMajesty} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPlay(true)}>
                <Ionicons name="ios-play" size={34} color={COLORS.purpleMountainMajesty} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAdd(true)}>
                <Ionicons name="ios-add" size={34} color={COLORS.purpleMountainMajesty} />
            </TouchableOpacity>
        </View>
        }
    </Transitioning.View>)

}

export default TabBottomNavigator
