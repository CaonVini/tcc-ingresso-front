import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

interface Styles {
  safeArea: ViewStyle;
  container: ViewStyle;
  header: ViewStyle;
  iconContainer: ViewStyle;
  icon: ImageStyle;
  sectionTitle: TextStyle;
  eventCard: ViewStyle;
  eventDetailsContainer: ViewStyle;
  eventName: TextStyle;
  eventDetails: TextStyle;
  button: ViewStyle;
  buttonIcon: TextStyle;
  eventList: ViewStyle;
  noEventsText: TextStyle;
  welcomeText: TextStyle;
  searchContainer: ViewStyle;
  searchIcon: ImageStyle;
  searchInput: TextStyle;
  findText: TextStyle;
  trandingText: TextStyle;
  eventTags: TextStyle;
  eventCardDetails: ViewStyle;
  tagFilterContainer: ViewStyle;
  tagButton: ViewStyle;
  tagButtonText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  header: {
    marginBottom: 16,
    marginTop: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 8,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
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
    color: '#333333',
  },
  eventDetails: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: '#6200EE',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    color: '#ffffff',
    fontSize: 20,
  },
  eventList: {
    paddingBottom: 16,
  },
  noEventsText: {
    fontSize: 16,
    color: '#777777',
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
    marginBottom: 12,
    marginTop: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    width: 10,
    height: 10,
    tintColor: '#777777',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  findText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
  },
  trandingText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#6200EE',
    textAlign: 'left',
  },
  eventTags: {
    backgroundColor: '#6200EE',
    color: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    textAlign: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  eventCardDetails: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  tagFilterContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginBottom: 16,
    justifyContent: 'center',
  },
  tagButton: {
    backgroundColor: '#6200EE',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
    alignItems: 'center',
  },
  tagButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default styles;
