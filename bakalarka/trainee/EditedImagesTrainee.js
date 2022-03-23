import { Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, ScrollView, Dimensions } from "react-native";
import { auth } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { UsersRef } from "../firebasecfg";
import NavbarTrainee from "./Navbar";
import { PhotosRef } from "../firebasecfg";
import Moment from 'moment';


// domovska obrazovka sportovca
const EditedImagesTrainee = ({ navigation, route }) => {
    const [photo,setPhoto] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(async () => {
        const docpic = await PhotosRef.doc(route.params.docId).get();
        setPhoto(docpic.data())
        setLoading(false)
    }, [])
    
    if(loading){
        return( 
            <View style={[styles.container2, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0782F9"/>
            </View>
        )
    } else {
        return(
            <View style={{flex:1}}>
                <ScrollView style={styles.container}>
                    <View style={{padding:10}}>
                        <View style={{flexDirection:"row",marginBottom:15}}>
                            <Text style={{fontSize:18}}>Kategória: {photo.category}</Text>
                            <Text style={{fontSize:18, position:"absolute", right:10}}>{Moment(new Date(photo.date.toDate())).format('DD.MM.YYYY')}</Text>
                        </View>
                        <Image source={{ uri: photo.photourl }} style={{ width: "100%", height: Dimensions.get('screen').height/1.6, resizeMode:"contain"}} />
                        
                        <View style={{borderWidth:1, marginTop:15, borderColor:"#00a9e0"}}></View>
                    
                        <Text style={{fontSize:18, marginTop:15, fontWeight:"bold"}}>Editované fotky:</Text>
                        
                        {
                            photo.edited.length != 0 ?
                            photo.edited.map((url, index) => {
                                return(
                                    <Image source={{ uri: url }} style={{ width: "100%", height: Dimensions.get('screen').height/1.6, resizeMode:"contain", marginTop:15}} />
                                )
                            }) : 
                            <Text style={{fontSize:18, marginTop:15}}>Tréner zatiaľ fotku neupravoval</Text>
                        }

                        <View style={{borderWidth:1, marginTop:15, borderColor:"#00a9e0"}}></View>

                        <Text style={{fontSize:18, marginTop:15, fontWeight:"bold"}}>Trénerov komentár:</Text>
                        {
                            photo.comment.length != 0 ?
                            <View style={{marginTop:15, marginLeft:30, marginRight:30, backgroundColor:"#00a9e0", padding:20, borderRadius:20}}>
                                <Text style={{color:"white"}}>{photo.comment}</Text>
                            </View> :

                            <View style={{marginTop:15, marginLeft:30, marginRight:30, backgroundColor:"#00a9e0", padding:20, borderRadius:20}}>
                                <Text style={{color:"white"}}>Tréner zatiaľ nepridal žiadny komentár k tejto fotke.</Text>
                            </View>
                        }
                    </View>
                </ScrollView>
            </View>
            )
    }
    
};

export default EditedImagesTrainee

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    container2: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
})