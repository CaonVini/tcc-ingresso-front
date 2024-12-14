import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Image, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import styles from './styles';


type RootStackParamList = {
  Login: undefined;
};

const ProfilePage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<{ name: string; email: string }>({ name: '', email: '' });
  const [eventCount, setEventCount] = useState<number>(0);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchUserData = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (!userToken) {
          throw new Error('Token de usuário não encontrado. Faça login novamente.');
        }


        const userResponse = await fetch('http://192.168.0.139:3000/me', {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        if (!userResponse.ok) {
          const errorText = await userResponse.text();
          throw new Error(`Erro ao buscar dados do usuário: ${errorText}`);
        }

        const { user } = await userResponse.json();
        setUserInfo({
          name: user.name,
          email: user.email,
        });

        await fetchEventCount(userToken);

        intervalId = setInterval(() => fetchEventCount(userToken), 10000);
      } catch (error) {
        console.error('Erro ao buscar dados do perfil:', error);
        Alert.alert('Erro', error instanceof Error ? error.message : 'Ocorreu um erro inesperado');
      }
    };

    const fetchEventCount = async (token: string) => {
      try {
        const eventsResponse = await fetch('http://192.168.0.139:3000/list/event/user', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!eventsResponse.ok) {
          const errorText = await eventsResponse.text();
          throw new Error(`Erro ao buscar eventos: ${errorText}`);
        }

        const { eventsParticipatings } = await eventsResponse.json();
        setEventCount(eventsParticipatings.length);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    };

    fetchUserData();


    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
      Alert.alert('Erro', 'Não foi possível sair da conta. Tente novamente.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/profile-icon.jpg')}
            style={styles.profilePicture}
          />
          <Text style={styles.username}>{userInfo.name}</Text>
          <Text style={styles.email}>{userInfo.email}</Text>
        </View>

        <View style={styles.eventContainer}>
          <Text style={styles.sectionTitle}>Ingressos Adquiridos:</Text>
          <Text style={styles.eventCount}>{eventCount > 0 ? eventCount : 'Nenhum evento ainda'}</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfilePage;
