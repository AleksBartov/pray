import React from 'react'
import { View, Text } from 'react-native'
import { COLORS } from '../CONSTANTS';
import HomeHeader from '../components/HomeHeader';
import { Value } from 'react-native-reanimated';
import { withTransition } from 'react-native-redash';
import OUpokoeniiCard from '../components/OUpokoeniiCard';
import OZdraviiCard from '../components/OZdraviiCard';

const HomeScreen = ({ navigation }) => {
    const [ username, names ] = navigation.getParam('toHomeData');
    const oZdraviiActive = new Value(0);
    const oUpokoeniiActive = new Value(0);
    const oZdraviiTransition = withTransition(oZdraviiActive);
    const oUpokoeniiTransition = withTransition(oUpokoeniiActive);
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.biscay, justifyContent: 'center', alignItems: 'center' }}>
            <HomeHeader {...{ username, navigation }} />
            <OUpokoeniiCard {...{ navigation, oZdraviiActive, oUpokoeniiActive, oUpokoeniiTransition }} />
            <OZdraviiCard {...{ navigation, oZdraviiActive, oUpokoeniiActive, oZdraviiTransition }} />
        </View>
    )
}

export default HomeScreen
