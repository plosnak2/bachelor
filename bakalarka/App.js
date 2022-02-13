import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './shared/Login';
import Home from './shared/Home';
import HomeTrainee from './trainee/HomeTrainee';
import HomeTrainer from './trainer/HomeTrainer';
import { LogBox } from 'react-native';
import ChatTrainee from './trainee/ChatTrainee';
import ChatTrainer from './trainer/ChatTrainer';
import { Ionicons } from '@expo/vector-icons';
import {View} from "react-native";
import PredefinedTrainer from './trainer/PredefinedTrainer';
import AddPredefined from './trainer/AddPredefined';

const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(['Setting a timer for a long period of time'])
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="HomeTrainee" component={HomeTrainee} options={{
           title: 'Chat',
           headerStyle: {
            backgroundColor: '#c4c4c4'
          },
          headerTitleAlign: 'center',
        }}/>
        <Stack.Screen name="HomeTrainer" component={HomeTrainer} options={{
          title: 'Moji športovci',
          headerStyle: {
           backgroundColor: '#c4c4c4'
         },
         headerTitleAlign: 'center',
       }}/>
       <Stack.Screen name="ChatTrainee" component={ChatTrainee} options={({ route }) => ({ 
         title: route.params.name,
         headerStyle: {
          backgroundColor: '#c4c4c4'
        },
        headerTitleAlign: 'center',
        headerRight: () => 
        <View style={{flexDirection: 'row', paddingRight:0}}>
           <Ionicons name='calendar-outline' size={35} style={{marginLeft: 10}}/>
           <Ionicons name='images-outline' size={35} style={{marginLeft: 15}}/>
        </View>
        })}/>
        <Stack.Screen name="ChatTrainer" component={ChatTrainer} options={({ route }) => ({ 
          title: route.params.name,
          headerStyle: {
           backgroundColor: '#c4c4c4'
         },
         headerTitleAlign: 'center',
         headerRight: () => 
         <View style={{flexDirection: 'row', paddingRight:0}}>
            <Ionicons name='calendar-outline' size={35} style={{marginLeft: 10}}/>
            <Ionicons name='images-outline' size={35} style={{marginLeft: 15}}/>
         </View>
        })}/>
        <Stack.Screen name="PredefinedTrainer" component={PredefinedTrainer} options={({navigation})=> ({
          title: 'Preddefinované správy',
          headerStyle: {
           backgroundColor: '#c4c4c4'
         },
         headerTitleAlign: 'center',
         headerRight: () => 
         <View style={{flexDirection: 'row', paddingRight:0}}>
            <Ionicons name='add' size={35} style={{marginLeft: 10}} onPress={() => navigation.navigate('AddPredefined')}/>
         </View>
        })}/>
        <Stack.Screen name="AddPredefined" component={AddPredefined} options={{
          title: 'Vytvoriť novú správu',
          headerStyle: {
           backgroundColor: '#c4c4c4'
         },
         headerTitleAlign: 'center',
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};