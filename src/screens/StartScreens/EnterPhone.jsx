import { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { PrimaryBtn } from '../../components/Buttons'
import { loader } from '../../utils/utils'
import { addDocument } from '../../Firebase/CloudFirestore/SetData'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import CustomInput from '../../components/CustomInput'
import Feather from '@expo/vector-icons/Feather';
import { getMatchingData } from '../../Firebase/CloudFirestore/GetData'
import { saveToken } from '../../utils/auth'

{/* <Feather name="eye" size={24} color="black" /> */ }
{/* <Feather name="eye-off" size={24} color="black" /> */ }

export const EnterPhone = (props) => {
    const [states, setStates] = useState({
        showPassword: true,
        emailValid1: true,
        emailValid2: true,
        passwordValid: true
    })
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [isValidPhone, setIsValidPhone] = useState(true)



    async function handleSubmit() {
        if (!formData.email || !formData.password) {
            if (!formData.email) {
                setStates(pre => ({ ...pre, emailValid2: false }))
            }
            if (!formData.password) {
                setStates(pre => ({ ...pre, passwordValid: false }))
            }
            return
        }
        if (!formData.email.includes('@')) {
            setStates(pre => ({ ...pre, emailValid1: false }))
            return
        }
        console.log(formData)

        try {
            // loader.start()
            let res = await getMatchingData('users', 'email', '==', formData.email.toLowerCase())
            if (res?.length !== 0) {
                let data = res[0]
                if (data.password == formData.password) {
                    await saveToken(data?.id)
                    props.navigation.navigate('mainApp', { id: data?.id })

                } else {
                    Alert('Please enter valid credentials.')
                }

            } else {
                Alert('Please enter valid credentials.')
            }
            return

            // let payload = {
            //     name: '',
            //     createdAt: new Date(),
            //     profile: '',
            //     gender: '',
            //     email: formData.email.toLowerCase(),
            //     password: formData.password
            // }
            // await addDocument('users', payload)
            // props.navigation.navigate('enterotp', { phone })
        } catch (err) {
            Alert('Some Error occupide.')
        } finally {
            loader.stop()
        }
    }


    useEffect(() => {
        if (!states.emailValid1) {
            if (formData.email.includes('@')) {
                setStates(pre => ({ ...pre, emailValid1: true }))
            }
        }

    }, [formData.email, states.emailValid1])


    return (
        <>
            <SafeAreaProvider>
                <SafeAreaView style={style.container}>
                    <View style={style.inner}>
                        <View>
                            <Text style={style.heading}>Enter Your Email & Password</Text>
                            <Text style={style.text}>Please enter your Email Address & Password to login your account</Text>
                            <View style={style.innerContainer}>
                                <View>
                                    <Text style={style.label}>Email</Text>
                                    <CustomInput
                                        placeholder='Enter Email Address'
                                        onChangeText={(e) => {
                                            setFormData(pre => ({ ...pre, email: e }))
                                            setStates(pre => ({ ...pre, emailValid2: true }))
                                        }}
                                        value={formData.email}
                                        keyboardType="email-address"
                                    />
                                    {states.emailValid1 ? '' : <Text style={{ color: 'red' }}>Please Enter Valid Email Address.</Text>}
                                    {states.emailValid2 ? '' : <Text style={{ color: 'red' }}>Email is mandatory to fill.</Text>}

                                </View>
                                <View>
                                    <Text style={style.label}>Password</Text>
                                    <CustomInput
                                        placeholder='Enter Password'
                                        secureTextEntry={states.showPassword}
                                        onChangeText={(e) => {
                                            setFormData(pre => ({ ...pre, password: e }))
                                            setStates(pre => ({ ...pre, passwordValid: true }))
                                        }}
                                        value={formData.password}
                                    />
                                    {states.passwordValid ? '' : <Text style={{ color: 'red' }}>Password is mandatory to fill.</Text>}

                                </View>
                                {/* <PhoneInputComponent onChangePhone={setPhone} setValid={setIsValidPhone} /> */}

                                {/* {isValidPhone ? '' : <Text style={{ color: 'red' }}>Phone Number is mandatory to fill.</Text>} */}
                            </View>
                        </View>
                    </View>
                    <View>
                        <PrimaryBtn title='Continue' onPress={handleSubmit} />
                        {/* <PrimaryBtn title='Continue' onPress={()=>props.navigation.navigate('enterotp')} /> */}
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>

        </>
    )
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
    innerContainer: {
        marginTop: 30,
        display: 'flex',
        gap: 20
    },
    heading: {
        fontSize: 28,
        fontWeight: 700,
        textAlign: 'center',
        color: '#0F1828'
    },
    text: {
        fontSize: 16,
        fontWeight: 400,
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 28,
        color: '#0F1828'
    },
    label: {
        fontSize: 17,
        fontWeight: 500,
        marginBottom: 5,
        lineHeight: 28,
        color: '#0F1828'
    },
})