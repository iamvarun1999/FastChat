import React, { useState, useRef } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { PrimaryBtn, SimpleBtn } from '../../components/Buttons'
import OTPInput from '../../components/OTPInput'
import { loader } from '../../utils/utils'
import { registerUser } from '../../service/AuthApis'
import { saveToken } from '../../utils/auth'

export const EnterCode = (props) => {
    const [otp, setOtp] = useState('')
    const [error, setError] = useState(false)
    const otpRef = useRef();


    async function handleSubmit() {
        if (otpRef.current) {
            otpRef.current.validateOTP();
        }

        if (error) {
            console.log(error)
            return
        }
        try {
            loader.start()
            let payload = {
                ...props.route.params,
                OTP: otp
            }
            let res = await registerUser(payload)
            // console.log(res.data.data)
            // return
            if (res?.data?.success) {
                if (res?.data?.data?.userExist) {
                    props.navigation.navigate('mainApp', { id: res?.data?.data?.id })
                } else {
                    props.navigation.navigate('profiledetails', { id: res?.data?.data?.id })
                }
               await saveToken(res?.data?.data?.token)
            }
        } catch (err) {
            Alert('Some error occupide.')
            console.log(err)
        } finally {
            loader.stop()
        }
    }



    return (
        <>
            <View style={style.container}>
                <View style={style.inner}>
                    <View>
                        <Text style={style.heading}>Enter Code</Text>
                        <Text style={style.text}>We have sent you an SMS with the code to {props.route.params.phone}</Text>
                        <View style={{ marginTop: 40 }}>
                            <OTPInput
                                onComplete={setOtp}
                                ref={otpRef}
                                setError={setError}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ display: 'flex', gap: 10 }}>
                    <SimpleBtn title='Resend Code' />
                    <PrimaryBtn title='Continue' onPress={handleSubmit} />
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