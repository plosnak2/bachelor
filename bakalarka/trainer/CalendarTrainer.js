import { Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, ScrollView } from "react-native";
import { auth } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { UsersRef } from "../firebasecfg";
import NavbarTrainer from "./Navbar";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { CalendarRef } from "../firebasecfg";
import Moment from 'moment';
import { Ionicons } from '@expo/vector-icons';

// domovska obrazovka sportovca
const CalendarTrainer = ({ navigation }) => {
    const[trainings, setTrainings] = useState({})
    const[markedEvents, setMarkedEvents] = useState({})
    const[year, setYear] = useState(Moment(new Date()).format('YYYY'))
    const[month, setMonth] = useState(Moment(new Date()).format('MM'))
    const [showView, setShowView] = useState(false)
    const [date, setDate] = useState()

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
                        
                        
                        
                        dots: [{key: doc.id, color: trainings[doc.data().training],selectedDotColor: trainings[doc.data().training], training: doc.data().training, length: doc.data().length, description: doc.data().description}]
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
                        length: doc.data().length,
                        description: doc.data().description
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

      function dayClicked(day){
          if(markedEvents[day.dateString] === undefined){
                ;
          } else if(markedEvents[day.dateString].dots.length === 1){
                navigation.navigate('CalendarInfoTrainer', {docId: markedEvents[day.dateString].dots[0].key, title:Moment(day.dateString).format('DD.MM.YYYY')})
          } else {
              setDate(day.dateString)
              setShowView(true)
          }
        
      }
    
    return(
        <View style={{flex:1}}>
            {showView && 
                <ScrollView style={styles.spinnerView}>
                    <View style={{alignItems:"center"}}>
                    <Text style={{marginTop:15, fontWeight:"bold", fontSize:20, color:"white"}}>{Moment(date).format('DD.MM.YYYY')}</Text>
                    <TouchableOpacity style={styles.icon} onPress={() => setShowView(false)}> 
                        <Ionicons name="close-circle-outline" size={40} color="white"/>
                    </TouchableOpacity>
                    {
                        markedEvents[date].dots.map(exercise => {
                            return(
                                
                                <TouchableOpacity onPress={() => {navigation.navigate('CalendarInfoTrainer', {docId: exercise.key, title:Moment(date).format('DD.MM.YYYY')})}} style={{backgroundColor: "white", marginTop:10, marginBottom:10, alignItems:"center", borderRadius:10, width:"80%", padding:5}}>
                                    <View style={{flexDirection:"row", alignItems:"center"}}>
                                        <Text style={{fontWeight:"bold", color:"black"}}>{Moment(date).format('DD.MM.YYYY')}</Text>
                                        <View style={{width:15, height:15, borderRadius:10, backgroundColor:exercise.color, marginLeft:10}}></View>
                                    </View> 
                                    <Text style={{marginTop:5}}>{exercise.training}</Text>
                                    <Text>Dĺžka: {exercise.length} min</Text>
                                    <Text style={{marginTop:5, marginBottom:5, fontWeight:"bold", textAlign:"center"}} numberOfLines={2}>{exercise.description}</Text>
                                </TouchableOpacity>
                                
                            )
                        })
                    }
                    </View>
                </ScrollView>
            }
            <ScrollView style={styles.container}>
                
                <Calendar 
                markingType={'multi-dot'}
                markedDates={markedEvents}
                onDayPress={day => {
                    dayClicked(day);
                }}
                onMonthChange={month => {
                    setYear(month.year)
                    setMonth(month.month)
                }}
                />
                <View style={{padding:"5%", flexDirection:"row", paddingBottom:50}}>
                    <View style={{width:"100%", backgroundColor:"#00a9e0", flexDirection:"column", borderRadius:10, alignItems:"center"}}>
                        {(() => {
                            if(month == 1){
                                return(<Text style={{fontSize:20, fontWeight:"bold", textAlign:"center", width:"90%", color:"white"}}>Tréningy v Januári</Text>)
                            } else if(month == 2){
                                return(<Text style={{fontSize:20, fontWeight:"bold", textAlign:"center", width:"90%", color:"white"}}>Tréningy vo Februári</Text>)
                            } else if(month == 3){
                                return(<Text style={{fontSize:20, fontWeight:"bold", textAlign:"center", width:"90%", color:"white"}}>Tréningy v Marci</Text>)
                            } else if(month == 4){
                                return(<Text style={{fontSize:20, fontWeight:"bold", textAlign:"center", width:"90%", color:"white"}}>Tréningy v Apríli</Text>)
                            } else if(month == 5){
                                return(<Text style={{fontSize:20, fontWeight:"bold", textAlign:"center", width:"90%", color:"white"}}>Tréningy v Máji</Text>)
                            } else if(month == 6){
                                return(<Text style={{fontSize:20, fontWeight:"bold", textAlign:"center", width:"90%", color:"white"}}>Tréningy v Júni</Text>)
                            } else if(month == 7){
                                return(<Text style={{fontSize:20, fontWeight:"bold", textAlign:"center", width:"90%", color:"white"}}>Tréningy v Júli</Text>)
                            } else if(month == 8){
                                return(<Text style={{fontSize:20, fontWeight:"bold", textAlign:"center", width:"90%", color:"white"}}>Tréningy v Auguste</Text>)
                            } else if(month == 9){
                                return(<Text style={{fontSize:20, fontWeight:"bold", textAlign:"center", width:"90%", color:"white"}}>Tréningy v Septembri</Text>)
                            } else if(month == 10){
                                return(<Text style={{fontSize:20, fontWeight:"bold", textAlign:"center", width:"90%", color:"white"}}>Tréningy v Októbri</Text>)
                            } else if(month == 11){
                                return(<Text style={{fontSize:20, fontWeight:"bold", textAlign:"center", width:"90%", color:"white"}}>Tréningy v Novembri</Text>)
                            } else if(month == 12){
                                return(<Text style={{fontSize:20, fontWeight:"bold", textAlign:"center", width:"90%", color:"white"}}>Tréningy v Decembri</Text>)
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
                                                    <TouchableOpacity onPress={() => {navigation.navigate('CalendarInfoTrainer', {docId: exercise.key, title:Moment(key).format('DD.MM.YYYY')})}} style={{backgroundColor: "white", marginTop:10, marginBottom:10, alignItems:"center", borderRadius:10}}>
                                                        <View style={{flexDirection:"row", alignItems:"center"}}>
                                                            <Text style={{fontWeight:"bold"}}>{Moment(key).format('DD.MM.YYYY')}</Text>
                                                            <View style={{width:15, height:15, borderRadius:10, backgroundColor:exercise.color, marginLeft:10}}></View>
                                                        </View> 
                                                        <Text style={{marginTop:5}}>{exercise.training}</Text>
                                                        <Text>Dĺžka: {exercise.length} min</Text>
                                                        <Text style={{marginTop:5, marginBottom:5, fontWeight:"bold", textAlign:"center"}} numberOfLines={2}>{exercise.description}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                        </View>
                                    )
                                } else {
                                    
                                }
                            })
                        }
                </View>
                
            </View>
            </ScrollView>
            <NavbarTrainer />
            
        </View>
    )
};

export default CalendarTrainer

const styles = StyleSheet.create({
    icon:{
        position: "absolute",
        top:5,
        right:10
    },
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
    },
    spinnerView: {
        position: "absolute",
        zIndex: 1,
        left: 0,
        top: 0,
        height:"100%",
        backgroundColor: "#00a9e0",
        width:"100%",
        paddingBottom:50,
        
    },
})