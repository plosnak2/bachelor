import { Text, TouchableOpacity } from "react-native";
import { auth } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'

// temporary home page
const HomeTrainer = ({ navigation }) => {

    const handleSignOut= () =>{
      auth
        .signOut()
        .then(() => {
            AsyncStorage.removeItem('email');
            
        })
        .then(() => {
            navigation.replace('Login')
        
        })
        .catch(error => alert(error.message))
    }

      return <TouchableOpacity onPress={handleSignOut}><Text>This is home - trainer</Text></TouchableOpacity>;
};

export default HomeTrainer