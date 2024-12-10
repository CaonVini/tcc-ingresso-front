import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

interface Styles {
  safeArea: ViewStyle;
  container: ViewStyle;
  header: ViewStyle;
  profilePicture: ImageStyle;
  username: TextStyle;
  email: TextStyle;
  eventContainer: ViewStyle;
  sectionTitle: TextStyle;
  eventCount: TextStyle;
  logoutButton: ViewStyle;
  logoutButtonText: TextStyle;
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
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#6200EE',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  email: {
    fontSize: 16,
    color: '#777777',
    marginBottom: 10,
  },
  eventContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignContent: 'center',
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200EE',
    marginBottom: 8,
    textAlign: 'center',
  },
  eventCount: {
    fontSize: 16,
    color: '#333333',
    margin: 1,
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#FF4C4C',
    borderRadius: 8,
    alignItems: 'center',
    elevation: 3,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;