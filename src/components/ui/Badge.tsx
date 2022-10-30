import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Badge = (props) => {

  const displayValue = props.value > 9 ? "9+" : props.value;

  const color = props.opts.color || 'red';
  // pos

  const styles = StyleSheet.create({
    inner: {
      top: 16,
      left: 16,
      position: 'absolute',
      borderRadius: 13,
      minWidth: 26,
      height: 26,
      backgroundColor: color,
      justifyContent: 'center',
      alignItems: 'center'
    },
    wrapper: {
    },
    text: {
      fontSize: 18,
      color: '#fff'
    }
  });

  return (
    <View style={styles.inner}>
      <View style={styles.wrapper}>
        <Text style={styles.text} onPress={props.onPress}>{displayValue}</Text>
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   wrapper: {
//     // width: 24,
//     // height: 24,
//     // marginTop: 5,
//     // marginBottom: 5
//   },
//   inner: {
//     position: 'absolute',
//     borderRadius: 8,
//     width: 16,
//     height: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#00ff00'
//   },
//   text: {
//     color: '#ff0000'
//   }
// });

export default Badge;