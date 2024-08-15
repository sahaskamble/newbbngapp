import * as React from "react";
import 'nativewind';
import { Text, View, Pressable, StyleSheet, TextInput, Image } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {

  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [EyeClose, setEyeClose] = useState(false);
  const [Message, setMessage] = useState('');
  const [isLogged, setisLogged] = useState(false);

  const handleLogin = async () => {
    try {
      if (username !== '' && password !== '') {
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
          const memberData = data.member.User; 
          const name = data.member.Member.name;
          if (name === data.member.Member.name) {
            setTimeout(() => {
              setMessage(data.member.Member.name);
            }, 2500);
            await AsyncStorage.setItem('username', username);
            await AsyncStorage.setItem('password', password);
            await AsyncStorage.setItem('isLoggedIn', 'true');
            console.log(memberData);
            await AsyncStorage.setItem('userData', JSON.stringify(memberData)); // Store user data
            router.navigate('/dashboard');
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

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.logo}
      />
      <Text style={styles.welcomeText}>Welcome</Text>
      <Text style={styles.subtitleText}>
        Sign in to access your account
      </Text>
      {
        isLogged ? (
          <View className="w-[250px] h-10 bg-green-200 my-2 rounded-md">
            <Text>{Message}</Text>
          </View>
        ) : []
      }
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
            <FontAwesome name="eye" size={15} color='gray' onPress={() => { setEyeClose(!EyeClose) }} />
          ) : (
            <FontAwesome name="eye-slash" size={15} color='gray' onPress={() => { setEyeClose(!EyeClose) }} />
          )
        }
      </View>

      <Pressable
        style={styles.button}
        onPress={handleLogin}
      >
        {
          isLogged ? (
            <Text className="bg-gray-400 text-white">Login</Text>
          ):(
            <Text style={styles.buttonText}>Login</Text>
          )
        }
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
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
    backgroundColor: '#5bc0de',
    paddingVertical: 20,
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
});

export default Login;
