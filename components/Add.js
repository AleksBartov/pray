import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {  Entypo } from '@expo/vector-icons';
import { COLORS } from '../CONSTANTS';
import TextInput from './FORM/TextInput';

const Add = ({ setAdd }) => {
    return (
        <View style={{ ...StyleSheet.absoluteFillObject, alignItems: 'center', paddingTop: 60, justifyContent: 'flex-start', backgroundColor: COLORS.biscay}}>
            <TouchableOpacity style={{...StyleSheet.absoluteFillObject, top: 20, left: 5, zIndex: 100, width: 70, height: 70}} onPress={() => setAdd(false)}>
                <Entypo name="cross" size={34} color={COLORS.myWhite} />
            </TouchableOpacity>
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: COLORS.rosyHightlight }} >новое поминовение</Text>
            <TextInput title='имя' />
            <TextInput title='фамилия' />
            <TextInput title='отчество' />
        </View>
    )
}

export default Add