import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { FavoritesScreen } from "../screens/FavoritesScreen";

const Stack = createStackNavigator();

export const FavoritesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="favorites"
        component={FavoritesScreen}
        options={{ title: "Favoritos" }}
      />
    </Stack.Navigator>
  );
};
