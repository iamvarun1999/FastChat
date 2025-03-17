import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { PrimaryBtn, SimpleBtn } from '../../components/Buttons'
import OTPInput from '../../components/OTPInput'

export const EnterCode = (props) => {
    return (
        <>
            <View style={style.container}>
                <View style={style.inner}>
                    <View>
                        <Text style={style.heading}>Enter Code</Text>
                        <Text style={style.text}>We have sent you an SMS with the code to +62 1309 - 1710 - 1920</Text>
                        <View style={{ marginTop: 40 }}>
                            <OTPInput />
                        </View>
                    </View>
                </View>
                <View style={{display:'flex',gap:10}}>
                    <SimpleBtn title='Resend Code' />
                    <PrimaryBtn title='Continue' onPress={()=>props.navigation.navigate('profiledetails')} />
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