import { View, ImageBackground, StyleSheet, StatusBar, Text, Dimensions, TextInput, TouchableOpacity, } from "react-native";
import { auth } from '../firebase'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // login screen is first to load when starting the application so in that case i need to check whether thr user is already logged in or not
    // if he is logged in, he will be automatically redirected onto home page
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            unsubscribe();
            navigation.replace("Home");
          }
        })
        
        return () => {
            unsubscribe();
        }
    }, [])

    // function that handles login and storing user's mail into async storage
    const login = () => {
        auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with:', user.email);
            AsyncStorage.setItem('email', email)
        })
        .then(() => {
            setEmail('')
            setPassword('')
            navigation.navigate('Home') 
        })
        .catch(error => alert(error.message))
    }

    // view for login screen
    return (
    <ImageBackground source={require('../assets/login.png')} resizeMode="cover" style={styles.imagebg} imageStyle={{ opacity: 0.8 }}>
        <View style={styles.container}>
            <Text style={styles.text}>
                Prihláste sa do aplikácie
            </Text>
            <TextInput
                value={email}
                placeholder="Zadajte mail"
                style={styles.input}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                value={password}
                onChangeText={text => setPassword(text)}
                placeholder="Zadajte heslo"
                style={styles.input}
                secureTextEntry
            />
            <TouchableOpacity
                onPress={login}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Prihlásiť</Text>
            </TouchableOpacity>
        </View>
    </ImageBackground>
    );
};

export default LoginScreen

const styles = StyleSheet.create({
    imagebg: {
        flex: 1,
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : Platform.OS === 'ios' ? 40 : 0,
        alignItems: 'center',
    },

    container: {
        flex: 1,
        alignItems: 'center',
        top: 50,
        backgroundColor: "aqua",
        width: "80%",
        maxHeight: 280,
        borderRadius: 20,
        opacity:0.8
    },

    text: {
        color: "#0782F9",
        fontWeight: "bold",
        fontSize:23,
        marginTop:20
    },

    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 20,
        width: "80%"
    },

    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20
    },

    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})