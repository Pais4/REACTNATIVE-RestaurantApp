import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

/* STACKS */
import { RestaurantsStack } from "./RestaurantsStack";
import { FavoritesStack } from "./FavoritesStack";
import { TopRestaurantsStack } from "./TopRestaurantsStack";
import { SearchStack } from "./SearchStack";
import { AccountStack } from "./AccountStack";

const Tab = createBottomTabNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="restaurants"
        tabBarOptions={{
          inactiveTintColor: "#646464",
          activeTintColor: "#00a680",
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
        <Tab.Screen
          name="restaurants"
          component={RestaurantsStack}
          options={{ title: "Restaurantes" }}
        />
        <Tab.Screen
          name="favorites"
          component={FavoritesStack}
          options={{ title: "Favoritos" }}
        />
        <Tab.Screen
          name="top-restaurants"
          component={TopRestaurantsStack}
          options={{ title: "Top 5" }}
        />
        <Tab.Screen
          name="search"
          component={SearchStack}
          options={{ title: "Buscar" }}
        />
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{ title: "Cuenta" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case "restaurants":
      iconName = "compass-outline";
      break;

    case "favorites":
      iconName = "heart-outline";
      break;

    case "top-restaurants":
      iconName = "star-outline";
      break;

    case "search":
      iconName = "magnify";
      break;

    case "account":
      iconName = "home-outline";
      break;

    default:
      break;
  }

  return (
    <Icon type="material-community" name={iconName} size={22} color={color} />
  );
};

/* ANOTACIONES */
/*
 * Stack -> Paginas que estan dentro de nuestro sistema de navegacion, unicamente se
 * va a ver la primera dentro del stack, las otras quedarian como "invisibles", pero
 * estan dentro de la navegacion.
 *
 * Tab.Navigator
 *      -> initialRouteName: En que screen va a iniciar la aplicacion
 *      -> tabBarOptions: Opciones de color
 *      -> screenOptions
 */
