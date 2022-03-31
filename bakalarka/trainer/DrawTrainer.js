import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';

import { Ionicons } from '@expo/vector-icons';
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Text, TouchableOpacity, Alert } from 'react-native';
import { captureRef } from "react-native-view-shot";
import firebase from "firebase";
import "firebase/firestore";
import { storage } from "../firebasecfg";
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import { OverlaySpinner } from "../shared/OverlaySpinner";
import { PhotosRef } from "../firebasecfg";
import { ChatRef } from "../firebasecfg";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DrawTrainer({navigation, route}){
    const [points, setPoints] = useState("")
    const [lines, setLines] = useState([])
    const [currentColor, setCurrentColor] = useState("purple")
    const [showColors, setShowColors] = useState(false)
    const [colors, setColors] = useState([])
    const [showSpinner, setShowSpinner] = useState(false)
    const cardRef = useRef();

    const [fromHere, _setFromHere] = useState('')
    const fromHereRef = useRef(fromHere);

    const setFromHere = newText => {
        fromHereRef.current = newText;
        _setFromHere(newText);
    };

    React.useEffect(
      () =>
        navigation.addListener('beforeRemove', (e) => {
          if (lines.length == 0) {
            // If we don't have unsaved changes, then we don't need to do anything
            return;
          }
          
          if(fromHereRef.current == "a"){
            return;
          }
          // Prevent default behavior of leaving the screen
          e.preventDefault();
  
          // Prompt the user before leaving the screen
          Alert.alert(
            'Vymazať zmeny?',
            'Prajete si vážne opustiť túto obrazovku?',
            [
              { text: "Zostať", style: 'cancel', onPress: () => {} },
              {
                text: 'Opustiť',
                style: 'destructive',
                // If the user confirmed, then we dispatch the action we blocked earlier
                // This will continue the action that had triggered the removal of the screen
                onPress: () => navigation.dispatch(e.data.action),
              },
            ]
          );
        }),
      [navigation]
    );

    function touch(e){
      const tmp = points + " " + Math.trunc(e.nativeEvent.locationX) + "," + Math.trunc(e.nativeEvent.locationY)
      setPoints(tmp)
    }

    function finish(){
      let tmp = lines;
      tmp.push(points)
      let col = colors;
      col.push(currentColor)
      setColors(col)
      setLines(tmp)
      setPoints("")
    }

    function deleteLast(){
      const reducedArr = [...lines];
      const reducedCol = [...colors]
      reducedArr.splice(-1, 1);
      reducedCol.splice(-1, 1);
      setLines(reducedArr)
      setColors(reducedCol)
    }

    const getPictureBlob = (uri) => {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri, true);
          xhr.send(null);
        });
    };

    const saveAsImage = async () => {
      setShowSpinner(true)
      try {
        const result = await captureRef(cardRef, {
          result: "tmpfile",
          quality: 1,
          format: "png",
        });
        
        let blob;
        try {
            
            blob = await getPictureBlob(result);
            const ref = await storage.ref().child(result.split("/").pop());
            const snapshot = await ref.put(blob);
            const imageUrl = await snapshot.ref.getDownloadURL();
            console.log(imageUrl)
            const email = await AsyncStorage.getItem('email');
            
            const res = await PhotosRef.doc(route.params.docId).update({
              commented: true,
              edited: firebase.firestore.FieldValue.arrayUnion(imageUrl)
            })
            ChatRef.add({
              date: new Date(),
              from: email,
              isPhoto: true,
              message: imageUrl,
              category: route.params.category,
              photo: route.params.docId
          })
        } catch (e) {
            alert("Nepodarilo sa odoslať fotku");
            setShowSpinner(false)
        } finally {
            const traineeName = await AsyncStorage.getItem('traineeName');
            blob.close();
            setShowSpinner(false)
            setFromHere("a")
            navigation.navigate('ChatTrainer',{name: traineeName, message:""})
        }
        
      } catch (e) {
        console.log(e);
        setShowSpinner(false)
      }
    };

    return (
      <View
       style={{marginTop:30, height:Dimensions.get('window').height - 30}}
       
      >
      <Svg height={Dimensions.get('screen').height/1.3} width={Dimensions.get('screen').width} ref={cardRef} onTouchMove={(e) => touch(e)}
      onTouchEnd={(e) => finish()}>
      
      
    
      <Image
        x="0"
        y="0"
        width="100%"
        height="100%"
        
       
        href={route.params.uri}
        clipPath="url(#clip)"
      />
      {
        lines.map((line, index) => {
          return(
            <Polyline
              points={line}
              stroke={colors[index]}
              strokeWidth="5"
            />
          )
      })
      }
      <Polyline
      points={points}
      stroke={currentColor}
      strokeWidth="5"
      />
    
    </Svg>
          <View style={{flexDirection:"row", justifyContent:"space-between", paddingLeft:20, paddingRight:20}}>
            <TouchableOpacity onPress={() => {navigation.goBack()}}>
                <Ionicons name='close' size={50} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {deleteLast()}}>
                <Ionicons name='return-up-back' size={50} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowColors(true)} style={[
              styles.container,
              { backgroundColor: currentColor },
            ]}>
                
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {saveAsImage();}}>
                <Ionicons name='send' size={40} style={{marginTop:5}}/>
            </TouchableOpacity>
            
          </View>
          {
            showColors && 
            <View style={styles.spinnerView}>
            <TouchableOpacity onPress={() => {setCurrentColor("red"); setShowColors(false)}} style={{width:40, height:40, borderRadius:20, backgroundColor:"red", alignSelf:"center"}} />
            <TouchableOpacity onPress={() => {setCurrentColor("green"); setShowColors(false)}} style={{width:40, height:40, borderRadius:20, backgroundColor:"green", alignSelf:"center"}} />
            <TouchableOpacity onPress={() => {setCurrentColor("blue"); setShowColors(false)}} style={{width:40, height:40, borderRadius:20, backgroundColor:"blue", alignSelf:"center"}} />
            <TouchableOpacity onPress={() => {setCurrentColor("pink"); setShowColors(false)}} style={{width:40, height:40, borderRadius:20, backgroundColor:"pink", alignSelf:"center"}} />
            <TouchableOpacity onPress={() => {setCurrentColor("purple"); setShowColors(false)}} style={{width:40, height:40, borderRadius:20, backgroundColor:"purple", alignSelf:"center"}} /> 
            <TouchableOpacity onPress={() => {setCurrentColor("black"); setShowColors(false)}} style={{width:40, height:40, borderRadius:20, backgroundColor:"black", alignSelf:"center"}} />
            </View>
          }
          {showSpinner && <OverlaySpinner />}
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
      width:40,
      height:40,
      borderRadius:20,
      marginTop:8
  },
  spinnerView: {
    position: "absolute",
    zIndex: 1,
    paddingLeft:10,
    paddingRight:10,
    top:Dimensions.get('window').height/1.3 + 40,
    height:60,
    backgroundColor: "#c4c4c4",
    width:"95%",
    alignSelf:"center",
    borderRadius:10,
    flexDirection:"row",
    justifyContent:"space-between"
},
});