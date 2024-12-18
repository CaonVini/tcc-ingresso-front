import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../pages/login'
import Register from '../pages/register'
import HomePage from '../pages/Home'
import BottomRoutes from './bottom.routes'

export default function Routes(){
    const Stack = createStackNavigator()
    return(
        <Stack.Navigator>

            <Stack.Screen
                name='Login'
                component={Login}
                options={{ headerShown: false }}
            />

            <Stack.Screen 
                name='Register'
                component={Register}
                options={{ headerShown: false }}
            />

            <Stack.Screen 
                name='Home'
                component={BottomRoutes}
                options={{ headerShown: false }}
            />
            

        </Stack.Navigator>
    )
}