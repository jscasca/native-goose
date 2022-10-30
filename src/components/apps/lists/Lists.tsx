import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { LOGO } from "../../../assets/Index";
import MyModal from "../../ui/MyModal";
import LinearGradient from 'react-native-linear-gradient';
import { IconButton } from "../../ui/IconButton";
import Listing from "./Listing";
import ListProperties from "./ListProperties";
import Notifications from "../../modals/Notifications";
import { Theme } from "../../../assets/Styles";
import { List } from "./List";
import { AxiosContext } from "../../../context/AxiosContext";
import ListService from "../../../middleware/ListService";
import EmptyListing from "./EmptyListing";

const enum ListStates {
  Listing = 'listing',
  Editing = 'editing',
  Loading = 'loading',
}

interface cache {
  init: boolean;
  expire?: number;
  fetched?: any;
}

const CACHE_EXP = 10;

// const cache = {};

const Lists = (props) => {

  const { authAxios } = useContext(AxiosContext);
  const listApi = ListService(authAxios);

  const cache = useRef<cache>({init: false});

  const [state, setState] = useState<ListStates>(ListStates.Listing);

  const [selected, setSelected] = useState<any>(null);
  const [editModal, setEditModal] = useState(false);

  const [lists, setLists] = useState<any[]>([]);

  const editListing = (listing) => {
    // set listing
    setSelected(listing);
    setEditModal(true);
  };
  const openListing = (listing) => {
    setSelected(listing);
    setState(ListStates.Editing);
  };
  const deleteListing = (listing) => {
    // delete the list
    setLists(lists.filter((l: any) => l._id !== listing._id));
    listApi.removeList(listing._id).then(r => {
      console.log('removed list: ', r.data);
    }).catch(err => {
      console.error('failed to remove list: ', err);
      // alert that it failed to delete the list
    });
  };
  const finishListing = (listing) => {
    // delete the list
    setLists(lists.filter((l: any) => l._id !== listing._id));
    listApi.finishList(listing._id).then(r => {
      console.log('removed list: ', r.data);
    }).catch(err => {
      console.error('failed to remove list: ', err);
      // alert that it failed to delete the list
    });

  };

  const newList = () => {
    const nextName = 'New List ' + new Date(Date.now()).toLocaleString();
    // Set into Loading state?
    console.log('creating new list');
    setState(ListStates.Loading);
    console.log('set state to loading');
    // TODO: approach how to keep list in local sync
    listApi.newSoloList(nextName).then(r => {
      // update the selected list
      console.log('created list: ', r.data);
      const list = r.data;
      // Should we add it to the cache?
      setLists([list].concat(lists));
      setSelected(r.data);
      setState(ListStates.Editing);
    }).catch(err => {
      // what happens on error?
      setState(ListStates.Listing);
      console.error('failed to create new list: ', err);
    });
    // bust the cache
    cache.current.expire = undefined;
  };

  const backButton = () => {
    setState(ListStates.Listing);
  };

  useEffect(() => {
    let unmounted = false;

    if (cache.current.init === false || (cache.current.expire && cache.current.expire > new Date().getTime())) {
      // fetch the date
      console.log('Fetching new list');
      listApi.getLists().then((response) => {
        console.log('fetched lists: ', response.data);
        if (!unmounted) {
          const fetched = response.data;
          cache.current = {
            init: true,
            expire: new Date().getTime() + CACHE_EXP,
            fetched: fetched
          };
          console.log('setting lists');
          setLists(fetched);
        }
      }).catch((err) => {
        // do something on error here?
        console.error('Failed to fetch lists: ', err);
        // check for 401 and try again
      });
    } else {
      if (cache.current.fetched) {
        setLists(cache.current.fetched);
      }
    }
    // fetch the data
    return function cleanup() {
      console.log('unmounting?');
      unmounted = true; // check whether init properly or re init
    };
  }, [listApi]);

  const updateList = () => {
    //
    console.log('updating list');
  };

  // get user settings
  // save individual settings

  return <View style={styles.container}>
    <MyModal visible={editModal} dismiss={() => setEditModal(false)} aligment='center' style={{width: '90%', flex: 1, marginBottom: 50, marginTop: 20}}>
      {/* <ListProperites /> */}
      {/* <Notifications></Notifications> */}
      {editModal && selected !== null && <ListProperties list={selected} closeFn={() => setEditModal(false)} saveFn={() => console.log('saving')} />}
    </MyModal>
    { state === ListStates.Listing && (<View style={styles.listContainer}>
      <ScrollView style={styles.section}>
        { lists.length === 0 && (<EmptyListing onOpen={newList} />)}
        { lists.map((v, i) => {
          return <Listing 
          key={i} 
          onOpen={() => openListing(v)}
          onEdit={() => editListing(v)}
          onDelete={() => deleteListing(v)}
          onFinish={() => finishListing(v)}
          listing={v}></Listing>
        })
        }
        <View style={styles.emptyPadding}></View>
      </ScrollView>
      <View style={styles.footer}>
        {/* <LinearGradient colors={['#ffffff00', '#fff']} style={styles.gradient}> */}
        <LinearGradient colors={[Theme.color.backgroundGradient, Theme.color.background]} style={styles.gradient}>
          <IconButton type={'primary'} icon={'add'} onPress={newList} />
        </LinearGradient>
      </View>
    </View>)}
    { state === ListStates.Editing && selected !== null  && (<List backAction={backButton} updateList={updateList} list={selected} />)}
  </View>;
};

const styles = StyleSheet.create({
  container: {
    //
    flex: 1,
    borderRadius: 10,
    // backgroundColor: '#fff000'
    // backgroundColor: Theme.color.background
    backgroundColor: Theme.color.background
  },
  gradient: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  section: {
    marginHorizontal: 10
  },
  listContainer: {
    flexGrow: 1
  },
  personal: {
    //
  },
  avatar: {
    borderRadius: 60,
    maxWidth: 120,
    maxHeight: 120
  },
  emptyPadding: {
    height: 60,
    // backgroundColor: 'green'
  }
})

export default Lists;