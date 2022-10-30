import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Theme } from "../../assets/Styles";
import { Application } from "../../types";
import Icon from 'react-native-vector-icons/MaterialIcons';

const CardApp = (props) => {
  return <View style={styles.card}>
    <TouchableOpacity style={styles.cardContent} onPress={props.onPress}>
    {/*  */}
      <Text style={styles.cardText}>{props.app}</Text>
      <Icon name={props.icon} size={36} color={Theme.color.text_main} />
    </TouchableOpacity>
  </View>
}

const AppMenu = (props) => {

  const handleSelection = (sel) => {
    console.log('selecting app: ', sel);
    props.select(sel);
  };

  return <View style={styles.container}>
    {/* <Text style={styles.header}>Menu</Text> */}
    <CardApp app={'Lists'} icon='playlist-add-check' onPress={() => handleSelection(Application.Lists)} />
    <CardApp app={'Boards'} icon='kitchen' onPress={() => handleSelection(Application.Boards)} />
    <CardApp app={'Settings'} icon='settings' onPress={() => handleSelection(Application.Settings)} />
    <View style={styles.footer} ></View>
  </View>;
};

const styles= StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    // backgroundColor: '#ffff00'
  },
  header: {
    textAlign: 'center'
  },
  footer: {
    marginBottom: 20
  },
  card: {
    marginHorizontal: 10,
    marginTop: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: Theme.color.main
  },
  cardContent: {
    flexDirection: 'row',
    margin: 6
  },
  cardText: {
    flexGrow: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: Theme.color.text_main
  }
});


export default AppMenu;