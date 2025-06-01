import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { Component} from 'react'
import { auth, db } from '../firebase/config'

export default class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '', 

        }

    }

     redireccionar(nombrePantalla){
        this.props.navigation.navigate(nombrePantalla)
    }

    

    loguearUsuario(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then((user)=> this.props.navigation.navigate('Tab'))
        .catch((err)=> console.log(err))
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
                style={styles.botonPrimario}
                onPress={()=> this.loguearUsuario(this.state.email, this.state.password)}
                     >
                <Text style={styles.textoBoton}>Ingresa</Text>
                 </TouchableOpacity>

                



                   <TouchableOpacity
                        style={styles.botonSecundario}
                         onPress={()=> this.redireccionar('Registro')}>
                        <Text style={styles.textoBotonSecundario}>
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
     botonPrimario: {
    backgroundColor: '#007AFF', // azul moderno
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginVertical: 10,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botonSecundario: {
    backgroundColor: '#E5E5EA', // gris clarito
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginVertical: 10,
    alignItems: 'center',
  },
  textoBotonSecundario: {
    color: '#333',
    fontSize: 15,
  },


})