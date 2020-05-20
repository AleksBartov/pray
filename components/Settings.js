import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import {  FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../CONSTANTS';
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get('window');
const innerR = 140;


const styles = StyleSheet.create({
    exitIcon: {
        ...StyleSheet.absoluteFillObject,
        top: 20,
        left: 20,
        width: 70,
        height: 70,
        zIndex: 100,
    },
    bigC: {
        ...StyleSheet.absoluteFillObject,
        borderWidth: 1,
        borderColor: COLORS.rosyHightlight,
    },
    smallC: {
        ...StyleSheet.absoluteFillObject,
        borderWidth: 1,
        borderColor: COLORS.rosyHightlight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    monthsBox: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'space-around',
        alignItems: 'center',
        height: height/2,
    }
});

const Settings = ({ setSettings }) => {

    const months = new Array(12).fill(null).map((_, i) => {
        const names = [ 'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря', ]
        return {
            title: names[i],
            num: i +1,
        }
    })

    const l = Math.sin(Math.PI/months.length);
    const r = ( innerR * l ) / ( 1 - l );
    const R = innerR + ( 2 * r );
    const segment = ( 2 * Math.PI )/ months.length;
    const smallMargin = 20;

    return (
        <View style={{ ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.biscay}}>
            <TouchableOpacity style={styles.exitIcon} onPress={() => setSettings(false)}>
                <FontAwesome name="close" size={28} color={COLORS.tigerlily} />
            </TouchableOpacity>
            <View style={[styles.monthsBox]}>
            <LinearGradient
                style={{
                ...StyleSheet.absoluteFillObject,
                height: height/5,
                zIndex: 90,
                }}
                colors={['rgba(48, 57, 82,1.0)', COLORS.biscay]}
            />
            <LinearGradient
                style={{
                ...StyleSheet.absoluteFillObject,
                top: height/2 - height/5,
                height: height/5,
                zIndex: 90,
                }}
                colors={[COLORS.biscay, 'rgba(48, 57, 82,1.0)']}
            />
                {
                    months
                    .map((m,i) => {
                    return <Text key={i}>{m.title}</Text>
                    })
                }
            </View>
            <View style={[ 
                styles.bigC,
                { width: R * 2,
                  height: R * 2,
                  borderRadius: R,
                  top: height - R,
                  left: width/2 - R }]}></View>
            {
                months
                .map(({ title, num }, i) => {
                    return <View key={i} style={[
                        styles.smallC,
                        {
                            width: r * 2 - smallMargin,
                            height: r * 2 - smallMargin,
                            borderRadius: r,
                            top: height - R + smallMargin,
                            left: width/2 - r + smallMargin/2,
                            transform: [
                                { translateY: R - r },
                                { rotateZ: `${ i * segment }rad` },
                                { translateY: -R + r }
                            ]  
                        }
                    ]}>
                        <Text style={{color: COLORS.rosyHightlight, fontSize: 58, fontWeight: 'bold'}}>{num}</Text>
                    </View>
                })
            }
        </View>
    )
}

export default Settings
