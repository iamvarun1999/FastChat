import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import PhoneInputComponent from '../../components/PhoneInputComponent'
import { PrimaryBtn } from '../../components/Buttons'
import { sendOTP } from '../../service/AuthApis'
import { loader } from '../../utils/utils'

export const EnterPhone = (props) => {
    const [phone,setPhone] = useState(null)
    const [isValidPhone,setIsValidPhone] = useState(true)



    async function handleSubmit(){
        if(!phone){
            setIsValidPhone(false)
        }
        try{
            loader.start()
         let res = await sendOTP({phone})
         if(res?.data?.success){
            props.navigation.navigate('enterotp',{phone})
         }
        }catch(err){
            console.log(err)
            Alert('Some Error occupide.')
        }finally{
            loader.stop()
        }
    }



    return (
        <>
            <View style={style.container}>
                <View style={style.inner}>
                    <View>
                        <Text style={style.heading}>Enter Your Phone Number</Text>
                        <Text style={style.text}>Please confirm your country code and enter your phone number</Text>
                        <View style={{ marginTop: 40 }}>
                            <PhoneInputComponent onChangePhone={setPhone} setValid={setIsValidPhone}/>
                            {isValidPhone?'':<Text style={{color:'red'}}>Phone Number is mandatory to fill.</Text>}
                        </View>
                    </View>
                </View>
                <View>
                    <PrimaryBtn title='Continue' onPress={handleSubmit} />
                    {/* <PrimaryBtn title='Continue' onPress={()=>props.navigation.navigate('enterotp')} /> */}
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