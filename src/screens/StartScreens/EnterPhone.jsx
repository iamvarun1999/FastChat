import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PhoneInputComponent from '../../components/PhoneInputComponent'
import { PrimaryBtn } from '../../components/Buttons'

export const EnterPhone = (props) => {
    return (
        <>
            <View style={style.container}>
                <View style={style.inner}>
                    <View>
                        <Text style={style.heading}>Enter Your Phone Number</Text>
                        <Text style={style.text}>Please confirm your country code and enter your phone number</Text>
                        <View style={{ marginTop: 40 }}>
                            <PhoneInputComponent />
                        </View>
                    </View>
                </View>
                <View>
                    <PrimaryBtn title='Continue' onPress={()=>props.navigation.navigate('enterotp')} />
                </View>
            </View>
        </>
    )
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        display: 'flex',
        justifyContent: 'space-between',
        // alignItems: 'center'
    },
    inner: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        fontSize: 32,
        fontWeight: 700,
        textAlign: 'center',
        color: '#0F1828'
    },
    text: {
        fontSize: 18,
        fontWeight: 400,
        textAlign: 'center',
        marginTop: 15,
        lineHeight: 28,
        color: '#0F1828'
    },
})