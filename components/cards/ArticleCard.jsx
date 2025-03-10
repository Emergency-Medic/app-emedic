import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ArticleCard = ({ item, isLast }) => {
  const router = useRouter();
  const backgroundColor = item.index % 2 === 0 ? Colors.blue : Colors.red;
  const formattedKeywords = Array.isArray(item.keywords) ? item.keywords.join(', ') : '';

  const truncateDescription = (description) => {
    const words = description.split(' ');
    const truncated = words.slice(0, 6).join(' ');
    return words.length > 6 ? truncated + '...' : truncated;
  };

  return (
    <View style={[styles.cart, { backgroundColor, marginRight: isLast ? 0 : 10 }]}>
      <View style={styles.contain}>
        <View style={styles.pictureSection}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <View style={styles.textSection}>
          <Text style={styles.judul}>{item.title}</Text>
          <Text style={styles.kataKunci}>Kata Kunci: {formattedKeywords}</Text>
          <Text style={styles.deskripsi}>{truncateDescription(item.description)}</Text>

          <TouchableOpacity
            style={styles.pelajariSection}
            onPress={async () => {
              try {
                await AsyncStorage.setItem('lastRead', JSON.stringify(item));
                router.push(`../screens/artikel/Articlepage?id=${item.id}`);
              } catch (error) {
                console.error("Error saving lastRead:", error);
              }
            }}
          >
            <Text style={styles.pelajariText}>Pelajari</Text>
            <View style={styles.pelajariIcon}>
              <MaterialIcons name="article" size={10} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <MaterialIcons name="verified" size={20} color={Colors.white} style={styles.verifiedContent} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    cart: {
        backgroundColor: Colors.blue,
        borderRadius: 20, 
        // width: '90%'
      }, 
      contain: {
        flexDirection: 'row',
        alignContent: 'center', 
        justifyContent: 'center', 
        paddingHorizontal: 10, 
        paddingVertical: 10,
        marginLeft: 10,
        gap: 5
      }, 
      pictureSection: {
        flexDirection: 'column',  
        alignItems:'flex-start', 
        justifyContent: 'center',
        // marginLeft: 32,  
      },
      image: { 
        width: 42, 
        height: 62, 
        justifyContent: 'center', 
        alignItems: 'center', 
        // marginTop:,
        borderRadius: 10,
      },
      textSection: {
        marginLeft: 5,  
        justifyContent: 'flex-start', 
        marginTop: 5,
        width: 214,
      },
      judul: {
        color: Colors.white, 
        fontFamily: 'semibold', 
        fontSize: 12, 
        marginTop: 5, 
      }, 
      kataKunci: {
        color: Colors.white, 
        fontFamily: 'italic', 
        fontSize: 8,
        marginTop: 3, 
      }, 
      deskripsi: {
        color: Colors.white, 
        fontFamily: 'regular', 
        fontSize: 10, 
        marginTop: 5, 
        marginRight: 40, 
      }, 
      pelajariSection: {
        width: 240,
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-end',  
        marginRight: 32,
        // marginTop: 10 
      }, 
      pelajariText: {
        marginRight: 6, 
        fontFamily: 'semibold', 
        fontSize: 12, 
        color: Colors.white, 
      }, 
      pelajariIcon: {
        width: 20,
        height: 20, 
        borderRadius: 20, 
        backgroundColor: Colors.white, 
        alignItems: 'center', 
        justifyContent: 'center', 
      },
      verifiedContent: {
          // width:100,
          marginTop: 10,
          marginright: 40,
      },
})

export default ArticleCard;
