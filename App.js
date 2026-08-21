import React, { useState } from "react";
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  Button,
  Alert,
} from "react-native";

//  Home Screen
function Restaurants() {
  const navigation = useNavigation();

  const restaurantsData = [
    {
      title: "Joe's Gelato",
      tagline: "Dessert, Ice cream, $$$",
      eta: "10-30",
      imgUri: require("./assets/icecreams.jpg"),
      menu: [
        {
          title: "Gelato",
          contents: [
            {
               title: "Vanilla, $16",
               image: require("./assets/vanillaGelato.jpg"),
               inStock: true 
            },
            {
               title: "Chocolate, $16",
               image: require("./assets/chocoGelato.jpg"),
               inStock: true 
            },
            {
               title: "Strawberry, $16",
               image: require("./assets/strawberryGeleto.jpg"),
               inStock: false  
            },
            { 
               title: "Pistachio, $20",
               image: require("./assets/pistacchioGelato.jpg"),
               inStock: true  
            },
            {
               title: "Hazelnut, $20",
               image: require("./assets/hazelnutGelato.jpg"),
               inStock: true  
            },
            {
               title: "Macadamia, $23",
               image: require("./assets/MacadamiaGelato.jpg"),
               inStock: true  
            },
          ],
        },
        {
          title: "Coffee",
          contents: [

            {
              title: "Flat White, $12",
              tagline: "Smooth espresso topped with velvety steamed milk.",
              image: require("./assets/latte.jpg"),
              inStock: false
            },
            {
              title: "Latte, $14",
              tagline: "Rich espresso with steamed milk and a creamy finish.",
              image: require("./assets/lattecoffee.jpg"),
              inStock: true
            },
            {
              title: "Caffè Americano, $10",
              tagline: "Bold espresso mellowed with hot water for a smooth sip.",
              image: require("./assets/americao.jpg"),
               inStock: true 
            },
            {
              title: "Vanilla Frappe, $16",
              tagline: "Iced vanilla-blended coffee with whipped cream topping.",
              image: require("./assets/VanillaFrappuccino.jpg"),
               inStock: true 
            }
          ],
        },
        {
          title: "Dessert",
          contents: [
            {
              title: "Strawberries & Cream Cheesecake, $8/per slice",
              tagline: "Classic cheesecake topped with fresh strawberries and a swirl of whipped cream.",
              image: require("./assets/stawberries&creamcheesecake.jpg"),
               inStock: true 
            },
            {
              title: "Tiramisu Tart, $6/per slice",
              tagline: "Coffee-soaked sponge in a tart shell with mascarpone cream and cocoa dusting.",
              image: require("./assets/TiramisuTart.jpg"),
               inStock: true 
            },
            {
              title: "Burnt Cheesecake, $10/per slice",
              tagline: "Creamy, crustless cheesecake with a caramelized top and rich center.",
              image: require("./assets/BurntCheesecake.jpg"),
              inStock: false 
            },
            {
              title: "Blueberry Cheesecake, $8/per slice",
              tagline: "Velvety cheesecake layered with juicy blueberries and a buttery biscuit base.",
              image: require("./assets/BlueberryCheesecake.jpg"),
              inStock: true 
            }
          ],
        },
      ],
    },
    {
      title: "Joe's Diner",
      tagline: "American, Burgers, $$$",
      eta: "50+",
      imgUri: require("./assets/burger.jpg"),
      menu: [
        {
          title: "Burgers",
          contents: [
        {
          title: "Original Beef Burger, $12",
          tagline: "100% chargrilled beef, cheese, lettuce, tomato, onions, pickles, special sauce, and mayonnaise.",
          image: require("./assets/OriginalBeefBurger.jpg"),
          inStock: true
        },
        {
          title: "Cheeseburger, $3.50",
          tagline: "Beef patty, melted cheddar, lettuce, tomato, and ketchup.",
          image: require("./assets/Cheeseburger.jpg"),
          inStock: true
        },
        {
          title: "Double Bacon, $11",
          tagline: "Two beef patties, double bacon, cheddar, crispy onions, and smoky BBQ sauce.",
          image: require("./assets/DoubleBacon.jpg"),
          inStock: true
        },
        {
          title: "Chicken Burger, $10",
          tagline: "Crispy Chicken, chedder cheese, lettuce, and rich chargrilled buttermilk dressing.",
          image: require("./assets/ChickenBurger.jpg"),
          inStock: true
        },
        {
          title: "Vegan Delight, $6",
          tagline: "Plant-based patty, lettuce, tomato, vegan mayo, avocado, and pickled red onions.",
          image: require("./assets/VeganDelight.jpg"),
          inStock: true
        },
        {
          title: "Shroom Burger, $10",
          tagline: "Grilled portobello mushroom, Swiss cheese, arugula, and garlic aioli.",
          image: require("./assets/ShroomBurger.jpg"),
          inStock: true
        }
          ],
        },
        {
          title: "Sides",
          contents: [
            { 
              title: "Fries, $3",
              tagline: "Thick-cut fries cooked until golden and lightly salted",
              image: require("./assets/Fries.jpeg"),
              inStock: true
            },
            { 
              title: "Onion Rings, $4", 
              tagline: "Onion rings cooked up crispy and golden brown.",
              image: require("./assets/OnionRings.jpg"),
              inStock: true
            },
            { 
              title: "Coleslaw, $3.50",
              tagline: "Our Coleslaw uses a selection of crisp cabbage & carrots, finely chopped in a mayonnaise based sauce",
              image: require("./assets/Coleslaw.jpg"),
              inStock: true 
            },
            { 
              title: "Hand-Breaded Chicken Tenders, $6.50",
              tagline: "Freshly prepared hand-breaded chicken tenders premium, all-white meat chicken, hand dipped in buttermilk, lightly breaded and fried to a golden brown.",
              image: require("./assets/ChickenTenders.jpg"),
              inStock: true 
            },
            { 
              title: "Fish Fingers, $6", 
              tagline: "Battered and fried fish fillet with a crunchy exterior and tender, flaky interior.",
              image: require("./assets/FishFingers.jpg"),
              inStock: false
            },
            { 
              title: "Popcorn Chicken, $4.50", 
              tagline: "Golden bite-size pieces of real chicken fillet tumbled in our signature marinade and cooked in a crunchy coating!",
              image: require("./assets/PopcornChicken.jpg"),
              inStock: true
            },
          ],
        },
        {
          title: "Beverages",
          contents: [
            { title: "Coca-Cola Zero Sugar, $1.50", inStock: true },
            { title: "Coca-Cola Original, $1.20", inStock: true },
            { title: "Lemon Coke, $1.80", inStock: true },
            { title: "Cucumber Mint Soda, $2.50", inStock: false },
            { title: "Sprite, $1.20", inStock: true },
            { title: "Iced Lemon Tea, $2", inStock: true },
          ],
        },
      ],
    },
        {
      title: "Thai Noodle",
      tagline: "Noodle, Rice & Curry $$$",
      eta: "30-50",
      imgUri: require("./assets/friednoodles.jpg"),
      menu: [
        {
          title: "Noodle",
          contents: [
            {
              title: "Fried Noodles, $4.50",
              tagline: "Stir-fried egg noodles with vegetables and savory soy sauce.",
              image: require("./assets/Noodle.jpg"),
              inStock: true
            },
            {
              title: "Pork Boat Noodle, $7",
              tagline: "Rich pork broth with rice noodles, tender pork slices, and herbs.",
              image: require("./assets/PorkBoatNoodle.jpg"),
              inStock: false
            },
            {
              title: "Tom Yum Minced Pork Noodle, $7.50",
              tagline: "Spicy and tangy tom yum broth with minced pork and rice noodles.",
              image: require("./assets/TomYumMincedPork.jpg"),
              inStock: true
            },
            {
              title: "Tom Yum Seafood Noodle, $8",
              tagline: "Seafood medley in spicy tom yum broth with rice noodles.",
              image: require("./assets/TomYumSeafood.jpg"),
              inStock: true
            },
            {
              title: "Beef Boat Noodle, $7",
              tagline: "Bold beef broth, sliced beef, herbs, and rice noodles.",
              image: require("./assets/BeefBoatNoodle.jpg"),
              inStock: true
            },
            {
              title: "Laksa, $6",
              tagline: "Coconut curry noodle soup with shrimp, tofu, and boiled egg.",
              image: require("./assets/Laksa.jpg"),
              inStock: true
            },
            {
              title: "Chicken Clear Noodle, $6.50",
              tagline: "Light chicken broth with clear noodles and tender chicken slices.",
              image: require("./assets/ChickenClearNoodle.jpg"),
              inStock: true
            }
          ],
        },
        {
          title: "Rice & Curry",
          contents: [
            {
              title: "Thai Basil Chicken Rice, $9",
              tagline: "Spicy stir-fried chicken with holy basil served over jasmine rice.",
              image: require("./assets/ThaiBasilChickenRice.jpg"),
              inStock: true
            },
            {
              title: "Thai Green Curry Chicken & Rice, $12",
              tagline: "Creamy green curry with tender chicken and fragrant rice.",
              image: require("./assets/ThaiGreenCurryChicken.jpg"),
              inStock: true
            },
            {
              title: "Braised Beef Rice, $11.20",
              tagline: "Slow-cooked beef in rich gravy, served with warm rice.",
              image: require("./assets/BraisedBeefRice.jpg"),
              inStock: true
            },
            {
              title: "Mango Sticky Rice, $10",
              tagline: "Sweet ripe mango with coconut sticky rice and sesame seeds.",
              image: require("./assets/MangoStickyRice.jpg"),
              inStock: true
            }
          ],
        },
        {
          title: "Beverages",
          contents: [
            { title: "Thai Milk Tea, $5.80",
              image: require("./assets/ThaiMilkTea.jpg"),
              inStock: true
            },
            { title: "Thai Green Tea, $5.50",
              image: require("./assets/ThaiGreenTea.jpg"),
              inStock: true
            },
            { title: "Bandung Soda, $4.80",
              image: require("./assets/BandungSoda.jpg"),
              inStock: true
            },
            { title: "Salted Plum Soda, $4",
              image: require("./assets/SaltedPlumSoda.jpg"),
              inStock: false 
            },
            { title: "Iced Lemongrass, $5",
              image: require("./assets/IcedLemongrass.jpg"),
              inStock: true 
            },
          ],
        },
      ],
    },
    {
      title: "Salad Palace",
      tagline: "Salad Bowl, Protein, $$$",
      eta: "10-30",
      imgUri: require("./assets/saladbowl.jpg"),
      menu: [
        {
          title: "Super Bowl",
          contents: [
            { 
              title: "Spiced Chicken Bowl, $12.50", 
              tagline: "Grilled spiced chicken, brown rice, black beans, corn, jalapeños, and chipotle mayo." 
            },
            { 
              title: "Grilled Salmon Bowl, $11", 
              tagline: "Grilled salmon, quinoa, arugula, cherry tomatoes, cucumber, and lemon vinaigrette." 
            },
            { 
              title: "Chicken Salad, $9", 
              tagline: "Shredded chicken, mixed greens, carrots, red onions, olives, and ranch dressing." 
            },
            { 
              title: "Tropical Seafood, $11.80", 
              tagline: "Shrimp, mango salsa, cabbage slaw, avocado, and citrus lime dressing." 
            },
            { 
              title: "Pork Bowl, $10", 
              tagline: "Slow-roasted pork, jasmine rice, pickled vegetables, scallions, and spicy mayo." 
            },
            { 
              title: "Garlic Prawn Rice, $14", 
              tagline: "Garlic prawns, jasmine rice, broccoli, bell peppers, and sesame soy glaze." 
            },
            { 
              title: "Tofu & Lentil Bowl, $11", 
              tagline: "Crispy tofu, lentils, kale, sweet potato, and tahini dressing." 
            },
            { 
              title: "Veg Paradise, $10", 
              tagline: "Mixed greens, chickpeas, beets, corn, cucumber, avocado, and balsamic drizzle." 
            },

          ],
        },
        {
          title: "Make Your Own, $15",
          contents: [{ title: "Make Your Own Bowl", isSelectable: true }],
        },
      ],
    },
  ];

  const HomeScreenCell = (props) => (
    <Cell backgroundColor="transparent" onPress={props.action}>
      <View style={props.customStyle}>
        <Image style={props.imageStyle} source={props.imageSrc} />
        <View style={styles.etaBubble}>
          <Text style={styles.etaText}>{props.etaLabel}</Text>
          <Text style={styles.etaSubText}>mins</Text>
        </View>
        <Text style={props.customRestaurantLabelStyle}>
          {props.customRestaurantLabel}
        </Text>
        <Text style={props.customRestaurantSubLabelStyle}>
          {props.customRestaurantSubLabel}
        </Text>
      </View>
    </Cell>
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <TableView>
          <Section hideSeparator={false}>
            {restaurantsData.map((restaurant, i) => (
              <HomeScreenCell
                key={i}
                etaLabel={restaurant.eta}
                customRestaurantLabel={restaurant.title}
                customRestaurantLabelStyle={{
                  marginTop: 10,
                  fontSize: 18,
                  fontWeight: "bold",
                  paddingHorizontal: 10,
                }}
                customRestaurantSubLabel={restaurant.tagline}
                customRestaurantSubLabelStyle={{
                  fontSize: 14,
                  color: "#666",
                  paddingHorizontal: 10,
                  marginBottom: 10,
                }}
                customStyle={{
                  width: "100%",
                  height: 280,
                  backgroundColor: "transparent",
                  marginLeft: 2,
                }}
                imageSrc={restaurant.imgUri}
                imageStyle={{
                  width: "100%",
                  height: 200,
                  borderRadius: 10,
                  resizeMode: "cover",
                  overflow: "hidden",
                }}
                action={() =>
                  navigation.navigate("Menu", {
                    items: restaurant.menu,
                  })
                }
              />
            ))}
          </Section>
        </TableView>
      </ScrollView>
    </SafeAreaView>
  );
}

