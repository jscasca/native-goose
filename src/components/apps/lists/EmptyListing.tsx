import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useEffect } from "react";
import SwipeMe from "../../ui/SwipeMe";
import { Theme } from "../../../assets/Styles";

const noop = () => {};


/*
  Listing: Listing elements per List element in the Lists component
  i.e. each element in the list of shopping lists
*/
const EmptyListing = ({ 
  onOpen = noop}) => {

  // get user settings
  // save individual settings

  return (<TouchableOpacity style={[styles.content]} onPress={onOpen}>
    
      <View style={styles.info}>
        <View>
          <Text style={styles.title}>{ 'New List'}</Text>
        </View>
        <View>
          <Text style={styles.details}>Click here to create a new list</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <View>

        </View>
      </View>
      </TouchableOpacity>);
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  sideText: {
    fontSize: 18,
    textAlign: 'center',
    color: Theme.color.highContrastIcon
  },
  deleteSwipe: {
    // alignContent: 'center',
    borderRadius: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 15,
    flex: 1,
    backgroundColor: Theme.color.redAction
  },
  finishSwipe: {
    // alignSelf: 'flex-end',
    borderRadius: 5,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 15,
    flex: 1,
    backgroundColor: Theme.color.goldenAction
  },
  info: {
    borderRadius: 5,
    flexDirection: 'column',
    margin: 5
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.color.text_main,
  },
  details: {
    fontSize: 16,
    color: Theme.color.text_light,
    marginTop: 12
  },
  actions: {
    flexDirection: 'column'
  },
  content: {
    marginTop: 16,
    borderRadius: 10,
    padding: 20,
    backgroundColor: Theme.color.elementBackground + '55',
    borderStyle: 'dashed',
    borderWidth: 3,
    borderColor: Theme.color.main_contrast
    // backgroundColor: 'red'
  },
  side: {
    marginHorizontal: 2
  }
})

export default EmptyListing;