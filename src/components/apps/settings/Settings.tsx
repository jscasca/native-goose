import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { LOGO } from "../../../assets/Index";
import { Theme } from "../../../assets/Styles";
import { AuthContext } from "../../../context/AuthContext";
import { Button } from '../../ui/Button';

const Settings = (props) => {

  const authContext = useContext(AuthContext);

  // get user settings
  // save individual settings
  // set spinner in the meantime

  const logout = () => {
    // Notifiy server?
    authContext?.logout();
  };

  return <ScrollView style={styles.container}>
    <View style={styles.section}>
      <Text style={styles.title}>Account</Text>
      <View>
        <Image style={styles.avatar} source={LOGO}/> 
        <Text>Name</Text>
        <Text>Email</Text>
        <Text>Username</Text>
        <View style={styles.sectionFooter}>
          <Button title={'Save'} />
        </View>
      </View>
      {/* <View style={styles.personal}>
        <Image style={styles.avatar} source={ LOGO } />
        <Text>Name here</Text>
        <Text>Email</Text>
        <Text>Username</Text>
        <View style={styles.sectionFooter}>
          <Button title={'Reset'} />
          <Button title={'Save'} />
        </View>
      </View> */}
    </View>

    <View style={styles.section}>
      <Text style={styles.title}>Privacy</Text>
      <View style={styles.personal}>
        <Text>Make private</Text>
        <Text>Allowed</Text>
        <Text>Blocked</Text>
        <View style={styles.sectionFooter}>
          <Button type='primary' title={'Save'} />
        </View>
      </View>
    </View>

    {/* Notification section */}
    <View style={styles.section}>
      <Text style={styles.title}>Notifications</Text>
      <View style={styles.personal}>

      </View>
    </View>

    <View style={styles.section}>
      <Text style={styles.title}>Other</Text>
      <View>
        <Text>Some other text</Text>
      </View>
    </View>

    {/* Session: Include session information and button to logout */}
    <View style={styles.section}>
      <Text style={styles.title}>Session</Text>
      <View style={styles.logout}>
        <Button type='primary' title={'Log out'} onPress={logout} />
      </View>
    </View>

      {/* Empty space */}
    <View style={{height: 20}}></View>

  </ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    //
    // marginHorizontal: 10,
    borderRadius: 10,
    // backgroundColor: Theme.color.emptyBackground
    backgroundColor: Theme.color.background
  },
  title: {
    borderBottomWidth: 1,
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },
  sectionFooter: {
    flexDirection: 'row-reverse',
  },
  logout: {
    margin: 20,
    width: '80%'
  },
  section: {
    //
    marginHorizontal: 10,
    shadowOffset: {
      width: -10,
      height: -10
    },
    elevation: 3,
    shadowColor: 'black',
    shadowOpacity: 10,
    shadowRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 14,
    marginTop: 15,
    borderRadius: 10,
    // backgroundColor: '#fff'
    backgroundColor: Theme.color.elementBackground
  },
  footer: {
    marginBottom: 20
  },
  personal: {
    //
  },
  avatar: {
    borderRadius: 60,
    width: 120,
    height: 120
  }
})

export default Settings;