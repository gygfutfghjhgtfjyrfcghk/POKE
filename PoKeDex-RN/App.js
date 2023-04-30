import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import POPOPO from './POPOPO';



export default function App() {
  return (
    <View style={styles.cont}>
      <StatusBar style="auto" />
        <Image source={require('./assets/International_Pokémon_logo.svg.png')}  style={{ width: 330, height: 120 , margin: 50,  padding: 0,  }} />

      

      <POPOPO style={styles.hey} />
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 100,
    backgroundColor: 'rgb(221,206,32)',
    background: 'linear-gradient(90deg, rgba(221,206,32,1) 0%, rgba(120,121,9,1) 24%, rgba(206,255,0,1 100%)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hey: {
    fontSize: 30,
    color: 'white',
    fontWeight: 900,
    fontwidth: 800,
    textAlign: 'center',
    margin: 10,
    padding: 10,
  }
});
