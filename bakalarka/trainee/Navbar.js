import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core'
import { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';

// navigačný panel pre športovca
const NavbarTrainee = () => {
    const navigation = useNavigation()
    const route = useRoute();

    useEffect( () => {
        
        
      }, [navigation])
    
    if(route.name == "HomeTrainee") {
        return (
            <View>
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => {navigation.navigate('HomeTrainee')}} style={{width:"33%", backgroundColor:"#00a9e0"}}>
                <View style={styles.item1}>
                    <Ionicons name="chatbox-ellipses-outline" size={40} color="white" />
                    <Text style={{fontSize:15, fontWeight:"bold", color:"white"}}>Chat</Text>
                </View>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => navigation.navigate('CalendarTrainee')} style={{width:"33%"}}>
                <View style={styles.item2}>
                    <Ionicons name="calendar-outline" size={40} color="#00a9e0" />
                    <Text style={styles.text}>Kalendár</Text>
                </View>
                </TouchableOpacity>
    
                <TouchableOpacity style={{width:"33%"}}>
                <View style={styles.item3}>
                    <Ionicons name="person-outline" size={40} color="#00a9e0" />
                    <Text style={styles.text}>Profil</Text>
                </View>
                </TouchableOpacity>
            </View>
            
            </View>
            
        )
    } else if(route.name == 'CalendarTrainee'){
        return (
            <View>
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => {navigation.navigate('HomeTrainee')}} style={{width:"33%"}}>
                <View style={styles.item1}>
                    <Ionicons name="chatbox-ellipses-outline" size={40} color="#00a9e0" />
                    <Text style={styles.text}>Chat</Text>
                </View>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => navigation.navigate('CalendarTrainee')} style={{width:"33%", backgroundColor:"#00a9e0"}}>
                <View style={styles.item2}>
                    <Ionicons name="calendar-outline" size={40} color="white" />
                    <Text style={{fontSize:15, fontWeight:"bold", color:"white"}}>Kalendár</Text>
                </View>
                </TouchableOpacity>
    
                <TouchableOpacity style={{width:"33%"}}>
                <View style={styles.item3}>
                    <Ionicons name="person-outline" size={40} color="#00a9e0" />
                    <Text style={styles.text}>Profil</Text>
                </View>
                </TouchableOpacity>
            </View>
            
            </View>
            
        )
    } else {
        return (
            <View>
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => {navigation.navigate('HomeTrainee')}} style={{width:"33%"}}>
                <View style={styles.item1}>
                    <Ionicons name="chatbox-ellipses-outline" size={40} color="#00a9e0" />
                    <Text style={styles.text}>Chat</Text>
                </View>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => navigation.navigate('CalendarTrainee')} style={{width:"33%"}}>
                <View style={styles.item2}>
                    <Ionicons name="calendar-outline" size={40} color="#00a9e0" />
                    <Text style={styles.text}>Kalendár</Text>
                </View>
                </TouchableOpacity>
    
                <TouchableOpacity style={{width:"33%"}}>
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

export default NavbarTrainee

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