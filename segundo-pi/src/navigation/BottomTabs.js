import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Perfil from "../screens/Perfil"
import {FontAwesome} from '@expo/vector-icons'
import Home from '../screens/Home'

import Login from "../screens/Login"


const Tab= createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator>
          <Tab.Screen 
              name='Home' 
              component={Home}
              options={{
                tabBarIcon: () => <FontAwesome name='home' size={24} color={'purple'} />
              }}
              />

         <Tab.Screen
          name='Perfil' 
          component={Perfil}
          options = {
                {
                tabBarIcon: () => <FontAwesome name='user' size={24} color={'purple'} />
                }
             }
          
          />

        
    </Tab.Navigator>
  )
}