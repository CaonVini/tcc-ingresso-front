import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Adicione a importação do AsyncStorage

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<NavigationProp<any>>();

    async function getLogin() {
        try {
            setLoading(true);
            console.log('Iniciando login com dados:', { email, password });

            if (!email || !password) {
                console.warn('Campos obrigatórios não preenchidos');
                return Alert.alert('Atenção', 'Informe os campos obrigatórios!');
            }

            const response = await fetch('http://192.168.0.139:3000/auth/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            console.log('Status da resposta da API:', response.status);
            if (!response.ok) {
                console.error('Erro de resposta da API:', response.status, await response.text());
                throw new Error(`Erro na resposta da API: ${response.status}`);
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                console.log('Dados recebidos da API:', data);

                if (data.Acess) {
                    console.log('Login bem-sucedido');
                    Alert.alert('Sucesso', 'Login realizado com sucesso!');
                    if (typeof data.AcessToken === 'string' && data.AcessToken.trim() !== '') {
                        await AsyncStorage.setItem('userToken', data.AcessToken);
                        navigation.navigate('Home');
                    } else {
                        console.error('Token de acesso inválido ou não encontrado.');
                    }
                } else {
                    console.warn('Login falhou: E-mail ou senha inválidos');
                    Alert.alert('Atenção', 'E-mail ou senha inválidos!');
                }
            } else {
                console.error('Resposta da API não é JSON');
                throw new Error('A resposta da API não é JSON');
            }
        } catch (error) {
            console.error('Erro de conexão:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login.');
        } finally {
            setLoading(false);
            console.log('Carregando finalizado');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo!</Text>
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
                onPress={getLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>ENTRAR</Text>
                )}
            </TouchableOpacity>
            <Text style={styles.textBottom}>Não tem conta? <Text style={styles.textBottomCreate} onPress={() => navigation.navigate('Register')}>Crie agora</Text></Text>
        </View>
    );
}
