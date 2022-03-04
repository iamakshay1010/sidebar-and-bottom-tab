import React, { useEffect, useContext, useState } from "react";
import { View, Text,  StyleSheet, } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { TextInput,Button,Title } from 'react-native-paper';
// Context
//import AuthGlobal from "../../Context/store/AuthGlobal";
//import { loginUser } from "../../Context/actions/Auth.actions";
import AuthGlobal from '../Context/store/AuthGlobal';
import { loginUser } from '../Context/actions/Auth.actions';

const Login = ({props,navigation}) => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  //const dispatch = useDispatch();
  const onTapLogin1 = () => {
    //dispatch(onLogin(email, password));
    console.log(email);
    console.log(password);
  };
  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      navigation.navigate("Home");
    }
  }, [context.stateUser.isAuthenticated]);

  const onTapLogin = () => {
    const user = {
      email,
      password,
    };

    if (email === "" || password === "") {
      setError("Please fill in your credentials");
    } else {
      loginUser(user, context.dispatch);
    }
  };
    return (
      <View style={styles.container}>
        <Title>Login </Title>
         <TextInput placeholder="Email"
         label="Enter email..."
         Type= 'outlined'
          style={styles.email} onChangeText={setEmail} />
         <TextInput
              placeholder="Password"
              secureTextEntry
              style={styles.pass}
              onChangeText={setPassword}
            />
        <Button title="Login" mode="contained" style={styles.button} onPress={onTapLogin} >Login</Button>
        <Button
          title="not registered? click here"
          mode="text"
          style={styles.button}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >not registered? click here</Button>

        {error ? <Text>some error is there</Text> : null}
      </View>
    );
};

export default Login;

const styles = StyleSheet.create({
  main:{
    flex:1,
  },
  top:{
    flex:1,
  },
  bottom:{
    flex:2
  },
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    
  },
  email:{
    width:"70%",
    padding:0,
    backgroundColor:"#fff",
    margin:10,
  },
  pass:{
    width:"70%",
    padding:0,
    backgroundColor:"#fff",
    margin:10,
  },
  button:{
    margin:5,
    color:'#fff'
  }
});