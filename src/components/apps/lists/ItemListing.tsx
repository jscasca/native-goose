import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Theme } from "../../../assets/Styles";
import MyTextInput from "../../ui/MyTextInput";
import SwipeMe from "../../ui/SwipeMe";

const enum itemStatus {
  checked = 'checked',
  pending = 'pending',
  deleted = 'deleted',
  unknown = 'unknown'
}

const noop = () => {};

const getCatColor = (category: string, colorMap: any, fallback: string = Theme.color.el_default): string => {
  if (colorMap && colorMap[category]) {
    return colorMap[category];
  }
  return fallback;
};

const getStatusDetails = (status: string) => {
  if (status === 'checked') return {
    icon: 'check',
    style: {
      container: { backgroundColor: Theme.color.el_disabled },
      bar: { borderBottomColor: Theme.color.el_disabled },
      barFocused: { borderBottomColor: Theme.color.el_disabled },
      lighText: { color: Theme.color.text_main }
    } 
  };
  if (status === 'pending') return {
    icon: 'check-box-outline-blank',
    style: {
      container: { backgroundColor: Theme.color.el_default },
      bar: { borderBottomColor: Theme.color.el_default},
      barFocused: { borderBottomColor: Theme.color.el_default},
      lighText: { color: ''}
    }
  };
  if (status === 'deleted') return {
    icon: 'clear',
    style: {
      container: { backgroundColor: Theme.color.el_deleted },
      bar: { borderBottomColor: Theme.color.el_deleted },
      barFocused: { borderBottomColor: Theme.color.el_deleted },
      lighText: { color: ''}
    }
  };
  return {icon: 'error', style: { 
    container: { backgroundColor: Theme.color.disabled.background },
    bar: { borderBottomColor: Theme.color.disabled.background},
    barFocused: { borderBottomColor: Theme.color.disabled.background},
    lighText: { color: ''}}};
};

