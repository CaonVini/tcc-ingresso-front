import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation, NavigationProp } from '@react-navigation/native';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<NavigationProp<any>>();

    async function handleRegister() {
        try {
            setLoading(true);
    
            if (!name || !email || !password) {
                return Alert.alert('Atenção', 'Todos os campos são obrigatórios!');
            }
    
            // Use o IP local do servidor
            console.log('Chamando a API em: http://192.168.0.139:3000/create/user');
    
            const response = await fetch('http://192.168.0.139:3000/create/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
    
            if (!response.ok) {
                console.error('Erro na resposta da API:', response.status, response.statusText);
                throw new Error(`Erro: ${response.status} ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log('Resposta da API:', data);
    
            if (response.status === 201) {
                navigation.reset({ routes: [{ name: 'Login' }] });
            } else {
                Alert.alert('Erro', data.msgError || 'Erro desconhecido');
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao tentar se conectar com o servidor.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crie sua conta</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Digite seu nome"
                placeholderTextColor="#aaa"
            />
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Digite seu e-mail"
                keyboardType="email-address"
                placeholderTextColor="#aaa"
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Digite sua senha"
                    secureTextEntry={showPassword}
                    placeholderTextColor="#aaa"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                    <MaterialIcons name={showPassword ? "visibility-off" : "visibility"} size={24} color="#333" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={handleRegister}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>REGISTRAR</Text>
                )}
            </TouchableOpacity>
            <Text style={styles.textBottom}>Já tem uma conta? <Text style={styles.textBottomCreate} onPress={() => navigation.navigate('Login')}>Faça login</Text></Text>
        </View>
    );
}
