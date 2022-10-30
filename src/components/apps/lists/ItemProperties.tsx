
import React, { useState, useRef, useCallback } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Button } from "../../ui/Button";
import MyTextInput from "../../ui/MyTextInput";
import { Theme } from "../../../assets/Styles";
import KeyboardAware from "../../ui/KeyboardAware";
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { UserIcon } from "../../ui/UserIcon";
import { ItemProperty } from "./ItemProperty";

const ItemProperties = (props) => {

  const [name, setName] = useState(props.item?.name || 'Name?');

  const [qty, setQty] = useState(props.item?.notes?.quantity || '');
  const [description, setDescription] = useState(props.item?.notes?.description || '');
  const [notes, setNotes] = useState(props.item?.notes?.notes || '');

  

  const save = () => {
    const updatedItem = {
      ...props.item,
      name: name,
      notes: {
        quantity: qty,
        description: description,
        notes: notes
      }
    };
    console.log('trying to update: ', updatedItem);
    props.saveFn(updatedItem);
  }

  return <View style={styles.modalContainer}>
    <View style={styles.container}>
      <View style={styles.header}>
        <MyTextInput
          value={name}
          onBlur={(v, _) => {setName(v)}}
          placeholder="Item name"
          style={styles.itemName}
          focused={styles.itemNameFocus}
          textAlign="center"
          placeholderColor={Theme.color.main}
          // placeholderColorFocused={'red'}
          placeholderColorFocused={Theme.color.main_contrast}
          />
      </View>
      <View style={styles.body}>
        <KeyboardAware>
        <ScrollView>
          {/* <View><Text style={styles.title}>Attributes</Text></View> */}
          <ItemProperty key='qty' keyboard='numeric' property={'Quantity'} value={qty} onChangeText={setQty} />
          <ItemProperty key='desc' property={'Description'} value={description} onChangeText={setDescription} multiline={true} />
          <ItemProperty key='notes' property={'Notes'} value={notes} onChangeText={setNotes} multiline={true} />
        </ScrollView>
        </KeyboardAware>
      </View>
      <View style={styles.footer}>
        <Button onPress={save} title="Save" type='primary' />
        <Button onPress={props.closeFn} title="Close" type='secondary' />
      </View>
    </View>
  </View>;
};

const styles= StyleSheet.create({
  modalContainer: {
    // height: '100%',
    flex: 1,
    borderRadius: 16,
    // backgroundColor: '#a0a0a0'
    // width: '100%',
    // backgroundColor: '#ff0000'
    backgroundColor: Theme.color.background
  },
  title: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.color.text_main
  },
  container: {
    height: '100%',
    alignContent: 'flex-end',
    // backgroundColor: '#aaaaaa'
  },
  header: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Theme.color.main_contrast
  },
  body: {
    paddingHorizontal: 8,
    flexGrow: 1,
    // flexBasis: 'auto',
    // backgroundColor: '#ac33ac'
  },
  footer: {
    padding: 16,
    // height: '100%',
    // flex: 1,
    flexDirection: 'row',
    width: '80%',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignSelf: 'center',
    justifyContent: 'space-between'
  },
  itemName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  itemNameFocus: {
    color: Theme.color.main_contrast,
    backgroundColor: Theme.color.main
  },
  user: {
    height: 50,
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 5,
    paddingVertical: 5,
  },
  username: {
    marginLeft: 10,
  },
  section_name: {
    marginTop: 10,
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: Theme.color.text_main
  },
  avatar: {
    maxHeight: 40,
    maxWidth: 40,
    borderRadius: 20
  }
});

export default ItemProperties;