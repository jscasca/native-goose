import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const MyTextInput = (props) => {

  const [focused, setFocus] = useState(false);
  const [value, setValue] = useState<string>(props.value);

  const align = props.textAlign || 'center';

  const handleFocus = (ev) => {
    setFocus(true);
    if (props.onFocus) {
      props.onFocus(ev);
    }
  };

  const handleBlur = (ev) => {
    setFocus(false);
    if (props.onBlur) {
      props.onBlur(value, ev);
    }
  };

  const inputStyles = [styles.input, props.style];
  if (focused) {
    inputStyles.push(styles.focused);
    if (props.focused) {
      inputStyles.push(props.focused);
    }
  }

  const placeholderColor = focused ? (props.placeholderColorFocused || '#ccc') : (props.placeholderColor || '#000');

  return <TextInput
    onBlur={handleBlur}
    onFocus={handleFocus}
    textAlign={align}
    style={inputStyles}
    placeholder={props.placeholder}
    placeholderTextColor={placeholderColor}
    underlineColorAndroid="transparent"
    defaultValue={value}
    onChangeText={setValue}
  />;
};

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginHorizontal: 10,
    borderRadius: 16
  },
  focused: {
    backgroundColor: '#c5c5c5',
  }
});

export default MyTextInput;