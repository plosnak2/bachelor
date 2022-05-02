import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';

// navigačný panel pre trénera
const NavbarTrainer = () => {
    const navigation = useNavigation()
    const route = useRoute();

    useEffect( () => {
        
        
      }, [navigation])

    if(route.name == "HomeTrainer"){
        return(
            <View>
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => navigation.navigate('HomeTrainer')} style={{width:"50%", backgroundColor:"#00a9e0"}}>
                <View style={styles.item1}>
                    <Ionicons name="chatbox-ellipses-outline" size={40} color="white" />
                    <Text style={{fontSize:15, fontWeight:"bold", color:"white"}}>Chat</Text>
                </View>
                </TouchableOpacity>
                
                

                <TouchableOpacity style={{width:"50%"}} onPress={() => navigation.navigate('ProfileTrainer')}>
                <View style={styles.item3}>
                    <Ionicons name="person-outline" size={40} color="#00a9e0" />
                    <Text style={styles.text}>Profil</Text>
                </View>
                </TouchableOpacity>
            </View>
            
            </View>
        )
    } else if(route.name == "ProfileTrainer") {
        return (
            <View>
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => navigation.navigate('HomeTrainer')} style={{width:"50%"}}>
                <View style={styles.item1}>
                    <Ionicons name="chatbox-ellipses-outline" size={40} color="#00a9e0" />
                    <Text style={styles.text}>Chat</Text>
                </View>
                </TouchableOpacity>
                
                

                <TouchableOpacity style={{width:"50%", backgroundColor:"#00a9e0"}} onPress={() => navigation.navigate('ProfileTrainer')}>
                <View style={styles.item3}>
                    <Ionicons name="person-outline" size={40} color="white" />
                    <Text style={{fontSize:15, fontWeight:"bold", color:"white"}}>Profil</Text>
                </View>
                </TouchableOpacity>
            </View>
            
            </View>
        )
    } else {
        return (
            

            <View>
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => navigation.navigate('HomeTrainer')} style={{width:"50%"}}>
                <View style={styles.item1}>
                    <Ionicons name="chatbox-ellipses-outline" size={40} color="#00a9e0" />
                    <Text style={styles.text}>Chat</Text>
                </View>
                </TouchableOpacity>
                
                

                <TouchableOpacity style={{width:"50%"}} onPress={() => navigation.navigate('ProfileTrainer')}>
                <View style={styles.item3}>
                    <Ionicons name="person-outline" size={40} color="#00a9e0" />
                    <Text style={styles.text}>Profil</Text>
                </View>
                </TouchableOpacity>
            </View>
            
            </View>
            
        )
    }
    
}

export default NavbarTrainer

const styles = StyleSheet.create({
    navbar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignSelf: 'stretch',
        flex: 1,
        backgroundColor: 'lightgrey',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        
        width: "100%",
        
      
    },
    item1:{
        alignItems: 'center'
    },
    item3:{
        alignItems: 'center'
    },
    item2:{
        alignItems: 'center',
        
    },
    text:{
        fontSize:15,
        fontWeight: 'bold',
        color: '#00a9e0'
    }
})