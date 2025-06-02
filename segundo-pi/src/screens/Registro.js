import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import {auth, db} from '../firebase/config'
import React, { Component} from 'react'

export default class Registro extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            username:'',
            error: false,

        }

    }

    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            if(user){
                this.props.navigation.navigate('Tab')
            }
        })
    }

    

    registrarUsuario(email, password, username){

        if (
            (
            email !== '' && 
            password !=='' &&
            username !=='')
            && 
            password.length>= 6
             && 
             email.includes('@') && 
            username.length > 3

            ){

                auth.createUserWithEmailAndPassword(email, password)
                .then(()=> {

                    db.collection('users')
                        .add({
                            owner: email,
                            createdAt: Date.now(),
                            updatedAt: Date.now(),
                            username: username,
            
                        })
                        .then(()=>{
                            this.props.navigation.navigate('Login')
                        })

                })
                .catch(err => console.log('err', err))


            
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

                <TextInput 

                    style={styles.input}
                    KeyboardType = 'default'
                    value={this.state.username}
                    onChangeText={(texto)=> this.setState({username: texto, error: false})}
                    placeholder='Ingresa Tu Username'
                
                />

                <TouchableOpacity style={styles.botonPrimario}
                 onPress={()=> this.registrarUsuario(this.state.email, this.state.password, this.state.username)}>
                    
                    <Text style={styles.textoBoton}>Registrarme</Text> 
                </TouchableOpacity>

                 <TouchableOpacity
                    style={styles.botonSecundario}
                    onPress={()=> this.props.navigation.navigate('Login')}>
                    <Text >
                    ¿Ya tenes cuenta? Logeate
                    </Text>
                            
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
        backgroundColor: '#8F9498',
        flex: 1,
    },
    titulo: {
        fontSize: 24,
        marginBottom: 10,
    },
    botonPrimario: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginVertical: 10,
        alignItems: 'center',},
    textoBoton: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',},

    botonSecundario: {
            backgroundColor: '#E5E5EA',
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