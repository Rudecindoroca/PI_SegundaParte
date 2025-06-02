import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/config'

export default class Perfil extends Component {

  constructor(props){
    super(props)
    this.state = {
      username: '',
      email: '',
      misPosts: [],
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

      db.collection('posts')
        .where('owner', '==', user.email)
        .orderBy('createdAt', 'desc')
        .onSnapshot((docs) => {
          let postsUsuario = [];
          docs.forEach(doc => {
            postsUsuario.push({
              id: doc.id,
              data: doc.data()
            });
          });
          console.log('Posteos que llegan al perfil:', postsUsuario); 
          this.setState({ misPosts: postsUsuario });
        });
    }
    
  }

  logout(){
    auth.signOut()
    .then(()=> this.props.navigation.navigate('Registro'))
    .catch(err=> console.log('err', err))
  }

  borrarPost(id) {
    db.collection('posts')
      .doc(id)
      .delete()
      .then(() => console.log('Post eliminado desde Perfil'))
      .catch(err => console.log(err));
  }

  formatearFecha(timestamp) {
    const fecha = new Date(timestamp);
    return `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth()+1).toString().padStart(2, '0')}/${fecha.getFullYear()} - ${fecha.getHours().toString().padStart(2, '0')}:${fecha.getMinutes().toString().padStart(2, '0')}`;
  }
  

  render(){
    return (
      <View style={styles.container}>
    
        <Text style={styles.titulo}>Tu Perfil</Text>
        <Text style={styles.texto}>Usuario: {this.state.username}</Text>
        <Text style={styles.texto}>Email: {this.state.email}</Text>

        <Text style={styles.subtitulo}>Tus posteos:</Text>

        {this.state.misPosts.length === 0 ? (
          <Text style={{ color: 'white', marginTop: 10 }}>Todavía no tenés posteos.</Text>
        ) : (
          <FlatList
            data={this.state.misPosts}
            keyExtractor={(item) => item.id}
            style={{ width: '100%' }}
            contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}
            renderItem={({ item }) => (
              <View style={styles.posteo}>
                <Text style={styles.textoPost}>{item.data.texto}</Text>
                <Text style={styles.fecha}>{this.formatearFecha(item.data.createdAt)}</Text>
                <TouchableOpacity onPress={() => this.borrarPost(item.id)}>
                  <Text style={styles.eliminar}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      
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
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black'
  },
  texto: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5
  },
  subtitulo: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'flex-start',
    marginLeft: 20,
    color: 'black'
  },
  posteo: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    width: '90%'
  },
  textoPost: {
    fontSize: 16,
    marginBottom: 5
  },
  fecha: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5
  },
  eliminar: {
    color: 'red',
    fontWeight: 'bold'
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
});
