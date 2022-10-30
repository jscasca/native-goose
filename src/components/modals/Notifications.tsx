import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Notifications = (props) => {

  const styles= StyleSheet.create({
    container: {
      width: '80%',
      backgroundColor: '#ffff00'
    }
  });

  return <View style={styles.container}>
    <Text>Notifications</Text>
  </View>;
};

export default Notifications;