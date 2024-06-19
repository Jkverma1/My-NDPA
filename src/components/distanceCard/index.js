import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DistanceCard = ({ result_dur_dis, setModefunc, allinfo, switchroute, type, coordinates }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Distance Card</Text>
      <Text>Duration: {result_dur_dis.duration}</Text>
      <Text>Distance: {result_dur_dis.distance}</Text>
      <Text>Additional Info: {allinfo}</Text>
      <Text>Mode: {type ? 'Driving' : 'Transit'}</Text>
      <Text>Coordinates: {coordinates.join(', ')}</Text>
      <Button title="Switch Mode" onPress={setModefunc} />
      <Button title="Switch Route" onPress={switchroute} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default DistanceCard;
