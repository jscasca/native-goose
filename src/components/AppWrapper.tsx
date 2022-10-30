import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Theme } from "../assets/Styles";
import { Application } from "../types";
import Lists from "./apps/lists/Lists";
import Settings from "./apps/settings/Settings";

const AppWrapper = (props) => {

  const getCurrentApp = (name: string, opts: any = {}) => {
    if (name === Application.Lists) {
      return <Lists></Lists>
    }
    if (name === Application.Settings) {
      return <Settings></Settings>
    }
  };

  const currentApp = getCurrentApp(props.application);

  const styles= StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: Theme.color.emptyBackground
    }
  });

  return <View style={styles.container}>
    {/* <Text>{props.application}</Text> */}
    {currentApp}
  </View>;
};

export default AppWrapper;