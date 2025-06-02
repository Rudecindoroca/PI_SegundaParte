import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { db, auth } from '../firebase/config';
import { FontAwesome } from '@expo/vector-icons';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            posts: []
        };
    }

    componentDidMount() {
        this.traerPosts();
    }

    traerPosts() {
        db.collection('posts')
            .orderBy('createdAt', 'desc')
            .onSnapshot((docs) => {
                let postsActuales = [];
                docs.forEach(doc => {
                    postsActuales.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                this.setState({ posts: postsActuales });
            });
    }

    subirPost() {
        if (this.state.input.trim() === '') return;

        db.collection('posts').add({
            texto: this.state.input,
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            likes: []
        })
        .then(() => this.setState({ input: '' }))
        .catch(err => console.log(err));
    }

    borrarPost(id) {
        db.collection('posts')
            .doc(id)
            .delete()
            .then(() => console.log('Post eliminado'))
            .catch(err => console.log(err));
    }

    likePost(id, currentLikes = []) {
        const userEmail = auth.currentUser.email;
        const yaLikeo = currentLikes.includes(userEmail);

        const nuevosLikes = yaLikeo
            ? currentLikes.filter(email => email !== userEmail)
            : [...currentLikes, userEmail]; //Tengo mis dudas sobre si poner o no los '...'

        db.collection('posts')
            .doc(id)
            .update({
                likes: nuevosLikes
            })
            .catch(err => console.log(err));
    }

    redireccionar(nombrePantalla) {
        this.props.navigation.navigate(nombrePantalla);
    }

    formatearFecha(timestamp) {
        const fecha = new Date(timestamp); //Quiero simplificar esta parte
        return `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth()+1).toString().padStart(2, '0')}/${fecha.getFullYear()} - ${fecha.getHours().toString().padStart(2, '0')}:${fecha.getMinutes().toString().padStart(2, '0')}`;
    }

    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity onPress={() => this.redireccionar('Tab')}>
                    <Text>Entrar a la aplicacion</Text>
                </TouchableOpacity>

                <Image
                    style={styles.logo}
                    source={require(`../../assets/logo.png`)}
                    resizeMode="cover"
                />

                <Text style={styles.titulo}>Bienvenidos a Postea</Text>

                <TextInput
                    style={styles.posteo}
                    keyboardType='default'
                    value={this.state.input}
                    onChangeText={(texto) => this.setState({ input: texto })}
                    placeholder='Crear Post'
                />

                <TouchableOpacity onPress={() => this.subirPost()} style={styles.botonSubir}>
                    <Text style={styles.textoBoton}>Subir Post</Text>
                </TouchableOpacity>

                <Text style={styles.tituloSeccion}>Posteos:</Text>

                <FlatList
                    data={this.state.posts}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.posteoContainer}>
                            <Text style={styles.autor}>{item.data.owner}</Text>
                            <Text style={styles.fecha}>{this.formatearFecha(item.data.createdAt)}</Text>
                            <Text style={styles.textoPost}>{item.data.texto}</Text>

                            <View style={styles.acciones}>
                                <TouchableOpacity onPress={() => this.likePost(item.id, item.data.likes)} style={styles.like}>
                                    {item.data.likes.includes(auth.currentUser.email) ? (
                                        <FontAwesome name='heart' size={20} color='purple' /> //Esto es un chiche, podemos simplificarlo, lo entiendo perfecto igual
                                    ) : (
                                        <FontAwesome name='heart-o' size={20} color='purple' />
                                    )}
                                    <Text style={styles.contadorLikes}>{item.data.likes.length}</Text>
                                </TouchableOpacity>

                                {item.data.owner === auth.currentUser.email && (
                                    <TouchableOpacity onPress={() => this.borrarPost(item.id)}>
                                        <Text style={styles.eliminar}>Eliminar</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d1d1d1',
        alignItems: 'center',
        paddingTop: 40,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
        textAlign: 'left',
    },
    logo: {
        height: 200,
        width: 200,
    },
    posteo: {
        borderWidth: 1,
        borderColor: 'purple',
        textAlign: "center",
        width: '90%',
        marginBottom: 10,
        padding: 8,
        borderRadius: 6,
        backgroundColor: '#fff'
    },
    tituloSeccion: {
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'flex-start',
        marginLeft: 15
    },
    posteoContainer: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 5,
        borderRadius: 8,
        width: '90%'
    },
    autor: {
        fontWeight: 'bold',
        marginBottom: 2
    },
    fecha: {
        fontSize: 12,
        color: '#555',
        marginBottom: 5
    },
    textoPost: {
        fontSize: 16,
        marginBottom: 10
    },
    acciones: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    like: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    contadorLikes: {
        marginLeft: 5
    },
    eliminar: {
        color: 'red'
    },
    botonSubir: {
        backgroundColor: 'purple',
        padding: 10,
        borderRadius: 6,
        marginBottom: 10
    },
    textoBoton: {
        color: '#fff',
        fontWeight: 'bold'
    }
});

export default Home;