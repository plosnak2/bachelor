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
const CalendarTrainee = ({ navigation }) => {
    const[trainings, setTrainings] = useState({})
    const[markedEvents, setMarkedEvents] = useState({})
    const[year, setYear] = useState(Moment(new Date()).format('YYYY'))
    const[month, setMonth] = useState(Moment(new Date()).format('MM'))

    useEffect(() => {
        const subscribe = CalendarRef.orderBy("date", "asc").onSnapshot((QuerySnapshot) => {
            let tempMarkedEvents = {}
            let trainings = {}
            QuerySnapshot.forEach((doc) => {
                if(Moment(new Date(doc.data().date.toDate())).format('YYYY-MM-DD') in tempMarkedEvents === false){
                    let color;
                    if(doc.data().training in trainings){
                        color = trainings[doc.data().training]
                    } else {
                        color = generateColor()
                        trainings[doc.data().training] = color
                    }
                    
                    tempMarkedEvents[Moment(new Date(doc.data().date.toDate())).format('YYYY-MM-DD')]= {
                        
                        
                        
                        dots: [{key: doc.id, color: trainings[doc.data().training],selectedDotColor: trainings[doc.data().training], training: doc.data().training, length: doc.data().length}]
                    }
                } else {
                    let color;
                    if(doc.data().training in trainings){
                        color = trainings[doc.data().training]
                    } else {
                        color = generateColor()
                        trainings[doc.data().training] = color
                    }

                    let obj = {
                        key: doc.id,
                        color: trainings[doc.data().training],
                        selectedDotColor: trainings[doc.data().training],
                        training: doc.data().training,
                        length: doc.data().length
                    }
                    tempMarkedEvents[Moment(new Date(doc.data().date.toDate())).format('YYYY-MM-DD')].dots.push(obj)
                }
                
                
            })
            setMarkedEvents(tempMarkedEvents)
            setTrainings(trainings)
        })

        const generateColor = () => {
            const randomColor = Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, '0');
            return `#${randomColor}`;
          };

        return () => subscribe();
      }, [])
    
    return(
        <View style={{flex:1}}>
            <ScrollView style={styles.container}>
                
                <Calendar 
                markingType={'multi-dot'}
                markedDates={markedEvents}
                onDayPress={day => {
                    console.log('selected day', markedEvents[day.dateString]);
                }}
                onMonthChange={month => {
                    setYear(month.year)
                    setMonth(month.month)
                }}
                />
                <View style={{padding:"5%", flexDirection:"row", paddingBottom:50}}>
                    <View style={{width:"45%", backgroundColor:"#c4c4c4", flexDirection:"column", borderRadius:10, alignItems:"center"}}>
                        {(() => {
                            if(month == 1){
                                return(<Text style={{fontSize:20, fontWeight:"bold", textAlign:"center", width:"90%"}}>Tréningy v Januári</Text>)
                            } else if(month == 2){
                                return(<Text style={{fontSize:20, fontWeight:"bold", textAlign:"center", width:"90%"}}>Tréningy vo Februári</Text>)
                            } else if(month == 3){
                                return(<Text style={{fontSize:20, fontWeight:"bold", textAlign:"center", width:"90%"}}>Tréningy v Marci</Text>)
                            } else if(month == 4){
                                return(<Text style={{fontSize:20, fontWeight:"bold", textAlign:"center", width:"90%"}}>Tréningy v Apríli</Text>)
                            } else if(month == 5){
                                return(<Text style={{fontSize:20, fontWeight:"bold", textAlign:"center", width:"90%"}}>Tréningy v Máji</Text>)
                            } else if(month == 6){
                                return(<Text style={{fontSize:20, fontWeight:"bold", textAlign:"center", width:"90%"}}>Tréningy v Júni</Text>)
                            } else if(month == 7){
                                return(<Text style={{fontSize:20, fontWeight:"bold", textAlign:"center", width:"90%"}}>Tréningy v Júli</Text>)
                            } else if(month == 8){
                                return(<Text style={{fontSize:20, fontWeight:"bold", textAlign:"center", width:"90%"}}>Tréningy v Auguste</Text>)
                            } else if(month == 9){
                                return(<Text style={{fontSize:20, fontWeight:"bold", textAlign:"center", width:"90%"}}>Tréningy v Septembri</Text>)
                            } else if(month == 10){
                                return(<Text style={{fontSize:20, fontWeight:"bold", textAlign:"center", width:"90%"}}>Tréningy v Októbri</Text>)
                            } else if(month == 11){
                                return(<Text style={{fontSize:20, fontWeight:"bold", textAlign:"center", width:"90%"}}>Tréningy v Novembri</Text>)
                            } else if(month == 12){
                                return(<Text style={{fontSize:20, fontWeight:"bold", textAlign:"center", width:"90%"}}>Tréningy v Decembri</Text>)
                            }
                        })()}
                        {
                            Object.entries(markedEvents).map(([key, value]) => {
                                if(Moment(key).format('YYYY') == year && Moment(key).format('MM') == month)
                                {   
                                    return(
                                        <View style={{width:"90%"}}>
                                        {
                                            value.dots.map(exercise => {
                                                return(
                                                    <View style={{backgroundColor: "white", marginTop:10, marginBottom:10, alignItems:"center", borderRadius:10}}>
                                                        <View style={{flexDirection:"row", alignItems:"center"}}>
                                                            <Text style={{fontWeight:"bold"}}>{Moment(key).format('DD.MM.YYYY')}</Text>
                                                            <View style={{width:15, height:15, borderRadius:10, backgroundColor:exercise.color, marginLeft:10}}></View>
                                                        </View> 
                                                        <Text style={{marginTop:5}}>{exercise.training}</Text>
                                                        <Text>Dĺžka: {exercise.length} min</Text>
                                                    </View>
                                                )
                                            })
                                        }
                                        </View>
                                    )
                                } else {
                                    console.log("neni")
                                }
                            })
                        }
                </View>
                <View style={{width:"45%", backgroundColor:"#c4c4c4", flexDirection:"column", marginLeft:"10%", borderRadius:10, alignItems:"center"}}>
                        <Text style={{fontSize:20, fontWeight:"bold"}}>Legenda</Text>
                        {
                            Object.entries(trainings).map(([key, value]) => {
                                return(
                                    <View style={{flexDirection:"row", marginTop:20, alignItems:"center", width:"90%", alignSelf:"center"}}>
                                        <View style={{width:15, height:15, borderRadius:10, backgroundColor:value}}></View>
                                        <Text style={{fontWeight:"bold", marginLeft:15}}>{key}</Text>
                                    </View>
                                )
                            })
                        }
                </View>
            </View>
            </ScrollView>
            <NavbarTrainee />
            <TouchableOpacity style={styles.navbar} onPress={() =>
                console.log("pressed")
              }>
                <View >
                    <Ionicons name="add-circle" size={70} color="#73fae1" />
                </View>
            </TouchableOpacity>
        </View>
    )
};

export default CalendarTrainee

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      marginBottom:70
    },
    navbar: {
        position: 'absolute',
        bottom: 70,
        right: 0,
        alignSelf: 'stretch',
        flex: 1
    }
})