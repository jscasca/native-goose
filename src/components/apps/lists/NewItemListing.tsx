import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Theme } from "../../../assets/Styles";
import MyTextInput from "../../ui/MyTextInput";
import SwipeMe from "../../ui/SwipeMe";

const noop = () => {};

export const NewItemListing = (props) => {

  const itemActions = props.itemActions || noop;

  const [itemName, setItemName] = useState('');
  const [focus, setFocus] = useState(false);

  const openItemActions = () => {
    // select the item bla bla and open the dialog
    itemActions();
  };

  const leftIconPress = () => {
    // if pending then check, ignore otherwise?
  };

  // const uncheckContent = ();

  const newItem = (name) => {
    if (name) {
      console.log('saving: ', name);
      props.saveNew(name);
      setItemName('');
    }
  };

  const handleFocus = (ev) => {
    setFocus(true);
  };
  const handleBlur = (ev) => {
    setFocus(false);
    newItem(itemName);
  };

  const inputStyles = focus ? [styles.itemName, styles.itemNameFocused] : [styles.itemName];

  return (
  <SwipeMe 
  style={{container: styles.swipeContainer}}
  onPress={() => console.log('press item listing')}
  onLongPress={()=>console.log('long press item')}
  leftSwipe={()=>console.log('swipe left')}
  rightSwipe={()=>console.log('rightswipe')}
  >
    <View style={[styles.container]}>
      <View style={[{
        width: 8,
        height: '100%'
      }, ]}>
      </View>
      <View style={styles.checks}>
        <View style={styles.checkIcon}>
          <Icon name={'create'} size={36} color={Theme.color.text_main} onPress={leftIconPress} />
        </View>
      </View>
      <View style={styles.info}>
        <View style={styles.infoContainer}>
          <View style={{flexDirection: 'row'}}>
            <TextInput
            onBlur={handleBlur}
            onFocus={handleFocus}
            textAlign={'left'}
            placeholder={''}
            placeholderTextColor={'red'}
            underlineColorAndroid="transparent"
            value={itemName}
            onChangeText={setItemName}
            style={inputStyles}
            />
            {/* <MyTextInput textAlign='left' value={newName} style={[styles.itemName]} focused={[styles.itemNameFocused]} onBlur={newItem} /> */}
          </View>
        </View>
        {/* <Text>{item.name}</Text> */}
        {/* <Text>Some hidden details</Text> */}
        
      </View>
      <View style={styles.actions}>
        <View style={styles.checkIcon}>
          {/* <Icon name='more-vert' size={36} color={Theme.color.text_main} onPress={openItemActions} /> */}
        </View>
      </View>
    </View>
  </SwipeMe>);
};

const styles = StyleSheet.create({
  swipeContainer: {
    marginTop: 0,
    flex: 1
  },
  container: {
    // paddingTop: 10,
    // backgroundColor: 'red',
    // borderBottomColor: '#cbcbcb',
    backgroundColor: Theme.color.el_default,
    borderBottomColor: Theme.color.main_contrast,
    borderBottomWidth: 2,
    flex: 1,
    flexDirection: 'row'
    // flexDirection: 'row'
  },
  checks: {
  },
  qty: {
    fontSize: 20,
    color: Theme.color.text_light,
    alignSelf: 'center'
  },
  checkIcon: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 2,
    paddingRight: 5,
    // backgroundColor: 'red'
  },
  info: {
    flexGrow: 1,
    flex: 0.8,
  },
  infoContainer: {
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 16,
    justifyContent: 'center'
  },
  actions: {},
  itemName: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.color.text_main,
    borderRadius: 0,
    marginHorizontal: 5,
    paddingHorizontal: 0,
    borderBottomWidth: 2,
    borderBottomColor: Theme.color.elementBackground,
    width: '80%'
  },
  itemNameFocused: {
    backgroundColor: Theme.color.secondary,
    borderBottomWidth: 2,
    borderBottomColor: Theme.color.main
  },
  itemNotes: {
    fontSize: 16,
    color: Theme.color.text_light
  }
})