import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native'; // Importação do hook para detecção de foco
import styles from './styles';

interface Event {
  id: number;
  eventName: string;
  date: string;
  price: number;
  localEvent: string;
  tags: string;
}

const TicketScreen = () => {
  const [purchasedEvents, setPurchasedEvents] = useState<Event[]>([]);
  const isFocused = useIsFocused(); // Hook para saber se a tela está em foco

  const fetchPurchasedEvents = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('Token de usuário não encontrado. Faça login novamente.');
      }

      // Requisição para buscar os ticketIds comprados
      const response = await fetch('http://192.168.0.139:3000/list/event/user', {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao buscar ingressos: ${errorText}`);
      }

      const responseData = await response.json();
      const ticketIds = responseData.eventsParticipatings.map((event: { ticketId: number }) => event.ticketId);

      if (ticketIds.length === 0) {
        setPurchasedEvents([]);
        return;
      }

      // Requisição para buscar os eventos baseados nos ticketIds
      const eventsResponse = await fetch('http://192.168.0.139:3000/list/event', {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      if (!eventsResponse.ok) {
        const errorText = await eventsResponse.text();
        throw new Error(`Erro ao buscar eventos: ${errorText}`);
      }

      const eventsData = await eventsResponse.json();
      const events = eventsData.filter((event: Event) => ticketIds.includes(event.id));

      setPurchasedEvents(events);
    } catch (error) {
      console.error('Error fetching purchased events:', error);
      Alert.alert('Erro', error instanceof Error ? error.message : 'Ocorreu um erro inesperado');
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchPurchasedEvents(); // Atualiza os ingressos sempre que a página ganha foco
    }
  }, [isFocused]);

  const renderEventItem = ({ item }: { item: Event }) => {
    const formattedDate = new Date(item.date).toLocaleDateString('pt-BR');
    const formattedPrice = `R$ ${(item.price / 100).toFixed(2).replace('.', ',')}`;

    const showEventDetails = () => {
      Alert.alert(
        'Detalhes do Evento',
        `
        Nome: ${item.eventName}
        Data: ${formattedDate}
        Local: ${item.localEvent}
        Preço: ${formattedPrice}
        Tags: ${item.tags}
        `,
        [{ text: 'OK' }]
      );
    };

    return (
      <View style={styles.eventCard}>
        <View style={styles.eventDetailsContainer}>
          <Text style={styles.eventName}>{item.eventName}</Text>
          <Text style={styles.eventDetails}>{formattedDate}</Text>
          <Text style={styles.eventDetails}>{item.localEvent}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={showEventDetails}
        >
          <Icon name="info" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Seus Ingressos!</Text>
        </View>

        {purchasedEvents.length > 0 ? (
          <FlatList
            data={purchasedEvents}
            renderItem={renderEventItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.eventList}
          />
        ) : (
          <Text>Você ainda não comprou nenhum ingresso.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default TicketScreen;
