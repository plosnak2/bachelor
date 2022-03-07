import { ScrollView, Text, TouchableOpacity, View, StyleSheet, Image, TextInput, Keyboard, KeyboardAvoidingView, Alert, ActivityIndicator, Dimensions } from "react-native";
import React, { useEffect, useState } from 'react'
import NavbarTrainer from "./Navbar";
import { PredefinedRef } from "../firebasecfg";
import { PhotosRef } from "../firebasecfg";
import Moment from 'moment';


const PhotoSettings = ({ navigation, route }) => {
    const [photo, setPhoto] = useState()
    const [loading, setLoading] = useState(true)
    const [otherPhotos, setOtherPhotos] = useState([])

    useEffect(async () => {
        const docpic = await PhotosRef.doc(route.params.photo).get();
        setPhoto(docpic.data())
        setLoading(false)
        const snapshot = await PhotosRef.orderBy("date", "desc").get();
        let pics = []
        snapshot.forEach(doc => {
            if(doc.data().category === docpic.data().category){
                pics.push(doc.data())
            }
            
        });
        setOtherPhotos(pics)
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
                        <View style={{flexDirection:"row", marginTop:30, marginLeft:"5%"}}> 
                            <TouchableOpacity style={{width:"40%", backgroundColor:"#c4c4c4", borderRadius:10, height:50, alignItems:"center", justifyContent:"center"}}>
                                <Text>Upraviť fotku</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{width:"40%", backgroundColor:"#c4c4c4", borderRadius:10, height:50, alignItems:"center", justifyContent:"center", marginLeft:"10%"}}>
                                <Text>Pridať komentár</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{borderWidth:1, marginTop:15}}></View>
                        <Text style={{fontSize:18, marginTop:15, fontWeight:"bold", marginBottom:15}}>Ďalšie fotky z kategórie {photo.category}</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{paddingBottom:20}}>
                        {
                            otherPhotos.map(photo => {
                                return(
                                    <TouchableOpacity onPress={() => setPhoto(photo)}>
                                        <Image source={{ uri: photo.photourl }} style={{ width: 100, height: 100, marginRight:10}} />
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                    </View>
                </ScrollView>
            </View>
            )
    }
    
};

export default PhotoSettings

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