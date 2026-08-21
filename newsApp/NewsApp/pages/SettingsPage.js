import React, { useContext, useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  FlatList, 
  Platform, 
  Alert,
  TouchableOpacity,
  ActivityIndicator 
} from "react-native";
import { AppContext } from "../context/AppContext";
import { lightTheme, darkTheme } from "../theme/theme";
import * as Location from 'expo-location';
import DropDownPicker from "react-native-dropdown-picker";

export default function SettingsPage({ navigation }) {
  const {
    user,
    setUser,
    theme,
    toggleTheme,
    savedArticles,
    edition,
    setEdition,
  } = useContext(AppContext);

  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [detectedCountry, setDetectedCountry] = useState(null);

  const activeTheme = theme === "light" ? lightTheme : darkTheme;

  // Dropdown states
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(edition);
  const [items, setItems] = useState([
    { label: "United States", value: "us" },
    { label: "Singapore", value: "sg" },
    { label: "India", value: "in" },
    { label: "United Kingdom", value: "gb" },
    { label: "Canada", value: "ca" },
    { label: "Australia", value: "au" },
    { label: "Germany", value: "de" },
    { label: "France", value: "fr" },
    { label: "Japan", value: "jp" },
    { label: "South Korea", value: "kr" },
  ]);

  useEffect(() => {
    setValue(edition); // sync when edition changes elsewhere
  }, [edition]);

  // Get current location and detect country
  const getCurrentLocation = async () => {
    try {
      setLocationLoading(true);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to detect your country automatically.',
          [{ text: 'OK' }]
        );
        setLocationLoading(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setLocation(currentLocation);

      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (reverseGeocode.length > 0) {
        const countryCode = reverseGeocode[0].isoCountryCode?.toLowerCase();
        const countryName = reverseGeocode[0].country;
        
        setDetectedCountry({ code: countryCode, name: countryName });

        const matchingCountry = items.find(
          country => country.value === countryCode
        );

        if (matchingCountry) {
          Alert.alert(
            'Location Detected',
            `We detected you're in ${countryName}. Would you like to switch to ${matchingCountry.label} news?`,
            [
              { text: 'No', style: 'cancel' },
              { text: 'Yes', onPress: () => setEdition(matchingCountry.value) }
            ]
          );
        } else {
          Alert.alert(
            'Location Detected',
            `We detected you're in ${countryName}, but we don't have news for this country yet.`
          );
        }
      }
    } catch (error) {
      console.error('Location error:', error);
      Alert.alert(
        'Error',
        'Failed to get your location. Please check your location services and try again.'
      );
    } finally {
      setLocationLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: activeTheme.background }]}>
      <Text style={[styles.heading, { color: activeTheme.text }]}>Settings</Text>

      {/* User Information */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>
          User Information
        </Text>
        <TextInput
          style={[
            styles.input, 
            { 
              color: activeTheme.text, 
              borderColor: activeTheme.text,
              backgroundColor: activeTheme.card 
            }
          ]}
          placeholder="Name"
          placeholderTextColor={activeTheme.text + '80'}
          value={user.name}
          onChangeText={(text) => setUser({ ...user, name: text })}
        />
        <TextInput
          style={[
            styles.input, 
            { 
              color: activeTheme.text, 
              borderColor: activeTheme.text,
              backgroundColor: activeTheme.card 
            }
          ]}
          placeholder="Email"
          placeholderTextColor={activeTheme.text + '80'}
          value={user.email}
          onChangeText={(text) => setUser({ ...user, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Theme Toggle */}
      <View style={styles.section}>
        <TouchableOpacity 
          style={[styles.themeButton, { backgroundColor: activeTheme.button }]} 
          onPress={toggleTheme}
        >
          <Text style={styles.themeButtonText}>
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
          </Text>
        </TouchableOpacity>
      </View>

      {/* Location and Country Selection */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>
          News Location
        </Text>
        
        <TouchableOpacity
          style={[styles.locationButton, { borderColor: activeTheme.text }]}
          onPress={getCurrentLocation}
          disabled={locationLoading}
        >
          {locationLoading ? (
            <ActivityIndicator color={activeTheme.text} />
          ) : (
            <Text style={[styles.locationButtonText, { color: activeTheme.text }]}>
              📍 Use Current Location
            </Text>
          )}
        </TouchableOpacity>

        {detectedCountry && (
          <Text style={[styles.detectedLocation, { color: activeTheme.text }]}>
            Detected: {detectedCountry.name}
          </Text>
        )}

        <Text style={[styles.subheading, { color: activeTheme.text }]}>
          Or Select Country Manually:
        </Text>

        {/* ✅ Cross-platform Dropdown */}
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={(callback) => {
            const val = callback(value);
            setValue(val);
            setEdition(val);
          }}
          setItems={setItems}
          style={{
            backgroundColor: activeTheme.card,
            borderColor: activeTheme.text,
          }}
          textStyle={{
            color: activeTheme.text,
            fontSize: 16,
          }}
          dropDownContainerStyle={{
            backgroundColor: activeTheme.card,
            borderColor: activeTheme.text,
          }}
          listItemLabelStyle={{
            color: activeTheme.text,
          }}
          arrowIconStyle={{
            tintColor: activeTheme.text,
          }}
        />

        <Text style={[styles.currentEdition, { color: activeTheme.text }]}>
          Current: {items.find((c) => c.value === value)?.label || value?.toUpperCase()}
        </Text>
      </View>

      {/* Saved Articles */}
      <View style={styles.section}>
        <View style={styles.savedArticlesHeader}>
          <Text style={[styles.sectionTitle, { color: activeTheme.text }]}>
            Saved Articles ({savedArticles.length})
          </Text>
          {savedArticles.length > 0 && (
            <TouchableOpacity
              style={[styles.viewAllButton, { backgroundColor: activeTheme.button }]}
              onPress={() => navigation.navigate('SavedArticles')}
            >
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          )}
        </View>
        
        {savedArticles.length === 0 ? (
          <Text style={[styles.noArticles, { color: activeTheme.text + '80' }]}>
            No saved articles yet
          </Text>
        ) : (
          <>
            <FlatList
              data={savedArticles.slice(0, 3)}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity 
                  style={[styles.articleItem, { backgroundColor: activeTheme.card }]}
                  onPress={() => navigation.navigate('SavedArticles')}
                >
                  <Text 
                    style={[styles.articleTitle, { color: activeTheme.text }]}
                    numberOfLines={2}
                  >
                    {index + 1}. {item.title}
                  </Text>
                  {item.source?.name && (
                    <Text style={[styles.articleSource, { color: activeTheme.text + '60' }]}>
                      {item.source.name}
                    </Text>
                  )}
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
            />
            {savedArticles.length > 3 && (
              <TouchableOpacity 
                style={[styles.moreArticlesButton, { backgroundColor: activeTheme.text + '10' }]}
                onPress={() => navigation.navigate('SavedArticles')}
              >
                <Text style={[styles.moreArticles, { color: activeTheme.text }]}>
                  📰 View all {savedArticles.length} saved articles →
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 15,
    paddingTop: Platform.OS === 'ios' ? 50 : 15,
  },
  heading: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  subheading: { 
    fontSize: 16, 
    fontWeight: "600", 
    marginTop: 10,
    marginBottom: 5,
  },
  input: { 
    borderWidth: 1, 
    padding: 12, 
    marginBottom: 10, 
    borderRadius: 8,
    fontSize: 16,
  },
  themeButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  themeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  locationButton: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  locationButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  detectedLocation: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
  },
  currentEdition: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 5,
  },
  noArticles: {
    textAlign: 'center',
    fontSize: 14,
    fontStyle: 'italic',
  },
  articleItem: {
    padding: 10,
    marginBottom: 5,
    borderRadius: 6,
  },
  articleTitle: {
    fontSize: 14,
  },
  savedArticlesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewAllText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  articleSource: {
    fontSize: 12,
    marginTop: 4,
  },
  moreArticlesButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  moreArticles: {
    textAlign: 'center',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 5,
  },
});
