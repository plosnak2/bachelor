import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core'

// navigačný panel pre športovca
const NavbarTrainee = () => {
    const navigation = useNavigation()
    return (
        <View>
        <View style={styles.navbar}>
            <TouchableOpacity>
            <View style={styles.item1}>
                <Ionicons name="chatbox-ellipses-outline" size={40} color="black" />
                <Text style={styles.text}>Chat</Text>
            </View>
            </TouchableOpacity>
            
            <TouchableOpacity>
            <View style={styles.item2}>
                <Ionicons name="calendar-outline" size={40} color="black" />
                <Text style={styles.text}>Kalendár</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity>
            <View style={styles.item3}>
                <Ionicons name="camera-outline" size={40} color="black" />
                <Text style={styles.text}>Kamera</Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity>
            <View style={styles.item3}>
                <Ionicons name="person-outline" size={40} color="black" />
                <Text style={styles.text}>Profil</Text>
            </View>
            </TouchableOpacity>
        </View>
        
        </View>
        
    )
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
        backgroundColor: '#c4c4c4',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft:25,
        paddingRight:25,
        width: "100%",
        paddingTop:5,
      
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
        color: 'black'
    }
})