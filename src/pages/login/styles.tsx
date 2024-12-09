import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    input: {
        width: width * 0.8, // 80% da largura da tela
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginBottom: 15,
        fontSize: 16,
    },
    passwordContainer: {
        position: 'relative',
        width: width * 0.8, // 80% da largura da tela
        marginBottom: 15,
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    button: {
        width: width * 0.8, // 80% da largura da tela
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    textBottom: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 14,
    },
    textBottomCreate: {
        color: '#007BFF',
        fontWeight: 'bold',
    },
});
