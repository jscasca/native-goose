import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import MyModal from "../../ui/MyModal";
import { ItemListing } from "./ItemListing";
import ItemProperties from "./ItemProperties";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Theme } from "../../../assets/Styles";
import { Header } from "@react-navigation/elements";
import ListProperties from "./ListProperties";
import KeyboardAware from "../../ui/KeyboardAware";
import { AxiosContext } from "../../../context/AxiosContext";
import ListService from "../../../middleware/ListService";
import { NewItemListing } from "./NewItemListing";
import uuid from 'react-native-uuid';

const noop = () => {};

const nofilter = () => true;

interface cache {
  init: boolean;
  expire?: number;
  fetched?: any;
}

const CACHE_EXP = 10;

const sample = [
  {
    id: 'xx',
    name: 'Tortillas para tacos',
    status: 'pending',
    notes: {
      category: 'carbs',
      description: 'Necestiamos tortillas de las buenas',
      quantity: '2',
      other: 'Otra info aqui'
    }
  },
  {
    id: 'xx',
    name: 'Leche descremada',
    status: 'pending',
    notes: {
      category: 'lacteos',
      description: '',
      quantity: '1g',
      other: ''
    }
  },
  {
    id: 'xx',
    name: 'Leche Cabra',
    status: 'pending',
    notes: {
      category: 'lacteos',
      description: '',
      quantity: '1 litro',
      other: ''
    }
  },
  {
    id: 'xx',
    name: 'Crema',
    status: 'pending',
    notes: {
      category: 'lacteos',
      description: 'Para tacos, de la normal no de la otra',
    }
  },
  {
    id: 'xx',
    name: 'Bolsas de basura',
    status: 'pending',
    notes: {
    }
  },
  {
    id: 'xx',
    name: 'Treats para perro',
    status: 'checked',
    notes: {
      category: 'perro',
      description: 'los que sean',
    }
  },
  {
    id: 'xx',
    name: 'Bolsas de perro',
    status: 'checked',
    notes: {
      category: 'perro',
    }
  },
  {
    id: 'xx',
    name: 'cajeta',
    status: 'pending',
    notes: {
    }
  },
  {
    id: 'xx',
    name: 'toallas de papel',
    status: 'pending',
    notes: {
    }
  },
  {
    id: 'xx',
    name: 'Yogurt pro go',
    status: 'pending',
    notes: {
      category: 'lacteos',
    }
  },
  {
    id: 'xx',
    name: 'huevos',
    status: 'deleted',
    notes: {
      description: 'Una docena',
    }
  },
  {
    id: 'xx',
    name: 'huevos',
    status: 'deleted',
    notes: {
      description: 'Una docena',
    }
  },
  {
    id: 'xx',
    name: 'huevos',
    status: 'deleted',
    notes: {
      description: 'Una docena',
    }
  },
  {
    id: 'xx',
    name: 'huevos',
    status: 'deleted',
    notes: {
      description: 'Una docena',
    }
  }
];

const sort = (arr: any[], sortable: (a: any ,b: any) => number = (a, b) => {return 0}): any[] => {
  return arr;
};

const mergeArrays = (arr1: any[], arr2: any[]): any[] => {
  //
  console.log('merging: ', arr1, arr2);
  return [];
}

