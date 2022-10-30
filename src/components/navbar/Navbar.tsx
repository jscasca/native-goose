import React from 'react';
import {ActivityIndicator, StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Theme } from '../../assets/Styles';
import withBadge from '../ui/WithBadge';

const MenuIcon = (props) => (
  <Icon style={styles.icon} name="menu" size={38} onPress={() => {console.log('press icon'); props.onPress()}}  />
);

const BellIcon = (props) => (
  <Icon name="notifications-none" size={38} onPress={props.onPress} />
);

const Navbar = (props) => {

  const title = props.title || 'Home'

  const NotificationBell = withBadge(BellIcon, 2);
  return (
    <View style={[styles.container]}>
      <MenuIcon onPress={props.onMenu} />
      <View style={styles.appBar}>
        <Text style={styles.appBarContent}>GooseMate { title }</Text>
      </View>
      <NotificationBell style={styles.icon} onPress={props.onNotifications} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexBasis: 50,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.color.main
  },
  appBar: {
    flexGrow: 1,
    backgroundColor: Theme.color.main_contrast,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 3,
    // color: '#000'
  },
  appBarContent: {
    color: Theme.color.background,
    fontSize: 18,
    textAlign: 'center'
  },
  icon: {
    // flexBasis: 80,
    marginHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: Theme.color.main
  }
});

export default Navbar;