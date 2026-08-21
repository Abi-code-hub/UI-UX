import React, { useState, useContext, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  Image, 
  Alert, 
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AppContext } from "../context/AppContext";
import { lightTheme, darkTheme } from "../theme/theme";

export default function ShareNewsPage() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const { theme } = useContext(AppContext);
  const activeTheme = theme === "light" ? lightTheme : darkTheme;

  // Keyboard visibility detection
  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));

    return () => {
      showSub?.remove();
      hideSub?.remove();
    };
  }, []);

  // --- Camera Picker ---
  const pickImageFromCamera = async () => {
    try {
      let { status } = await ImagePicker.getCameraPermissionsAsync();
      if (status !== "granted") {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        status = permission.status;
      }

      if (status !== "granted") {
        Alert.alert("Permission Denied", "Camera access is required to take photos.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        ...(Platform.OS === "ios" && {
          videoExportPreset: ImagePicker.VideoExportPreset.MediumQuality,
        }),
      });

      if (!result.canceled && result.assets?.[0]) {
        setImage(result.assets[0].uri);
      }
    } catch (err) {
      console.error("Camera error:", err);
      Alert.alert("Error", "Failed to open camera. Please try again.");
    }
  };

  // --- Library Picker ---
  const pickImageFromLibrary = async () => {
    try {
      let { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        status = permission.status;
      }

      if (status !== "granted") {
        Alert.alert("Permission Denied", "Photo library access is required to select photos.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.[0]) {
        setImage(result.assets[0].uri);
      }
    } catch (err) {
      console.error("Library error:", err);
      Alert.alert("Error", "Failed to select image. Please try again.");
    }
  };

  const showImagePicker = () => {
    Alert.alert(
      "Select Image",
      "Choose from where you want to select an image",
      [
        { text: "Camera", onPress: pickImageFromCamera },
        { text: "Gallery", onPress: pickImageFromLibrary },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const dismissKeyboard = () => Keyboard.dismiss();

  const handleShare = () => {
    if (!text.trim() && !image) {
      Alert.alert("Error", "Please add some text or an image to share.");
      return;
    }

    let message = "News sharing feature activated!";
    if (text.trim() && image) message = "Your news with text and image shared!";
    else if (text.trim()) message = "Your news text is shared!";
    else if (image) message = "Your news image is shared!";

    Alert.alert("Share News", message, [
      {
        text: "OK",
        onPress: () => {
          setText("");
          setImage(null);
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        style={[styles.container, { backgroundColor: activeTheme.background }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, { color: activeTheme.text }]}>Share News</Text>

        <TouchableOpacity 
          style={[styles.imageButton, { borderColor: activeTheme.text }]} 
          onPress={showImagePicker}
        >
          <Text style={[styles.buttonText, { color: activeTheme.text }]}>📷 Add Photo</Text>
        </TouchableOpacity>

        {image && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.previewImage} />
            <TouchableOpacity 
              style={styles.removeButton} 
              onPress={() => setImage(null)}
            >
              <Text style={styles.removeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.textInputContainer}>
          <TextInput
            placeholder="Add your news text here..."
            value={text}
            onChangeText={setText}
            multiline
            numberOfLines={6}
            style={[
              styles.input, 
              { 
                color: activeTheme.text, 
                borderColor: activeTheme.text,
                backgroundColor: activeTheme.card 
              }
            ]}
            placeholderTextColor={activeTheme.text + "80"}
            textAlignVertical="top"
            returnKeyType="done"
            blurOnSubmit={true}
            onSubmitEditing={dismissKeyboard}
          />
          
          {keyboardVisible && (
            <TouchableOpacity 
              style={[styles.doneButton, { backgroundColor: activeTheme.button }]}
              onPress={dismissKeyboard}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.shareButton, { backgroundColor: activeTheme.button }]} 
            onPress={handleShare}
          >
            <Text style={styles.shareButtonText}>📤 Share News</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.clearButton, { borderColor: activeTheme.text }]} 
            onPress={() => {
              setText("");
              setImage(null);
              Alert.alert("Cleared", "Content cleared successfully.");
            }}
          >
            <Text style={[styles.clearButtonText, { color: activeTheme.text }]}>🗑️ Clear All</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 20,
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20,
    textAlign: "center",
  },
  imageButton: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  imageContainer: {
    position: "relative",
    alignSelf: "center",
    marginBottom: 20,
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
  },
  removeButton: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "red",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  textInputContainer: {
    marginBottom: 20,
    position: "relative",
  },
  input: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    minHeight: 120,
    maxHeight: 200,
  },
  doneButton: {
    position: "absolute",
    top: 10,
    right: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
    zIndex: 1,
  },
  doneButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  buttonContainer: {
    gap: 15,
  },
  shareButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  shareButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  clearButton: {
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});