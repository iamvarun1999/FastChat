import React from 'react'
import { StyleSheet, Text, TouchableHighlight } from 'react-native'
import { primaryColor } from '../constants'

export const PrimaryBtn = ({ title, ...rest }) => {
    return (
        <>
            <TouchableHighlight style={style1.button} {...rest}>
                <Text style={style1.text}>{title}</Text>
            </TouchableHighlight>
        </>
    )
}
export const SimpleBtn = ({ title, ...rest }) => {
    return (
        <>
            <TouchableHighlight style={style2.button} {...rest}>
                <Text style={style2.text}>{title}</Text>
            </TouchableHighlight>
        </>
    )
}

const style1 = StyleSheet.create({
    button: {
        width: '100%',
        height: 52,
        borderRadius: 32,
        backgroundColor: primaryColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 600
    }
})
const style2 = StyleSheet.create({
    button: {
        width: '100%',
        height: 52,
        borderRadius: 32,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        fontWeight: 600
    }
})
