import React from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native';
import { Theme } from '../../assets/Styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const IconButton = (props) => {

  const icons = {
    airplane: 'local-airport',
    menu: 'menu',
    bell: 'notifications-none',
    add: 'add',
    send: 'send',
    check: 'check'
  }

  const sizes = {
    small: 24,
    medium: 32,
    large: 44
  }

  const icon = icons[props.icon] || icons['basic'];

  const type : 'primary' | 'secondary' = props.type || 'secondary';

  const styles = StyleSheet.create({
    container: {
      borderRadius: 50,
      backgroundColor: Theme.color.button[type].color,
      // width: '50%'
    },
    button: {
      // width: '50%',
      textAlign: 'center',
      // textTransform: 'uppercase',
      fontSize: Theme.font.size.medium,
      borderRadius: 50,
      // backgroundColor: type === 'primary' ? Theme.color.primary : Theme.color.secondary,
      backgroundColor: Theme.color.button[type].color,
      color: Theme.color.button[type].text,
      padding: 10,
      paddingHorizontal: 40
    },
    icon: {
      justifyContent: 'center',
      textAlign: 'center',
      padding: 10,
    }
  });

  return (<TouchableHighlight onPress={props.onPress} style={styles.container}>
    <Icon style={styles.icon} name={icon} size={44} color={Theme.color.button[type].text} />
  </TouchableHighlight>);
};