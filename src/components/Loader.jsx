import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { primaryColor } from '../constants'
import { useSelector } from 'react-redux'

export const Loader = () => {
    let loader = useSelector(e => e.loader)

    return (
        <>
            {loader ? <View style={{ position: 'absolute', top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.3)', width: '100%', height: '100%', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size={'large'} color={primaryColor} /></View> : ''}
        </>
    )
}
