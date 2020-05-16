import React, { useRef, useEffect, useState } from 'react'
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
        if(newData.length === 0) return result;
        return [...result, { ...group, data: newData }];
      }, []);
    const oUpokoeniiList = structuredArray
    .reduce((result, group ) => {
        const newData = group.data.filter(p => p.live === 'о упокоении');
        if(newData.length === 0) return result;
        return [...result, { ...group, data: newData }];
      }, []);
    const oZdraviiActive = new Value(0);
    const oUpokoeniiActive = new Value(0);
    const oZdraviiTransition = withTransition(oZdraviiActive);
    const oUpokoeniiTransition = withTransition(oUpokoeniiActive);
    const [ ready, setReady ] = useState(false);

    const ref = useRef();
    useEffect(() => {
        ref.current.animateNextTransition();
        setReady(true);
    }, []);
    const transition = <Transition.Sequence>
      <Transition.In type='scale' durationMs={800} interpolation='easeIn' />
    </Transition.Sequence>

    return (
        <Transitioning.View 
          ref={ref}
          transition={transition}
          style={{ flex: 1, backgroundColor: COLORS.biscay, justifyContent: 'center', alignItems: 'center' }}>
          <HomeHeader {...{ username, navigation }} />
          { ready && <>
            <OUpokoeniiCard {...{ oUpokoeniiList, navigation, oZdraviiActive, oUpokoeniiActive, oUpokoeniiTransition }} />
            <OZdraviiCard {...{ oZdraviiList, navigation, oZdraviiActive, oUpokoeniiActive, oZdraviiTransition }} />
          </>}
        </Transitioning.View>
    )
}

export default HomeScreen