/*
key={i} 
          onOpen={() => openListing(v)}
          onEdit={() => editListing(v)}
          onDelete={() => deleteListing(v)}
          onFinish={() => finishListing(v)}
          listing={v}
*/
export const List = ({
  backAction,
  updateList,
  list
}) => {

  const { authAxios } = useContext(AxiosContext);
  const listApi = ListService(authAxios);

  const cache = useRef<cache>({init: false, fetched: []});

  const [modal, setModal] = useState<boolean>(false);
  const [item, setItem] = useState<any>(null);

  const [items, setItems] = useState<any[]>([]);

  const [fetched, setFetched] = useState<any[]>([]);

  const [filters, setFilters] = useState<(a: any) => boolean>(nofilter);
  const [order, setOrder] = useState();

  const currentFilters = (v: any) => {
    // for each filter pass here
    return true;
  };

  const [listModal, setListModal] = useState<boolean>(false);

  const itemActions = (sItem: any) => {
    // ???
    console.log('setting selected item: ', sItem);
    setItem(sItem);
    setModal(true);
  };

  const updateItem = (updatedItem) => {
    console.log('updating item', updatedItem);
    // do the saving?
    listApi.updateListItem(updatedItem).then(r => {
      // item updated successfully
      const updated = r.data;
      console.log('updated: ', updated);
      const updatedItems = items.map(i => i._id === updatedItem._id ? updated : i);
      setItems(updatedItems);
    }).catch(err => {
      console.error('Could not update item: ', err);
    });
    setModal(false);
  };

  const saveItem = (itemName: string) => {
    console.log('saving: ', itemName);
    const newItem = {name: itemName, notes: {}, details: {draft: uuid.v4()}};
    console.log('saving: ', newItem);
    // when creating a new item
    if (list._id) {
      listApi.newListItem(list._id, newItem).then(r => {
        console.log(r.data);
        // update items
        setFetched([r.data].concat(fetched));
        setItems([r.data].concat(fetched));
      }).catch((err) => {
        console.error('Failed to save item: ', err);
      });
      setItems([newItem].concat(fetched));
    } else {
      // what happens when the list has not acknowledged?
      // save to catch and queue?
      console.log('Queue new item');
    }
  };

  useEffect(() => {
    const fetch = (listId) => {
      listApi.getListItems(listId).then(r => {
        const fetched = r.data;
        cache.current = {
          init: true,
          expire: new Date().getTime() + CACHE_EXP,
          fetched: fetched
        };
        setItems(fetched);
      }).catch(err => {
        //
        console.error('Failed to fetch items: ', err);
      });
    };
    if (!cache.current.init) {
      // not init: fetch from start
      fetch(list._id);
    } else {
      // has been init
      if (cache.current.expire && cache.current.expire > new Date().getTime()) {
        // get new
        fetch(list._id);
      } else {
        // return from cache
        setItems(cache.current.fetched);
      }
    }
  }, []);

  return <View style={styles.container}>
    <MyModal
      visible={modal}
      aligment='center'
      style={{width: '90%', flex: 1, marginBottom: 50, marginTop: 20}}
      dismiss={() => setModal(false)}>
      {(item && modal && <ItemProperties item={item} closeFn={() => {setModal(false)}} saveFn={updateItem} />)}
    </MyModal>
    <MyModal
      aligment='center'
      style={{width: '90%', flex: 1, marginBottom: 50, marginTop: 20}}
      dismiss={() => setListModal(false)}
      visible={listModal}>
      <ListProperties list={list} closeFn={() => setListModal(false)} saveFn={() => {}} />
    </MyModal>
    <View style={{flex: 1}}>
      <View style={styles.head}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Icon name='arrow-back' size={36} color={'#000'} onPress={backAction} />
          </View>
          <View style={styles.title}>
            <Text style={styles.titleText} numberOfLines={1}>{list.name}</Text>
          </View>
          <View style={styles.headerIcon}>
            <Icon name='more-vert' size={36} color={Theme.color.text_main} onPress={() => setListModal(true)} />
          </View>
        </View>
        <View style={styles.filters}>
          <Text>Filters and stuff</Text>
        </View>
      </View>
      <KeyboardAware>
      <View style={styles.itemContainer}>
        <ScrollView>
          <NewItemListing saveNew={saveItem} />
          {
            sort(items).filter(currentFilters).map((v, i) => {
              return <ItemListing
              key={i}
              item={v}
              updateItem={updateItem}
              itemActions={() => itemActions(v)}
              />
            })
          }
          <View style={styles.emptyPadding}></View>
        </ScrollView>
        <View></View>
      </View>
      </KeyboardAware>
    </View>
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  head: {
    // flexBasis: 80
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 5
  },
  headerIcon: {
    marginHorizontal: 5,
    // marginVertical: 5,
    // backgroundColor: 'green'
  },
  title: {
    flex: 1,
    flexShrink: 1,
    paddingHorizontal: 5
  },
  titleText: {
    // width: '80%',
    // flexShrink: 1,
    // flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: Theme.color.text_main
  },
  filters: {
    backgroundColor: 'red'
  },
  itemContainer: {
    flexGrow: 1,
    backgroundColor: Theme.color.elementBackground
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  gradient: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyPadding: {
    height: 100,
    // backgroundColor: 'green'
  }
});