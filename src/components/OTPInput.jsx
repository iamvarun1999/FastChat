import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';

const OTPInput = forwardRef(({ length = 4, onComplete,setError }, ref) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const [errorIndexes, setErrorIndexes] = useState([]);
  const inputRefs = useRef([]);

  useImperativeHandle(ref, () => ({
    validateOTP,
  }));

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text.substring(text.length - 1);
    setOtp(newOtp);
    setError(false)
    if (text && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (newOtp.join('').length === length) {
      onComplete && onComplete(newOtp.join(''));
    }

    setErrorIndexes((prev) => prev.filter((i) => i !== index));
  };

  const validateOTP = () => {
    const emptyIndexes = otp.map((digit, index) => (!digit ? index : null)).filter((i) => i !== null);
    if (emptyIndexes.length > 0) {
      setErrorIndexes(emptyIndexes);
      setError(true)
    } else {
      setError(false)
      onComplete && onComplete(otp.join(''));
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          style={[styles.input, errorIndexes.includes(index) ? styles.errorInput : null]}
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
      {/* <Button title="Verify OTP" onPress={validateOTP} /> */}
    </View>
  );
});

export default OTPInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    alignItems: 'center'
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
  errorInput: {
    borderColor: '#FF0000',
  },
});
