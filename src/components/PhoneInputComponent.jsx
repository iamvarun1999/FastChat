import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PhoneInput from 'react-native-phone-input';

export default function PhoneInputComponent({ onChangePhone,setValid }) {
  const phoneRef = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <View style={styles.container}>
      <PhoneInput
        ref={phoneRef}
        initialCountry="in"
        allowZeroAfterCountryCode={false}
        onChangePhoneNumber={(number) => {
          setPhoneNumber(number);
          if (onChangePhone) {
            onChangePhone(number);
          }
          if (setValid) {
            setValid(true);
          }
        }}
        textProps={{
          placeholder: 'Enter phone number',
        }}
        style={styles.phoneInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  phoneInput: {
    width: '100%',
    borderRadius: 8,
    padding: 10,
    backgroundColor:'#F7F7FC',
    height:56,
    color:'#ADB5BD'
  },
});
