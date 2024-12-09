import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0, // Adicione o padding necessário para a área segura
    },
    safeAreaContainer: {
        flex: 1,
        paddingTop: 20, // Ajuste esse valor de acordo com a altura da barra de status do dispositivo
        paddingBottom: 20, // Ajuste para a altura da barra de navegação, se necessário
        paddingLeft: 10, // Adicione padding lateral, se necessário
        paddingRight: 10, // Adicione padding lateral, se necessário
    },
    content: {
        flex: 1,
        marginTop: 20, // Use isso para mover o conteúdo para baixo e evitar que fique escondido atrás da área segura
    },
});

export default styles;
