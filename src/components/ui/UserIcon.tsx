import React, { useState } from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';
import { Theme } from '../../assets/Styles';

const getBackground = (initials: string) => {
  const colorMap = [
    '#ffb5e8',
    '#ff9cee',
    '#ffccf9',
    '#fcc2ff',
    '#f6a6ff',
    '#b28dff',
    '#c5a3ff',
    '#d5aaff',
    '#ecd4ff',
    '#fbe4ff',
    '#dcd3ff',
    '#a79aff',
    '#b5b9ff',
    '#97a2ff',
    '#afcbff',
    '#aff8db',
    '#c4faf8',
    '#85e3ff',
    '#ace7ff',
    '#beb5ff',
    '#bffcc6',
    '#dbffd6',
    '#f3ffe3',
    '#e7ffac',
    '#ffffd1',
    '#ffc9de',
    '#ffabab',
    '#ffbebc',
    '#ffcbc1',
    '#fff5ba'
  ];
  return colorMap[Math.floor(Math.random() * colorMap.length)];
}

const getValueFromSize = (size: string) => {
  const sizeMap = {
    small: {
      radius: 20,
      dimensions: 40,
      text: 20
    },
    medium: {
      radius: 30,
      dimensions: 50,
      text: 25
    },
    large: {
      radius: 30,
      dimensions: 50,
      text: 25
    }
  };
  return (size === 's' || size === 'small') ? sizeMap.small : (size === 'm' || size === 'medium') ? sizeMap.medium : sizeMap.large;
}

export const UserIcon = (props) => {

  // props: size, uri, name | initial

  const [imageError, setImageError] = useState(false);

  const size = getValueFromSize(props.size);
  const color = getBackground(props.initials);

  const styles = StyleSheet.create({
    container: {
      // borderRadius: 10,
      // width: '50%'
    },
    avatar: {
      borderRadius: size.radius,
      width: size.dimensions,
      height: size.dimensions
    },
    placeholder: {
      backgroundColor: color,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: size.radius,
      width: size.dimensions,
      height: size.dimensions,
    },
    text: {
      color: '#fff',
      fontSize: size.text
    }
  });

  return (
  <View style={styles.container}>
    {imageError ? <View style={styles.placeholder}><Text style={styles.text}>{props.initials}</Text></View> : <Image source={{ uri: props.src }} style={styles.avatar} onError={() => setImageError(true)} />}
  </View>);
};