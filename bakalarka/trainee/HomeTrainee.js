import { Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator } from "react-native";
import { auth } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { UsersRef } from "../firebasecfg";


// temporary home page
const HomeTrainee = ({ navigation }) => {
    const [coachName, setCoachName] = useState('');
    const [coachPhoto, setCoachPhoto] = useState('');
    const [loaded, setLoaded] = useState(false);

    useEffect(async () => {
        const result = await AsyncStorage.getItem('email');
        const user = await UsersRef.doc(result).get();
        const coachref = user.data().coachref;
        const coach = await UsersRef.doc(coachref).get();
        setCoachName(coach.data().name)
        setCoachPhoto(coach.data().profilephoto)
        setLoaded(true);
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

    if(!loaded){
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0782F9"/>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.name}>{coachName}</Text>
                <Image source={{uri: coachPhoto}} style={styles.profilePhoto}/>
                <TouchableOpacity style={styles.wrapper}>
                    <Text style={styles.wrapperedtext}>Otvoriť chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop:100}} onPress={handleSignOut}><Text>odhlasit</Text></TouchableOpacity>
            </View>
        );
    }
};

export default HomeTrainee

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },

    name:{
        fontSize:30,
        marginTop:30
    },

    profilePhoto:{
        width: 100,
        height: 100,
        borderRadius: 100,
        marginTop: 20
    },

    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },

    wrapper:{
        backgroundColor:'#c4c4c4',
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