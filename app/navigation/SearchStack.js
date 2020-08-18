import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SearchScreen } from "../screens/SearchScreen";

const Stack = createStackNavigator();

export const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="search"
        component={SearchScreen}
        options={{ title: "Buscar" }}
      />
    </Stack.Navigator>
  );
};
