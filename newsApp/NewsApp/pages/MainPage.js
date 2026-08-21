import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  SafeAreaView,
  Platform,
  StatusBar,
  Modal,
  Animated,
  Alert,
  Share,
  Linking, // Added for opening article URLs
} from "react-native";
import { AppContext } from "../context/AppContext";
import { lightTheme, darkTheme } from "../theme/theme";

export default function MainPage({ navigation }) {
  const { edition, saveArticle, theme, user, savedArticles } = useContext(AppContext);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [remainingRequests, setRemainingRequests] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-250));

  const activeTheme = theme === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    const API_KEY = "5ee9cd6581864eef700cd0053c94cf11";      //API KEY
    setLoading(true);
    setError("");

    const country = edition.toLowerCase();

    fetch(
      `https://gnews.io/api/v4/top-headlines?country=${country}&lang=en&token=${API_KEY}`
    )
      .then(async (res) => {
        setRemainingRequests(res.headers.get("X-RateLimit-Remaining"));
        return res.json();
      })
      .then((data) => {
        if (data.articles && Array.isArray(data.articles)) {
          setArticles(data.articles);
        } else if (data.errors) {
          setError(data.errors.join(", "));
          setArticles([]);
        } else {
          setError("No news available for this edition.");
          setArticles([]);
        }
      })
      .catch(() => setError("Network error while fetching news."))
      .finally(() => setLoading(false));
  }, [edition]);

  // Animate menu slide in/out
  const toggleMenu = () => {
    if (menuVisible) {
      // Close menu
      Animated.timing(slideAnim, {
        toValue: -250,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      // Open menu
      setMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const navigateAndCloseMenu = (screen) => {
    toggleMenu();
    setTimeout(() => {
      navigation.navigate(screen);
    }, 200);
  };

  // Handle article press to read full article
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

  // Fixed: Simplified share functionality using React Native's Share
  const handleShareArticle = async (article) => {
    try {
      const shareContent = `📰 ${article.title}\n\n${article.description || 'Check out this news article!'}\n\nRead more: ${article.url}\n\nShared via News Around You App`;

      const result = await Share.share({
        message: shareContent,
        title: article.title,
        url: article.url, // This will be used on iOS
      });

      // Optional: Handle the result
      if (result.action === Share.sharedAction) {
        // Article was shared successfully
        console.log('Article shared successfully');
      } else if (result.action === Share.dismissedAction) {
        // Share was dismissed
        console.log('Share was dismissed');
      }
      
    } catch (error) {
      console.error('Share error:', error);
      Alert.alert(
        'Share Failed', 
        'Unable to share this article. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.article, { backgroundColor: activeTheme.card }]}
      onPress={() => handleArticlePress(item)}
      activeOpacity={0.8}
    >
      {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
      <Text style={[styles.title, { color: activeTheme.text }]}>
        {item.title}
      </Text>
      {item.description && (
        <Text style={[styles.description, { color: activeTheme.text + 'CC' }]} numberOfLines={3}>
          {item.description}
        </Text>
      )}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: activeTheme.button }]}
          onPress={(e) => {
            e.stopPropagation(); // Prevent triggering the parent TouchableOpacity
            saveArticle(item);
            Alert.alert('Saved', 'Article saved successfully!');
          }}
        >
          <Text style={styles.actionBtnText}>💾 Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: '#28a745' }]}
          onPress={(e) => {
            e.stopPropagation(); // Prevent triggering the parent TouchableOpacity
            handleShareArticle(item);
          }}
        >
          <Text style={styles.actionBtnText}>📤 Share</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View
        style={[styles.container, { backgroundColor: activeTheme.background }]}
      >
        {/* Header with Hamburger Menu */}
        <View style={[styles.header, { backgroundColor: activeTheme.card }]}>
          <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
            <View style={[styles.menuBar, { backgroundColor: activeTheme.text }]} />
            <View style={[styles.menuBar, { backgroundColor: activeTheme.text }]} />
            <View style={[styles.menuBar, { backgroundColor: activeTheme.text }]} />
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <Text style={[styles.heading, { color: activeTheme.text }]}>
              News Around You
            </Text>
            <Text style={[styles.edition, { color: activeTheme.text }]}>
              {edition.toUpperCase()}
            </Text>
          </View>

          <View style={styles.headerRight}>
            {remainingRequests !== null && (
              <Text style={[styles.apiCount, { color: activeTheme.text }]}>
                API: {remainingRequests}
              </Text>
            )}
          </View>
        </View>

        {/* Loading / Error */}
        {loading && (
          <ActivityIndicator
            size="large"
            color={activeTheme.button}
            style={{ marginTop: 20 }}
          />
        )}
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {/* Articles list */}
        <FlatList
          data={articles}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        />

        {/* Slide-out Menu Modal */}
        <Modal
          visible={menuVisible}
          transparent={true}
          animationType="none"
          onRequestClose={toggleMenu}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={toggleMenu}
          >
            <Animated.View
              style={[
                styles.slideMenu,
                {
                  backgroundColor: activeTheme.card,
                  transform: [{ translateX: slideAnim }],
                },
              ]}
            >
              {/* Menu Header */}
              <View style={[styles.menuHeader, { borderBottomColor: activeTheme.text + '30' }]}>
                <Text style={[styles.menuTitle, { color: activeTheme.text }]}>
                  Menu
                </Text>
                <TouchableOpacity onPress={toggleMenu}>
                  <Text style={[styles.closeButton, { color: activeTheme.text }]}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* User Info */}
              {user.name && (
                <View style={styles.userInfo}>
                  <Text style={[styles.userName, { color: activeTheme.text }]}>
                    Hello, {user.name}! 👋
                  </Text>
                </View>
              )}

              {/* Menu Items */}
              <View style={styles.menuItems}>
                <TouchableOpacity
                  style={[styles.menuItem, { borderBottomColor: activeTheme.text + '20' }]}
                  onPress={() => navigateAndCloseMenu("SavedArticles")}
                >
                  <Text style={styles.menuIcon}>💾</Text>
                  <View style={styles.menuItemContent}>
                    <Text style={[styles.menuItemText, { color: activeTheme.text }]}>
                      Saved Articles
                    </Text>
                    {savedArticles.length > 0 && (
                      <Text style={[styles.menuItemCount, { color: activeTheme.text + '80' }]}>
                        ({savedArticles.length})
                      </Text>
                    )}
                  </View>
                  <Text style={[styles.menuArrow, { color: activeTheme.text }]}>›</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.menuItem, { borderBottomColor: activeTheme.text + '20' }]}
                  onPress={() => navigateAndCloseMenu("Settings")}
                >
                  <Text style={styles.menuIcon}>⚙️</Text>
                  <Text style={[styles.menuItemText, { color: activeTheme.text }]}>
                    Settings
                  </Text>
                  <Text style={[styles.menuArrow, { color: activeTheme.text }]}>›</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.menuItem, { borderBottomColor: activeTheme.text + '20' }]}
                  onPress={() => navigateAndCloseMenu("ShareNews")}
                >
                  <Text style={styles.menuIcon}>📰</Text>
                  <Text style={[styles.menuItemText, { color: activeTheme.text }]}>
                    Share News
                  </Text>
                  <Text style={[styles.menuArrow, { color: activeTheme.text }]}>›</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.menuItem, { borderBottomColor: activeTheme.text + '20' }]}
                  onPress={() => navigateAndCloseMenu("AboutApp")}
                >
                  <Text style={styles.menuIcon}>📱</Text>
                  <Text style={[styles.menuItemText, { color: activeTheme.text }]}>
                    About App
                  </Text>
                  <Text style={[styles.menuArrow, { color: activeTheme.text }]}>›</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => navigateAndCloseMenu("RateUs")}
                >
                  <Text style={styles.menuIcon}>⭐</Text>
                  <Text style={[styles.menuItemText, { color: activeTheme.text }]}>
                    Rate Us
                  </Text>
                  <Text style={[styles.menuArrow, { color: activeTheme.text }]}>›</Text>
                </TouchableOpacity>
              </View>

              {/* App Version */}
              <View style={styles.menuFooter}>
                <Text style={[styles.appVersion, { color: activeTheme.text + '60' }]}>
                  News App v1.0.0
                </Text>
              </View>
            </Animated.View>
          </TouchableOpacity>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  
  // Header styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  menuButton: {
    padding: 8,
    marginRight: 15,
  },
  menuBar: {
    width: 20,
    height: 3,
    marginVertical: 2,
    borderRadius: 1.5,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  heading: { 
    fontSize: 18, 
    fontWeight: "bold" 
  },
  edition: {
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.8,
  },
  headerRight: {
    width: 50,
    alignItems: 'flex-end',
  },
  apiCount: {
    fontSize: 10,
    fontWeight: '500',
  },

  // Error styles
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 10,
    margin: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
  },

  // Article styles
  article: {
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    padding: 15,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: { 
    width: "100%", 
    height: 180, 
    borderRadius: 8,
    marginBottom: 10,
  },
  title: { 
    fontSize: 16, 
    fontWeight: "bold", 
    marginBottom: 8,
    lineHeight: 22,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  actions: { 
    flexDirection: "row", 
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionBtn: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
    flex: 0.48,
  },
  actionBtnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },

  // Modal and Menu styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  slideMenu: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 250,
    elevation: 10,
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    borderBottomWidth: 1,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
  },
  userInfo: {
    padding: 20,
    paddingBottom: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  menuItems: {
    flex: 1,
    paddingTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 15,
    width: 25,
  },
  menuItemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  menuItemCount: {
    fontSize: 12,
    marginLeft: 5,
  },
  menuArrow: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuFooter: {
    padding: 20,
    alignItems: 'center',
  },
  appVersion: {
    fontSize: 12,
  },
});