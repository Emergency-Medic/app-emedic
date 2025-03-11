import React from "react";
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors"

const CustomModal = ({ 
  visible, 
  onClose, 
  title = "Peringatan", 
  question, 
  onConfirm, 
  confirmText = "Ya", 
  cancelText = "Tidak",
  onOthers 
}) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPressOut={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalCardContent}>
              <View style={styles.modalWarningContainer}>
                <View style={styles.modalWarningIcon}>
                  <AntDesign name="warning" size={16} color={Colors.red} />
                </View>
                <Text style={styles.modalWarningText}>{title}</Text>
              </View>
              <Text style={styles.modalWarningQuestion}>{question}</Text>
              <View style={styles.answerContent}>
                <TouchableOpacity style={styles.meButton} onPress={onConfirm}>
                  <Text style={styles.yaText}>{confirmText}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.otherButton} onPress={onOthers}>
                  <Text style={styles.tidakText}>{cancelText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// Styles tetap menggunakan styles yang sebelumnya
const styles = {
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.transparencyGrey,
      },
      modalCardContent: {
        width: '85%',
        paddingHorizontal: 37,
        paddingVertical: 12,
        backgroundColor: Colors.white,
        borderRadius: 20,
        textAlign: 'center',
        alignItems: 'center',
      },
      modalWarningContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
      },
      modalWarningIcon: {
        marginRight: 10,
      },
      modalWarningText: {
        color: Colors.red,
        fontSize: 14,
        fontFamily: 'semibold',
      },
      modalWarningQuestion: {
        fontFamily: 'semibold',
        fontSize: 14,
        color: Colors.blue,
        paddingHorizontal: 30,
        textAlign: 'center',
        marginTop: 12,
        marginBottom: 22
      },
      answerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20,
        paddingHorizontal: 34,
        marginBottom: 4
      },
      meButton: {
        paddingHorizontal: 34,
        paddingVertical: 7,
        backgroundColor: Colors.red,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      yaText: {
        color: Colors.white,
        fontFamily: 'semibold',
        fontSize: 14,
      },
      otherButton: {
        width: 129,
        height: 33,
        paddingVertical: 7,
        backgroundColor: Colors.white,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      tidakText: {
        color: Colors.grey,
        fontFamily: 'semibold',
        fontSize: 14,
      },

};

export default CustomModal;
