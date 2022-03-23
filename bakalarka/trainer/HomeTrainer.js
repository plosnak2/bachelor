import { ScrollView, Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { auth } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { UsersRef } from "../firebasecfg";
import { Ionicons } from '@expo/vector-icons';
import NavbarTrainer from "./Navbar";
import { ChatRef } from "../firebasecfg";

// temporary home page
const HomeTrainer = ({ navigation }) => {
    const [traineePhoto, setTraineePhoto] = useState('');
    const [traineeName, setTraineeName] = useState('');
    const [lastMessage, setLastMessage] = useState('');

    useEffect( () => {
      const unsubscribe = navigation.addListener('focus', async () => {
        const result = await AsyncStorage.getItem('email');
        const user = await UsersRef.doc(result).get();
        const traineeref = user.data().trainee;
        const trainee = await UsersRef.doc(traineeref).get();
        const query = await ChatRef.orderBy("date", "desc").limit(1).get();
        if(query.docs[0].data().isPhoto === true) {
            setLastMessage("Uživateľ odoslal fotku")
        } else {
            setLastMessage(query.docs[0].data().message)
        }
        setTraineePhoto(trainee.data().profilephoto)
        setTraineeName(trainee.data().name)
        AsyncStorage.setItem('myPhoto', user.data().profilephoto)
        AsyncStorage.setItem('traineePhoto', trainee.data().profilephoto)
        AsyncStorage.setItem('traineeName', trainee.data().name)
      });

      return unsubscribe;
      
    }, [navigation])

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
            <TouchableOpacity style={{width:"90%", backgroundColor:"#00a9e0", alignSelf:"center", marginTop:50, borderRadius:5, flexDirection:"row", padding:10}} onPress={() => navigation.navigate('ChatTrainer',{name: traineeName, message:""})}>
              <Image source={{uri: traineePhoto}} style={styles.profilePhoto}/>
              <View style={{flexDirection:"column", marginLeft:20, width:"60%"}}>
                <Text style={{fontSize:17, fontWeight:"bold", color:"white"}}>{traineeName}</Text>
                <Text numberOfLines={2} style={{color:"white"}}>{lastMessage}</Text>
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
    width: 70,
    height: 70,
    borderRadius: 100,
    
  },

  name:{
    fontSize:20
  }
})