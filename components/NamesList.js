import React from 'react'
import { View, Text, StyleSheet, Dimensions, SectionList } from 'react-native'
import { COLORS, HEADER_HEIGHT, MIN_HEADER_HEIGHT } from '../CONSTANTS'
import Animated, { set, Value, useCode, interpolate, Extrapolate } from 'react-native-reanimated'
import { onScrollEvent, useValue } from 'react-native-redash'
import SectionHeader from './SectionHeader'
import Item from './Item'

const { width } = Dimensions.get('window')

const NamesList = ({ y, names }) => {

    const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

    const onScroll = onScrollEvent({ y });

    const marginTop = interpolate(y, {
        inputRange: [ 0, HEADER_HEIGHT - MIN_HEADER_HEIGHT ],
        outputRange: [ HEADER_HEIGHT, MIN_HEADER_HEIGHT ],
        extrapolate: Extrapolate.CLAMP
    });
    
    return (
        <Animated.View style={{flex:1, alignItems: 'center', marginTop }}>
            <AnimatedSectionList
                {...{ onScroll }}
                scrollEventThrottle={1}
                stickySectionHeadersEnabled={false}
                SectionSeparatorComponent = {() => <View style={{
                    width,
                    height: .5,
                    backgroundColor: COLORS.biscay,
                    marginVertical: 10
                }}></View>}
                sections={names}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item
                                            name={item.name}
                                            other={item.other}
                                            surname={item.surname}
                                            fathername={item.fathername}
                                            comment={item.comment} />}
                renderSectionHeader={({ section: { title } }) => (
                        <SectionHeader {...{ title }} />
                    )}
                    />
        </Animated.View>
    )
}

export default NamesList









/* 
<Animated.View style={{flex:1, alignItems: 'center', marginTop: HEADER_HEIGHT}}>
            {
                names.map((g,i) => {
                    return (
                        <View
                            style={styles.groupHolder}
                            key={i}>
                            <View style={styles.groupTitleHolder}>
                                <Text style={styles.groupTitle}>{g.title}</Text>
                            </View>
                            {
                                g.data.map((p,i) => {
                                    return (
                                        <View style={styles.personHolder} key={p.count}>
                                            <Text style={styles.personName}>{p.other} {p.name}</Text>
                                            {
                                                p.surname && p.fathername && p.comment[0] !== '' ? <Text style={ styles.personSurname }>( {p.surname} {p.fathername}, {p.comment} )</Text>
                                                : p.comment[0] === '' ? <Text style={ styles.personSurname }>( {p.surname} {p.fathername} )</Text>
                                                : !p.surname && !p.fathername ? <Text style={ styles.personSurname }>( {p.comment} )</Text>
                                                : !p.surname ? <Text style={ styles.personSurname }>( {p.fathername}, {p.comment} )</Text>
                                                : !p.fathername ? <Text style={ styles.personSurname }>( {p.surname}, {p.comment} )</Text> : <Text style={ styles.personSurname }></Text>
                                            }
                                        </View>
                                    )
                                })
                            }
                        </View>
                    )
                })
            }
        </Animated.View> */