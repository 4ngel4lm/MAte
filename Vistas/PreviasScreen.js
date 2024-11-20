import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Image, Dimensions, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function PreviasScreen() {
  const navigation = useNavigation();
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    const obtenerMaterias = async () => {
      try {
        setMaterias([]);
        const response = await fetch('http://10.1.1.33/MateriasPendientes/Phps/Pedir_Previas.php');
        
        if (!response.ok) {
          Alert.alert(
            'Error de Conexión',
            'No se pudo conectar con el servidor',
            [
              {
                text: 'Reintentar',
                onPress: () => obtenerMaterias()
              },
              {
                text: 'Cancelar',
                style: 'cancel'
              }
            ]
          );
          return;
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          Alert.alert(
            'Error de Datos',
            'El formato de datos recibido no es válido',
            [{ text: 'OK' }]
          );
          return;
        }

        if (data.length === 0) {
          Alert.alert(
            'Sin Materias',
            'No hay materias previas disponibles',
            [{ text: 'OK' }]
          );
        }

        setMaterias(data);

      } catch (error) {
        console.error('Error detallado:', error);
        Alert.alert(
          'Error',
          'No se pudieron cargar las materias',
          [
            {
              text: 'Reintentar',
              onPress: () => obtenerMaterias()
            },
            {
              text: 'Cancelar',
              style: 'cancel'
            }
          ]
        );
      }
    };

    obtenerMaterias();
  }, []);

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
          <Text style={styles.headerText}>Materias previas</Text>
          <Image 
            source={require('../Logos/LS/1.png')} 
            style={styles.cornerImage2} 
          />
        </View>

        <View style={styles.cardContainer}>
          {materias.map((materia, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.card} 
              onPress={() => navigation.navigate(`Previas${index + 1}Screen`)}
            >
              <Text style={styles.cardTitle}>{materia.nombre_materia}</Text>
              <Text style={styles.cardText}>Periodo de inscripción: 9/12 - 16/12</Text>
              <Text style={styles.cardText2}>Cerrado.</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© Materias Pendientes - Todos los derechos reservados.</Text>
        </View>
      </ScrollView>

      <StatusBar style="auto" />
    </ImageBackground>
  );
}

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
    fontSize: width < 350 ? 20 : // Para pantallas pequeñas
             width < 400 ? 22 : 
             width < 600 ? 24 : 26, // Para pantallas grandes
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
    fontSize: width < 350 ? 20 : // Para pantallas pequeñas
             width < 400 ? 19 : 
             width < 600 ? 24 : 50,  // Ajuste a pantallas grandes
    fontWeight: 'bold',
    marginBottom: Math.min(width * 0.02, 10),
    textAlign: 'center',
  },
  cardText: {
    fontSize: width < 350 ? 16 : 
             width < 400 ? 18 : 
             width < 600 ? 16 : 22,  // Para pantallas grandes
  },
  cardText2: {
    fontSize: width < 350 ? 18 : 
             width < 400 ? 20 : 
             width < 600 ? 20 : 24,
    fontWeight: 'bold',
    color: 'red',
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
    fontSize: width < 350 ? 16 : 
             width < 400 ? 16 : 
             width < 600 ? 16 : 22, // Para pantallas grandes
  },

  // Media Queries
  '@media (max-width: 375)': { 
    headerText: {
      fontSize: width * 0.05,
    },
    cardTitle: {
      fontSize: width * 0.065,
    },
    cardText: {
      fontSize: width * 0.035,
    },
    cardText2: {
      fontSize: width * 0.04,
    },
    footerText: {
      fontSize: width * 0.04,
    },
    card: {
      padding: width * 0.04,
    },
  },
  
  '@media (max-width: 320)': { 
    headerText: {
      fontSize: width * 0.045,
    },
    cardTitle: {
      fontSize: width * 0.06,
    },
    cardText: {
      fontSize: width * 0.03,
    },
    cardText2: {
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
