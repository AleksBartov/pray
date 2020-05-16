import React, { useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { COLORS, HEADER_HEIGHT } from '../CONSTANTS'
import Animated from 'react-native-reanimated'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    groupHolder: {
        width,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30,
        borderBottomWidth: 1,
        borderColor: COLORS.biscay,
    },
    groupTitleHolder: {
        width,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingBottom: 20,
        paddingLeft: 20,
    },
    groupTitle: {
        fontSize: 26,
        fontWeight: '700',
        color: COLORS.biscay,
    },
    personHolder: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 6,
    },
    personName: {
        fontSize: 24,
        fontWeight: '400',
        color: COLORS.biscay,
    },
    personSurname: {
        fontSize: 14,
        fontWeight: '200',
        color: COLORS.biscay,
    }
})

const NamesList = ({ y, names }) => {
    return (
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
        </Animated.View>
    )
}

export default NamesList
