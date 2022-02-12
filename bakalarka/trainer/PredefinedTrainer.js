import { ScrollView, Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, TextInput, Keyboard } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import NavbarTrainer from "./Navbar";
import {PredefinedRef} from "../firebasecfg"
import firebase from "firebase";
import "firebase/firestore";
import { ChatRef } from "../firebasecfg";


// temporary home page
const PredefinedTrainer = ({ navigation }) => {
  const [predefinedMessages, setPredefinedMessages] = useState([])
  const [ids,setIds] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendingMessage, setSendingMessage] = useState('')
  const [id, setId] = useState('')
  const [email, setEmail] = useState('')
  const [traineeName, setTraineeName] = useState('')

  useEffect( () => {
    
    const unsubscribe = navigation.addListener('focus', async () => {
      PredefinedRef.orderBy("usage", "desc").get().then((querySnapshot) => {
          let messages = [];
          let ids = [];
          querySnapshot.forEach((doc) => {
            messages.push(doc.data())
            ids.push(doc.id)
          });
          setPredefinedMessages(messages)
          setIds(ids)
          setLoaded(true)
          
      });
      const result = await AsyncStorage.getItem('email');
      const result2 = await AsyncStorage.getItem('traineeName');
      setEmail(result)
      setTraineeName(result2)
    });

    return unsubscribe;
    
  }, [navigation])

  function sendingMode(message, id){
    setSending(true)
    setSendingMessage(message.message)
    setId(id)
  }

  function sendMessage(){
    PredefinedRef.doc(id).update({
      usage: firebase.firestore.FieldValue.increment(1)
    })
    .then(()=>{
      ChatRef.add({
        date: new Date(),
        from: email,
        isPhoto: false,
        message: sendingMessage
      })
    })
    .then(() => {
      navigation.navigate('ChatTrainer',{name: traineeName})
    })
  }


  if(!loaded){
    return( 
        <View style={{flex:1}}>
            <View style={styles.container2}>
              <ActivityIndicator size="large" color="#0782F9"/>
            </View>
            <NavbarTrainer />
        </View>
    )
  }

  if(sending){
    return(
      <View style={{flex:1}}>
        <TouchableOpacity style={{flex:1, backgroundColor:"white"}} onPress={() => Keyboard.dismiss()}>
          <View style={{alignItems:"center", marginTop:20}}>
            <Text style={{fontWeight:"bold", fontSize:20}}>Upraviť správu pred odoslaním:</Text>
            <TextInput onChangeText={newText => setSendingMessage(newText)} value={sendingMessage} multiline style={styles.input}/>
            <TouchableOpacity style={styles.button2} onPress={() => sendMessage()}>
              <Text style={{fontSize:20, fontWeight:"500"}}>Odoslať</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={() => setSending(false)}>
              <Text style={{fontSize:20, fontWeight:"500"}}>Naspäť</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        
      </View>
    )
  }

  return(
    <View style={{flex:1}}>
        <ScrollView  style={styles.container}>
        {
          predefinedMessages.map((message, index) => {
            return(
              <View style={styles.box}>
                <Text style={styles.header}>{message.name}</Text>
                <Text style={styles.message} numberOfLines={2}>{message.message}</Text>
                <View style={styles.bottom}>
                  <Text style={styles.usage}>Počet použití: {message.usage}</Text>
                  <TouchableOpacity style={styles.button} onPress={() => sendingMode(message, ids[index])}>
                    <Text>Poslať</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button}>
                    <Text>Upraviť</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )
          })
        }
        </ScrollView>
      <NavbarTrainer />
    </View>
  )
};

export default PredefinedTrainer

const styles = StyleSheet.create({
    button2:{
      width:"80%",
      backgroundColor:"#c4c4c4",
      height:50,
      marginTop:30,
      borderRadius:50,
      justifyContent:"center",
      alignItems:"center"
    },  
    input:{
      width:"80%",
      borderWidth:1,
      padding:10,
      marginTop:10
    },
    button:{
      width:"20%",
      backgroundColor:"#c4c4c4",
      height:30,
      marginLeft:"5%",
      borderRadius:100,
      alignItems:"center",
      justifyContent:"center"
    },
    usage:{
      fontSize:18,
      fontWeight:"bold",
    },
    bottom:{
      flexDirection:"row",
      marginTop:20,
    },
    message:{
      marginTop:5,
      fontSize:15
    },
    header:{
      fontSize:23,
      fontWeight:"bold"
    },
    box:{
      width:"100%",
      height:150,
      borderTopWidth:1,
      borderBottomWidth:1,
      marginTop:15,
      flexDirection:"column",
      alignItems:"center",
      padding:8
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        marginBottom:80
    },
    container2: {
      flex: 1,
      justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
})