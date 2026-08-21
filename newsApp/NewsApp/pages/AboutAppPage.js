import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Linking,
  Alert,
} from "react-native";
import { AppContext } from "../context/AppContext";
import { lightTheme, darkTheme } from "../theme/theme";

export default function AboutAppPage() {
  const { theme } = useContext(AppContext);
  const activeTheme = theme === "light" ? lightTheme : darkTheme;

  const handleContactUs = () => {
    const email = "support@newsaroundyou.com";
    const subject = "News Around You - Support Request";
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    
    Linking.canOpenURL(mailtoUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(mailtoUrl);
        } else {
          Alert.alert(
            "Contact Us",
            `Please send us an email at:\n${email}`,
            [{ text: "OK" }]
          );
        }
      })
      .catch(() => {
        Alert.alert(
          "Contact Us",
          `Please send us an email at:\n${email}`,
          [{ text: "OK" }]
        );
      });
  };

  const handlePrivacyPolicy = () => {
    Alert.alert(
      "Privacy Policy",
      "We respect your privacy and are committed to protecting your personal data. This app only accesses your location when requested for country detection and stores your preferences locally on your device.",
      [{ text: "OK" }]
    );
  };

  const handleTermsOfService = () => {
    Alert.alert(
      "Terms of Service",
      "By using this app, you agree to our terms of service. This app is provided 'as is' for informational purposes. News content is provided by third-party sources.",
      [{ text: "OK" }]
    );
  };

  const features = [
    { icon: "📰", title: "Latest News", description: "Get real-time news from multiple countries" },
    { icon: "🌍", title: "Global Coverage", description: "News from US, UK, India, Singapore and more" },
    { icon: "📍", title: "GPS Location", description: "Auto-detect your country for relevant news" },
    { icon: "💾", title: "Save Articles", description: "Save your favorite articles to read later" },
    { icon: "📤", title: "Easy Sharing", description: "Share news articles with friends and family" },
    { icon: "🌙", title: "Dark Mode", description: "Comfortable reading in any lighting condition" },
    { icon: "📷", title: "Share Your News", description: "Create and share your own news updates" },
  ];

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: activeTheme.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* App Header */}
      <View style={[styles.header, { backgroundColor: activeTheme.card }]}>
        <Text style={[styles.appTitle, { color: activeTheme.text }]}>
          📰 News Around You
        </Text>
        <Text style={[styles.version, { color: activeTheme.text + 'AA' }]}>
          Version 1.0.0
        </Text>
        <Text style={[styles.tagline, { color: activeTheme.text + 'CC' }]}>
          Stay informed, stay connected
        </Text>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>
          About This App
        </Text>
        <Text style={[styles.description, { color: activeTheme.text + 'DD' }]}>
          News Around You is your go-to app for staying updated with the latest news from around the world. 
          Get personalized news based on your location, save articles for later reading, and share breaking 
          news with your network. Our app provides a clean, intuitive interface with both light and dark 
          themes for comfortable reading at any time.
        </Text>
      </View>

      {/* Features */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>
          Key Features
        </Text>
        {features.map((feature, index) => (
          <View 
            key={index} 
            style={[styles.featureItem, { backgroundColor: activeTheme.card }]}
          >
            <Text style={styles.featureIcon}>{feature.icon}</Text>
            <View style={styles.featureContent}>
              <Text style={[styles.featureTitle, { color: activeTheme.text }]}>
                {feature.title}
              </Text>
              <Text style={[styles.featureDescription, { color: activeTheme.text + 'BB' }]}>
                {feature.description}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Developer Info */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>
          Developer Information
        </Text>
        <View style={[styles.infoCard, { backgroundColor: activeTheme.card }]}>
          <Text style={[styles.infoText, { color: activeTheme.text }]}>
            <Text style={styles.boldText}>Developed by:</Text> XXXX Development Team
          </Text>
          <Text style={[styles.infoText, { color: activeTheme.text }]}>
            <Text style={styles.boldText}>Built with:</Text> React Native & Expo
          </Text>
          <Text style={[styles.infoText, { color: activeTheme.text }]}>
            <Text style={styles.boldText}>News API:</Text> GNews.io
          </Text>
          <Text style={[styles.infoText, { color: activeTheme.text }]}>
            <Text style={styles.boldText}>Last Updated:</Text> {new Date().toLocaleDateString()}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.section}>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: activeTheme.button }]}
          onPress={handleContactUs}
        >
          <Text style={styles.actionButtonText}>📧 Contact Support</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.secondaryButton, { borderColor: activeTheme.text }]}
          onPress={handlePrivacyPolicy}
        >
          <Text style={[styles.secondaryButtonText, { color: activeTheme.text }]}>
            🔒 Privacy Policy
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.secondaryButton, { borderColor: activeTheme.text }]}
          onPress={handleTermsOfService}
        >
          <Text style={[styles.secondaryButtonText, { color: activeTheme.text }]}>
            📋 Terms of Service
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: activeTheme.text + '80' }]}>
          © 2025 News Around You
        </Text>
        <Text style={[styles.footerText, { color: activeTheme.text + '80' }]}>
          Made with ❤️ for news enthusiasts
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
    padding: 30,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  version: {
    fontSize: 14,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
  featureItem: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 15,
    marginTop: 2,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  infoCard: {
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoText: {
    fontSize: 15,
    marginBottom: 8,
    lineHeight: 22,
  },
  boldText: {
    fontWeight: '600',
  },
  actionButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
  },
});