export const ItemListing = (props) => {

  const itemActions = props.itemActions || noop;

  const [item, setItem] = useState(props.item);

  // const item = props.item || {
  //   id: 'xxx',
  //   name: 'Sample',
  //   props: {
  //     description: 'Some long description or another thing?',
  //     category: '',

  //   }
  // };

  const statusDetails = getStatusDetails(item.status);

  const catColor = getCatColor(item.props?.category, props.categories, statusDetails.style.container.backgroundColor);

  const checkContent = (<View style={{ flex: 1, backgroundColor: Theme.color.main_contrast, alignItems: 'flex-end'}}>
    <View style={{alignItems: 'center', paddingHorizontal: 15}}>
      <Icon name='check' size={36} color={Theme.color.text_highlight} />
      <Text style={{fontSize: 18, color: Theme.color.text_highlight}}>Check</Text>
    </View>
  </View>);

  const uncheckContent = (<View style={{ flex: 1, backgroundColor: Theme.color.main_contrast, alignItems: 'flex-start'}}>
    <View style={{alignItems: 'center', paddingHorizontal: 15}}>
      <Icon name='undo' size={36} color={Theme.color.text_highlight} />
      <Text style={{fontSize: 18, color: Theme.color.text_highlight}}>Uncheck</Text>
    </View>
  </View>);

  const deleteContent = (<View style={{flex: 1, backgroundColor: Theme.color.clear, alignItems: 'flex-start'}}>
    <View style={{alignItems: 'center', paddingHorizontal: 15}}>
      <Icon name='clear' size={36} color={Theme.color.text_highlight} />
      <Text style={{fontSize: 18, color: Theme.color.text_highlight}}>Delete</Text>
    </View>
  </View>);

  const restoreContent = (<View style={{flex: 1, backgroundColor: Theme.color.main_contrast, alignItems: 'flex-end'}}>
    <View style={{alignItems: 'center', paddingHorizontal: 15}}>
      <Icon name='undo' size={36} color={Theme.color.text_highlight} />
      <Text style={{fontSize: 18, color: Theme.color.text_highlight}}>Restore</Text>
    </View>
  </View>);

  const emptyContent = (<View style={{flex: 1, backgroundColor: Theme.color.main}}>
    <View style={{alignItems: 'center'}}>
      {/* <Icon name='check' size={36} color={'red'} />
      <Text style={{}}>Empty</Text> */}
    </View>
  </View>);

  const getContent = (status: itemStatus) => {
    if (status === itemStatus.checked) {
      return {
        r: uncheckContent,
        l: emptyContent
      };
    }
    if (status === itemStatus.pending) {
      return {
        r: deleteContent,
        l: checkContent
      };
    }
    if (status === itemStatus.deleted) {
      return {
        r: emptyContent,
        l: restoreContent
      }
    }
    return {
      r: emptyContent,
      l: emptyContent
    };
  }

  const sideContent = getContent(item.status);

  const openItemActions = () => {
    // select the item bla bla and open the dialog
    itemActions();
  };

  const leftIconPress = () => {
    // if pending then check, ignore otherwise?
  };

  const deleteItem = () => {
    props.updateItem({...item, status: itemStatus.deleted});
  };

  const checkItem = () => {
    props.updateItem({...item, status: itemStatus.checked});
  };

  const restoreItem = () => {
    props.updateItem({...item, status: itemStatus.pending});
  }

  // const uncheckContent = ();

  const updateName = (newName) => {
    if (newName !== item.name) {
      const updated = {
        ...item,
        name: newName
      };
      setItem(updated);
      props.updateItem(updated);
    }
  };

  return (
  <SwipeMe 
  style={{container: styles.swipeContainer}}
  onPress={() => console.log('press item listing')}
  onLongPress={()=>console.log('long press item')}
  leftSwipe={()=>console.log('swipe left')}
  rightSwipe={()=>console.log('rightswipe')}
  left={ sideContent.l }
  right={ sideContent.r }
  >
    <View style={[styles.container, statusDetails.style.container]}>
      <View style={[{
        backgroundColor: catColor,
        width: 8,
        height: '100%'
      }, ]}>
      </View>
      <View style={styles.checks}>
        <View style={styles.checkIcon}>
          <Icon name={statusDetails.icon} size={36} color={Theme.color.text_main} onPress={leftIconPress} />
        </View>
      </View>
      <View style={styles.info}>
        <View style={styles.infoContainer}>
          <View style={{flexDirection: 'row'}}>
            <MyTextInput onBlur={updateName} textAlign='left' value={item.name} style={[styles.itemName, statusDetails.style.bar]} focused={[styles.itemNameFocused, statusDetails.style.barFocused]} />
            <Text style={styles.qty}>{item.notes?.quantity ? "x" + item.notes.quantity : ''}</Text>
          </View>
          { ( (item.notes?.description !== null) && <Text style={styles.itemNotes}>{item.notes?.description}</Text>)}
        </View>
        {/* <Text>{item.name}</Text> */}
        {/* <Text>Some hidden details</Text> */}
        
      </View>
      <View style={styles.actions}>
        <View style={styles.checkIcon}>
          <Icon name='more-vert' size={36} color={Theme.color.text_main} onPress={openItemActions} />
        </View>
      </View>
    </View>
  </SwipeMe>);
};

const styles = StyleSheet.create({
  swipeContainer: {
    marginTop: 0,
    flex: 1
  },
  container: {
    // paddingTop: 10,
    // backgroundColor: 'red',
    // borderBottomColor: '#cbcbcb',
    borderBottomColor: Theme.color.main_contrast,
    borderBottomWidth: 2,
    flex: 1,
    flexDirection: 'row'
    // flexDirection: 'row'
  },
  checks: {
  },
  qty: {
    fontSize: 20,
    color: Theme.color.text_light,
    alignSelf: 'center'
  },
  checkIcon: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 2,
    paddingRight: 5,
    // backgroundColor: 'red'
  },
  info: {
    flexGrow: 1,
    flex: 0.8,
  },
  infoContainer: {
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center'
  },
  actions: {},
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.color.text_main,
    borderRadius: 0,
    marginHorizontal: 5,
    paddingHorizontal: 0,
    borderBottomWidth: 2,
    borderBottomColor: Theme.color.elementBackground,
    width: '80%'
  },
  itemNameFocused: {
    backgroundColor: Theme.color.secondary,
    borderBottomWidth: 2,
    borderBottomColor: Theme.color.main
  },
  itemNotes: {
    fontSize: 16,
    color: Theme.color.text_light
  }
})