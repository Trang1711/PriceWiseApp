import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function SignUpScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSignUp = () => {
    if (!agreed) {
      Alert.alert("Thông báo", "Bạn phải đồng ý với điều khoản và dịch vụ!");
      return;
    }
    Alert.alert("Đăng ký thành công ");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Sign Up</Text>

      <TextInput style={styles.input} placeholder="E-mail address" keyboardType="email-address" />
      
      {/* Mật khẩu */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.icon}>
          <FontAwesome name={passwordVisible ? 'eye-slash' : 'eye'} size={20} />
        </TouchableOpacity>
      </View>

      {/* Nhập lại mật khẩu */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={!confirmVisible}
        />
        <TouchableOpacity onPress={() => setConfirmVisible(!confirmVisible)} style={styles.icon}>
          <FontAwesome name={confirmVisible ? 'eye-slash' : 'eye'} size={20} />
        </TouchableOpacity>
      </View>

      {/* Tích điều khoản */}
      <TouchableOpacity
        style={styles.agreeContainer}
        onPress={() => setAgreed(!agreed)}
      >
        <FontAwesome
          name={agreed ? 'check-square' : 'square-o'}
          size={20}
          style={styles.checkbox}
        />
        <Text style={styles.agreeText}>Tôi đồng ý với điều khoản và dịch vụ</Text>
      </TouchableOpacity>

      {/* Nút Đăng ký */}
      <TouchableOpacity
        style={[styles.button, { opacity: agreed ? 1 : 0.6 }]}
        disabled={!agreed}
        onPress={handleSignUp}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.socialText}>hoặc bạn có thể đăng ký bằng</Text>
      <View style={styles.separator} />
      <View style={styles.socialButtons}>
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesome name="apple" size={40} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesome name="google" size={40} color="#DB4437" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <FontAwesome name="facebook" size={40} color="#3b5998" />
              </TouchableOpacity>
            </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
     paddingTop: 90,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#aaa',
  },
  passwordContainer: {
    width: '100%',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
  agreeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  checkbox: {
    marginRight: 10,
    color: '#D17842',
  },
  agreeText: {
    fontSize: 14,
  },
  button: {
    backgroundColor: '#D17842',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  socialText: {
    marginTop: 15,
    fontSize: 14,
    color: '#444',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  socialButtons: {
    flexDirection: 'row',
    marginTop: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
});