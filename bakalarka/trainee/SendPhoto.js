import { ScrollView, Text, TouchableOpacity, View, StyleSheet, Image, TextInput, Keyboard, KeyboardAvoidingView, Alert, Dimensions } from "react-native";
import React, { useEffect, useState } from 'react'
import { storage } from "../firebasecfg";
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import { PhotosRef } from "../firebasecfg";
import { ChatRef } from "../firebasecfg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OverlaySpinner } from "../shared/OverlaySpinner";

const SendPhoto = ({ navigation, route }) => {
    const [imageUri, setImageUri] = useState(route.params.imageUri)
    const [name, setName] = useState('')
    const [coachName, setCoachName] = useState(route.params.coachName)
    const [showSpinner, setShowSpinner] = useState(false);

    // https://stackoverflow.com/questions/60753537/how-to-upload-image-to-firebase-in-expo-react-native
    const getPictureBlob = (uri) => {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
        });
    };

    // https://stackoverflow.com/questions/60753537/how-to-upload-image-to-firebase-in-expo-react-native
    const uploadImageToBucket = async () => {
        setShowSpinner(true)
        if(name === ''){
            Alert.alert("Chyba", "Zadajte meno cviku")
        } else {
            let blob;
            try {
                const manipResult = await manipulateAsync(
                    imageUri,
                    [
                        
                    ],
                    { compress: 0.7 }
                );
                blob = await getPictureBlob(manipResult.uri);
                const ref = await storage.ref().child(manipResult.uri.split("/").pop());
                const snapshot = await ref.put(blob);
                const imageUrl = await snapshot.ref.getDownloadURL();
                const email = await AsyncStorage.getItem('email');
                PhotosRef.add({
                    category: name,
                    comment: "",
                    commented: false,
                    date: new Date(),
                    edited: [],
                    photourl: imageUrl
                })
                ChatRef.add({
                    date: new Date(),
                    from: email,
                    isPhoto: true,
                    message: imageUrl
                })
            } catch (e) {
                alert("Nepodarilo sa odoslať fotku");
                setShowSpinner(false)
            } finally {
                blob.close();
                navigation.navigate('ChatTrainee',{name: coachName})
            }
        }
    };

    return(
    <ScrollView style={{flex:1}}>
        {showSpinner && <OverlaySpinner />}
        <View style={styles.image}>
            {imageUri && <Image source={{ uri: imageUri }} style={{ width: "100%", height: "100%", resizeMode:"contain" }} />}
        </View>
        <View style={{borderBottomWidth:1, marginTop:20}}></View>
        <View style={{borderBottomWidth:1, marginTop:20,paddingBottom:20, justifyContent:"center", alignItems:"center"}}>
            <Text style={{fontSize:20, fontWeight:"bold",paddingBottom:10}}>Zadajte názov cviku</Text>
            <TextInput style={styles.input} placeholder="Zadajte názov cviku" onChangeText={newText => setName(newText)} value={name}/>
        </View>
        <TouchableOpacity style={styles.button} onPress={uploadImageToBucket}>
            <Text style={{fontWeight:"bold", fontSize:20}}>Odoslať fotku</Text>
        </TouchableOpacity>
    </ScrollView>
    )
};

export default SendPhoto

const styles = StyleSheet.create({
    input:{
        borderWidth:1,
        width:"80%",
        backgroundColor:"white",
        height:50,
        paddingLeft:15
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        marginBottom:70,
    },
    image:{
        alignItems:"center",
        marginTop:15,
        width:"80%",
        marginLeft:"10%",
        height: Dimensions.get('window').height - (Dimensions.get('window').height/4)
    },
    button:{
        width:"80%",
        alignItems:"center",
        marginLeft:"10%",
        backgroundColor: "#c4c4c4",
        marginTop:20,
        height:50,
        justifyContent:"center",
        borderRadius:100,
        marginBottom:50
    }
})