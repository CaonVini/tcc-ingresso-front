import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { ImageStyle } from 'react-native';



interface Styles {
  safeArea: ViewStyle;
  container: ViewStyle;
  header: ViewStyle;
  iconContainer: ViewStyle;
  icon: ViewStyle;
  sectionTitle: TextStyle;
  eventCard: ViewStyle;
  eventDetailsContainer: ViewStyle;
  eventName: TextStyle;
  eventDetails: TextStyle;
  button: ViewStyle;
  buttonIcon: TextStyle;
  eventList: ViewStyle;
  noEventsText: TextStyle;
  carouselItem: ViewStyle;
  carouselText: TextStyle;
  welcomeText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    gap: 15,
  },
  
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    gap: 3,
  } as ImageStyle,

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#6200EE',
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  eventDetailsContainer: {
    flex: 1,
    marginRight: 16,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventDetails: {
    fontSize: 14,
    color: '#555',
  },
  button: {
    padding: 8,
    backgroundColor: '#6200EE',
    borderRadius: 4,
  },
  buttonIcon: {
    color: '#fff',
    fontSize: 20,
  },
  eventList: {
    paddingBottom: 16,
  },
  noEventsText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
  carouselItem: {
    backgroundColor: '#ddd',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  carouselText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#6200EE',
  },
});

export default styles;
