import { Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, ScrollView, Button, LogBox, TextInput, Alert } from "react-native";
import { auth } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { UsersRef } from "../firebasecfg";
import NavbarTrainee from "./Navbar";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { CalendarRef } from "../firebasecfg";
import Moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import {ExercisesRef} from '../firebasecfg'
import firebase from "firebase";
import "firebase/firestore";
import NumericInput from 'react-native-numeric-input'

const CalendarAddTrainee = ({ navigation, route }) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [min, setMin] = useState(0)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
            const doc = await ExercisesRef.doc("76w1WIQiYx7E59AiUAQH").get();
            let sorted = await doc.data().trainings.sort();
            let trainings_data=[];
            trainings_data.push({label: "Pridať nový", value: "Pridať nový"})
            await sorted.map(item => {
                trainings_data.push({label: item, value: item})
            })
            setItems(trainings_data)  
        })
        navigation.addListener('beforeRemove', (e) => {
            // Prevent default behavior of leaving the screen
            e.preventDefault();
    
            // Prompt the user before leaving the screen
            Alert.alert(
              'Vymazať zmeny?',
              'Prajete si vážne opustiť túto obrazovku?',
              [
                { text: "Zostať", style: 'cancel', onPress: () => {} },
                {
                  text: 'Opustiť',
                  style: 'destructive',
                  // If the user confirmed, then we dispatch the action we blocked earlier
                  // This will continue the action that had triggered the removal of the screen
                  onPress: () => navigation.dispatch(e.data.action),
                },
              ]
            );
          })
      }, [])

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    function saveTraining(){
        if(value === "Pridať nový" && name === ""){
            Alert.alert("Chyba", "Zadajte názov tréningu")
        } else if(value === null){
            Alert.alert("Chyba", "Zadajte názov tréningu")
        } else {
            if(message === ''){
                Alert.alert("Chyba", "Vyplňte pocity z tréningu")
            } else if(min === 0){
                Alert.alert("Chyba", "Vyplňte dĺžku trvania tréningu")
            } else {
                let training;
                if(value === "Pridať nový"){
                    training = name;
                    ExercisesRef.doc("76w1WIQiYx7E59AiUAQH").update({
                        trainings: firebase.firestore.FieldValue.arrayUnion(name)
                    })
                } else {
                    training = value
                }
                CalendarRef.add({
                    date: date,
                    description: message,
                    length: min,
                    training: training
                })
                .then(() => {
                    navigation.navigate('CalendarTrainee')
                })
            }
        }
    }


    return(
        <View style={{flex:1}}>
            <ScrollView style={styles.container}>
                
                <TouchableOpacity style={{width:"60%", backgroundColor:"#00a9e0", height:80, alignSelf:"center", marginTop:30, justifyContent:"center", alignItems:"center", borderRadius:50}} onPress={showDatepicker}>
                    <Text style={{fontWeight:"bold", fontSize:15, color:"white"}}>Vyberte dátum tréningu</Text>
                    <Text style={{marginTop:5, color:"white"}}>{Moment(date).format('DD.MM.YYYY')}</Text>
                </TouchableOpacity>

                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    />
                )}
                
                <View style={{borderBottomWidth:1, marginTop:25, borderBottomColor:"#00a9e0"}}></View>
                
                <Text style={{fontSize:18, fontWeight:"bold", textAlign:"center", marginTop:30}}>Zadajte dĺžku trvania tréningu v min</Text>
                <View style={{alignItems:"center", marginTop:10}}>
                    <NumericInput onChange={value => setMin(value)} value={min} totalWidth={120} rounded rightButtonBackgroundColor='#00a9e0'
                    leftButtonBackgroundColor='#00a9e0' minValue={0}/>
                </View>

                <View style={{borderBottomWidth:1, marginTop:25, borderBottomColor:"#00a9e0"}}></View>
                <Text style={{fontSize:18, fontWeight:"bold", textAlign:"center", marginTop:30}}>Zadajte typ tréningu</Text>
                <DropDownPicker
                    style={{width:"80%", alignSelf:"center", position:"relative", zIndex:999, marginTop:15}}
                    searchable={true}
                    searchPlaceholder="Typ tréningu"
                    placeholder="Typ tréningu"
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    listMode="MODAL"
                />
                {
                    value==="Pridať nový" && 
                    <View style={{ marginTop:20, justifyContent:"center", alignItems:"center"}}>
                        <Text style={{fontSize:18, fontWeight:"bold",paddingBottom:10}}>Zadajte názov nového tréningu</Text>
                        <TextInput style={styles.input} placeholder="Zadajte názov nového cviku" onChangeText={newText => setName(newText)} value={name}/>
                    </View>
                }
                <View style={{borderBottomWidth:1, marginTop:25, borderBottomColor:"#00a9e0"}}></View>
                <Text style={{fontWeight:"bold", fontSize:18, marginTop:25, textAlign:"center"}}>Aké máte pocity po tréningu:</Text>
                <TextInput  multiline style={styles.input2} onChangeText={newText => setMessage(newText)} value={message}/>

                <TouchableOpacity style={styles.button2} onPress={() => saveTraining()}>
                    <Text style={{fontSize:20, fontWeight:"500", color:"white"}}>Uložiť</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
    
    
};

export default CalendarAddTrainee

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
    input:{
        borderWidth:1,
        width:"80%",
        backgroundColor:"white",
        height:50,
        paddingLeft:15
    },
    input2:{
        width:"80%",
        borderWidth:1,
        padding:10,
        marginTop:10,
        alignSelf:"center",
        borderRadius:10
    },
    button2:{
        width:"80%",
        backgroundColor:"#00a9e0",
        height:50,
        marginTop:30,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"center",
        marginBottom:50
    },
})