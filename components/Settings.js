import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import {  FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../CONSTANTS';

const { width, height } = Dimensions.get('window');
const NUM_BOX_SIZE = 90;
const NUM_BOX_SIZE_MARGIN = 10;


const styles = StyleSheet.create({
    exitIcon: {
        ...StyleSheet.absoluteFillObject,
        top: 20,
        left: 20
    },
    numBox: {
        ...StyleSheet.absoluteFillObject,
        width: NUM_BOX_SIZE,
        height: NUM_BOX_SIZE,
        borderRadius: NUM_BOX_SIZE/2,
        borderWidth: 1,
        borderColor: COLORS.rosyHightlight,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: width/2 - NUM_BOX_SIZE/2,
        marginTop: height/2
    },
});

const Settings = ({ setSettings, groups }) => {

    const [ groupsQuantity, setGroupsQuantity ] = useState(3);
    const [ BIG_CIRCLE_SIZE, setBIG_CIRCLE_SIZE ] = useState(null);

    useEffect(() => {
        let bigR;
        const mikR = NUM_BOX_SIZE/2 + NUM_BOX_SIZE_MARGIN;
        const minR = mikR/(groupsQuantity + (2* Math.sqrt(groupsQuantity)));
        bigR = minR + (2*mikR);
        setBIG_CIRCLE_SIZE(bigR);
    }, [])

    return (
        <View style={{ ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.biscay}}>
            <TouchableOpacity style={styles.exitIcon} onPress={() => setSettings(false)}>
                <FontAwesome name="close" size={28} color={COLORS.tigerlily} />
            </TouchableOpacity>
            <View style={styles.numBox}>
                <Text style={{ fontSize: 60, fontWeight: 'bold', color: COLORS.rosyHightlight }} >{ groupsQuantity }</Text>
            </View>
            <View style={{
                ...StyleSheet.absoluteFillObject,
                width: BIG_CIRCLE_SIZE,
                height: BIG_CIRCLE_SIZE,
                borderRadius: BIG_CIRCLE_SIZE/2,
                borderWidth: 1,
                borderColor: COLORS.rosyHightlight,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: width/2 - BIG_CIRCLE_SIZE/2,
                marginTop: height/2 - NUM_BOX_SIZE_MARGIN,
            }}></View>
        </View>
    )
}

export default Settings