//  Menu Screen
function Menu() {
  const route = useRoute();
  const navigation = useNavigation();
  const { items } = route.params;

  return (
    <ScrollView>
      <TableView>
        {items.map((section, i) => (
          <Section key={i} header={section.title}>
            {section.contents.map((item, j) => (
              <Cell
                  key={j}
                  onPress={() => {
                    if (item.isSelectable && item.inStock !== false) {
                      navigation.navigate("CustomizeBowl");
                    }
                  }}
                  contentContainerStyle={{ opacity: item.inStock === false ? 0.4 : 1 }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 8, paddingHorizontal: 12 }}>
                    {item.image && (
                      <Image
                        source={item.image}
                        style={{ width: 50, height: 50, borderRadius: 8, marginRight: 12 }}
                        resizeMode="cover"
                      />
                    )}
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 16, fontWeight: "600" }}>{item.title}</Text>
                      {item.tagline && (
                        <Text style={{ fontSize: 14, color: "#666", marginTop: 4, flexWrap: "wrap" }}>
                          {item.tagline}
                        </Text>
                      )}
                      {item.inStock === false && (
                        <Text style={{ fontSize: 12, color: "red", marginTop: 4 }}>Out of stock</Text>
                      )}
                    </View>
                  </View>
                </Cell>

            ))}
          </Section>
        ))}
      </TableView>
    </ScrollView>
  );
}

