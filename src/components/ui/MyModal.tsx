import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, ScrollView, TouchableWithoutFeedback} from 'react-native';
import { Theme } from '../../assets/Styles';

const getPositionStyles = (position: 'left' | 'right' | 'center' | undefined) => {
  if (position === 'left') return styles.left;
  if (position === 'right') return styles.right;
  return styles.center;
};


const MyModal = (props) => {

  // const [visibility, setVis] = useState(props.visible);
  const position = getPositionStyles(props.aligment);

  return (
    <View>
      <Modal
        animationType='none'
        transparent={true}
        visible={props.visible}
        onRequestClose={props.dismiss}
      >
        <TouchableWithoutFeedback onPress={props.dismiss}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={[styles.modalContent, position, props.style]}>{props.children}</View>
        {/* <TouchableOpacity>
          <ScrollView>
            <TouchableWithoutFeedback>
              <View>
                <Text>Some exmaple I guess?</Text>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </TouchableOpacity> */}
        {/** */}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    marginTop: 60,
    marginBottom: 20,
    borderRadius: 16,
    marginHorizontal: 20,
    width: '70%',
    // backgroundColor: '#ff00ff'
  },
  left: {
    alignSelf: 'flex-end'
  },
  right: {
    alignSelf: 'flex-start'
  },
  center: {
    alignSelf: 'center'
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
});

export default MyModal;
// Taken from: https://stackoverflow.com/questions/40483034/close-react-native-modal-by-clicking-on-overlay