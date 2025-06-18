import { StyleSheet, TextInput } from 'react-native'

const CustomInput = ({ ...rest }) => {
    return (
        <>
            <TextInput
                style={style.input}
                {...rest}
            />
        </>
    )
}

const style = StyleSheet.create({
    input: {
        width: '100%',
        backgroundColor: 'white',
        height: 56,
        borderRadius: 8,
        padding: 10,
    }
})

export default CustomInput