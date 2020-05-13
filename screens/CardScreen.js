import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { COLORS } from '../CONSTANTS'
import { SharedElement } from 'react-navigation-shared-element';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from 'react-navigation-hooks';
import Animated, { Value } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window')

const CROSS_SIZE = 160;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.pencilLead,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        width,
        paddingVertical: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 40,
        marginTop: 20
    }
})


const CardScreen = () => {
    const { goBack, getParam } = useNavigation();
    const listing = getParam('listing');
    const names = getParam('names');
    const title = getParam('title');
    return (
        <View style={{flex:1, backgroundColor: COLORS.pencilLead}}>
                    <View style={{
                        position: 'absolute',
                        width: 60,
                        height: 80,
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 100,
                    }}>
                    <TouchableWithoutFeedback
                        style={{ justifyContent: 'center', alignItems: 'center'}}
                        onPress={() => goBack()}>
                        <FontAwesome name="close" size={28} color={COLORS.biscay} />
                </TouchableWithoutFeedback>
                    </View>
            <View style={styles.container}>
                <Animated.View style={styles.header}>
                        <SharedElement id={listing.id}>
                            <Image source={ listing.picture } resizeMode='cover' style={{ height: CROSS_SIZE, width: CROSS_SIZE}} />
                        </SharedElement>
                        <Text style={[styles.title, { color: title === 'о здравии' ? COLORS.appleValley : COLORS.purpleMountainMajesty }]}>{ title }</Text>
                </Animated.View>
            </View>
        </View>
    )
}

CardScreen.sharedElements = navigation => {
    const listing = navigation.getParam('listing');
    return [listing.id];
  };

export default CardScreen
