import React from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { COLORS } from '../CONSTANTS'
import { FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        width,
        height: 80,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconHolder: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 10,
        height: '100%',
    },
    logoHolder: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 10,
    }
})

const HomeHeader = ({ username, navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <View style={[styles.iconHolder, { transform: [ { rotateZ: Math.PI } ] }]}>
                    <FontAwesome5 name="sign-out-alt" size={24} color={ COLORS.pencilLead } />
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.logoHolder}>
                <Text style={{ fontSize: 30, color: COLORS.pencilLead }}>мои синодики</Text>
                <Text style={{ fontSize: 16, color: COLORS.pencilLead }}>{ username }</Text>
            </View>
        </View>
    )
}

export default HomeHeader
