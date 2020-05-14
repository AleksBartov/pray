import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { Value, cond, and, eq, useCode, block, greaterOrEq, lessOrEq, Easing, set, or } from 'react-native-reanimated'
import { COLORS, CARD_WIDTH, CARD_HEIGHT, MAX_TRACK, LISTINGS } from '../CONSTANTS'
import { mix, panGestureHandler, timing } from 'react-native-redash';
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

const OUpokoeniiCard = ({ oUpokoeniiList, navigation, oZdraviiActive, oUpokoeniiActive, oUpokoeniiTransition }) => {
    const count = oUpokoeniiList.reduce((arr, g) => {
        return arr + g.data.length
    }, 0);
    const rightSpel = checkCount(count);
    const scale = mix(oUpokoeniiTransition, .85, 1);
    const top = mix(oUpokoeniiTransition, 40, 0);
    const opacity = mix(oUpokoeniiTransition, .2, 1);
    const translateX = new Value(0);
    const translateY = new Value(0);
    const { state, translation, gestureHandler } = panGestureHandler();
    const zIndex = cond(or(
        and(eq(state, State.UNDETERMINED), eq(oZdraviiActive, 1)),
        eq(state, State.ACTIVE),
        and(eq(state, State.END), eq(track, 0)),
    ), 100, 0);
    const track = cond(
        and(
            and(greaterOrEq(translation.x, -MAX_TRACK), lessOrEq(translation.x, MAX_TRACK)),
            and(greaterOrEq(translation.y, -MAX_TRACK), lessOrEq(translation.y, MAX_TRACK))
        ),
        0,
        1
    );
    useCode(() => block([
        cond(
            eq(state, State.BEGAN),
            set(oZdraviiActive, 0)
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
                set(oZdraviiActive, 1),
                set(translateX, timing({ duration: 500, from: translation.x, to: 0, easing: Easing.bezier(.32,1.25,.94,.93) })),
                set(translateY, timing({ duration: 500, from: translation.y, to: 0, easing: Easing.bezier(.32,1.25,.94,.93) }))
            ],
            cond(
                and(
                    eq(state, State.END),
                    eq(track, 1)
                ),
                [
                    set(oUpokoeniiActive, 0),
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
                    onPress={() => navigation.navigate('Card', { listing: LISTINGS[1], names: oUpokoeniiList, title: 'о упокоении' })}>
                    <View style={{
                        width: CARD_WIDTH/2,
                        height: CARD_WIDTH/2,
                        marginBottom: 40,   
                        }}>
                        <SharedElement id={LISTINGS[1].id}>
                            <Image source={ LISTINGS[1].picture } resizeMode='cover' style={{ ...StyleSheet.absoluteFillObject, height: CARD_WIDTH/2, width: CARD_WIDTH/2 }} />
                        </SharedElement>
                    </View>
                    <Text style={{
                        color: COLORS.blueCuracao,
                        fontWeight: '600',
                        fontSize: 20,
                        marginBottom: 4,
                    }}>о упокоении</Text>
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

export default OUpokoeniiCard
