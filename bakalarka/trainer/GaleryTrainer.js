import { Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, ScrollView, TextInput } from "react-native";
import { auth } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { UsersRef } from "../firebasecfg";
import NavbarTrainee from "./Navbar";
import { PhotosRef } from "../firebasecfg";
import { Ionicons } from '@expo/vector-icons';
import { ExercisesRef } from "../firebasecfg";
import firebase from "firebase";
import "firebase/firestore";
import { OverlaySpinner } from "../shared/OverlaySpinner";


const GaleryTrainer = ({ navigation }) => {
    const [photos, setPhotos] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [categories, setCategories] = useState({})
    const [showView, setShowView] = useState(false)
    const [oldName, setOldName] = useState('')
    const [newName, setNewName] = useState('')
    const [showSpinner, setShowSpinner] = useState(false);
    const [catIds, setCatIds] = useState({})

    useEffect(async () => {
        const subscribe = PhotosRef.orderBy("date", "desc").onSnapshot((QuerySnapshot) => {
            let photosActual = [];
            let categoriesActual = {};
            let ids = {}
            QuerySnapshot.forEach((doc) => {
                let category = doc.data().category
                if(category in categoriesActual === false){
                    categoriesActual[category] = [doc.data().photourl]
                    ids[category] = [doc.id]
                } else {
                    categoriesActual[category].push(doc.data().photourl)
                    ids[category].push(doc.id)
                }
                photosActual.push(doc.data())
                
            })
            setPhotos(photosActual);
            setCategories(categoriesActual)
            setCatIds(ids)
            setLoaded(true)
            
        })

        return () => subscribe();
    }, [])

    async function save(){
        setShowView(false)
        setShowSpinner(true)
        const snapshot = await PhotosRef.where('category', '==', oldName).get();
        snapshot.forEach(doc => {
            PhotosRef.doc(doc.id).update({category: newName})
        });
        const exercises = await ExercisesRef.doc("LhrucAolLVnUuxSeN6y2").get();
        const arr = await exercises.data().exercises
        if(arr.includes(newName)){
            console.log("obsahuje")
        } else {
            ExercisesRef.doc("LhrucAolLVnUuxSeN6y2").update({
                exercises: firebase.firestore.FieldValue.arrayUnion(newName)
            })
        }
        setShowSpinner(false)
    }

    return(
        <View style={{flex:1}}>
                {showView && 
                    <View style={styles.spinnerView}>
                        <Text style={{marginTop:15, fontWeight:"bold", fontSize:20}}>Premenovať kategóriu</Text>
                        <TextInput style={{width:"80%", height:50, backgroundColor:"white", marginTop:15, paddingLeft:10}} value={newName} onChangeText={newText => setNewName(newText)} />
                        <TouchableOpacity style={{width:"50%", backgroundColor:"white", marginTop:25, height:40, alignItems:"center", justifyContent:"center", borderRadius:50}} onPress={save}>
                            <Text style={{fontWeight:"bold", fontSize:15}}>Uložiť</Text>
                        </TouchableOpacity>
                    </View>
                }
                {showSpinner && <OverlaySpinner />}
                <ScrollView style={styles.container}>
                    <Text style={{fontSize:17, fontWeight:"bold"}}>Všetky fotky</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{borderBottomWidth:1, paddingBottom:20, borderBottomColor:"#00a9e0"}}>
                        {
                            photos.map(photo => {
                                return(
                                    <Image source={{ uri: photo.photourl }} style={{ width: 100, height: 100, marginRight:10}} />
                                )
                            })
                        }
                    </ScrollView>
                    <Text style={{fontSize:17, fontWeight:"bold", marginTop: 10}}>Fotky podľa kategórie</Text>
                        {
                            Object.entries(categories).map(([key, value]) => { 
                                return(
                                    <View>
                                        <View style={{flexDirection:"row"}}>
                                            <Text style={{fontSize:17, fontWeight:"bold", marginTop:10}}>{key}</Text>
                                            <TouchableOpacity onPress={() => {setShowView(true); setOldName(key); setNewName(key)}}>
                                                <Ionicons name='pencil' size={30} style={{marginLeft: 10}}/>
                                            </TouchableOpacity>
                                        </View>
                                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{borderBottomWidth:1, paddingBottom:20, marginTop:15, borderBottomColor:"#00a9e0"}}>
                                        {
                                            value.map((url, index) => {
                                                return(
                                                    <TouchableOpacity onPress={() => navigation.navigate('PhotoSettings', {photo: catIds[key][index]})}>
                                                        <Image source={{ uri: url }} style={{ width: 100, height: 100, marginRight:10}} />
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                        </ScrollView>
                                    </View>
                                )
                            })
                        }
                </ScrollView>
            
        </View>
    )
};

export default GaleryTrainer

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      
      padding:15
    },
    spinnerView: {
        position: "absolute",
        zIndex: 1,
        left: "10%",
        top: "20%",
        alignItems: "center",
        backgroundColor: "#00a9e0",
        width:"80%",
        height:200
    },
})