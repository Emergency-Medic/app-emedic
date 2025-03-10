import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SearchBar from '@/components/SearchBar';
import SearchHistory from '@/components/SearchHistory';
import ArticleCard from '@/components/cards/ArticleCard';
import useSearch from '@/hooks/useSearch';

const Exp = () => {
  const {
    recommendations,
    searchText,
    setSearchText,
    isSearching,
    searchHistory,
    handleSearch,
    fetchDefaultRecommendations,
    clearSearchHistory,
    removeItemFromHistory,
    setIsSearching,
  } = useSearch();

  const handleResetSearch = () => {
    setSearchText('');
    fetchDefaultRecommendations();
  };

  return (
    <View style={styles.container}>
      <SearchBar searchText={searchText} setSearchText={setSearchText} onSearch={handleSearch} />
      {!isSearching && (
        <SearchHistory
          searchHistory={searchHistory}
          clearSearchHistory={clearSearchHistory}
          removeItemFromHistory={removeItemFromHistory}
          setSearchText={setSearchText}
          handleSearch={handleSearch}
        />
      )}
      <View style={styles.recommendationsContainer}>
        <View style={styles.recommendationsHeader}>
          <Text style={styles.recommendationsTitle}>
            {isSearching ? 'Hasil Pencarian Anda' : 'Disarankan untuk Anda'}
          </Text>
          {isSearching && (
            <TouchableOpacity onPress={handleResetSearch}>
              <Text style={styles.clearText}>Reset Pencarian</Text>
            </TouchableOpacity>
          )}
        </View>
        <ScrollView 
				style={styles.cartContainer}
				contentContainerStyle={styles.cartContent}
				showsVerticalScrollIndicator={false}
			>
          {recommendations.length > 0 ? (
            recommendations.map((item, index) => (
              <ArticleCard key={item.id} item={{ ...item, index }} isLast={false} />
            ))
          ) : (
            isSearching && <Text style={styles.notFoundText}>Tidak ditemukan</Text>
          )}
      </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop:30,
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  historyContainer: {
    marginBottom: 20,
  },
  historyHeader: {
    gap:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily:'semibold',
  },
  clearText: {
    fontSize: 14,
    color: '#007BFF',
    fontFamily:'regular',
    alignItems: 'center',
  },
  historyTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  historyTag: {
    backgroundColor: '#F8D7DA',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    flexDirection:'row',
    alignItems: 'center',
  },
  historyTagText: {
    fontSize: 14,
    color: '#721C24',
  },
  recommendationsContainer: {
    marginTop: 20,
    flex: 1,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontFamily: 'semibold',
    marginBottom: 0,
  },
  notFoundText: {
    fontFamily: 'regular',
  },
  recommendationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  noHistoryText: {
    fontFamily: 'regular',
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
  },
  verifiedIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  cartContainer: {
		borderRadius: 20,
		height: '100%',
		width: '100%',
		gap: 10,
	},
	cartContent: {
		paddingBottom: 20,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		gap: 10
	},
});

export default Exp;