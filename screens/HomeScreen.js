import React, { useRef, useEffect } from 'react'
import { View, Text } from 'react-native'
import { COLORS } from '../CONSTANTS';
import HomeHeader from '../components/HomeHeader';
import { Value, Transition, Transitioning } from 'react-native-reanimated';
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

    const ref = useRef();
    useEffect(() => {
        ref.current.animateNextTransition();
    }, []);
    const transition = <Transition.Together>
      <Transition.In type='fade' durationMs={400} interpolation='easeIn' delayMs={1500} />
    </Transition.Together>

    return (
        <Transitioning.View 
          ref={ref}
          transition={transition}
          style={{ flex: 1, backgroundColor: COLORS.biscay, justifyContent: 'center', alignItems: 'center' }}>
          <HomeHeader {...{ username, navigation }} />
          <OUpokoeniiCard {...{ oUpokoeniiList, navigation, oZdraviiActive, oUpokoeniiActive, oUpokoeniiTransition }} />
          <OZdraviiCard {...{ oZdraviiList, navigation, oZdraviiActive, oUpokoeniiActive, oZdraviiTransition }} />
        </Transitioning.View>
    )
}

export default HomeScreen
