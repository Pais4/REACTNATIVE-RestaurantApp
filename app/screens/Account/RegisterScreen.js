import React, { useRef } from "react";
import { View, StyleSheet, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast, { DURATION } from "react-native-easy-toast";

/* Componentes */
import { RegisterFormComponent } from "../../components/Account/RegisterFormComponent";

export const RegisterScreen = () => {
  const toastRef = useRef();

  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <View>
        <RegisterFormComponent toastRef={toastRef} />
      </View>
      <Toast
        ref={toastRef}
        opacity={0.9}
        position="center"
        style={styles.toast}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 40,
  },
  viewForm: {
    marginRight: 60,
    marginLeft: 60,
  },
  toast: {
    backgroundColor: "red",
  },
});
