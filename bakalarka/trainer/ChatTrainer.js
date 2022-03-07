import { Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, ScrollView, TextInput, KeyboardAvoidingView  } from "react-native";
import React, { useEffect, useState, useRef } from 'react'
import { ChatRef } from "../firebasecfg";
import { UsersRef } from "../firebasecfg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'moment';
import { Ionicons } from '@expo/vector-icons';

const ChatTrainer = ({ navigation, route }) => {
    const [messages, setMessages] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState(route.params.message)
    const [traineePhoto, setTraineePhoto] = useState('');
    const [myPhoto, setMyPhoto] = useState('');
    const scrollViewRef = useRef();
    const [today,setToday] = useState(Moment(new Date()).format('YYYY-MM-DD'))

    useEffect(async () => {
        setMessage(route.params.message)
        const result = await AsyncStorage.getItem('email');
        const traineePhoto = await AsyncStorage.getItem('traineePhoto');
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
        setTraineePhoto(traineePhoto)
        setMyPhoto(myPhoto)

        return () => {
            subscribe();
        }
    }, [route])

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
            <ScrollView style={{height:1000}} ref={scrollViewRef} onContentSizeChange={() => {
                if(scrollViewRef !== null){scrollViewRef.current.scrollToEnd({ animated: true })}
            }}>
                
                {
                    messages.map(message => {
                        // trener
                        if(message.from === email){
                            if(message.isPhoto === true){
                                return(
                                    <View style={{flexDirection:"column"}}>
                                        <View style={{flexDirection:"row-reverse", alignItems:"center", marginLeft:5}}>
                                            <Image source={{uri: myPhoto}} style={styles.profilePhoto}/>
                                            <View style={styles.traineePhoto}>
                                                <Image source={{ uri: message.message }} style={{ width: 200, height: 300, resizeMode:"contain" }} />
                                            </View>
                                        </View>
                                        {(() => {
                                            if(today === Moment(message.date.toDate()).format('YYYY-MM-DD')){
                                                return(
                                                    <Text style={{marginLeft:"77%", fontSize:10}}>{Moment(new Date(message.date.toDate())).format('HH:mm')}</Text>
                                                )
                                            } else if(Moment(new Date() - 86400000).format('YYYY-MM-DD') === Moment(message.date.toDate()).format('YYYY-MM-DD')){
                                                return(
                                                    <Text style={{marginLeft:"69%", fontSize:10}}>Včera {Moment(new Date(message.date.toDate())).format('HH:mm')}</Text>
                                                )
                                            }else {
                                                return(
                                                    <Text style={{marginLeft:"63%", fontSize:10}}>{Moment(new Date(message.date.toDate())).format('DD.MM.YYYY HH:mm')}</Text>
                                                )
                                            }
                                        })()}
                                    </View>
                                )
                            }
                            return(
                                <View style={{flexDirection:"column"}}>
                                    <View style={{flexDirection:"row-reverse", alignItems:"center", marginLeft:5}}>
                                        <Image source={{uri: myPhoto}} style={styles.profilePhoto}/>
                                        <View style={styles.trainee}>
                                            <Text>{message.message}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => navigation.navigate('AddPredefined', {message: message.message})}>
                                            <Ionicons name='pin' size={35}/>
                                        </TouchableOpacity>
                                    </View>
                                    {(() => {
                                        if(today === Moment(message.date.toDate()).format('YYYY-MM-DD')){
                                            return(
                                                <Text style={{marginLeft:"77%", fontSize:10}}>{Moment(new Date(message.date.toDate())).format('HH:mm')}</Text>
                                            )
                                        } else if(Moment(new Date() - 86400000).format('YYYY-MM-DD') === Moment(message.date.toDate()).format('YYYY-MM-DD')){
                                            return(
                                                <Text style={{marginLeft:"69%", fontSize:10}}>Včera {Moment(new Date(message.date.toDate())).format('HH:mm')}</Text>
                                            )
                                        }else {
                                            return(
                                                <Text style={{marginLeft:"63%", fontSize:10}}>{Moment(new Date(message.date.toDate())).format('DD.MM.YYYY HH:mm')}</Text>
                                            )
                                        }
                                    })()}
                                </View>
                            )
                        } else {
                            if(message.isPhoto === true){
                                return(
                                    <View style={{flexDirection:"column"}}>
                                        <View style={{flexDirection:"row", alignItems:"center", marginLeft:5}}>
                                            <Image source={{uri: traineePhoto}} style={styles.profilePhoto}/>
                                            <View style={styles.trainerPhoto}>
                                                <Text style={{textAlign:"center", paddingBottom:10, fontWeight:"bold"}}>Kategória: {message.category}</Text>
                                                <TouchableOpacity onPress={() => navigation.navigate('PhotoSettings', {photo: message.photo})}>
                                                <Image source={{ uri: message.message }} style={{ width: 200, height: 300, resizeMode:"contain" }} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        {(() => {
                                            if(today === Moment(message.date.toDate()).format('YYYY-MM-DD')){
                                                return(
                                                    <Text style={{marginLeft:60, fontSize:10}}>{Moment(new Date(message.date.toDate())).format('HH:mm')}</Text>
                                                )
                                            } else if(Moment(new Date() - 86400000).format('YYYY-MM-DD') === Moment(message.date.toDate()).format('YYYY-MM-DD')){
                                                return(
                                                    <Text style={{marginLeft:60, fontSize:10}}>Včera {Moment(new Date(message.date.toDate())).format('HH:mm')}</Text>
                                                )
                                            }else {
                                                return(
                                                    <Text style={{marginLeft:60, fontSize:10}}>{Moment(new Date(message.date.toDate())).format('DD.MM.YYYY HH:mm')}</Text>
                                                )
                                            }
                                        })()}
                                    </View>
                                )
                            } else {
                                return(
                                    <View style={{flexDirection:"column"}}>
                                        <View style={{flexDirection:"row", alignItems:"center", marginLeft:5}}>
                                            <Image source={{uri: traineePhoto}} style={styles.profilePhoto}/>
                                            <View style={styles.trainer}>
                                                <Text>{message.message}</Text>
                                            </View>
                                        </View>
                                        {(() => {
                                            if(today === Moment(message.date.toDate()).format('YYYY-MM-DD')){
                                                return(
                                                    <Text style={{marginLeft:60, fontSize:10}}>{Moment(new Date(message.date.toDate())).format('HH:mm')}</Text>
                                                )
                                            } else if(Moment(new Date() - 86400000).format('YYYY-MM-DD') === Moment(message.date.toDate()).format('YYYY-MM-DD')){
                                                return(
                                                    <Text style={{marginLeft:60, fontSize:10}}>Včera {Moment(new Date(message.date.toDate())).format('HH:mm')}</Text>
                                                )
                                            }else {
                                                return(
                                                    <Text style={{marginLeft:60, fontSize:10}}>{Moment(new Date(message.date.toDate())).format('DD.MM.YYYY HH:mm')}</Text>
                                                )
                                            }
                                        })()}
                                    </View>
                                )
                            } 
                        }
                    }
                    )
                }
            </ScrollView>
            <View style={styles.panel}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PredefinedTrainer')}>
                    <Text style={{}}>Uložené odpovede</Text>
                </TouchableOpacity>
                
            </View>
            <View>
                <TextInput style={styles.input} placeholder="Napíšte správu" onPressIn={ () => scrollViewRef.current.scrollToEnd({animated: true})} onChangeText={newText => setMessage(newText)} value={message} multiline/>
                <TouchableOpacity style={{position:"absolute", bottom:10, right:15}} onPress={sendMessage}>
                    <Ionicons name='send' size={30} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ChatTrainer

const styles = StyleSheet.create({
    /*button2:{
        width:"30%",
        backgroundColor:"white",
        height:30,
        marginLeft: "10%",
        borderRadius:100,
        alignItems:"center",
        justifyContent:"center"
    },*/

    button:{
        width:"40%",
        backgroundColor:"white",
        height:30,
        marginLeft: "30%",
        borderRadius:100,
        alignItems:"center",
        justifyContent:"center"
    },

    panel:{
        width:"100%",
        height:40,
        backgroundColor:"#c4c4c4",
        borderTopWidth:1,
        flexDirection:"row",
        marginBottom:50,
        alignItems:"center"
    },

    profilePhoto:{
        width: 45,
        height: 45,
        borderRadius: 100,
        marginTop:10,
        alignSelf:"flex-start"
    },

    traineePhoto:{
        maxWidth:"60%",
        backgroundColor:"lightblue",
        padding:10,
        alignSelf : 'flex-end',
        marginRight:5,
        borderRadius:20,
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

    trainerPhoto:{
        maxWidth:"60%",
        backgroundColor:"lightblue",
        padding:10,
        alignSelf : 'flex-start',
        marginLeft:5,
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
        paddingLeft:15,
        paddingRight:50
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