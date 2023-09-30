
import { RootSiblingParent } from 'react-native-root-siblings';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Mainpage from './mainpage';
import RecordVideo from './video';
import TakePhoto from './photo';
import React from 'react';

const Stack = createStackNavigator()

export default function App() {
    return (
        <RootSiblingParent>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name='MainpageNavigation' component={Mainpage}/>
                    <Stack.Screen name='TakePhotoNavigation' component={TakePhoto}/>
                    <Stack.Screen name='RecordVideoNavigation' component={RecordVideo}/>
                </Stack.Navigator>
            </NavigationContainer>
        </RootSiblingParent>
    );
}