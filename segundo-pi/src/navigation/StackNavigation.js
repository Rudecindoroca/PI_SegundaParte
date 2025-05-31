import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Login from "../screens/Login"
import Registro from "../screens/Registro"
import BottomTabs from "./BottomTabs";

const Stack = createNativeStackNavigator()

function StackNavigation() {
    return(
        <Stack.Navigator>
            <Stack.Screen
             name='Home' 
             component={Home}
             options = {
                {
                    headerShown: false
                }
             }
             />

              <Stack.Screen
                name='Tab'
                component={BottomTabs}
                options={{
                    headerShown:false
                }}

                />
                
             <Stack.Screen
             name='Registro' 
             component={Registro}
             options = {
                {
                    
                }
             }
             />

           


        </Stack.Navigator>
    )
}


export default StackNavigation