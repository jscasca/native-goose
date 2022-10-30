import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useEffect } from "react";
import SwipeMe from "../../ui/SwipeMe";
import { Theme } from "../../../assets/Styles";

const noop = () => {};


/*
  Listing: Listing elements per List element in the Lists component
  i.e. each element in the list of shopping lists
*/
const Listing = ({ 
  onOpen = noop,
  onEdit = noop,
  onDelete = noop,
  onFinish = noop,
  listing = {'name': 'Sample Listing'}}) => {

  // useEffect(() => {
  //   LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  // }, []);

  const [swipeable, setSwipeable] = useState<any>(null);

  const open = () => {};

  // const [editModal, setEditModal] = useState(false);

  const longPress = () => {
    console.log('long press');
    onEdit();
  };

  const press= () => {
    console.log('normal press');
    onOpen();
  };

  const rightSwipe = () => {
    console.log('finishing');
    onFinish();
  };
  const leftSwipe = () => {
    console.log('deleting');
    onDelete();
  };

  const release = () => {
    console.log('release');
    setTimeout(() => {
      if(swipeable) {
        swipeable.recenter();
      }
    }, 3000);
  };

  const leftContent = <View style={styles.finishSwipe}>
    <View style={{alignItems: 'center'}}>
      <Icon name="send" size={36} color={Theme.color.highContrastIcon} />
      <Text style={styles.sideText}>Finish</Text>
    </View>
  </View>;
  const rightContent = <View style={styles.deleteSwipe}>
    <View style={{alignItems: 'center'}}>
      <Icon name="clear" size={36} color={Theme.color.highContrastIcon} />
      <Text style={styles.sideText}>Delete</Text>
    </View>
  </View>;

  // get user settings
  // save individual settings

  return (<SwipeMe style={{content: styles.content, side: styles.side}} onPress={press} onLongPress={longPress} leftSwipe={leftSwipe} rightSwipe={rightSwipe} left={leftContent} right={rightContent}>
    
      <View style={styles.info}>
        <View>
          <Text style={styles.title}>{ listing.name }</Text>
        </View>
        <View>
          <Text style={styles.details}>Created on 02/02/2022</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <View>

        </View>
      </View>
      </SwipeMe>);
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
    borderRadius: 10,
    padding: 20,
    backgroundColor: Theme.color.elementBackground
    // backgroundColor: 'red'
  },
  side: {
    marginHorizontal: 2
  }
})

export default Listing;