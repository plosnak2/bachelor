import { ScrollView, Text, TouchableOpacity, View, StyleSheet, Image, TextInput, Keyboard, KeyboardAvoidingView, Alert, ActivityIndicator, Dimensions } from "react-native";
import React, { useEffect, useState } from 'react'
import NavbarTrainer from "./Navbar";
import { PredefinedRef } from "../firebasecfg";
import { PhotosRef } from "../firebasecfg";
import Moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { ChatRef } from "../firebasecfg";
import AsyncStorage from '@react-native-async-storage/async-storage';

const PhotoSettings = ({ navigation, route }) => {
    const [photo, setPhoto] = useState()
    const [loading, setLoading] = useState(true)
    const [otherPhotos, setOtherPhotos] = useState([])
    const [actualId, setActualId] = useState(route.params.photo)
    const [docIds, setDocIds] = useState([])
    const [showView, setShowView] = useState(false)
    const [comment, setComment] = useState('')

    useEffect(async () => {
        const docpic = await PhotosRef.doc(actualId).get();
        setPhoto(docpic.data())
        setLoading(false)
        const snapshot = await PhotosRef.orderBy("date", "desc").get();
        let pics = []
        let ids = []
        snapshot.forEach(doc => {
            if(doc.data().category === docpic.data().category){
                pics.push(doc.data())
                ids.push(doc.id)
            }
            
        });
        setOtherPhotos(pics)
        setDocIds(ids)
        setComment(docpic.data().comment)
        console.log(actualId)
    }, [actualId])

    async function sendComment() {
        if(comment == ""){
            ;
        } else if(comment == photo.comment){
            ;
        } else {
            const email = await AsyncStorage.getItem('email');
            const res = await PhotosRef.doc(actualId).update({
                commented: true,
                comment: comment
            })
            const res2 = await ChatRef.add({
                date: new Date(),
                from: email,
                isPhoto: true,
                message: photo.photourl,
                category: photo.category,
                photo: actualId
            })
            const res3 = await ChatRef.add({
                date: new Date(),
                from: email,
                isPhoto: false,
                message: "Tréner komentoval fotku: " + comment
            })
        }
    }

    if(loading){
        return( 
            <View style={[styles.container2, styles.horizontal]}>
                <ActivityIndicator size="large" color="#3ca0e7"/>
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
                        <View style={{flexDirection:"row", marginTop:30}}> 
                            <TouchableOpacity onPress={() => navigation.navigate('DrawTrainer', {uri: photo.photourl, docId: actualId, category: photo.category})} style={{width:"40%", backgroundColor:"#00a9e0", borderRadius:10, height:50, alignItems:"center", justifyContent:"center", marginLeft:"30%"}}>
                                <Text style={{color:"white"}}>Upraviť fotku</Text>
                            </TouchableOpacity>
                            
                        </View>
                        <View style={{borderWidth:1, marginTop:15, borderColor:"#00a9e0"}}></View>
                        <Text style={{fontSize:18, marginTop:15, fontWeight:"bold"}}>Editované fotky:</Text>
                        {
                            photo.edited.length != 0 ?
                            photo.edited.map((url, index) => {
                                return(
                                    <Image source={{ uri: url }} style={{ width: "100%", height: Dimensions.get('screen').height/1.6, resizeMode:"contain", marginTop:15}} />
                                )
                            }) : 
                            <Text style={{fontSize:18, marginTop:15}}>Túto fotku ste ešte needitovali.</Text>
                        }
                        <View style={{borderWidth:1, marginTop:15, borderColor:"#00a9e0"}}></View>

                        <View style={{flexDirection:"row"}}>
                            <Text style={{fontSize:18, marginTop:15, fontWeight:"bold"}}>Váš komentár:</Text>
                            <TouchableOpacity onPress={() => {setShowView(true); console.log(showView)}}>
                                <Ionicons name='pencil' size={30} style={{marginLeft: 10, marginTop:10}}/>
                            </TouchableOpacity>
                        </View>
                        {
                            comment.length != 0 ?
                            <View style={{marginTop:15, marginLeft:30, marginRight:30, backgroundColor:"white", padding:20, borderRadius:20, borderColor:"#00a9e0", borderWidth:1}}>
                                {   showView ?
                                    <TextInput multiline style={{width:"90%", backgroundColor:"white", borderRadius:10, alignSelf:"center"}} onChangeText={newText => setComment(newText)} value={comment}/>
                                    :
                                    <Text style={{color:"black"}}>{comment}</Text>
                                    
                                }
                                
                            </View> :

                            <View style={{marginTop:15, marginLeft:30, marginRight:30, backgroundColor:"white", padding:20, borderRadius:20, borderWidth:1, borderColor:"#00a9e0"}}>
                                {   showView ?
                                    <TextInput multiline style={{width:"90%", backgroundColor:"white", borderRadius:10, alignSelf:"center"}} onChangeText={newText => setComment(newText)} value={comment} placeholder="Napíšte komentár"/>
                                    :
                                    
                                    <Text style={{color:"black"}}>Zatiaľ ste túto fotku nekomentovali.</Text>
                                }
                                
                            </View>
                        }
                        {
                            showView && 
                            <TouchableOpacity onPress={() => {setShowView(false); sendComment()}} style={{width:"40%", backgroundColor:"#00a9e0", borderRadius:10, height:50, alignItems:"center", justifyContent:"center", marginLeft:"30%", marginTop:10}}>
                                <Text style={{color:"white"}}>Odoslať</Text>
                            </TouchableOpacity>
                        }

                        <View style={{borderWidth:1, marginTop:15, borderColor:"#00a9e0"}}></View>
                        <Text style={{fontSize:18, marginTop:15, fontWeight:"bold", marginBottom:15}}>Ďalšie fotky z kategórie {photo.category}</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{paddingBottom:20}}>
                        {
                            otherPhotos.map((photo, index) => {
                                return(
                                    <TouchableOpacity onPress={() => {setPhoto(photo); setActualId(docIds[index])}}>
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
    },
    spinnerView: {
        position: "absolute",
        zIndex: 1,
        left: "10%",
        top: "20%",
        height:"50%",
        backgroundColor: "#c4c4c4",
        width:"80%",
        paddingBottom:50,
        borderRadius:10
    },
})