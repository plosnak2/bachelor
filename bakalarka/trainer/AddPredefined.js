import { ScrollView, Text, TouchableOpacity, View, StyleSheet, Image, TextInput, Keyboard, KeyboardAvoidingView, Alert } from "react-native";
import React, { useEffect, useState } from 'react'
import NavbarTrainer from "./Navbar";
import { PredefinedRef } from "../firebasecfg";


const AddPredefined = ({ navigation, route }) => {
    const [name, setName] = useState('')
    const [message, setMessage] = useState(route.params.message)

    function saveMessage(){
        if(name === '' || message === ''){
            Alert.alert("Chyba", "Musia byť vyplnené obe políčka")
        } else {
            PredefinedRef.add({
                message: message,
                name: name,
                usage: 0
            })
            .then((docRef) => {
                navigation.replace('PredefinedTrainer')
            })
        }
    }

    return(
    <View style={{flex:1}}>
    <TouchableOpacity style={{flex:1, backgroundColor:"white"}} onPress={() => Keyboard.dismiss()}>
        <View style={{alignItems:"center", marginTop:20}}>
        <Text style={{fontWeight:"bold", fontSize:20}}>Zadajte názov:</Text>
        <TextInput  multiline style={styles.input} onChangeText={newText => setName(newText)} value={name}/>
        <Text style={{fontWeight:"bold", fontSize:20, marginTop:5}}>Zadajte správu:</Text>
        <TextInput  multiline style={styles.input} onChangeText={newText => setMessage(newText)} value={message}/>
        <TouchableOpacity style={styles.button2} onPress={() => saveMessage()}>
            <Text style={{fontSize:20, fontWeight:"500", color:"white"}}>Uložiť</Text>
        </TouchableOpacity>
        </View>
    </TouchableOpacity>
    
    </View>
    )
};

export default AddPredefined

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        marginBottom:70,
    },
    button2:{
        width:"80%",
        backgroundColor:"#00a9e0",
        height:50,
        marginTop:30,
        borderRadius:50,
        justifyContent:"center",
        alignItems:"center"
    },
    input:{
        width:"80%",
        borderWidth:1,
        padding:10,
        marginTop:10,
        borderRadius:10
    },  
})