import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { Component} from 'react'

export default class Registro extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            

        }

    }

    registrarUsuario(){
        
    }
     
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.titulo}>Registro</Text>
                <TextInput 

                    style={styles.input}
                    KeyboardType = 'default'
                    value={this.state.input1}
                    onChangeText={(texto)=> this.setState({email: texto})}
                    placeholder='Ingresa Tu mail'
                
                />
                 <TextInput 

                    style={styles.input}
                    KeyboardType = 'default'
                    value={this.state.input1}
                    onChangeText={(texto)=> this.setState({password: texto})}
                    placeholder='Ingresa Tu Contrasena'
                    secureTextEntry = {true}
                
                />

                <TouchableOpacity onPress={()=> this.registrarUsuario()}>
                    <Text>Registrame</Text> 
                </TouchableOpacity>

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