import React, {useContext, useState} from 'react';
import {Button, Image, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {AxiosContext} from '../context/AxiosContext';
import Navbar from './navbar/Navbar';
import Spinner from './Spinner';
// import ReactNativeModal from 'react-native-modal';
import Notifications from './modals/Notifications';
import AppMenu from './modals/Menu';
import MyModal from './ui/MyModal';
import AppWrapper from './AppWrapper';
import { Application } from '../types';

const Dashboard = () => {
  console.log('loading dashboard');
  const axiosContext = useContext(AxiosContext);
  const authContext = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('idle');

  const [notifications, setNotifications] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  // list applications: home | lists | settings | boards
  const [application, setApplication] = useState(Application.Lists);

  const loadImage = async () => {
    setStatus('loading');
    try {
      const response = await axiosContext.authAxios.get('/cat');
      setImage(response.data);
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  const clickMenu = () => {
    console.log('openin menu');
    setOpenMenu(!openMenu);
  };

  const clickNotifications = () => {
    console.log('opening notifications');
    setNotifications(!notifications);
  };

  if (status === 'loading') {
    return <Spinner />;
  }

  const selectApp = (selected: Application) => {
    setApplication(selected);
    setOpenMenu(false);
  };

  return (
    <View style={styles.container}>
      <MyModal aligment={'left'} visible={notifications} dismiss={() => setNotifications(false)} >
        <Notifications></Notifications>
      </MyModal>
      <MyModal aligment={'right'} visible={openMenu} dismiss={() => setOpenMenu(false)} >
        <AppMenu select={selectApp}></AppMenu>
      </MyModal>
      {/* <MyModal visible={openMenu}, dismiss={() => setOpenMenu(false)} ><Text></Text></MyModal> */}
      <Navbar style={styles.navbar} title={application} onMenu={clickMenu} onNotifications={clickNotifications} />
      <View style={styles.app} >
        <AppWrapper application={application}></AppWrapper>
        {/* <Text onPress={() => setStatus('loading')}>Rest of the app: {status}</Text>
        <TouchableOpacity onPress={() => console.log('pressed')}>
          <Text>Opacity</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flex: 1,
  },
  app: {
    flex: 1,
    width: '100%',
    backgroundColor: 'red'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
export default Dashboard;