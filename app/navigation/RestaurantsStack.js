import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RestaurantsScreen } from "../screens/RestaurantsScreen";

const Stack = createStackNavigator();

export const RestaurantsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="restaurants"
        component={RestaurantsScreen}
        options={{ title: "Restaurantes" }}
      />
    </Stack.Navigator>
  );
};
