import { ScrollView, Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator } from "react-native";
import { auth } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import NavbarTrainer from "./Navbar";


// temporary home page
const ProfileTrainer = ({ navigation }) => {

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

   
    return(
    <View style={{flex:1}}>
        <ScrollView  style={styles.container}>
            <TouchableOpacity style={{alignSelf:"center", width:"80%", backgroundColor:"#00a9e0", alignItems:"center", height:50, marginTop:20, justifyContent:"center", borderRadius:10}} onPress={handleSignOut}>
                <Text style={{fontSize:20, color:"white", fontWeight:"bold"}}>Odhlásiť</Text>
            </TouchableOpacity>
        </ScrollView>
        <NavbarTrainer />
    </View>
    )
    

      
};

export default ProfileTrainer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },

  column: {
    flexDirection: 'row',
    marginTop: 50,
    borderTopWidth:1,
    borderBottomWidth:1,
    width: "100%",
    height: 170
  },

  profilePhoto:{
    width: 70,
    height: 70,
    borderRadius: 100,
    
  },

  name:{
    fontSize:20
  },

  container2: {
      flex: 1,
      justifyContent: "center"
  },
  horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
  },
})