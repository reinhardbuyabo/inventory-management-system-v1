import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// postgres
import { useEffect, useState } from 'react';


export default function App() {
  const [initial, setInitial] = useState({});
  // postgres

  const getShoesFromApiAsync = async () => {
    try {
      const response = await fetch(
        'http://192.168.0.22:3000/shoes',
      );
      const json = await response.json();
      console.log(`From line 18: ${JSON.stringify(json)}`);
      setInitial(json);
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  console.log(`From line 25 ${JSON.stringify(initial)}`);
  useEffect(() => {
    getShoesFromApiAsync();
  }, []);

  return (
    <View style={styles.container}>
      <Text>The shoe is: {initial[0]['shoe_name']}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


