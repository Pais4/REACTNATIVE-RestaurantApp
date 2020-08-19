import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export const RegisterScreen = () => {
  return (
    <View>
      <Image
        source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <View>
        <Text style={styles.viewForm}>Register Form</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40,
  },
});
