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

// domovska obrazovka sportovca
const CalendarInfoTrainee = ({ navigation, route }) => {
    return(
        <View style={{flex:1}}>
            <Text>{route.params.docId}</Text>
        </View>
    )
};

export default CalendarInfoTrainee

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      marginBottom:70
    }
})