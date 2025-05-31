import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Perfil from "../screens/Perfil"
import {FontAwesome} from '@expo/vector-icons'

import Login from "../screens/Login"


const Tab= createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator>
         <Tab.Screen
          name='Perfil' 
          component={Perfil}
          options = {
                {
                tabBarIcon: () => <FontAwesome name='user' size={24} color={'red'} />
                }
             }
          
          />

          <Tab.Screen
          name='Login' 
          component={Login}
          options = {
                {
                tabBarIcon: () => <FontAwesome name='sign-in' size={24} color={'red'} />
                }
             }
          
          />
    </Tab.Navigator>
  )
}