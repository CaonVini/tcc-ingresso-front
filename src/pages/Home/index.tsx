import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

export default function HomePage() {
    const [userName, setUserName] = useState('');

    useEffect(() => {
        async function fetchUserData() {
            try {
                const userToken = await AsyncStorage.getItem('userToken');
                if (!userToken) {
                    throw new Error('Token não encontrado');
                }

                const response = await fetch('http://192.168.0.139:3000/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Erro na resposta da API: ' + response.status);
                }

                const data = await response.json();
                console.log('Dados recebidos da API:', data);

                if (data && data.user && data.user.name) {
                    setUserName(data.user.name);
                } else {
                    console.error('Nome do usuário não encontrado na resposta');
                }
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
                Alert.alert('Erro', 'Ocorreu um erro ao buscar os dados do usuário.');
            }
        }

        fetchUserData();
    }, []);

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <Text style={styles.content}>Seja bem-vindo {userName}!</Text>
            </View>
        </SafeAreaView>
    );
}
