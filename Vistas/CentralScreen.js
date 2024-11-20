import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Image, Dimensions, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function CentralScreen() {
  const navigation = useNavigation();

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      const response = await fetch('http://10.1.1.33/MateriasPendientes/Phps/Logout.php', {
        method: 'POST',
        headers: {  
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.exito) {
        // Si el cierre de sesión es exitoso, redirige a la pantalla de login
        Alert.alert('Éxito', data.exito, [{ text: 'OK', onPress: () => navigation.navigate('Login') }]);
      } else {
        Alert.alert('Error', data.error || 'Error desconocido al cerrar sesión');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  return (
    <ImageBackground 
      source={require('../Logos/fondo.jpg')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
        <View style={styles.header}>
          <Image 
            source={require('../Logos/logo_programacion.png')} 
            style={styles.cornerImage}  
          />
          <Text style={styles.headerText}>Central de Materias</Text>
          <Image 
            source={require('../Logos/LS/1.png')} 
            style={styles.cornerImage2} 
          />
        </View>

        <View style={styles.cardContainer}>
          {/* Tarjetas de navegación */}
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Previas')}>
            <Text style={styles.cardTitle}>Previas</Text>
            <Text style={styles.cardText}>En este apartado se encuentran tus materias previas, las cuales podrás ver e interactuar con detalles.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Recursar')}>
            <Text style={styles.cardTitle}>Recursar</Text>
            <Text style={styles.cardText}>En este apartado podrás ver las materias que tengas que recursar durante el año lectivo en curso o siguiente.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Intensificar')}>
            <Text style={styles.cardTitle}>Intensificar</Text>
            <Text style={styles.cardText}>En este apartado se encuentran tus materias a intensificar, las cuales podrás ver detalladamente.</Text>
          </TouchableOpacity>
        </View>

        {/* Botón de Cerrar Sesión */}
        <View style={styles.botonContainer}>
          <TouchableOpacity 
            style={styles.boton}
            onPress={handleLogout}
          >
            <Text style={styles.botonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© Materias Pendientes - Todos los derechos reservados.</Text>
        </View>

      </ScrollView>

      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const fontSize = width < 350 ? 20 : // Para pantallas muy pequeñas
                 width < 400 ? 15 : // Para pantallas pequeñas
                 width < 600 ? 14 : // Para pantallas medianas
                 26;                // Para pantallas grandes

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Math.min(width * 0.03, 15),
    marginTop: Math.min(width * 0.05, 25),
    width: '100%',
  },
  headerText: {
    fontSize: width < 350 ? 20 : // Para pantallas muy pequeñas
    width < 400 ? 22 : // Para pantallas pequeñas
    width < 600 ? 20 : // Para pantallas medianas
    26 ,  // Aplicación de la condicional
    fontWeight: 'bold',
    color: '#000000',
    marginVertical: Math.min(width * 0.025, 15),
    textAlign: 'center',
    width: '68%',
  },
  cornerImage: {
    width: Math.min(width * 0.16, 60),
    height: Math.min(width * 0.15, 56),
  },
  cornerImage2: {
    width: Math.min(width * 0.16, 60),
    height: Math.min(width * 0.15, 56),
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: Math.min(width * 0.05, 20),
    paddingVertical: Math.min(width * 0.03, 15),
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: Math.min(width * 0.05, 20),
    borderRadius: 10,
    marginBottom: Math.min(width * 0.05, 20),
    width: '100%',
  },
  cardTitle: {
    fontSize: width < 350 ? 20 : // Para pantallas muy pequeñas
    width < 400 ? 19 : // Para pantallas pequeñas
    width < 600 ? 24 : // Para pantallas medianas
    width < 800 ? 50 :
    70 ,  // Aplicación de la condicional  // Aplicación de la condicional
    fontWeight: 'bold',
    marginBottom: Math.min(width * 0.02, 10),
    textAlign: 'center',
  },
  cardText: {
    fontSize: width < 350 ? 16 : // Para pantallas muy pequeñas
             width < 400 ? 18 : // Para pantallas pequeñas
             width < 600 ? 16 : // Para pantallas medianas
             22,               // Para pantallas grandes
  },
  botonContainer: {
    marginBottom: Math.min(width * 0.1, 40),
  },
  boton: {
    backgroundColor: '#030000',
    paddingVertical: Math.min(width * 0.03, 15),
    paddingHorizontal: Math.min(width * 0.08, 30),
    borderRadius: 20,
    width: '70%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: Math.min(width * 0.05, 20),
  },
  botonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width < 350 ? 16 : // Para pantallas muy pequeñas
             width < 400 ? 18 : // Para pantallas pequeñas
             width < 600 ? 16 : // Para pantallas medianas
             22,               // Para pantallas grandes
    textAlign: 'center',
  },
  footer: {
    padding: Math.min(width * 0.03, 15),
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 'auto',
  },
  footerText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: fontSize,  // Aplicación de la condicional
  },

  // Media Queries
  '@media (max-width: 375)': {
    headerText: {
      fontSize: width * 0.05,
    },
    cardTitle: {
      fontSize: width * 0.065,
    },
    botonText: {
      fontSize: width * 0.04,
    },
    card: {
      padding: width * 0.04,
    },
    footerText: {
      fontSize: width * 0.04,
    },
  },

  '@media (max-width: 320)': {
    headerText: {
      fontSize: width * 0.045,
    },
    cardTitle: {
      fontSize: width * 0.06,
    },
    botonText: {
      fontSize: width * 0.035,
    },
    footerText: {
      fontSize: width * 0.035,
    },
    card: {
      padding: width * 0.03,
    },
  },
});
