import React, { useContext, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Platform, 
  Alert,
  TouchableOpacity,
  Linking,
  RefreshControl,
  Share
} from "react-native";
import { AppContext } from "../context/AppContext";
import { lightTheme, darkTheme } from "../theme/theme";

export default function SavedArticlesPage({ navigation }) {
  const {
    theme,
    savedArticles,
    setSavedArticles,
  } = useContext(AppContext);

  const [refreshing, setRefreshing] = useState(false);
  const activeTheme = theme === "light" ? lightTheme : darkTheme;

  // Handle article link press
  const handleArticlePress = async (article) => {
    try {
      const supported = await Linking.canOpenURL(article.url);
      if (supported) {
        await Linking.openURL(article.url);
      } else {
        Alert.alert(
          'Error', 
          'Cannot open this article. The link might be invalid.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error opening article:', error);
      Alert.alert('Error', 'Failed to open the article.');
    }
  };

  // Remove article from saved list
  const removeArticle = (indexToRemove) => {
    Alert.alert(
      'Remove Article',
      'Are you sure you want to remove this article from your saved list?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            try {
              const updatedArticles = savedArticles.filter((_, index) => index !== indexToRemove);
              setSavedArticles(updatedArticles);
              Alert.alert('Success', 'Article removed successfully!');
            } catch (error) {
              console.error('Error removing article:', error);
              Alert.alert('Error', 'Failed to remove article. Please try again.');
            }
          }
        }
      ]
    );
  };

  // Share article
  const shareArticle = async (article) => {
    try {
      await Share.share({
        message: `${article.title}\n\n${article.url}`,
        title: article.title,
      });
    } catch (error) {
      console.error('Error sharing article:', error);
    }
  };

  // Pull to refresh
  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Unknown date';
    }
  };

  // Clear all saved articles
  const clearAllArticles = () => {
    Alert.alert(
      'Clear All Articles',
      'Are you sure you want to remove all saved articles? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => {
            try {
              setSavedArticles([]);
              Alert.alert('Success', 'All articles cleared successfully!');
            } catch (error) {
              console.error('Error clearing articles:', error);
              Alert.alert('Error', 'Failed to clear articles. Please try again.');
            }
          }
        }
      ]
    );
  };

  const renderArticleItem = ({ item, index }) => (
    <View style={[styles.articleCard, { backgroundColor: activeTheme.card }]}>
      {/* Article Title */}
      <TouchableOpacity 
        onPress={() => handleArticlePress(item)}
        style={styles.articleContent}
      >
        <Text style={[styles.articleTitle, { color: activeTheme.text }]}>
          {item.title}
        </Text>
        
        {/* Article Source and Date */}
        <View style={styles.articleMeta}>
          {item.source?.name && (
            <Text style={[styles.articleSource, { color: activeTheme.text + '80' }]}>
              {item.source.name}
            </Text>
          )}
          {item.publishedAt && (
            <Text style={[styles.articleDate, { color: activeTheme.text + '60' }]}>
              {formatDate(item.publishedAt)}
            </Text>
          )}
        </View>

        {/* Article Description */}
        {item.description && (
          <Text 
            style={[styles.articleDescription, { color: activeTheme.text + '80' }]}
            numberOfLines={3}
          >
            {item.description}
          </Text>
        )}

        {/* Article URL */}
        <Text 
          style={[styles.articleUrl, { color: activeTheme.button }]}
          numberOfLines={1}
        >
          {item.url}
        </Text>
      </TouchableOpacity>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: activeTheme.button }]}
          onPress={() => handleArticlePress(item)}
        >
          <Text style={styles.actionButtonText}>📖 Read</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: activeTheme.text + '20' }]}
          onPress={() => shareArticle(item)}
        >
          <Text style={[styles.actionButtonText, { color: activeTheme.text }]}>📤 Share</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#ff4444' }]}
          onPress={() => removeArticle(index)}
        >
          <Text style={styles.actionButtonText}>🗑️ Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: activeTheme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: activeTheme.text + '20' }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.backButtonText, { color: activeTheme.text }]}>← Back</Text>
        </TouchableOpacity>
        
        <Text style={[styles.heading, { color: activeTheme.text }]}>
          Saved Articles ({savedArticles.length})
        </Text>

        {savedArticles.length > 0 && (
          <TouchableOpacity 
            style={[styles.clearButton, { backgroundColor: '#ff4444' }]}
            onPress={clearAllArticles}
          >
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Articles List */}
      {savedArticles.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: activeTheme.text + '60' }]}>
            📰 No saved articles yet
          </Text>
          <Text style={[styles.emptySubtext, { color: activeTheme.text + '40' }]}>
            Articles you save will appear here for easy access
          </Text>
        </View>
      ) : (
        <FlatList
          data={savedArticles}
          keyExtractor={(item, index) => `${item.url}-${index}`}
          renderItem={renderArticleItem}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh}
              tintColor={activeTheme.text}
            />
          }
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 20,
    flexWrap: 'wrap',
  },
  backButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  articleCard: {
    borderRadius: 12,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  articleContent: {
    marginBottom: 15,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 8,
  },
  articleMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  articleSource: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  articleDate: {
    fontSize: 12,
  },
  articleDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  articleUrl: {
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});