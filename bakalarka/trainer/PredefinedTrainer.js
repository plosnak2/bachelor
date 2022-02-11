import { ScrollView, Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import NavbarTrainer from "./Navbar";


// temporary home page
const PredefinedTrainer = ({ navigation }) => {
    

      return(
        <View style={{flex:1}}>
            <ScrollView  style={styles.container}>
            </ScrollView>
          <NavbarTrainer />
        </View>
      )
};

export default PredefinedTrainer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
})