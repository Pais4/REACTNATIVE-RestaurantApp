import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AccountScreen } from "../screens/Account/AccountScreen";

const Stack = createStackNavigator();

export const AccountStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="account"
        component={AccountScreen}
        options={{ title: "Tu cuenta" }}
      />
    </Stack.Navigator>
  );
};