//  Customize Bowl
function CustomizeBowl() {
  const [selectedMain, setSelectedMain] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedDressing, setSelectedDressing] = useState(null);

  const mains = ["Rice", "Spaghetti", "Lettuce"];
  const ingredients = [
    "Onions",
    "Tomato",
    "Jalapeños",
    "Corn",
    "Carrot",
    "Cucumber",
    "Beetroot",
    "Egg",
    "Mushrooms",
    "Olives",
    "Tofu",
  ];
  const dressings = ["Mayo", "Ranch", "Sriracha", "Vinaigrette"];

  const toggleIngredient = (item) => {
    if (selectedIngredients.includes(item)) {
      setSelectedIngredients((prev) => prev.filter((i) => i !== item));
    } else if (selectedIngredients.length < 5) {
      setSelectedIngredients((prev) => [...prev, item]);
    }
  };

  const handleSubmit = () => {
    if (!selectedMain || !selectedDressing) {
      Alert.alert("Incomplete", "Please select a main and a dressing.");
      return;
    }

    Alert.alert(
      "Custom Bowl Saved",
      `Main: ${selectedMain}\nIngredients: ${selectedIngredients.join(
        ", "
      )}\nDressing: ${selectedDressing}`
    );
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={styles.heading}>Choose 1 Main</Text>
      {mains.map((main, i) => (
        <Cell
          key={i}
          title={main}
          accessory={selectedMain === main ? "Checkmark" : "None"}
          onPress={() => setSelectedMain(main)}
        />
      ))}

      <Text style={styles.heading}>Choose up to 5 Ingredients</Text>
      {ingredients.map((ing, i) => (
        <Cell
          key={i}
          title={ing}
          accessory={selectedIngredients.includes(ing) ? "Checkmark" : "None"}
          onPress={() => toggleIngredient(ing)}
        />
      ))}

      <Text style={styles.heading}>Choose 1 Dressing</Text>
      {dressings.map((dress, i) => (
        <Cell
          key={i}
          title={dress}
          accessory={selectedDressing === dress ? "Checkmark" : "None"}
          onPress={() => setSelectedDressing(dress)}
        />
      ))}

      <View style={{ marginTop: 20 }}>
        <Button title="Submit Bowl" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}

//  Stack Setup
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Restaurants"
          component={Restaurants}
          options={{ title: "Restaurants", headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{ title: "Menu", headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="CustomizeBowl"
          component={CustomizeBowl}
          options={{ title: "Build Your Bowl", headerTitleAlign: "center" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//  Styles
const styles = StyleSheet.create({
  etaBubble: {
    width: 80,
    height: 50,
    backgroundColor: "white",
    borderRadius: 25,
    position: "absolute",
    right: 20,
    top: 160,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  etaText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  etaSubText: {
    fontSize: 12,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
});
