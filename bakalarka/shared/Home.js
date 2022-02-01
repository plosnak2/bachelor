import { Text, TouchableOpacity } from "react-native";
import { auth } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'

// temporary home page
const Home = ({ navigation }) => {
    const [email, setEmail] = useState('')

    useEffect(async() => {
        const result = await AsyncStorage.getItem('email');
        setEmail(result);

  }, [])

    const handleSignOut= () =>{
      auth
        .signOut()
        .then(() => {
            AsyncStorage.removeItem('email');
            
        })
        .then(() => {
            navigation.navigate('Login')
        
        })
        .catch(error => alert(error.message))
    }

      return <TouchableOpacity onPress={handleSignOut}><Text>This is home {email}</Text></TouchableOpacity>;
};

export default Home