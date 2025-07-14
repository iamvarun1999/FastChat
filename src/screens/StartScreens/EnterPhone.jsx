import { useEffect, useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { PrimaryBtn } from '../../components/Buttons'
import { loader } from '../../utils/utils'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import CustomInput from '../../components/CustomInput'
import Feather from '@expo/vector-icons/Feather';
import { getMatchingData } from '../../Firebase/CloudFirestore/GetData'
import { saveToken } from '../../utils/auth'
import WarningModal from '../../components/WarningModal'



export const EnterPhone = (props) => {
    const [states, setStates] = useState({
        showPassword: true,
        emailValid1: true,
        emailValid2: true,
        passwordValid: true,
        showModal1: false,
        modalContent: ''
    })
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })



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

        try {
            loader.start()
            let res = await getMatchingData('users', 'email', '==', formData.email.toLowerCase())
            if (res?.length !== 0) {
                let data = res[0]
                if (data.password == formData.password) {
                    console.log(data?.id)
                    await saveToken(data?.id)
                    props.navigation.navigate('mainApp', { id: data?.id })
                    setFormData({
                        email: '',
                        password: ''
                    })
                } else {
                    setStates(pre => ({ ...pre, showModal1: true, modalContent: 'Please enter valid credentials.' }))
                }

            } else {
                setStates(pre => ({ ...pre, showModal1: true, modalContent: 'Please enter valid credentials.' }))
            }
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
            <WarningModal open={states.showModal1} toggle={() => setStates(pre => ({ ...pre, showModal1: false }))} content={states.modalContent} />
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
                                    <View style={style.passwordContainer}>
                                        <Pressable style={style.eyeIcon} onPress={()=>setStates(pre=>({...pre,showPassword:!pre.showPassword}))}>
                                            <Feather name={!states.showPassword ? "eye" : "eye-off"} size={20} color="black" />
                                        </Pressable>
                                        <CustomInput
                                            placeholder='Enter Password'
                                            secureTextEntry={states.showPassword}
                                            onChangeText={(e) => {
                                                setFormData(pre => ({ ...pre, password: e }))
                                                setStates(pre => ({ ...pre, passwordValid: true }))
                                            }}
                                            value={formData.password}
                                        />
                                    </View>

                                    {states.passwordValid ? '' : <Text style={{ color: 'red' }}>Password is mandatory to fill.</Text>}

                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <PrimaryBtn title='Continue' onPress={handleSubmit} />
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
    passwordContainer: {
        width: '100%',
        position: 'relative'
    },
    eyeIcon: {
        position: 'absolute',
        top: 19,
        right: 13,
        zIndex: 4
    }
})