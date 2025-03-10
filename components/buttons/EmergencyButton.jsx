import { Modal, View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Foundation from '@expo/vector-icons/Foundation';
import { Colors } from '@/constants/Colors';

const EmergencyButton = ({onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.emergencyButton}>
          <View style={styles.circle}>
            <Foundation name="telephone" size={100} color={Colors.white} style={styles.callIcon} />
          </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    emergencyButton: {
        width: 250,
        height: 250,
        borderRadius: 360,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 43,
        elevation: 10,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      circle: {
        width: 210,
        height: 210,
        borderRadius: 360,
        backgroundColor: Colors.red,
        justifyContent: 'center',
        alignItems: 'center'
      },
      callIcon: {
        alignItems: 'center',
        justifyContent: 'center',
      },
})
export default EmergencyButton