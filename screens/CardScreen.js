import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { COLORS, HEADER_HEIGHT, MIN_HEADER_HEIGHT } from '../CONSTANTS'
import { SharedElement } from 'react-navigation-shared-element';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from 'react-navigation-hooks';
import Animated, { Value, set, interpolate, Extrapolate, useCode, block, greaterThan, sub } from 'react-native-reanimated'
import GroupForHeader from '../components/GroupForHeader';
import { useValue, onScrollEvent, withTransition, mix } from 'react-native-redash';
import NamesList from '../components/NamesList';
import { transformName } from '../helpers/transformName';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.pencilLead,
    },
    header: {
        position: 'absolute',
        width,
        backgroundColor: COLORS.pencilLead,
        zIndex: 100
    },
    title: {
        fontWeight: 'bold',
        fontSize: 34,
    }
})


const CardScreen = () => {
    const scrollView = useRef(null);
    const y = useValue(0);
    const toggle = new Value(0);
    const onScroll = onScrollEvent({ y });
    const animHeight = interpolate(y, {
        inputRange: [ 0, HEADER_HEIGHT - MIN_HEADER_HEIGHT ],
        outputRange: [ HEADER_HEIGHT, MIN_HEADER_HEIGHT ],
        extrapolate: Extrapolate.CLAMP
    });
    const crossTransY = interpolate(y, {
        inputRange: [ 0, HEADER_HEIGHT - MIN_HEADER_HEIGHT ],
        outputRange: [ 60, 0 ],
        extrapolate: Extrapolate.CLAMP
    });
    const crossTransX = interpolate(y, {
        inputRange: [ 0, HEADER_HEIGHT - MIN_HEADER_HEIGHT ],
        outputRange: [ width/2 - 60, width - 90 ],
        extrapolate: Extrapolate.CLAMP
    });
    const crossScale = interpolate(y, {
        inputRange: [ -100, 0, HEADER_HEIGHT - MIN_HEADER_HEIGHT ],
        outputRange: [ 1.7, 1, .5 ],
        extrapolate: Extrapolate.CLAMP
    });
    const titleScale = interpolate(y, {
        inputRange: [ 0, HEADER_HEIGHT - MIN_HEADER_HEIGHT ],
        outputRange: [ 1, .85 ],
        extrapolate: Extrapolate.CLAMP
    });
    const titleAnimMarginTop = interpolate(y, {
        inputRange: [ 0, HEADER_HEIGHT - MIN_HEADER_HEIGHT ],
        outputRange: [ 180, 37 ],
        extrapolate: Extrapolate.CLAMP
    });
    const groupsScrollMarginTopAnim = interpolate(y, {
        inputRange: [ 0, HEADER_HEIGHT - MIN_HEADER_HEIGHT ],
        outputRange: [ 230, MIN_HEADER_HEIGHT - 60],
        extrapolate: Extrapolate.CLAMP
    });
    const { goBack, getParam } = useNavigation();
    const listing = getParam('listing');
    const names = getParam('names');
    const namesToPray = names.reduce((arr, obj, i) => {
        const newArrData = obj.data.reduce((newPerson, person) => {
            const transformedName = transformName(person.name);
            return [...newPerson, {...person, name: transformedName }]
        }, []);
        return [...arr, { ...obj, data: newArrData }];
    }, []);
    const groups = getParam('groups');
    const title = getParam('title');
    // const commonActiv = getParam('commonActiv');
    const [ commonActiv, setCommonActive ] = useState(new Value(0));
    const transition = withTransition(toggle);
    const opacity = transition;
    useCode(() => block([set(toggle, greaterThan(y, sub(HEADER_HEIGHT, MIN_HEADER_HEIGHT)))]), [
        toggle,
        y,
    ]);
    
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
                <Animated.View style={[styles.header, { height: animHeight }]}>
                        <SharedElement id={listing.id}>
                            <Animated.Image
                                source={ listing.picture }
                                resizeMode='cover'
                                style={{
                                    height: 120,
                                    width: 120,
                                    position: 'absolute',
                                    transform: [
                                        { translateX: crossTransX },
                                        { translateY: crossTransY },
                                        { scale: crossScale },
                                    ]
                                    }} />
                        </SharedElement>
                        <Animated.View style={{
                            position: 'absolute',
                            width,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: titleAnimMarginTop,
                            transform: [
                                { scale: titleScale }
                            ]
                        }}>
                            <Text style={
                            [styles.title,
                            { 
                                color: title === 'о здравии' ? COLORS.appleValley : COLORS.purpleMountainMajesty
                            }]
                                }>{ title }</Text>
                        </Animated.View>
                        <Animated.ScrollView
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            style={{...StyleSheet.absoluteFillObject, marginTop: groupsScrollMarginTopAnim, opacity }}
                        >
                            <Animated.View style={{
                                flex: 1,
                                flexDirection: 'row',
                            }}>
                                {
                                    groups.map((g,i) => {
                                        return <GroupForHeader key={i} ID={g.ID} index={i} {...{ groups, commonActiv, setCommonActive }} />
                                    })
                                }
                            </Animated.View>
                        </Animated.ScrollView>
                </Animated.View>
                <Animated.ScrollView
                    ref={scrollView}
                    style={StyleSheet.absoluteFill}
                    scrollEventThrottle={1}
                    {...{ onScroll }}
                >
                    <NamesList names={ namesToPray } {...{ y }} />
            </Animated.ScrollView>
            </View>
        </View>
    )
}

CardScreen.sharedElements = navigation => {
    const listing = navigation.getParam('listing');
    return [listing.id];
  };

export default CardScreen
