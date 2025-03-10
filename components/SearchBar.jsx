import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Colors } from '@/constants/Colors'

const SearchBar = ({ searchText, setSearchText, onSearch }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Pencarian"
        value={searchText}
        onChangeText={setSearchText}
      />
      <TouchableOpacity style={styles.searchIcon} onPress={onSearch}>
        <Text>🔍</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
      },
      searchInput: {
        // flex: 1,
        width:'90%',
        height: 40,
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 20,
        paddingHorizontal: 15,
        fontFamily:'regular',
      },
      searchIcon: {
        marginLeft: 10,
      },
})

export default SearchBar;