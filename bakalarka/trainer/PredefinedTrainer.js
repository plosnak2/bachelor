import { ScrollView, Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import NavbarTrainer from "./Navbar";
import {PredefinedRef} from "../firebasecfg"


// temporary home page
const PredefinedTrainer = ({ navigation }) => {
  const [predefinedMessages, setPredefinedMessages] = useState([])
  const [ids,setIds] = useState([])
  const [loaded, setLoaded] = useState(false)

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
      
    });

    return unsubscribe;
    
  }, [navigation])


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
                  <TouchableOpacity style={styles.button}>
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
        backgroundColor: "white"
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