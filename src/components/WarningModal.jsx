import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { primaryColor } from '../constants';
import AnimatedIcon from './AnimatedIcon';



const WarningModal = ({ open, toggle, content }) => {

  return (

    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        toggle()
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <AnimatedIcon />
          <Text style={styles.modalText}>{content}</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => toggle()}>
            <Text style={styles.textStyle}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>

  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: '90%'
  },
  button: {
    borderRadius: 6,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: primaryColor,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 17,
    marginTop: 10
  },
});

export default WarningModal;