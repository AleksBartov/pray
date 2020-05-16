import React, { PureComponent } from 'react'
import { Text, View, Dimensions, StyleSheet } from 'react-native'
import { COLORS } from '../CONSTANTS'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
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

export default class Item extends PureComponent {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.personHolder}>
                <Text style={styles.personName}>{this.props.other} {this.props.name}</Text>
                {
                    this.props.surname && this.props.fathername && this.props.comment[0] !== '' ? <Text style={ styles.personSurname }>( {this.props.surname} {this.props.fathername}, {this.props.comment} )</Text>
                    : this.props.comment[0] === '' ? <Text style={ styles.personSurname }>( {this.props.surname} {this.props.fathername} )</Text>
                    : !this.props.surname && !this.props.fathername ? <Text style={ styles.personSurname }>( {this.props.comment} )</Text>
                    : !this.props.surname ? <Text style={ styles.personSurname }>( {this.props.fathername}, {this.props.comment} )</Text>
                    : !this.props.fathername ? <Text style={ styles.personSurname }>( {this.props.surname}, {this.props.comment} )</Text> : <Text style={ styles.personSurname }></Text>
                }
            </View>
        )
    }
}

