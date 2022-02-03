import { Text, TouchableOpacity, ActivityIndicator, View, StyleSheet } from "react-native";
import { auth } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { UsersRef } from "../firebasecfg";

// temporary home page
const Home = ({ navigation }) => {
    useEffect(async () => {
        const result = await AsyncStorage.getItem('email');
        console.log(result)
        const user = await UsersRef.doc(result).get();
        console.log(user.data().coach)
        if(user.data().coach === false){
            navigation.navigate('HomeTrainee')
        } else {
            navigation.navigate('HomeTrainer')
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