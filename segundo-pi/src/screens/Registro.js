import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component} from 'react'

export default class Registro extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            error: false,
            

        }

    }

    registrarUsuario(){
        if (this.state.email === "Rude" && 
            this.state.password === "12345"
         ){
            this.props.navigation.navigate('Tab')

         }else{
            this.setState({email:'', password:'', error:true})
         }

    }
     

     
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.titulo}>Registro</Text>
                <TextInput 

                    style={styles.input}
                    KeyboardType = 'default'
                    value={this.state.email}
                    onChangeText={(texto)=> this.setState({email: texto, error: false})}
                    placeholder='Ingresa Tu mail'
                
                />
                 <TextInput 

                    style={styles.input}
                    KeyboardType = 'default'
                    value={this.state.password}
                    onChangeText={(texto)=> this.setState({password: texto, error: false})}
                    placeholder='Ingresa Tu Contrasena'
                    secureTextEntry = {true}
                
                />

                <TouchableOpacity onPress={()=> this.registrarUsuario()}>
                    <Text>Registrame</Text> 
                </TouchableOpacity>

                 {
                    this.state.error ? <Text>Credenciales invalidas</Text> : null
                  }

                  
           

            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 2,
        borderColor: 'black',
        paddingHorizontal: 10,
        backgroundColor: 'white',
        marginBottom:10,
        borderRadius: 5,
    },
    container: {
        padding: 20,
    },
    titulo: {
        fontSize: 24,
        marginBottom: 10,
    },


})