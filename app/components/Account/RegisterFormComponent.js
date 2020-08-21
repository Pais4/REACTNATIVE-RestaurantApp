import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { size, isEmpty } from "lodash";

/* Utils */
import { validateEmail } from "../../utils/validations";

export const RegisterFormComponent = (props) => {
  const { toastRef } = props;

  const [showPassword, setShowPassword] = useState(true);
  const [showRepeatPassword, setShowRepeatPassword] = useState(true);
  const [formData, setFormData] = useState(defaultFormValue());

  const onSubmit = () => {
    if (
      isEmpty(formData.email) ||
      isEmpty(formData.password) ||
      isEmpty(formData.repeatPassword)
    ) {
      return toastRef.current.show("Todos los campos son obligatorios");
    }

    if (!validateEmail(formData.email)) {
      return toastRef.current.show("Email invalido");
    }

    if (formData.password !== formData.repeatPassword) {
      return toastRef.current.show("Las contraseñas tienen que ser iguales");
    }

    if (size(formData.password) < 6) {
      return toastRef.current.show(
        "La contraseña debe ser mayor a 6 caracteres"
      );
    }

    console.log("ok");
  };

  /* Recibe el evento y el tipo del evento */
  const onChange = (e, type) => {
    console.log(e.nativeEvent.text);
    setFormData({
      ...formData,
      [type]: e.nativeEvent.text,
    });
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Email"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "email")}
        leftIcon={{ type: "font-awesome-5", name: "envelope" }}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        secureTextEntry={showPassword}
        onChange={(e) => onChange(e, "password")}
        leftIcon={{ type: "font-awesome-5", name: "lock" }}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Input
        placeholder="Repetir contraseña"
        containerStyle={styles.inputForm}
        secureTextEntry={showRepeatPassword}
        onChange={(e) => onChange(e, "repeatPassword")}
        leftIcon={{ type: "font-awesome-5", name: "lock" }}
        rightIcon={
          <Icon
            type="material-community"
            name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowRepeatPassword(!showRepeatPassword)}
          />
        }
      />

      <Button
        title="Registrarse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={onSubmit}
      />
    </View>
  );
};

const defaultFormValue = () => ({
  email: "",
  password: "",
  repeatPassword: "",
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
  btnContainerRegister: {
    marginTop: 20,
    width: "95%",
  },
  btnRegister: {
    backgroundColor: "#00a680",
  },
  iconRight: {
    color: "#c1c1c1",
  },
});
