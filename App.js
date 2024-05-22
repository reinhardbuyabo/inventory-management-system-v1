import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// postgres
import { Client } from 'pg';
import { useState } from 'react';

export default function App() {
  const [initial, setInitial] = useState({});
  // postgres

  console.log()
  const client = new Client({
    host: "localhost",
    user: "postgres",
    port: "*",
    password: "*",
    database: "inventory_management"
  });

  client.connect();

  client.query("Select * from shoes", (err, res) => {
    if (!err) {
      console.log(res.rows);

      setInitial(res.rows);
    } else {
      console.log(err.message);
    }
    client.end;
  })

  return (
    <View style={styles.container}>
      <Text>The shoe is: {initial['shoe_name']}</Text>
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
