import React, { useEffect } from 'react';
import 'nativewind';
import { Text, View, Pressable, StyleSheet, TextInput, Image, Button, Dimensions, Platform, TouchableOpacity, ImageBackground, KeyboardAvoidingView, ActivityIndicator, Linking } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

const Login = () => {

  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [EyeClose, setEyeClose] = useState(false);
  const [Message, setMessage] = useState('');
  const [isLogged, setisLogged] = useState(false);
  const [isMessageGone, setisMessageGone] = useState(true);

  const loadAsyncStorage = async () => {
    const isMsg: any = await AsyncStorage.getItem('isMessageGone');

    if (JSON.parse(isMsg) === false) {
      setisMessageGone(false);
    } else {
      setisMessageGone(true);
    }
  }

  const handleLogin = async () => {
    try {
      setisLogged(true);
      if (username !== '' && password !== '' && accepted === true) {
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        const authString = btoa(`${username}:${password}`);
        myHeaders.append("Authorization", `Basic ${authString}`);

        // console.log(authString);

        const res = await fetch('https://bbmoapp.bbnglobal.net/api/users/login', {
          method: 'POST',
          headers: myHeaders,
        });

        if (res.status === 200) {
          const data = await res.json();
          console.warn(data);
          const memberData = data.member;
          const name = data.member.Member.name;
          if (name === data.member.Member.name) {
            setTimeout(() => {
              setMessage(data.member.Member.name);
            }, 2500);
            await AsyncStorage.setItem('username', username);
            await AsyncStorage.setItem('password', password);
            await AsyncStorage.setItem('isUserLoggedIn', JSON.stringify(true));
            console.log(memberData);
            await AsyncStorage.setItem('userData', JSON.stringify(memberData)); // Store user data
            router.navigate('/(drawer)/');
          } else {
            setisLogged(false);
            alert('Login Unsuccessful');
          }
        } else {
          setTimeout(() => {
            alert(`Login Unsuccessful`);
          }, 2500);
        }
      } else {
        setTimeout(() => {
          alert('Please Fill the fields');
        }, 2000);
      }
    } catch (e) {
      throw console.error(e);
    } finally {
      setisLogged(false);
    }
  }

  const [accepted, setAccepted] = useState(false);

  const toggleAccept = () => {
    setAccepted(!accepted);
  };

  useEffect(() => {
    loadAsyncStorage();
  }, [])

  return (
    <>
      {Platform.OS === 'android' && <StatusBar hidden={true} hideTransitionAnimation='slide' />}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
      >
        <Image
          source={require("@/assets/images/mainicon.png")}
          style={styles.logo}
        />
        <Text style={styles.welcomeText}>Welcome to BBN Global</Text>
        <Text style={styles.subtitleText}>
          Sign in to access your account
        </Text>
        <View style={styles.inputContainer}>
          <FontAwesome
            name="envelope"
            size={25}
            style={styles.icon}
          />
          <TextInput
            placeholder="Enter your email"
            value={username}
            onChangeText={(e) => {
              setUsername(e);
            }}
            style={styles.input}

          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome
            name="lock"
            size={25}
            style={styles.icon}
          />
          <TextInput
            placeholder="Enter your password"
            secureTextEntry={EyeClose ? false : true}
            value={password}
            onChangeText={(e) => {
              setPassword(e)
            }}
            style={styles.input}
          />
          {
            EyeClose ? (
              <TouchableOpacity
                className='w-10 h-10 flex justify-center items-center'
                onPress={() => { setEyeClose(false) }}
              >
                <FontAwesome name="eye" size={20} color='gray' onPress={() => { setEyeClose(false) }} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className='w-10 h-10 flex justify-center items-center'
                onPress={() => { setEyeClose(true) }}
              >
                <FontAwesome name="eye-slash" size={20} color='gray' onPress={() => { setEyeClose(true) }} />
              </TouchableOpacity>
            )
          }
        </View>

        <Pressable
          className={`w-full py-3 px-4 my-6 ${isLogged ? 'bg-gray-500' : 'bg-[#4296de]'} rounded-lg`}
          onPress={handleLogin}
        >
          {
            isLogged ? (
              <ActivityIndicator size={25} color={'#fff'} />
            ) : (
              <Text className="text-white text-center text-xl">Login</Text>
            )
          }
        </Pressable>
        <View style={styles.container1}>
          <View style={styles.radioContainer}>
            <TouchableOpacity onPress={toggleAccept} style={styles.radioButton}>
              {accepted ? <View style={styles.radioSelected} /> : null}
            </TouchableOpacity>
            <Text style={styles.policyText}>
              I accept the privacy policy & all the
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('https://bbnglobal.net/privacy-policy')
                }}
              >
                <Text style={{ color: '#4296de', fontSize: 13 }}>Terms and Conditions by BBNGlobal</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
// <View>
//   <RadioButton id='button' size={20} />
// </View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 100,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  link: {
    color: '#007BFF',
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
    backgroundColor: '#DCDCDC',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
    color: 'gray'
  },
  input: {
    flex: 1,
    fontSize: 18,
    height: 50,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMeText: {
    marginLeft: 10,
    color: '#666',
  },
  button: {
    backgroundColor: '#4296de',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgetPasswordText: {
    marginTop: 20,
    color: '#1a73e8',
  },
  registerText: {
    marginTop: 20,
    color: '#666',
  },
  registerLink: {
    color: '#007BFF',
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 1,
    borderWidth: 2,
    borderColor: '#4296de',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioSelected: {
    height: 12,
    width: 12,
    borderRadius: 1,
    backgroundColor: '#4296de',
  },
  policyText: {
    fontSize: 13,
    color: '#000',
  },
});

export default Login;
