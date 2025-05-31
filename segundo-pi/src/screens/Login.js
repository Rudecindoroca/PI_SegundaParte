import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { Component} from 'react'

export default class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''

        }

    }

     redireccionar(nombrePantalla){
        this.props.navigation.navigate(nombrePantalla)
    }
    ;
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.titulo}>Login</Text>
                 <TextInput 
                    
                    style={styles.input}
                    KeyboardType = 'default'
                    value={this.state.input1}
                    onChangeText={(texto)=> this.setState({email: texto})}
                    placeholder='Ingresa Tu Email'
                                    
                />

                 <TextInput 
                
                    style={styles.input}
                    KeyboardType = 'default'
                    value={this.state.input1}
                    onChangeText={(texto)=> this.setState({password: texto})}
                    placeholder='Ingresa Tu Contrasena'
                    secureTextEntry = {true}
                                
                />

                



                   <TouchableOpacity
                         onPress={()=> this.redireccionar('Registro')}>
                        <Text>
                         ¿No tenes cuenta? registrate
                        </Text>
            
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
        borderRadius: 5,
        marginBottom: 10,
    },
    container: {
        padding: 20,
    },
    titulo: {
        fontSize: 24,
        marginBottom: 10,
    },


})