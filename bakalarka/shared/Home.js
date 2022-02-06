import { Text, TouchableOpacity, ActivityIndicator, View, StyleSheet } from "react-native";
import { auth } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { UsersRef } from "../firebasecfg";

const Home = ({ navigation }) => {
    // tato komponenta služi pre rozlíšenie či sa prihlásil športovec alebo trener a určuje presmerovanie
    useEffect(async () => {
        const result = await AsyncStorage.getItem('email');
        const user = await UsersRef.doc(result).get();
        if(user.data().coach === false){
            navigation.replace('HomeTrainee')
        } else {
            navigation.replace('HomeTrainer')
        }
      
    }, [])

    return(
      <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0782F9"/>
      </View>
  )
};

export default Home

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center"
  },
  horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
  }
})