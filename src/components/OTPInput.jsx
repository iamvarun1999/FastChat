import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function OTPInput({ length = 4, onComplete }) {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputRefs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text.substring(text.length - 1); // Only take the last digit
    setOtp(newOtp);

    // Move to next input field
    if (text && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Call onComplete if all fields are filled
    if (newOtp.join('').length === length) {
      onComplete && onComplete(newOtp.join(''));
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          style={[styles.input, digit ? styles.filledInput : null]}
          keyboardType="numeric"
          maxLength={1}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
              inputRefs.current[index - 1].focus();
            }
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 8,
    color: '#1D1D1D',
    backgroundColor: '#F7F7FC',
  },
  filledInput: {
    borderColor: '#1D1D1D',
  },
});
