import React from 'react'
import { View, Text } from 'react-native'
import { COLORS } from '../CONSTANTS';
import HomeHeader from '../components/HomeHeader';
import { Value } from 'react-native-reanimated';
import { withTransition } from 'react-native-redash';
import OUpokoeniiCard from '../components/OUpokoeniiCard';
import OZdraviiCard from '../components/OZdraviiCard';

const HomeScreen = ({ navigation }) => {
    const [ username, structuredArray ] = navigation.getParam('toHomeData');
    const oZdraviiList = structuredArray
    .reduce((result, group ) => {
        const newData = group.data.filter(p => p.live === 'о здравии');
        return [...result, { ...group, data: newData }];
      }, []);
    const oUpokoeniiList = structuredArray
    .reduce((result, group ) => {
        const newData = group.data.filter(p => p.live === 'о упокоении');
        return [...result, { ...group, data: newData }];
      }, []);
    const oZdraviiActive = new Value(0);
    const oUpokoeniiActive = new Value(0);
    const oZdraviiTransition = withTransition(oZdraviiActive);
    const oUpokoeniiTransition = withTransition(oUpokoeniiActive);
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.biscay, justifyContent: 'center', alignItems: 'center' }}>
            <HomeHeader {...{ username, navigation }} />
            <OUpokoeniiCard {...{ oUpokoeniiList, navigation, oZdraviiActive, oUpokoeniiActive, oUpokoeniiTransition }} />
            <OZdraviiCard {...{ oZdraviiList, navigation, oZdraviiActive, oUpokoeniiActive, oZdraviiTransition }} />
        </View>
    )
}

export default HomeScreen
