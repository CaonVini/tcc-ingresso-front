import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

interface Event {
  id: number;
  eventName: string;
  date: string;
  price: number;
  localEvent: string;
  tags: string;
}

const HomeScreen = () => {
  const [name, setName] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [purchasedEvents, setPurchasedEvents] = useState<number[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
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

        const userData = await userResponse.json();
        setName(userData.user?.name || 'Usuário');


        const eventsResponse = await fetch('http://192.168.0.139:3000/list/event', {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        if (!eventsResponse.ok) {
          const errorText = await eventsResponse.text();
          throw new Error(`Erro ao buscar eventos: ${errorText}`);
        }

        const eventsData = await eventsResponse.json();
        setEvents(eventsData);
        setFilteredEvents(eventsData); 


        await syncPurchasedEvents(userToken);
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Erro', error instanceof Error ? error.message : 'Ocorreu um erro inesperado');
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 30000);


    return () => clearInterval(intervalId);
  }, []);

  const syncPurchasedEvents = async (token: string) => {
    try {
      const purchasedResponse = await fetch('http://192.168.0.139:3000/list/event/user', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!purchasedResponse.ok) {
        const errorText = await purchasedResponse.text();
        throw new Error(`Erro ao buscar eventos comprados: ${errorText}`);
      }

      const purchasedData = await purchasedResponse.json();
      const purchasedEventIds = purchasedData.eventsParticipatings.map((event: { ticketId: number }) => event.ticketId);

      setPurchasedEvents(purchasedEventIds);
    } catch (error) {
      console.error('Error syncing purchased events:', error);
    }
  };

  const handlePurchase = async (eventId: number) => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (!userToken) {
        throw new Error('Token de usuário não encontrado. Faça login novamente.');
      }

      const response = await fetch(`http://192.168.0.139:3000/participate/event?ticketId=${eventId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${userToken}` },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao adquirir ingresso: ${errorText}`);
      }
      setPurchasedEvents((prev) => [...prev, eventId]);
      await syncPurchasedEvents(userToken);
    } catch (error) {
      console.error('Error purchasing ticket:', error);
      Alert.alert('Erro', error instanceof Error ? error.message : 'Ocorreu um erro inesperado');
    }
  };

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    if (text === '') {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) =>
        event.eventName.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  };

  const handleTagFilter = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
      setFilteredEvents(events);
    } else {
      setSelectedTag(tag);
      const filtered = events.filter((event) => event.tags.toUpperCase().includes(tag));
      setFilteredEvents(filtered);
    }
  };

  const renderEventItem = ({ item }: { item: Event }) => {
    const formattedDate = new Date(item.date).toLocaleDateString('pt-BR');
    const formattedPrice = `R$ ${(item.price / 100).toFixed(2).replace('.', ',')}`;
    const isPurchased = purchasedEvents.includes(item.id);

    return (
      <View style={styles.eventCard}>
        <View style={styles.eventDetailsContainer}>
          <Text style={styles.eventName}>{item.eventName}</Text>
          <Text style={styles.eventDetails}>{formattedDate}</Text>
          <Text style={styles.eventDetails}>{formattedPrice}</Text>
          <Text style={styles.eventDetails}>Local: {item.localEvent}</Text>
          <View style={styles.eventCardDetails}>
            <Text style={styles.eventTags}>{item.tags}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.button, isPurchased && { opacity: 0.5 }]}
          onPress={() => handlePurchase(item.id)}
          disabled={isPurchased}
        >
          <Icon name="shopping-cart" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Seja bem-vindo, {name}!</Text>
          <View>
            <Text style={styles.findText}>Encontre <Text style={styles.trandingText}>Eventos em Alta</Text></Text>
          </View>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar eventos..."
            value={searchTerm}
            onChangeText={handleSearch}
          />
          <Icon name="search" style={styles.searchIcon} />
        </View>

        <View style={styles.tagFilterContainer}>
          {['MUSICA', 'TEATRO', 'COMEDIA', 'PALESTRA'].map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[
                styles.tagButton,
                selectedTag === tag && { backgroundColor: '#3e0491' }
              ]}
              onPress={() => handleTagFilter(tag)}
            >
              <Text style={[
                styles.tagButtonText,
                selectedTag === tag && { color: '#fff' }
              ]}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Eventos Disponíveis</Text>
        {filteredEvents.length > 0 ? (
          <FlatList
            data={filteredEvents}
            renderItem={renderEventItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.eventList}
          />
        ) : (
          <Text style={styles.noEventsText}>Nenhum evento encontrado</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
