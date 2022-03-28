import { ScrollView, Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, TextInput, Keyboard, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import NavbarTrainer from "./Navbar";
import {PredefinedRef} from "../firebasecfg"
import firebase from "firebase";
import "firebase/firestore";
import { ChatRef } from "../firebasecfg";
import { Ionicons } from '@expo/vector-icons';


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
  const [editing, setEditing] = useState(false)
  const [editingHeader, setEditingHeader] = useState('')
  const [editingMessage, setEditingMessage] = useState('')

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
    
  }, [navigation, editing])

  function sendingMode(message, id){
    PredefinedRef.doc(id).update({
      usage: firebase.firestore.FieldValue.increment(1)
    })
    .then(()=>{
      navigation.navigate('ChatTrainer',{name: traineeName, message: message.message})
    })
  }

  function editingMode(message, id){
    setEditing(true)
    setEditingMessage(message.message)
    setEditingHeader(message.name)
    setId(id)
  }

  function sendMessage(){
    PredefinedRef.doc(id).update({
      usage: firebase.firestore.FieldValue.increment(1)
    })
    .then(()=>{
      navigation.navigate('ChatTrainer',{name: traineeName, message: sendingMessage})
    })
  }

  function editMessage(){
    PredefinedRef.doc(id).update({
      message: editingMessage,
      name: editingHeader
    })
    .then(() => {
      PredefinedRef.orderBy("usage", "desc").get().then((querySnapshot) => {
        let messages = [];
        let ids = [];
        querySnapshot.forEach((doc) => {
          messages.push(doc.data())
          ids.push(doc.id)
        });
        setPredefinedMessages(messages)
        setIds(ids)
    });
    })
    .then(() => {
      setEditing(false)
    })
  }

  const deleteMessage = (id) => {
    return Alert.alert(
      "Vymazať správu",
      "Naozaj si prajete vymazať túto preddefinovanú správu?",
      [
        // The "Yes" button
        {
          text: "Áno",
          onPress: () => {
            PredefinedRef.doc(id).delete()
            .then(() => {
              PredefinedRef.orderBy("usage", "desc").get().then((querySnapshot) => {
                let messages = [];
                let ids = [];
                querySnapshot.forEach((doc) => {
                  messages.push(doc.data())
                  ids.push(doc.id)
                });
                setPredefinedMessages(messages)
                setIds(ids)
              });
            })
          }
          
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "Nie",
        },
      ]
    );
  };

  function back(){
    return Alert.alert(
      "Opustiť obrazovku",
      "Naozaj si prajete opustiť túto obrazovku?",
      [
        // The "Yes" button
        {
          text: "Áno",
          onPress: () => {
            setEditing(false)
          }
          
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "Nie",
        },
      ]
    );
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

  if(editing){
    return(
      <View style={{flex:1}}>
        <TouchableOpacity style={{flex:1, backgroundColor:"white"}} onPress={() => Keyboard.dismiss()}>
          <View style={{alignItems:"center", marginTop:20}}>
            <Text style={{fontWeight:"bold", fontSize:20}}>Upraviť názov:</Text>
            <TextInput onChangeText={newText => setEditingHeader(newText)} value={editingHeader} multiline style={styles.input}/>
            <Text style={{fontWeight:"bold", fontSize:20}}>Upraviť správu:</Text>
            <TextInput onChangeText={newText => setEditingMessage(newText)} value={editingMessage} multiline style={styles.input}/>
            <TouchableOpacity style={styles.button2} onPress={() => editMessage()}>
              <Text style={{fontSize:20, fontWeight:"500", color:"white"}}>Uložiť</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={() => back()}>
              <Text style={{fontSize:20, fontWeight:"500", color:"white"}}>Naspäť</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        
      </View>
    )
  }

  return(
    <View style={{flex:1, backgroundColor:"white"}}>
        <ScrollView  style={styles.container}>
        {
          predefinedMessages.map((message, index) => {
            return(
              <View style={styles.box}>
                <View style={{flexDirection:"column", alignItems:"center", width:"100%",marginBottom:10}}>
                  <Text style={styles.header}>{message.name}</Text>
                  <TouchableOpacity style={styles.icon} onPress={() => deleteMessage(ids[index])}> 
                    <Ionicons name="trash-outline" size={40} color="black"/>
                  </TouchableOpacity>
                </View>
                <Text style={styles.message} numberOfLines={2}>{message.message}</Text>
                <View style={styles.bottom}>
                  <Text style={styles.usage}>Počet použití: {message.usage}</Text>
                  
                  <TouchableOpacity style={styles.button3} onPress={() => editingMode(message, ids[index])}>
                    <Text>Upraviť</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={() => sendingMode(message, ids[index])}>
                    <Text style={{color:"white"}}>Poslať</Text>
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
    icon:{
        position: "absolute",
        top:-5,
        right:0
    },
    button2:{
      width:"80%",
      backgroundColor:"#00a9e0",
      height:50,
      marginTop:30,
      borderRadius:10,
      justifyContent:"center",
      alignItems:"center"
    },  
    input:{
      width:"80%",
      borderWidth:1,
      padding:10,
      marginTop:10,
      borderRadius:10
    },
    button:{
      width:"20%",
      backgroundColor:"#00a9e0",
      height:30,
      marginLeft:"5%",
      borderRadius:10,
      alignItems:"center",
      justifyContent:"center"
    },
    button3:{
      width:"20%",
      backgroundColor:"white",
      height:30,
      marginLeft:"5%",
      borderRadius:10,
      alignItems:"center",
      justifyContent:"center",
      borderColor:"#00a9e0",
      borderWidth:1
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
      width:"90%",
      height:170,
      borderTopWidth:1,
      borderBottomWidth:1,
      marginTop:2,
      flexDirection:"column",
      alignItems:"center",
      padding:8,
      marginBottom:2,
      alignSelf:"center",
      borderWidth:1,
      borderRadius:10,
      borderColor:"#00a9e0"
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        marginBottom:70,
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