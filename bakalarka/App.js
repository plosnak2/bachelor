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
        })}/>
        <Stack.Screen name="ChatTrainer" component={ChatTrainer} options={({ route }) => ({ 
          title: route.params.name,
          headerStyle: {
           backgroundColor: '#c4c4c4'
         },
         headerTitleAlign: 'center',
         })}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};