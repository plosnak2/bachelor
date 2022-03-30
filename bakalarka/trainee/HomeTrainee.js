import { Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, ScrollView } from "react-native";
import { auth } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { UsersRef } from "../firebasecfg";
import NavbarTrainee from "./Navbar";
import { ChatRef } from "../firebasecfg";

// domovska obrazovka sportovca
const HomeTrainee = ({ navigation }) => {
    const [coachName, setCoachName] = useState('');
    const [coachPhoto, setCoachPhoto] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [lastMessage, setLastMessage] = useState('');

    // ziskanie hlavnych informáci o trenerovi: mail a fotka
    useEffect(async () => {
        const unsubscribe = navigation.addListener('focus', async () => {
            const result = await AsyncStorage.getItem('email');
            const user = await UsersRef.doc(result).get();
            const coachref = user.data().coachref;
            const coach = await UsersRef.doc(coachref).get();
            const query = await ChatRef.orderBy("date", "desc").limit(1).get();
            if(query.docs[0].data().isPhoto === true) {
                setLastMessage("Uživateľ odoslal fotku")
            } else {
                setLastMessage(query.docs[0].data().message)
            }
            setCoachName(coach.data().name)
            setCoachPhoto(coach.data().profilephoto)
            setLoaded(true);
            AsyncStorage.setItem('coachPhoto', coach.data().profilephoto)
            AsyncStorage.setItem('coachName', coach.data().name)
            AsyncStorage.setItem('myPhoto', user.data().profilephoto)
        });
        return unsubscribe;
    }, [navigation])

    // pokial niesu ziskane informácie tak vraciam loader
    if(!loaded){
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0782F9"/>
            </View>
        )
    } else {
        return (
            <View style={{flex:1}}>
                <ScrollView style={styles.container}>
                    

                    <TouchableOpacity style={{width:"90%", backgroundColor:"#00a9e0", alignSelf:"center", marginTop:50, borderRadius:5, flexDirection:"row", padding:10}} onPress={() => navigation.navigate('ChatTrainee',{name: coachName})}>
                        <Image source={{uri: coachPhoto}} style={styles.profilePhoto}/>
                        <View style={{flexDirection:"column", marginLeft:20, width:"60%"}}>
                            <Text style={{fontSize:17, fontWeight:"bold", color:"white"}}>{coachName}</Text>
                            <Text style={{color:"white"}} numberOfLines={2}>{lastMessage}</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
                <NavbarTrainee />
            </View>
        );
    }
};

export default HomeTrainee

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white"
    },

    name:{
        fontSize:30,
        marginTop:30
    },

    profilePhoto:{
        width: 70,
        height: 70,
        borderRadius: 100,
        
      },

    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },

    wrapper:{
        backgroundColor:'#3ca0e7',
        marginTop:30,
        borderRadius:100,
        padding:15,
        justifyContent: 'center',
        flexDirection: 'row',
        width: "65%",
    },
  
    wrapperedtext:{
        color:'black',
        fontSize:20,
    },
})