import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

export default function Mainpage({navigation}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('TakePhotoNavigation')}>
                <Text style={styles.btn_text}>Rasmga olish</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('RecordVideoNavigation')}>
                <Text style={styles.btn_text}>Videoga olish</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn: {
      backgroundColor: 'dodgerblue',
      padding: 20,
      marginBottom: 20,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 7,
    },
    btn_text: {
      fontWeight: '600',
      color: 'white',
    }
  });