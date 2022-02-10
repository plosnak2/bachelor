import { ScrollView, Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { auth } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { UsersRef } from "../firebasecfg";
import { Ionicons } from '@expo/vector-icons';
import NavbarTrainer from "./Navbar";

// temporary home page
const HomeTrainer = ({ navigation }) => {
    const [traineePhoto, setTraineePhoto] = useState('');
    const [traineeName, setTraineeName] = useState('');
    const [lastMessage, setLastMessage] = useState('Toto je len placeholder skuška pre poslednu spravu');

    useEffect(async () => {
      const result = await AsyncStorage.getItem('email');
      const user = await UsersRef.doc(result).get();
      const traineeref = user.data().trainee;
      const trainee = await UsersRef.doc(traineeref).get();
      setTraineePhoto(trainee.data().profilephoto)
      setTraineeName(trainee.data().name)
      AsyncStorage.setItem('myPhoto', user.data().profilephoto)
      AsyncStorage.setItem('traineePhoto', trainee.data().profilephoto)
    }, [])

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
            <TouchableOpacity style={{alignItems:"center"}} onPress={() => navigation.navigate('ChatTrainer',{name: traineeName})}>
              <View style={styles.column}>
                <View style={{flexDirection:"column", alignItems:"center", width: "40%", marginTop: 10}}>
                  <Image source={{uri: traineePhoto}} style={styles.profilePhoto}/>
                  <Text style={styles.name}>{traineeName}</Text>
                </View>

                <View style={{flexDirection:"column", alignItems:"flex-start", width: "60%", marginTop: 10, paddingRight:5}}>
                  <Text numberOfLines={1}>{lastMessage}</Text>
                  <Text style={{marginTop:15}}>Posledný tréning: (TODO)</Text>
                  <View  style={{flexDirection:"row", marginTop:15}}>
                    <Text style={{marginTop:10}}>Automatická správa</Text>
                    <Ionicons name="settings" size={30} color="black" style={{marginLeft:20, marginTop:5}}/>
                  </View>
                  <Text style={{marginTop:15}}>Naplánovaná: (TODO)</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop:100}} onPress={handleSignOut}><Text>odhlasit</Text></TouchableOpacity>
          </ScrollView>
          <NavbarTrainer />
        </View>
      )
};

export default HomeTrainer

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
    width: 100,
    height: 100,
    borderRadius: 100,
    
  },

  name:{
    fontSize:20
  }
})