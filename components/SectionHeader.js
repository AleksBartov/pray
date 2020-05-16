import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../CONSTANTS';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    groupTitleHolder: {
        width,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingVertical: 20,
        marginTop: 40,
        paddingLeft: 20,
    },
    groupTitle: {
        fontSize: 26,
        fontWeight: '700',
        color: COLORS.biscay,
    },
});

export default class SectionHeader extends PureComponent {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.groupTitleHolder}>
                <Text style={styles.groupTitle}>{this.props.title}</Text>
            </View>
        )
    }
}
