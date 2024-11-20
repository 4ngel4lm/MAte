import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, TouchableOpacity, ImageBackground, Image, TextInput, Dimensions, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (usuario.length === 0 || contrasena.length === 0) {
      Alert.alert('Error', 'Usuario o contraseña sin completar');
      return;
    }

    try {
      const response = await fetch('http://10.1.1.33/MateriasPendientes/Phps/Login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'usuario=' + encodeURIComponent(usuario) + '&contrasena=' + encodeURIComponent(contrasena),
      });

      const data = await response.json();

      if (data.exito) {
        Alert.alert(data.exito);
        navigation.navigate('Central');
      } else {
        Alert.alert('Error', data.error || 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  return (
    <ImageBackground 
      source={require('../Logos/fondo.jpg')}
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.containerAvoid}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.scrollContainer}>
            <View style={styles.header}>
              <Image 
                source={require('../Logos/logo_programacion.png')} 
                style={styles.cornerImage}  
                resizeMode="contain"
              />
              <Text style={styles.headerText}>Inicio de Sesión</Text>
              <Image 
                source={require('../Logos/LS/1.png')} 
                style={styles.cornerImage2} 
                resizeMode="contain"
              />
            </View>

            <View style={styles.container}>
              <Image
                source={require('../Logos/logo_escuela.png')}
                style={styles.imagenprin}
                resizeMode="contain"
              />
              <Text style={styles.titulo}>Materias Pendientes</Text>

              <Text style={styles.indicadorCampo}>Usuario*</Text>
              <View style={styles.inputContainer}>
                <TextInput 
                  placeholder="Ingrese su Usuario" 
                  placeholderTextColor="#FFFFFF"
                  style={styles.input} 
                  keyboardType="numeric"
                  value={usuario}
                  onChangeText={setUsuario}
                />
              </View>

              <Text style={styles.indicadorCampo2}>Contraseña*</Text>
              <View style={styles.inputContainer}>
                <TextInput 
                  placeholder="Ingrese su Contraseña" 
                  placeholderTextColor="#FFFFFF"
                  secureTextEntry={!showPassword} 
                  style={styles.input}
                  value={contrasena}
                  onChangeText={setContrasena}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.showPasswordButton}>
                  <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="#FFF" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
                style={styles.boton}
                onPress={handleLogin}
              >
                <Text style={styles.botonText}>Iniciar Sesión</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>© Materias Pendientes - Todos los derechos reservados.</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  containerAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingBottom: Math.min(width * 0.05, 20),
    width: '100%',
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
    fontSize: Math.min(width * 0.06, 24),
    fontWeight: 'bold',
    color: '#000000',
  },
  cornerImage: {
    width: Math.min(width * 0.16, 60),
    height: Math.min(width * 0.15, 56),
  },
  cornerImage2: {
    width: Math.min(width * 0.15, 56),
    height: Math.min(width * 0.15, 56),
  },
  imagenprin: {
    width: Math.min(width * 0.8, 300),
    height: Math.min(width * 0.7, 262),
    marginBottom: Math.min(width * 0.015, 10),
    left: width < 350 ? 20 : width < 400 ? 1 : width < 650 ? 16 : 26,
  },
  container: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    padding: Math.min(width * 0.05, 20),
    marginHorizontal: Math.min(width * 0.05, 20),
    marginTop: Math.min(height * 0.02, 40),
    borderRadius: 10,
    width: '90%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  titulo: {
    fontSize: width < 350 ? 20 : width < 400 ? 22 : width < 600 ? 24 : 26,
    fontWeight: 'bold',
    marginVertical: Math.min(width * 0.025, 15),
    textAlign: 'center',
    width: '100%',
  },
  indicadorCampo: {
    marginTop: Math.min(width * 0.025, 15),
    fontSize: Math.min(width * 0.045, 18),
    fontWeight: 'bold',
  },
  indicadorCampo2: {
    fontSize: Math.min(width * 0.045, 18),
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    flex: 1,
    height: Math.min(height * 0.05, 45),
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: Math.min(height * 0.015, 10),
    paddingHorizontal: Math.min(width * 0.03, 15),
    borderRadius: 10,
    color: '#fff',
    backgroundColor: '#020c57',
  },
  showPasswordButton: {
    position: 'absolute',
    right: Math.min(width * 0.03, 15),
    top: '15%',
    zIndex: 1,
  },
  boton: {
    backgroundColor: '#030000',
    paddingVertical: Math.min(width * 0.03, 15),
    paddingHorizontal: Math.min(width * 0.08, 30),
    borderRadius: 20,
    width: '70%',
    maxWidth: 300,
    alignSelf: 'center',
    marginTop: Math.min(width * 0.05, 20),
  },
  botonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: Math.min(width * 0.045, 18),
    textAlign: 'center',
  },
  footer: {
    padding: Math.min(width * 0.04, 15),
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: width < 350 ? 20 : width < 400 ? 80 : width < 600 ? 94 : 26,
  },
  footerText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: Math.min(width * 0.035, 14),
  },
});
