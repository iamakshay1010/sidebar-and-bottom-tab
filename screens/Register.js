import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet,} from 'react-native';
import { TextInput,Button,Title } from 'react-native-paper';
import axios from "axios";


let baseURL = '';

{Platform.OS == 'android'
? baseURL = 'http://10.0.2.2:3000/api/v1/'
: baseURL = 'http://localhost:3000/api/v1/'
}

import { useSelector, useDispatch } from 'react-redux';
// Context
//import AuthGlobal from "../../Context/store/AuthGlobal";
//import { loginUser } from "../../Context/actions/Auth.actions";
import { loginUser } from '../Context/actions/Auth.actions';

const Register = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = () => {
    if (email === "" || name === "" || phone === "" || password === "") {
      setError("Please fill in the form correctly");
    }

    let user = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      isAdmin: false,
    };
    axios
      .post(`${baseURL}users/register`, user)
      .then((res) => {
        if (res.status == 200) {
          alert("registration successful....plz login");
          setTimeout(() => {
            navigation.navigate("Login");
          }, 500);
        }
      })
      .catch((error) => {
        console.log("error there");
      });
  };
    return (
      <View style={styles.container}>
         <Title>Register </Title>
      <TextInput placeholder="Name" style={styles.email} onChangeText={setName} />
      <TextInput placeholder="Email" style={styles.email} onChangeText={setEmail} />
      <TextInput placeholder="phone number" style={styles.email} onChangeText={setPhone} />
      <TextInput
           placeholder="Password"
           secureTextEntry
           style={styles.pass}
           onChangeText={setPassword}
         />
     <Button title="Register Here"
     mode="contained"
      onPress={register} >Register</Button>
     
     {error ? <Text>some error is there</Text> : null}
   </View>
    );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  email:{
    width:"70%",
    padding:10,
    backgroundColor:"#fff",
    margin:10,
    padding:0,
  },
  pass:{
    width:"70%",
    padding:10,
    backgroundColor:"#fff",
    margin:10,
    padding:0,
  }
});