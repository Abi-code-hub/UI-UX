import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  TextInput,
  Linking,
} from "react-native";
import { AppContext } from "../context/AppContext";
import { lightTheme, darkTheme } from "../theme/theme";

export default function RateUsPage() {
  const { theme, user } = useContext(AppContext);
  const activeTheme = theme === "light" ? lightTheme : darkTheme;
  
  const [selectedRating, setSelectedRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [hasRated, setHasRated] = useState(false);

  const ratingLabels = {
    1: "Poor",
    2: "Fair", 
    3: "Good",
    4: "Very Good",
    5: "Excellent"
  };

  const handleStarPress = (rating) => {
    setSelectedRating(rating);
  };

  const handleSubmitRating = () => {
    if (selectedRating === 0) {
      Alert.alert("Please Rate Us", "Please select a star rating before submitting.");
      return;
    }

    // Simulate submitting rating
    setHasRated(true);
    
    Alert.alert(
      "Thank You! 🎉",
      `We appreciate your ${selectedRating}-star rating${feedback ? ' and feedback' : ''}! Your input helps us improve the app.`,
      [{ text: "Great!" }]
    );
  };

  const handleRateOnStore = () => {
    Alert.alert(
      "Rate on App Store",
      "Would you like to rate us on the app store? This helps other users discover our app!",
      [
        { text: "Maybe Later", style: "cancel" },
        { 
          text: "Rate Now", 
          onPress: () => {
            // For demo purposes - in real app, use app store URLs
            Alert.alert("Opening App Store", "This would open your device's app store.");
          }
        }
      ]
    );
  };

  const handleShareApp = () => {
    const shareMessage = `📰 Check out "News Around You" - the best app for staying updated with global news! 

🌍 Get news from multiple countries
📍 Auto-detect your location
💾 Save articles for later
🌙 Beautiful dark mode
📤 Easy sharing

Download it now!`;

    Alert.alert(
      "Share App",
      shareMessage,
      [
        { text: "Copy Text", onPress: () => Alert.alert("Copied!", "Share text copied to clipboard") },
        { text: "OK" }
      ]
    );
  };

  if (hasRated) {
    return (
      <ScrollView style={[styles.container, { backgroundColor: activeTheme.background }]}>
        <View style={[styles.thankYouContainer, { backgroundColor: activeTheme.card }]}>
          <Text style={styles.thankYouIcon}>🎉</Text>
          <Text style={[styles.thankYouTitle, { color: activeTheme.text }]}>
            Thank You!
          </Text>
          <Text style={[styles.thankYouMessage, { color: activeTheme.text + 'DD' }]}>
            We've received your {selectedRating}-star rating{feedback ? ' and feedback' : ''}. 
            Your input is valuable to us and helps make the app better for everyone!
          </Text>

          {selectedRating >= 4 && (
            <TouchableOpacity 
              style={[styles.storeButton, { backgroundColor: '#FF6B6B' }]}
              onPress={handleRateOnStore}
            >
              <Text style={styles.storeButtonText}>⭐ Rate on App Store</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity 
            style={[styles.shareButton, { backgroundColor: activeTheme.button }]}
            onPress={handleShareApp}
          >
            <Text style={styles.shareButtonText}>📤 Share with Friends</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.backButton, { borderColor: activeTheme.text }]}
            onPress={() => setHasRated(false)}
          >
            <Text style={[styles.backButtonText, { color: activeTheme.text }]}>
              🔄 Rate Again
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: activeTheme.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: activeTheme.card }]}>
        <Text style={styles.headerIcon}>⭐</Text>
        <Text style={[styles.headerTitle, { color: activeTheme.text }]}>
          Rate Our App
        </Text>
        <Text style={[styles.headerSubtitle, { color: activeTheme.text + 'AA' }]}>
          Your feedback matters to us!
        </Text>
      </View>

      {/* User Greeting */}
      {user.name && (
        <View style={[styles.greetingCard, { backgroundColor: activeTheme.card }]}>
          <Text style={[styles.greetingText, { color: activeTheme.text }]}>
            Hi {user.name}! 👋
          </Text>
          <Text style={[styles.greetingSubtext, { color: activeTheme.text + 'CC' }]}>
            How has your experience been with News Around You?
          </Text>
        </View>
      )}

      {/* Rating Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>
          How would you rate us?
        </Text>
        
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => handleStarPress(star)}
              style={styles.starButton}
            >
              <Text style={[
                styles.star,
                { color: star <= selectedRating ? '#FFD700' : '#DDD' }
              ]}>
                ⭐
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedRating > 0 && (
          <Text style={[styles.ratingLabel, { color: activeTheme.text }]}>
            {ratingLabels[selectedRating]} ({selectedRating}/5)
          </Text>
        )}
      </View>

      {/* Feedback Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>
          Tell us more (Optional)
        </Text>
        <TextInput
          style={[
            styles.feedbackInput,
            {
              color: activeTheme.text,
              borderColor: activeTheme.text + '40',
              backgroundColor: activeTheme.card
            }
          ]}
          placeholder="What do you like? What could be improved?"
          placeholderTextColor={activeTheme.text + '60'}
          multiline
          numberOfLines={4}
          value={feedback}
          onChangeText={setFeedback}
          textAlignVertical="top"
        />
      </View>

      {/* Features We're Proud Of */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>
          What We're Proud Of
        </Text>
        <View style={[styles.featuresCard, { backgroundColor: activeTheme.card }]}>
          <View style={styles.featureRow}>
            <Text style={styles.featureIcon}>🚀</Text>
            <Text style={[styles.featureText, { color: activeTheme.text }]}>
              Fast & reliable news updates
            </Text>
          </View>
          <View style={styles.featureRow}>
            <Text style={styles.featureIcon}>🌍</Text>
            <Text style={[styles.featureText, { color: activeTheme.text }]}>
              Global news coverage
            </Text>
          </View>
          <View style={styles.featureRow}>
            <Text style={styles.featureIcon}>📱</Text>
            <Text style={[styles.featureText, { color: activeTheme.text }]}>
              Clean, user-friendly interface
            </Text>
          </View>
          <View style={styles.featureRow}>
            <Text style={styles.featureIcon}>🔒</Text>
            <Text style={[styles.featureText, { color: activeTheme.text }]}>
              Privacy-focused design
            </Text>
          </View>
        </View>
      </View>

      {/* Submit Button */}
      <View style={styles.section}>
        <TouchableOpacity 
          style={[
            styles.submitButton, 
            { 
              backgroundColor: selectedRating > 0 ? activeTheme.button : activeTheme.text + '40'
            }
          ]}
          onPress={handleSubmitRating}
          disabled={selectedRating === 0}
        >
          <Text style={[
            styles.submitButtonText,
            { opacity: selectedRating > 0 ? 1 : 0.7 }
          ]}>
            🎯 Submit Rating
          </Text>
        </TouchableOpacity>
      </View>

      {/* Alternative Actions */}
      <View style={styles.section}>
        <Text style={[styles.alternativeTitle, { color: activeTheme.text }]}>
          Other ways to help us
        </Text>
        
        <TouchableOpacity 
          style={[styles.alternativeButton, { borderColor: activeTheme.text + '40' }]}
          onPress={handleShareApp}
        >
          <Text style={[styles.alternativeButtonText, { color: activeTheme.text }]}>
            📤 Share with Friends
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.alternativeButton, { borderColor: activeTheme.text + '40' }]}
          onPress={() => Alert.alert("Contact Us", "Send us an email at support@newsaroundyou.com")}
        >
          <Text style={[styles.alternativeButtonText, { color: activeTheme.text }]}>
            📧 Send Feedback
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: activeTheme.text + '60' }]}>
          Every rating and review helps us grow! 💙
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
  },
  header: {
    alignItems: 'center',
    padding: 25,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  greetingCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  greetingSubtext: {
    fontSize: 15,
    lineHeight: 22,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  starButton: {
    padding: 8,
    marginHorizontal: 5,
  },
  star: {
    fontSize: 35,
  },
  ratingLabel: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  feedbackInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
  },
  featuresCard: {
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 30,
  },
  featureText: {
    fontSize: 15,
    flex: 1,
  },
  submitButton: {
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  alternativeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  alternativeButton: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  alternativeButtonText: {
    fontSize: 15,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  
  // Thank you screen styles
  thankYouContainer: {
    margin: 20,
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  thankYouIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  thankYouTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  thankYouMessage: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
  storeButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  storeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  shareButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  shareButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});