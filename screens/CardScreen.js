import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, FlatList, Modal, TouchableOpacity } from 'react-native'
import { COLORS, HEADER_HEIGHT, MIN_HEADER_HEIGHT, GROUP_CARD_WIDTH, GROUP_CARD_MARGIN } from '../CONSTANTS'
import { SharedElement } from 'react-navigation-shared-element';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'react-navigation-hooks';
import Animated, { Value, set, interpolate, Extrapolate, useCode, block, greaterThan, sub } from 'react-native-reanimated'
import { useValue, onScrollEvent, withTransition, panGestureHandler, withDecay, diffClamp } from 'react-native-redash';
import NamesList from '../components/NamesList';
import { transformName } from '../helpers/transformName';
import TabBottomNavigator from '../components/TabBottomNavigator';
import Settings from '../components/Settings';
import Play from '../components/Play';
import Add from '../components/Add';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Search from '../components/Search';

const { width, height } = Dimensions.get('window');

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

    const [ settings, setSettings ] = useState(false);
    const [ play, setPlay ] = useState(false);
    const [ add, setAdd ] = useState(false);
    const [ search, setSearch ] = useState(false);

    const [ containerWidth, setContainerWidth ] = useState(height);

    const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
    const y = useValue(0);

    const onScroll = onScrollEvent({ y });
    const toggle = new Value(0);
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
    const DATA = [
        {
            id: 1,
            data: namesToPray
        }
    ];
    const groups = getParam('groups');
    const title = getParam('title');
    // const commonActiv = getParam('commonActiv');
    const [ commonActiv, setCommonActive ] = useState(new Value(0));
    const transition = withTransition(toggle);
    const opacity = transition;
    useCode(() => block(
            [
                set(toggle, greaterThan(y, sub(HEADER_HEIGHT, MIN_HEADER_HEIGHT))),
            ]
        ), [
        toggle,
        y,
    ]);

    const { state, translation, gestureHandler, velocity } = panGestureHandler();
    const translateX = withDecay({
        value: translation.x,
        velocity: velocity.x,
        state
    });
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
                        <Ionicons name="md-arrow-round-back" size={28} color={COLORS.biscay} />
                    </TouchableWithoutFeedback>
                </View>
                <View style={{
                    position: 'absolute',
                    width: 60,
                    height: 80,
                    left: width - 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 100,
                    }}>
                    <TouchableWithoutFeedback
                        style={{ justifyContent: 'center', alignItems: 'center'}}
                        onPress={() => setSearch(true)}>
                        <Ionicons name="md-search" size={28} color={COLORS.biscay} />
                    </TouchableWithoutFeedback>
                </View>
                <PanGestureHandler
                    {...gestureHandler} >
                    <Animated.View  style={{ ...StyleSheet.absoluteFillObject,
                                            width,
                                            top: MIN_HEADER_HEIGHT,
                                            height: 40,
                                            zIndex: 200,
                                            opacity,
                                            backgroundColor: COLORS.pencilLead,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center'}}
                                        >
                    <Animated.View style={{ ...StyleSheet.absoluteFillObject,
                                            height: 40,
                                            zIndex: 200,
                                            marginLeft: width/2 - (GROUP_CARD_WIDTH/2) - GROUP_CARD_MARGIN,
                                            opacity,
                                            transform: [
                                                { translateX }
                                            ],
                                            width: groups.length * ( GROUP_CARD_WIDTH + ( GROUP_CARD_MARGIN * 2 ) ),
                                            backgroundColor: COLORS.pencilLead,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-around'}}>
                        { groups.map((item, i) => {
                            return <View key={i} style={{ marginHorizontal: GROUP_CARD_MARGIN,
                                                borderWidth: 1,
                                                width: GROUP_CARD_WIDTH,
                                                borderColor: COLORS.biscay,
                                                borderRadius: 8,
                                                padding: 5,
                                                justifyContent: 'center',
                                                alignItems: 'center'}}>
                                                    <Text
                                                style={{ 
                                                    color: COLORS.biscay,
                                                    marginHorizontal: 10,
                                                    fontSize: 14,
                                                    fontWeight: 'bold'
                                                }}>{ item.title }</Text>
                                                </View>
                        }) }
                    </Animated.View>
                    </Animated.View>
                </PanGestureHandler>
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
                                        { translateX: width/2 - 60 },
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
                </Animated.View>
                <AnimatedFlatList
                    {...{ onScroll }}
                    scrollEventThrottle={1} 
                    data={DATA}
                    renderItem={({ item }) => <NamesList names={ item.data } {...{ y }} />}
                    keyExtractor={item => item.id} />
            </View>

            <TabBottomNavigator {...{ setSettings, setPlay, setAdd }} />

            <Modal
              animationType="slide"
              transparent={true}
              visible={settings}
              >
              <Settings {...{ setSettings, groups }} />
            </Modal>

            <Modal
              animationType="slide"
              transparent={true}
              visible={play}
              >
              <Play {...{ setPlay, namesToPray }} />
            </Modal>

            <Modal
              animationType="slide"
              transparent={true}
              visible={add}
              >
              <Add {...{ setAdd }} />
            </Modal>

            <Modal
              animationType="slide"
              transparent={true}
              visible={search}
              >
              <Search {...{ setSearch }} />
            </Modal>
        </View>
    )
}

CardScreen.sharedElements = navigation => {
    const listing = navigation.getParam('listing');
    return [listing.id];
  };

export default CardScreen



/* const translateX = diffClamp(withDecay({
        value: translation.x,
        velocity: velocity.x,
        state
    }), ((GROUP_CARD_WIDTH + ( GROUP_CARD_MARGIN *2 )) * groups.length) + width, 0); */