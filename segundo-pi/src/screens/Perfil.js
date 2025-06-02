import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'

export default class Perfil extends Component {

  constructor(props){
    super(props)
    this.state = {
      username: '',
      email: ''
    }
  }

  componentDidMount(){
     const user = auth.currentUser;
        if(user){
            this.setState({ email: user.email });
            db.collection('users')
              .where('owner', '==', user.email)
              .onSnapshot((docs) => {
                  docs.forEach(doc => {
                      this.setState({ username: doc.data().username })
                  })
              })
        }
    
  }

  logout(){
    auth.signOut().then(()=> this.props.navigation.navigate('Registro'))
    .catch(err=> console.log('err', err))
  }

  render(){

    return (
    <View style={styles.container}>
    
      <Text> Tu Perfil</Text>
       <Text>Usuario: {this.state.username}</Text>
       <Text>Email: {this.state.email}</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={()=> this.logout()}>
        <Text style={styles.logoutButtonText}>Cerrar Sesion</Text>
      </TouchableOpacity>
    </View>
  )
  }
  
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#8F9498',
        alignItems: 'center',
        paddingTop: 40,
    },
  logoutButton: {
  backgroundColor: '#6C4FC2', 
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: 25,
  alignItems: 'center',
  marginTop: 20,
  shadowColor: '#000',
  shadowOpacity: 0.3,
  shadowRadius: 4,

},
logoutButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
  letterSpacing: 1,
},


})

