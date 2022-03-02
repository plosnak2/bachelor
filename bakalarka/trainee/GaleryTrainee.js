import { Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, ScrollView } from "react-native";
import { auth } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { UsersRef } from "../firebasecfg";
import NavbarTrainee from "./Navbar";
import { PhotosRef } from "../firebasecfg";


const GaleryTrainee = ({ navigation }) => {
    const [photos, setPhotos] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [categories, setCategories] = useState({})

    useEffect(async () => {
        const subscribe = PhotosRef.orderBy("date", "desc").onSnapshot((QuerySnapshot) => {
            let photosActual = [];
            let categoriesActual = {};
            QuerySnapshot.forEach((doc) => {
                let category = doc.data().category
                if(category in categoriesActual === false){
                    categoriesActual[category] = [doc.data().photourl]
                } else {
                    categoriesActual[category].push(doc.data().photourl)
                }
                photosActual.push(doc.data())
                
            })
            setPhotos(photosActual);
            setCategories(categoriesActual)
            setLoaded(true)
            
        })

        return () => subscribe();
    }, [])

    return(
        <View style={{flex:1}}>
                <ScrollView style={styles.container}>
                    <Text style={{fontSize:17, fontWeight:"bold"}}>Všetky fotky</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{borderBottomWidth:1, paddingBottom:20}}>
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
                                        <Text style={{fontSize:17, fontWeight:"bold", marginTop:10}}>{key}</Text>
                                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{borderBottomWidth:1, paddingBottom:20}}>
                                        {
                                            value.map(url => {
                                                return(
                                                    <Image source={{ uri: url }} style={{ width: 100, height: 100, marginRight:10}} />
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

export default GaleryTrainee

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      
      padding:15
    }
})