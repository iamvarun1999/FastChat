import React, { useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { PrimaryBtn } from '../../components/Buttons'
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { updateUser } from '../../service/AuthApis';
import { loader } from '../../utils/utils';

export const ProfileDetails = (props) => {
    const [firstName, setFirstName] = useState('');
    const [firstNameValid, setFirstNameValid] = useState(true);
    const [lastName, setLastName] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };


    async function handleSubmit() {
        if(!firstName){
            setFirstNameValid(false)
            return
        }
        try {
            loader.start()
            let payload = {
                firstName,
                lastName
            }
            
            let res = await updateUser(props.route.params.id, payload)
            if(res.data.success){
                props.navigation.navigate('mainApp')
            }
            
        } catch (err) {
            console.log(err)
        }finally{
            loader.stop()
        }
    }




    return (
        <>
            <View style={style.container}>
                <View style={style.inner}>
                    <View style={{ width: '100%' }}>
                        <TouchableOpacity style={style.profileContainer} onPress={pickImage}>
                            <View style={style.profileCircle}>
                                {profileImage ? (
                                    <Image source={{ uri: profileImage }} style={style.profileImage} />
                                ) : (
                                    <Ionicons name="person-outline" size={50} color="#ADB5BD" />
                                )}
                            </View>
                            <View style={style.addButton}>
                                <Ionicons name="camera" size={16} color="white" />
                            </View>
                        </TouchableOpacity>

                        {/* Input Fields */}
                        <TextInput
                            style={style.input}
                            placeholder="First Name (Required)"
                            placeholderTextColor="#ADB5BD"
                            value={firstName}
                            onChangeText={(text)=>{
                                setFirstName(text)
                                setFirstNameValid(true)
                            }}
                        />
                        {firstNameValid?'':<Text style={{color:'red',marginBottom:20}}>Please Enter First Name Before Continue</Text>}
                        <TextInput
                            style={style.input}
                            placeholder="Last Name (Optional)"
                            placeholderTextColor="#ADB5BD"
                            value={lastName}
                            onChangeText={setLastName}
                        />
                    </View>
                </View>
                <View>
                    <PrimaryBtn title='Save' onPress={handleSubmit} />
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
    profileContainer: {
        position: 'relative',
        alignItems: 'center',
        marginBottom: 30,
    },
    profileCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#F7F7FC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#F7F7FC',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#0F1828',
        marginBottom: 15,
    },
    addButton: {
        position: 'absolute',
        bottom: 3,
        right: 135,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#0057FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
})