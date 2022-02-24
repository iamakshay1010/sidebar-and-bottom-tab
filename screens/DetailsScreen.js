import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DetailsScreen = () => {
    return (
      <View style={styles.container}>
        <Text>details  here</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});