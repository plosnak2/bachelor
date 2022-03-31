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
import SendPhoto from './trainee/SendPhoto';
import GaleryTrainee from './trainee/GaleryTrainee';
import GaleryTrainer from './trainer/GaleryTrainer';
import CalendarTrainee from './trainee/CalendarTrainee';
import CalendarInfoTrainee from './trainee/CalendarInfoTrainee';
import CalendarTrainer from './trainer/CalendarTrainer';
import CalendarInfoTrainer from './trainer/CalendarInfoTrainer';
import CalendarAddTrainee from './trainee/CalendarAddTrainee';
import PhotoSettings from './trainer/PhotoSettings';
import DrawTrainer from './trainer/DrawTrainer';
import EditedImagesTrainee from './trainee/EditedImagesTrainee';
import ProfileTrainer from './trainer/ProfileTrainer';
import ProfileTrainee from './trainee/ProfileTrainee';

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
           title: 'Váš tréner',
           headerStyle: {
            backgroundColor: '#00a9e0'
          },
          headerTintColor:"white",
          headerTitleAlign: 'center',
          gestureEnabled: false,
          headerShown: true,
          headerLeft: () => <></>,
        }}/>
        <Stack.Screen name="HomeTrainer" component={HomeTrainer} options={{
          title: 'Moji športovci',
          headerStyle: {
           backgroundColor: '#00a9e0',
         },
         headerTitleAlign: 'center',
         headerTintColor:"white",
         gestureEnabled: false,
         headerShown: true,
         headerLeft: () => <></>,
       }}/>
       <Stack.Screen name="ChatTrainee" component={ChatTrainee} options={({ route, navigation }) => ({ 
         title: route.params.name,
         headerStyle: {
          backgroundColor: '#00a9e0'
        },
        headerTintColor:"white",
        headerTitleAlign: 'center',
        headerRight: () => 
        <View style={{flexDirection: 'row', paddingRight:0}}>
           <Ionicons name='calendar-outline' size={35} style={{marginLeft: 10}} onPress={() => navigation.navigate('CalendarTrainee')} color="white"/>
           <Ionicons name='images-outline' size={35} style={{marginLeft: 15}} onPress={() => navigation.navigate('GaleryTrainee')} color="white"/>
        </View>
        })}/>
        <Stack.Screen name="ChatTrainer" component={ChatTrainer} options={({ route, navigation }) => ({ 
          title: route.params.name,
          headerStyle: {
           backgroundColor: '#00a9e0',
         },
         headerTitleAlign: 'center',
         headerTintColor:"white",
         headerRight: () => 
         <View style={{flexDirection: 'row', paddingRight:0}}>
            <Ionicons name='calendar-outline' size={35} style={{marginLeft: 10}} onPress={() => navigation.navigate('CalendarTrainer')} color="white"/>
            <Ionicons name='images-outline' size={35} style={{marginLeft: 15}} onPress={() => navigation.navigate('GaleryTrainer')} color="white"/>
         </View>
        })}/>
        <Stack.Screen name="PredefinedTrainer" component={PredefinedTrainer} options={({navigation})=> ({
          title: 'Preddefinované správy',
          headerStyle: {
           backgroundColor: '#00a9e0'
         },
         headerTintColor:"white",
         headerTitleAlign: 'center',
         gestureEnabled: false,
         headerShown: true,
         headerLeft: () => <></>,
         headerRight: () => 
         <View style={{flexDirection: 'row', paddingRight:0}}>
            <Ionicons name='add' size={35} style={{marginLeft: 10}} onPress={() => navigation.navigate('AddPredefined', {message: ''})} color="white"/>
         </View>
        })}/>
        <Stack.Screen name="AddPredefined" component={AddPredefined} options={{
          title: 'Uložiť novú rýchlu odpoveď',
          headerStyle: {
           backgroundColor: '#00a9e0'
         },
         headerTintColor:"white",
         headerTitleAlign: 'center',
         gestureEnabled: false,
         headerShown: true,
         headerLeft: () => <></>,
        }}/>
        <Stack.Screen name="SendPhoto" component={SendPhoto} options={{
          title: 'Odoslať fotku',
          headerStyle: {
           backgroundColor: '#00a9e0'
         },
         headerTintColor:"white",
         headerTitleAlign: 'center',
         gestureEnabled: false,
         headerShown: true,
         headerLeft: () => <></>,
       }}/>
       <Stack.Screen name="GaleryTrainee" component={GaleryTrainee} options={{
          title: 'Galéria',
          headerStyle: {
          backgroundColor: '#00a9e0'
        },
        headerTintColor:"white",
        headerTitleAlign: 'center',
      }}/>
      <Stack.Screen name="GaleryTrainer" component={GaleryTrainer} options={{
        title: 'Galéria',
        headerStyle: {
        backgroundColor: '#00a9e0'
      },
      headerTintColor:"white",
      headerTitleAlign: 'center',
    }}/>
    <Stack.Screen name="CalendarTrainee" component={CalendarTrainee} options={{
      title: 'Kalendár',
      headerStyle: {
      backgroundColor: '#00a9e0'
    },
    headerTintColor:"white",
    headerTitleAlign: 'center',
  }}/>
    <Stack.Screen name="CalendarInfoTrainee" component={CalendarInfoTrainee} options={({route}) => ({
      title: route.params.title,
      headerStyle: {
      backgroundColor: '#00a9e0'
    },
    headerTintColor:"white",
    headerTitleAlign: 'center',
  })}/>
    <Stack.Screen name="CalendarTrainer" component={CalendarTrainer} options={{
      title: 'Kalendár',
      headerStyle: {
      backgroundColor: '#00a9e0'
    },
    headerTintColor:"white",
    headerTitleAlign: 'center',
  }}/>
    <Stack.Screen name="CalendarInfoTrainer" component={CalendarInfoTrainer} options={({route}) => ({
      title: route.params.title,
      headerStyle: {
      backgroundColor: '#00a9e0'
    },
    headerTintColor:"white",
    headerTitleAlign: 'center',
  })}/>
    <Stack.Screen name="CalendarAddTrainee" component={CalendarAddTrainee} options={({}) => ({
      title: 'Pridať tréning',
      headerStyle: {
      backgroundColor: '#00a9e0'
    },
    gestureEnabled: false,
    headerShown: true,
    headerLeft: () => <></>,
    headerTintColor:"white",
    headerTitleAlign: 'center',
  })}/>
    <Stack.Screen name="PhotoSettings" component={PhotoSettings} options={({}) => ({
      title: 'Nastavenia fotky',
      headerStyle: {
      backgroundColor: '#00a9e0'
    },
    headerTintColor:"white",
    headerTitleAlign: 'center',
    gestureEnabled: false,
    headerShown: true,
    headerLeft: () => <></>,
  })}/>
    <Stack.Screen name="DrawTrainer" component={DrawTrainer} options={{ headerShown: false }}/>
    <Stack.Screen name="EditedImagesTrainee" component={EditedImagesTrainee} options={({}) => ({
      title: 'Upravené fotky',
      headerStyle: {
      backgroundColor: '#00a9e0'
    },
    headerTintColor:"white",
    headerTitleAlign: 'center',
  })}/>
    <Stack.Screen name="ProfileTrainer" component={ProfileTrainer} options={({}) => ({
      title: 'Profil',
      headerStyle: {
      backgroundColor: '#00a9e0'
    },
    headerShown: true,
    headerTintColor:"white",
    headerTitleAlign: 'center',
    gestureEnabled: false,
    headerShown: true,
    headerLeft: () => <></>,
  })}/>
    <Stack.Screen name="ProfileTrainee" component={ProfileTrainee} options={({}) => ({
      title: 'Profil',
      headerStyle: {
      backgroundColor: '#00a9e0'
    },
    headerShown: true,
    headerTintColor:"white",
    headerTitleAlign: 'center',
    gestureEnabled: false,
    headerShown: true,
    headerLeft: () => <></>,
  })}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};