import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const UpdateUser = ({item}) => {
    const id  = item.params;
    console.log(id);
    return (
      <View style={styles.container}>
        <Text>register mai screen  here</Text>
        <Button
          title="Click Here"
          onPress={() => navigation.navigate("UpdateUser")}
        />
      </View>
    );
};

export default UpdateUser;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});