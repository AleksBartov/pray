import React, { useState, useRef, useEffect } from 'react'
import { View, Text, TextInput } from 'react-native'
import { COLORS } from '../../CONSTANTS'
import Animated, { useCode, block, cond, eq, call, set } from 'react-native-reanimated';

export default function InnerInput({ isActive, setIsActive }) {
    const [value, onChangeText] = useState(' ');
    const inputRef = useRef();
    const onFocus = () => {
        inputRef.current.focus();
    }
    useCode(()=>block([
        cond(eq(isActive, true),
        call([], onFocus))
    ]), [isActive])
    return (
        <TextInput
                    ref={inputRef}
                    onBlur={() => setIsActive(false)}
                    style={{ 
                        position: 'absolute',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        height: 60,
                        minWidth: 200,
                        borderColor: 'gray',
                        marginLeft: 10,
                        fontSize: 20,
                        color: COLORS.myWhite }}
                    onChangeText={text => onChangeText(text)}
                    value={value}
                />
    )
}
