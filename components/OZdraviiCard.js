import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { Value, useCode, block, cond, eq, set, and, greaterOrEq, lessOrEq, Easing, or } from 'react-native-reanimated'
import { COLORS, CARD_HEIGHT, CARD_WIDTH, MAX_TRACK, LISTINGS } from '../CONSTANTS'
import { mix, panGestureHandler, timing } from 'react-native-redash'
import { SharedElement } from 'react-navigation-shared-element';
import { checkCount } from '../helpers/checkCount'
const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor: COLORS.pencilLead,
        marginTop: height/2-CARD_HEIGHT/2.5,
        marginLeft: width/2-CARD_WIDTH/2,
        borderRadius: 10,
        shadowColor: COLORS.biscay,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

const OZdraviiCard = ({ oZdraviiList, navigation, oZdraviiActive, oUpokoeniiActive, oZdraviiTransition }) => {
    const count = oZdraviiList.reduce((arr, g) => {
        return arr + g.data.length
    }, 0);
    const commonActiv = new Value(0);
    const groups = oZdraviiList
                    .map( data => data.title )
                    .reduce((arr, title, index) => {
                        return [...arr, { ID: new Value(index), title, activTab: commonActiv }]
                    }, []);
    const rightSpel = checkCount(count);
    const scale = mix(oZdraviiTransition, 1, .85);
    const top = mix(oZdraviiTransition, 0, 40);
    const opacity = mix(oZdraviiTransition, 1, .2);
    const translateX = new Value(0);
    const translateY = new Value(0);
    const { state, translation, gestureHandler } = panGestureHandler();
    const track = cond(
        and(
            and(greaterOrEq(translation.x, -MAX_TRACK), lessOrEq(translation.x, MAX_TRACK)),
            and(greaterOrEq(translation.y, -MAX_TRACK), lessOrEq(translation.y, MAX_TRACK))
        ),
        0,
        1
    );
    const zIndex = cond(or(eq(state, State.ACTIVE), eq(oUpokoeniiActive, 0)), 200);
    useCode(() => block([
        cond(
            eq(state, State.BEGAN),
            set(oUpokoeniiActive, 1)
        ),
        cond(
            eq(state, State.ACTIVE),
            [
                set(translateX, translation.x),
                set(translateY, translation.y)
            ]
        ),
        cond(
            and(
                eq(state, State.END),
                eq(track, 0)
            ),
            [
                set(oUpokoeniiActive, 0),
                set(translateX, timing({ duration: 500, from: translation.x, to: 0, easing: Easing.bezier(.32,1.25,.94,.93) })),
                set(translateY, timing({ duration: 500, from: translation.y, to: 0, easing: Easing.bezier(.32,1.25,.94,.93) }))
            ],
            cond(
                and(
                    eq(state, State.END),
                    eq(track, 1)
                ),
                [
                    set(oZdraviiActive, 1),
                    set(translateX, timing({ duration: 500, from: translation.x, to: 0, easing: Easing.bezier(.32,1.25,.94,.93) })),
                    set(translateY, timing({ duration: 500, from: translation.y, to: 0, easing: Easing.bezier(.32,1.25,.94,.93) }))
                ],
            ),
        ),
    ]), [])
    return (
        <PanGestureHandler {...gestureHandler}>
            <Animated.View
                style={[
                    styles.container,
                    {
                        transform: [
                            { scale },
                            { translateX },
                            { translateY },
                        ],
                        top,
                        opacity,
                        zIndex,
                    }
                    ]}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={
                        () => navigation
                            .navigate(
                                'Card',
                                { 
                                    listing: LISTINGS[0],
                                    names: oZdraviiList,
                                    title: 'о здравии',
                                    commonActiv,
                                    groups
                                }
                            )
                        }>
                    <View style={{
                        width: CARD_WIDTH/1.618,
                        height: CARD_WIDTH/1.618,
                        marginBottom: 40,   
                        }}>
                        <SharedElement id={LISTINGS[0].id}>
                            <Image source={ LISTINGS[0].picture } resizeMode='cover' style={{ ...StyleSheet.absoluteFillObject, height: CARD_WIDTH/1.618, width: CARD_WIDTH/1.618 }} />
                        </SharedElement>
                    </View>
                    <Text style={{
                        color: COLORS.blueCuracao,
                        fontWeight: '600',
                        fontSize: 26,
                        marginBottom: 12,
                    }}>о здравии</Text>
                    <Text style={{
                        color: COLORS.blueCuracao,
                        fontWeight: '100',
                        fontSize: 14
                    }}>{ count } { rightSpel }</Text>
                </TouchableOpacity>
            </Animated.View>
        </PanGestureHandler>
    )
}

export default OZdraviiCard
