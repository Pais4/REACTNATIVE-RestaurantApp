import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RestaurantsScreen } from "../screens/Restaurants/RestaurantsScreen";
import { AddRestaurant } from "../screens/Restaurants/AddRestaurant";

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
    </Stack.Navigator>
  );
};
