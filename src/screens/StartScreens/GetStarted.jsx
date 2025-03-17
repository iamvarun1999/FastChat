import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import startImg from '../../assets/images/start.png'
import { PrimaryBtn, SimpleBtn } from '../../components/Buttons'

const GetStarted = (props) => {
    return (
        <>
            <View style={style.container}>
                <View style={style.imageContainer}>
                    <Image source={startImg} />
                </View>
                <View style={style.textContainer}>
                    <Text style={style.text}>Connect easily with your family and friends over countries</Text>
                </View>
                <View style={style.buttonContainer}>
                    <SimpleBtn title='Terms & Privacy Policy'/>
                    <PrimaryBtn title='Start Messaging'  onPress={()=>props.navigation.navigate('enternumber')}/>
                </View>
            </View>
        </>
    )
}

export default GetStarted


const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal:25
    },
    imageContainer: {
        flex: 3,
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center'
    },
    textContainer: {
        flex: 1.5,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
       fontSize:32,
       fontWeight:700,
       textAlign:'center'
    },
    buttonContainer: {
        flex: 1.5,
        display:'flex',
        justifyContent:'flex-end',
        paddingBottom:40,
        gap:10
    },
})