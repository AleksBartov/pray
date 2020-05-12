import React from 'react'
import { View, Text, Button, Image, StyleSheet } from 'react-native'
import { COLORS, IMAGES } from '../CONSTANTS'
import { SharedElement } from 'react-navigation-shared-element';

const CardScreen = ({ navigation }) => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: COLORS.tigerlily
        }}>
            <Text>CardScreen</Text>
            <Button style={{
                color: COLORS.biscay,
                fontSize: 36,
                margin: 80
            }} title='X' onPress={() => navigation.goBack()} />
            <SharedElement id='oZdravii'>
                <Image source={ IMAGES[0] } resizeMode='cover' style={{ ...StyleSheet.absoluteFillObject, height: 100, width: 100 }} />
            </SharedElement>
        </View>
    )
}

CardScreen.sharedElements = navigation => {
    const listing = navigation.getParam('listing');
    return [listing.id];
  };

export default CardScreen
