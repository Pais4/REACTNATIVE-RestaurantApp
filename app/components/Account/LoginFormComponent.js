import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Input, Button } from "react-native-elements";
import { isEmpty } from "lodash";
//import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";

/* Components */
import { LoadingComponent } from "../LoadingComponent";

/* Utils */
import { validateEmail } from "../../utils/validations";

export const LoginFormComponent = (props) => {
  const { toastRef } = props;
  //const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(true);
  const [formData, setFormData] = useState(defaultFormValue);
  const [loading, setLoading] = useState(false);

  const onChange = (e, type) => {
    setFormData({
      ...formData,
      [type]: e.nativeEvent.text,
    });
  };

  const onSubmit = () => {
    if (isEmpty(formData.email) || isEmpty(formData.password)) {
      return toastRef.current.show("Todos los campos son obligatorios");
    }

    if (!validateEmail(formData.email)) {
      return toastRef.current.show("El email es invalido.");
    }

    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(formData.email, formData.password)
      .then(() => {
        setLoading(false);
        //navigation.navigate("account");
      })
      .catch(() => {
        setLoading(false);
        toastRef.current.show("Email y/o Contraseña invalido.");
      });
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Email"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "email")}
        leftIcon={
          <Icon
            type="font-awesome-5"
            name="envelope"
            iconStyle={styles.iconStyle}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        secureTextEntry={showPassword}
        onChange={(e) => onChange(e, "password")}
        leftIcon={
          <Icon
            type="font-awesome-5"
            name="lock"
            iconStyle={styles.iconStyle}
          />
        }
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconStyle}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button
        title="Iniciar Sesión"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={onSubmit}
      />
      
      <LoadingComponent isVisible={loading} text="Iniciando Sesión..." />
    </View>
  );
};

const defaultFormValue = () => ({
  email: "",
  password: "",
});

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainerLogin: {
    marginTop: 20,
    width: "95%",
  },
  btnLogin: {
    backgroundColor: "#F05C3C",
  },
  iconStyle: {
    color: "#c1c1c1",
  },
});
