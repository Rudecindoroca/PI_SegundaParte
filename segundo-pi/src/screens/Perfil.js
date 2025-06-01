import { View, Text, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'

export default class Perfil extends Component {

  constructor(props){
    super(props)
    this.state = {
      username: '',
    }
  }

  componentDidMount(){
     const user = auth.currentUser;
        if(user){
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
    <View>
    
      <Text> Tu Perfil</Text>
       <Text>Usuario: {this.state.username}</Text>

      <TouchableOpacity onPress={()=> this.logout()}>
        <Text>Cerrar Sesion</Text>
      </TouchableOpacity>
    </View>
  )
  }
  
}

