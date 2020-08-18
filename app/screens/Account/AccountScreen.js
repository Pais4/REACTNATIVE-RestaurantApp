import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import * as firebase from "firebase";

/* Screens */
import { UserGuestScreen } from "./UserGuestScreen";
import { UserLoggedScreen } from "./UserLoggedScreen";

export const AccountScreen = () => {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      !user ? setLogin(false) : setLogin(true);
    });
  }, []);

  if (login === null) return <Text>Cargando...</Text>;

  return login ? <UserLoggedScreen /> : <UserGuestScreen />;
};
