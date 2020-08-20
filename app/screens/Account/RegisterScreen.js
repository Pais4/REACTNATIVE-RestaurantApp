import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

/* Componentes */
import { RegisterFormComponent } from "../../components/Account/RegisterFormComponent";

export const RegisterScreen = () => {
  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <View>
        <RegisterFormComponent />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewForm: {
    marginRight: 60,
    marginLeft: 60,
  },
});
