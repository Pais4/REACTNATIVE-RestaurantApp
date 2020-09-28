import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RestaurantsScreen } from "../screens/Restaurants/RestaurantsScreen";
import { AddRestaurant } from "../screens/Restaurants/AddRestaurant";
import { RestaurantScreen } from "../screens/Restaurants/RestaurantScreen";

const Stack = createStackNavigator();

export const RestaurantsStack = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="restaurants"
        component={RestaurantsScreen}
        options={{ title: "Restaurantes" }}
      />
      <Stack.Screen 
        name='add-restaurant'
        component={AddRestaurant}
        options={{ title: 'Añadir Restaurante'}}
      />
      <Stack.Screen 
        name='restaurant'
        component={RestaurantScreen}
        /* El titulo sera dinamico */
      />

    </Stack.Navigator>
  );
};
