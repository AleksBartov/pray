import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {  FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../CONSTANTS';

const Search = ({ setSearch }) => {
    return (
        <View style={{ ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.biscay}}>
            <Text style={{ fontSize: 60, fontWeight: 'bold', color: COLORS.rosyHightlight }} >Search</Text>
            <TouchableOpacity onPress={() => setSearch(false)}>
                <FontAwesome name="close" size={28} color={COLORS.tigerlily} />
            </TouchableOpacity>
        </View>
    )
}

export default Search