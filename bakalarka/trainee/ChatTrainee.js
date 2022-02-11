import { Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, ScrollView, TextInput, KeyboardAvoidingView  } from "react-native";
import React, { useEffect, useState, useRef } from 'react'
import { ChatRef } from "../firebasecfg";
import { UsersRef } from "../firebasecfg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'moment';

const ChatTrainee = ({ navigation }) => {
    const [messages, setMessages] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [coachPhoto, setCoachPhoto] = useState('');
    const [myPhoto, setMyPhoto] = useState('');
    const scrollViewRef = useRef();

    useEffect(async () => {
        const result = await AsyncStorage.getItem('email');
        const coachPhoto = await AsyncStorage.getItem('coachPhoto');
        const myPhoto = await AsyncStorage.getItem('myPhoto');
        const subscribe = ChatRef.orderBy("date", "asc").onSnapshot((QuerySnapshot) => {
            let messagesActual = [];
            QuerySnapshot.forEach((doc) => {
                messagesActual.push(doc.data())
            })
            setMessages(messagesActual);
            setLoaded(true)
            
        })
        setEmail(result)
        setCoachPhoto(coachPhoto)
        setMyPhoto(myPhoto) 

        return () => subscribe();
    }, [])

    function sendMessage(){
       ChatRef.add({
            date: new Date(),
            from: email,
            isPhoto: false,
            message: message
        })
        .then((docRef) => {
            setMessage('');
            
        })
    }

    if(!loaded){
        return( 
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0782F9"/>
            </View>
        )
    }
    return (
        <KeyboardAvoidingView  style={{flex:1, position:"relative"}}>
            <ScrollView style={{height:1000, marginBottom:60}} ref={scrollViewRef} onContentSizeChange={() => {
                if(scrollViewRef !== null){scrollViewRef.current.scrollToEnd({ animated: true })}
            }}>
                
                {
                    messages.map(message => {
                        // sportovec
                        if(message.from === email){
                            return(
                                <View style={{flexDirection:"column"}}>
                                    <View style={{flexDirection:"row-reverse", alignItems:"center", marginLeft:5}}>
                                        <Image source={{uri: myPhoto}} style={styles.profilePhoto}/>
                                        <View style={styles.trainee}>
                                            <Text>{message.message}</Text>
                                        </View>
                                    </View>
                                    <Text style={{marginLeft:"63%", fontSize:10}}>{Moment(new Date(message.date.toDate())).format('DD.MM.YYYY HH:mm')}</Text>
                                </View>
                            )
                        } else {
                            // trener
                            return(
                                <View style={{flexDirection:"column"}}>
                                    <View style={{flexDirection:"row", alignItems:"center", marginLeft:5}}>
                                        <Image source={{uri: coachPhoto}} style={styles.profilePhoto}/>
                                        <View style={styles.trainer}>
                                            <Text>{message.message}</Text>
                                        </View>
                                    </View>
                                    <Text style={{marginLeft:60, fontSize:10}}>{Moment(new Date(message.date.toDate())).format('DD.MM.YYYY HH:mm')}</Text>
                                </View>
                            )
                        }
                    }
                    )
                }
            </ScrollView>
            <TextInput style={styles.input} placeholder="Napíšte správu" onSubmitEditing={sendMessage} onChangeText={newText => setMessage(newText)} value={message} onPressIn={ () => scrollViewRef.current.scrollToEnd({animated: true})}/>
        </KeyboardAvoidingView>
    );
};

export default ChatTrainee

const styles = StyleSheet.create({
    profilePhoto:{
        width: 45,
        height: 45,
        borderRadius: 100,
        marginTop:10
    },

    trainee:{
        maxWidth:"60%",
        backgroundColor:"lightblue",
        padding:15,
        alignSelf : 'flex-end',
        marginRight:5,
        borderRadius:20,
        marginTop:10
    },

    trainer:{
        maxWidth:"60%",
        backgroundColor:"lightblue",
        padding:15,
        alignSelf : 'flex-start',
        marginLeft:5,
        borderRadius:20,
        marginTop:10
    },

    input:{
        position:"absolute",
        bottom:0,
        width:"100%",
        backgroundColor:"white",
        height:50,
        borderTopWidth:1,
        paddingLeft:15
    },
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
})