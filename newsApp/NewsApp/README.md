**News Around You - React Native News App**
A cross-platform mobile news application built with React Native and Expo that delivers location-based news content with offline reading capabilities.

**Prerequisites**
Before running this application, ensure you have the following installed:
Required Software

Node.js (version 16.x or higher) - Download
npm install

Development Environment:
Physical Device (Recommended)
Expo Go App on your iOS/Android device
Download from App Store (iOS) or Google Play Store (Android)

**Configuration**
1. API Key Setup
The app uses GNews.io for news data.I have added the API, If in case it doesn't work follow this. You need to obtain an API key:

Visit GNews.io and sign up for a free account
Navigate to your dashboard and copy your API token
Open pages/MainPage.js
Replace the existing API key on line 35:
javascriptconst API_KEY = "YOUR_GNEWS_API_KEY_HERE";

2. Location Services
The app requires location permissions for automatic country detection:

iOS: Location permissions are handled automatically by Expo
Android: Permissions are requested at runtime

**Running the Application**
Development Mode

Start the Expo development server
Run this in terminal : expo start

then scan the QR code on your mobile or go to Expo Go app and scan QR code to run the app 

**Project Structure**

news-around-you/
├── App.js                 # Main app component with navigation
├── context/
│   └── AppContext.js      # Global state management
├── pages/
│   ├── SplashScreen.js    # App launch screen
│   ├── MainPage.js        # News feed and main interface
│   ├── SettingsPage.js    # User preferences and configuration
│   ├── SavedArticlesPage.js # Offline article management
│   ├── ShareNewsPage.js   # User-generated content creation
│   ├── AboutAppPage.js    # App information and support
│   └── RateUsPage.js      # User feedback and rating system
├── theme/
│   └── Theme.js           # Light and dark theme definitions
└── package.json           # Dependencies and scripts


There is a file Expo.txt, you can copy paste the link in your server to look how the app works.