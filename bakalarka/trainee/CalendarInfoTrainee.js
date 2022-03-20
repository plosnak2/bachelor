import { Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, ScrollView } from "react-native";
import { auth } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { UsersRef } from "../firebasecfg";
import NavbarTrainee from "./Navbar";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { CalendarRef } from "../firebasecfg";
import Moment from 'moment';
import { Ionicons } from '@expo/vector-icons';

const CalendarInfoTrainee = ({ navigation, route }) => {
    const[training, setTraining] = useState()
    const[loading, setLoading] = useState(true)
    useEffect(async () => {
        const doc = await CalendarRef.doc(route.params.docId).get();
        setTraining(doc.data())
        setLoading(false)
    }, [])

    if(loading){
        return(
            <View style={[styles.container2, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0782F9"/>
            </View>
        )
    } else {
        return(
            <View style={{flex:1}}>
                <ScrollView style={styles.container}>
                    <View style={{flexDirection:"row",marginLeft:30, marginTop:30,}}>
                        <Text style={{ fontSize:20, fontWeight:"bold"}}>Druh tréningu: </Text>
                        <Text style={{fontSize:20}}>{training.training}</Text>
                    </View>
                    <View style={{flexDirection:"row",marginLeft:30, marginTop:15}}>
                        <Text style={{fontSize:20, fontWeight:"bold"}}>Trvanie tréningu: </Text>
                        <Text style={{fontSize:20}}>{training.length} min</Text>
                    </View>
                    <View style={{borderBottomWidth:1, marginTop:15}}></View>
                    <Text style={{fontSize:20, fontWeight:"bold", marginTop:15, marginLeft:30}}>Popis:</Text>
                    <View style={{marginTop:15, marginLeft:30, marginRight:30, backgroundColor:"#c4c4c4", padding:20, borderRadius:20}}>
                        <Text>{training.description}</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
    
};

export default CalendarInfoTrainee

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    container2: {
        flex: 1,
        backgroundColor: "white"
      },
})