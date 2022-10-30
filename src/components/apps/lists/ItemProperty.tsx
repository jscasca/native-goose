import React, { useState, useRef, useCallback } from "react";
import { View, Text, StyleSheet, Image, KeyboardTypeOptions } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Button } from "../../ui/Button";
import MyTextInput from "../../ui/MyTextInput";
import { Theme } from "../../../assets/Styles";
import KeyboardAware from "../../ui/KeyboardAware";
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';

// export type KeyboardType = 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'number-pad' | 'decimal-pad';

export const ItemProperty = ({
  property,
  value,
  multiline = false,
  keyboard = 'default',
  onChangeText = (_) => {}
}) => {
  const [name, setName] = useState(property);
  const [val, setVal] = useState(value);

  const changeText = (text: string) => {
    setVal(text);
    onChangeText(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.valueContainer}>
        <View style={styles.inputContainer}><TextInput value={val} onChangeText={setVal} keyboardType={keyboard as KeyboardTypeOptions} style={styles.input} multiline={multiline}></TextInput></View>
        <View style={styles.clearContainer}><Icon name="clear" size={36} color={Theme.color.text_main} onPress={() => setVal('')} /></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    marginVertical: 6,
    marginHorizontal: 20,
    borderBottomColor: Theme.color.main_contrast,
    borderBottomWidth: 3,
    fontSize: 18,
    color: Theme.color.text_light
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Theme.color.text_main,
    marginLeft: 15,
  },
  valueContainer: {
    flexDirection: 'row',
    flex: 1
  },
  inputContainer: {
    flexGrow: 1,
    flexShrink: 1
  },
  clearContainer: {
    alignSelf: 'flex-end',
    padding: 10,
    // backgroundColor: 'red',
    flexBasis: 56
  },
  container: {
    marginTop: 16,
    marginHorizontal: 5,
    backgroundColor: Theme.color.secondary,
  }
});