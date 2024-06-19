import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StepBox = ({ step, description }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.step}>{step}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  step: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  description: {
    flex: 1,
    fontSize: 16,
  },
});

export default StepBox;
