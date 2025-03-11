// components/LastReadArticle.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const LastReadArticle = ({ article, onPress }) => {
  if (!article) {
    return (
      <View style={styles.noRemindersContainer}>
        <FontAwesome5 name="exclamation" size={20} color="black" />
        <Text style={styles.noRemindersText}>Belum ada artikel yang dikunjungi</Text>
      </View>
    );
  }

  const formattedKeywords = article?.keywords?.join(', ') ?? '';
  const truncateDescription = article?.description ? (description => {
    const words = description.split(' ');
    const truncated = words.slice(0, 7).join(' ');
    return words.length > 7 ? truncated + '...' : truncated;
  })(article.description) : '';

  return (
    <View style={[styles.cart, { backgroundColor: Colors.blue }]}>
      <Text>
        <MaterialIcons name="verified" size={20} color={Colors.white} style={styles.verifiedContent} />
      </Text>

      <View style={styles.cart2}>
        <Image source={{ uri: article?.image }} style={styles.image} />
        <Text style={styles.judul}>{article?.title}</Text>
        <Text style={styles.kataKunci}>Kata Kunci: {formattedKeywords}</Text>
        <Text style={styles.deskripsi}>{truncateDescription}</Text>
        <TouchableOpacity
          style={styles.pelajariSection}
          onPress={() => onPress(article)}
        >
          <Text style={styles.pelajariText}>Pelajari</Text>
          <View style={styles.pelajariIcon}>
            <MaterialIcons name="article" size={10} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    cart: {
		width: '90%', // Adjust width as needed
		borderRadius: 20,
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		paddingHorizontal: 10,
		paddingVertical: 10,
		backgroundColor: Colors.blue,
	},
	cart2: {
		width: '90%', // Adjust width as needed
		borderRadius: 20,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingHorizontal: 10,
		paddingVertical: 10,
		backgroundColor: Colors.blue,
	},
    verifiedContent: { // Style verifiedContent dipindahkan dari Home.jsx
        marginTop: 0,
        marginRight: 0,
    },
    image: {
		width: 138,
		height: 80, 
		marginLeft: 5,
	}, 
    judul: { // Style judul dipindahkan dari Home.jsx
        color: Colors.white,
        fontFamily: 'semibold',
        fontSize: 12,
        marginTop: 5,
    },
    deskripsi: { // Style deskripsi dipindahkan dari Home.jsx
        color: Colors.white,
        fontFamily: 'regular',
        fontSize: 10,
        marginTop: 5,
        marginRight: 40,
    },
    pelajariSection: { // Style pelajariSection dipindahkan dari Home.jsx
        width: 240,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 32,
    },
    pelajariText: { // Style pelajariText dipindahkan dari Home.jsx
        marginRight: 6,
        fontFamily: 'semibold',
        fontSize: 12,
        color: Colors.white,
    },
    pelajariIcon: { // Style pelajariIcon dipindahkan dari Home.jsx
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    kataKunci: { // Style kataKunci dipindahkan dari Home.jsx
        color: Colors.white,
        fontFamily: 'italic',
        fontSize: 8,
        marginTop: 3,
    },
    noRemindersContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%', // Occupy full width
      height: 100,
    },
    noRemindersText: {
      fontSize: 12,
      color: Colors.grey,
      textAlign: 'center',
      fontFamily: 'regular',
      marginTop: 10,
    },
});

export default LastReadArticle;