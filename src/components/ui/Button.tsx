import React from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native';
import { Theme } from '../../assets/Styles';

export const Button = (props) => {

  const type : 'primary' | 'secondary' = props.type || 'secondary';

  const styles = StyleSheet.create({
    container: {
      borderRadius: 50,
      // width: '50%'
    },
    button: {
      // width: '50%',
      textAlign: 'center',
      // textTransform: 'uppercase',
      fontSize: Theme.font.size.medium,
      fontWeight: 'bold',
      borderRadius: 50,
      // backgroundColor: type === 'primary' ? Theme.color.primary : Theme.color.secondary,
      backgroundColor: Theme.color.button[type].color,
      color: Theme.color.button[type].text,
      padding: 10,
      paddingHorizontal: 40
    }
  });

  return (<TouchableHighlight onPress={props.onPress} style={styles.container}>
    <Text style={styles.button}>{props.title}</Text>
  </TouchableHighlight>);
};