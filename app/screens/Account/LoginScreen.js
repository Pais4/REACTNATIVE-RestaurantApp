import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export const LoginScreen = () => {
  return (
    <ScrollView>
      <Image
        source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.viewContainer}>
        <Text>Login Screen</Text>
        <CreateAccount />
      </View>
      <Divider style={styles.divider} />
      <Text>Social Login</Text>
    </ScrollView>
  );
};

/* Componente interno */
const CreateAccount = (props) => {
  const navigation = useNavigation();

  return (
    <Text style={styles.textRegister}>
      ¿Aun no tienes una cuenta?{" "}
      <Text
        onPress={() => navigation.navigate("register")}
        style={styles.btnRegistro}
      >
        Registrate
      </Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  btnRegistro: {
    color: "#00a680",
    fontWeight: "bold",
  },
  divider: {
    backgroundColor: "#00a680",
    margin: 40,
  },
});
