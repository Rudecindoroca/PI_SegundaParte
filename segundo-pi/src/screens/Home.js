import React, {Component} from "react";
import {View,
     Text, 
     Image, 
     StyleSheet,
     TouchableOpacity} from 'react-native';

class Home extends Component{
    constructor(props){
        super(props)
    }

    redireccionar(nombrePantalla){
        this.props.navigation.navigate(nombrePantalla)
    }

    render(){
        return(
            <View style={styles.container}>

                  <TouchableOpacity
                    onPress={()=> this.redireccionar('Tab')}
                >
                    <Text>
                        Entrar a la aplicacion
                    </Text>

                </TouchableOpacity>
                  <Image
                    style={styles.logo}
                    source={require(`../../assets/logo.png`)}
                    resizeMode="cover"
                />

                 <Text style={styles.titulo}>Bienvenidos a Postea </Text>

            
            
            </View>
        )
    }
}

const styles = StyleSheet.create({

     container: {
        flex: 1,                   
        backgroundColor: '#d1d1d1',
        justifyContent: 'top, center',
        alignItems: 'center',
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
        width:200
  },

})
export default Home