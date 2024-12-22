import { View, StyleSheet, Text } from 'react-native'
import { Colors } from '@/constants/Colors';
import BackButton from '@/components/BackButton'

export default function NewPass() {
  return (
    <View style={styles.allwrap}>
        <BackButton color={Colors.red} top={45}/>
    </View>
  )
}
const styles = StyleSheet.create({
    allwrap: {
      height: '100%',
      backgroundColor: Colors.white,
    },
})
