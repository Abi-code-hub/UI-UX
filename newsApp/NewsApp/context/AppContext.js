import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState({ name: "", email: "" });
  const [edition, setEdition] = useState("us"); // default country
  const [savedArticles, setSavedArticles] = useState([]);

  // Load data from storage
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        const storedTheme = await AsyncStorage.getItem("theme");
        const storedEdition = await AsyncStorage.getItem("edition");
        const storedArticles = await AsyncStorage.getItem("savedArticles");

        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedTheme) setTheme(storedTheme);
        if (storedEdition) setEdition(storedEdition);
        if (storedArticles) setSavedArticles(JSON.parse(storedArticles));
      } catch (err) {
        console.log("Error loading data", err);
      }
    };
    loadData();
  }, []);

  // Save data when changed
  useEffect(() => {
    AsyncStorage.setItem("user", JSON.stringify(user));
    AsyncStorage.setItem("theme", theme);
    AsyncStorage.setItem("edition", edition);
    AsyncStorage.setItem("savedArticles", JSON.stringify(savedArticles));
  }, [user, theme, edition, savedArticles]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const saveArticle = (article) => {
    setSavedArticles((prev) => [...prev, article]);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        user,
        setUser,
        edition,
        setEdition,
        savedArticles,
        saveArticle,
         setSavedArticles,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
