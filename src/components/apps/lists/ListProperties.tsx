
import React, { useState, useRef, useCallback } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Button } from "../../ui/Button";
import MyTextInput from "../../ui/MyTextInput";
import { Theme } from "../../../assets/Styles";
import { LOGO } from "../../../assets/Index";
import KeyboardAware from "../../ui/KeyboardAware";
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { UserIcon } from "../../ui/UserIcon";

const ListProperties = (props) => {
  console.log('props', props);

  const sampleUsers = [
    {id: 'xxx', name: 'Some random name', icon: ''},
    {id: 'xxx', name: 'Some random name', icon: ''},
    {id: 'xxx', name: 'Some random name', icon: ''},
    {id: 'xxx', name: 'Some random name', icon: ''},
  ];

  const sampleInvited = [
    { email: 'some_random_email@email.com'},
    { email: 'some_random_email@email.com'},
  ];

  const [invited, setInvited] = useState(sampleInvited);
  const [shared, setShared] = useState(sampleUsers);

  const [name, setName] = useState(props.list.name || 'Name?');

  const [notes, setNotes] = useState(props.list.notes || 'Notes?');

  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [suggestionList, setSuggestionList] = useState(null);
  const dropdownController = useRef(null);
  const searchRef = useRef(null);

  const getSuggestions = useCallback(async q => {
    if (typeof q !== 'string' || q.length < 3) {
      setSuggestionList(null);
      return;
    }
    setSuggestionLoading(true);

  }, []);

  const save = () => {}

  const updateName = (newName) => {
    setName(newName);
    // call save from parent
    props.updateList(newName);
  };

  return <View style={styles.modalContainer}>
    <View style={styles.container}>
      <View style={styles.header}>
        <MyTextInput
          placeholder="List name"
          value={name}
          onBlur={updateName}
          style={styles.listName}
          focused={styles.listNameFocus}
          textAlign="center"
          placeholderColor={Theme.color.main}
          // placeholderColorFocused={'red'}
          placeholderColorFocused={Theme.color.main_contrast}
          />
      </View>
      <View style={styles.body}>
        <AutocompleteDropdown 
          dataSet={[
            { id: '1', title: 'Some Long Name (withanemail.com)'},
            { id: '2', title: 'Other name (email@email.com)'}
          ]}
          textInputProps={{
            placeholder: 'Invite someone...',
            style: {
              paddingLeft: 18,
            }
          }}
        />
        <KeyboardAware>
        <ScrollView>
          <Text style={styles.section_name}>Shared With</Text>
          {
            [1,2,3,4,5,6,7,8,9,10].map((v, i) => {
              let userProps: Record<string, string> = {
                username: 'My Username',
                icon: 'placeholder',
                initials: 'MU'
              };
              if (v % 3 === 0 || v % 5 === 0) {
                userProps.details = 'some@email.com';
              }
              return <UserListing {...userProps}></UserListing>;
            })
          }
          <Text style={styles.section_name}>Invited</Text>
          {
            [
              'sample@email.com',
              'reallylonglonglongemail@email.com',
              'some_unreal_username',
              'anotjer.normal@email.email.com'
            ].map((v, i) => {
              return <Invited name={v}></Invited>
            })
          }
        </ScrollView>
        </KeyboardAware>
      </View>
      <View style={styles.footer}>
        <Button onPress={props.closeFn} title="Close" type='secondary' />
      </View>
    </View>
  </View>;
};

const styles= StyleSheet.create({
  modalContainer: {
    // height: '100%',
    flex: 1,
    borderRadius: 16,
    // backgroundColor: '#a0a0a0'
    // width: '100%',
    // backgroundColor: '#ff0000'
    backgroundColor: Theme.color.background
  },
  container: {
    height: '100%',
    alignContent: 'flex-end',
    // backgroundColor: '#aaaaaa'
  },
  header: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: Theme.color.main_contrast
  },
  body: {
    paddingHorizontal: 5,
    flexGrow: 1,
    // flexBasis: 'auto',
    // backgroundColor: '#ac33ac'
  },
  footer: {
    padding: 16,
    // height: '100%',
    // flex: 1,
    width: '60%',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignSelf: 'center',
  },
  listName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  listNameFocus: {
    color: Theme.color.main_contrast,
    backgroundColor: Theme.color.main
  },
  user: {
    height: 50,
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 5,
    paddingVertical: 5,
  },
  username: {
    marginLeft: 10,
  },
  section_name: {
    marginTop: 10,
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: Theme.color.text_main
  },
  avatar: {
    maxHeight: 40,
    maxWidth: 40,
    borderRadius: 20
  }
});

const UserListing = (props) => {

  return <View style={styles.user}>
    <UserIcon size={'small'} initials={props.initials} src={props.icon}></UserIcon>
    <View style={{
      marginLeft: 10,
      justifyContent: 'center',
      alignContent: 'center'
    }}>
      <Text style={{
        color: Theme.color.text_main,
        fontWeight: 'bold',
        fontSize: 16
      }}>{props.username}</Text>
      {(props.details && <Text style={{
        color: Theme.color.text_light,
        marginTop: 3
      }}>{props.details}</Text>)}
    </View>
  </View>;
};

const Invited = (props) => {
  return <View style={{
    marginTop: 10,
    marginLeft: 15
  }}>
    <Text style={{
      color: Theme.color.text_main,
      fontWeight: 'bold',
      fontSize: 14
    }}>{props.name}</Text>
  </View>;
}

export default ListProperties;