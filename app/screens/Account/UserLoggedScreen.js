import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";
import Toast from "react-native-easy-toast";
import * as firebase from "firebase";

/* Components */
import { LoadingComponent } from "../../components/LoadingComponent";
import { InfoUserComponent } from "../../components/Account/InfoUserComponent";
import { AccountOptionsComponent } from "../../components/Account/AccountOptionsComponent";

export const UserLoggedScreen = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [reloadUserInfo, setReloadUserInfo] = useState(false);
  const toastRef = useRef();

  useEffect(() => {
    /* Esto es una funcion anonima auto ejecutable */
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user);
    })();
    setReloadUserInfo(false)
  }, [reloadUserInfo]);

  return (
    <View style={styles.viewUserInfo}>
      {userInfo && <InfoUserComponent 
                      userInfo={userInfo} 
                      toastRef={toastRef} 
                      setLoading={setLoading}
                      setLoadingText={setLoadingText}
                      />}
      
      <AccountOptionsComponent 
        userInfo={userInfo} 
        toastRef={toastRef} 
        setReloadUserInfo={setReloadUserInfo}
      />

      <Button
        title="Cerrar Sesión"
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.btnCloseSessionText}
        onPress={() => firebase.auth().signOut()}
      />

      <Toast ref={toastRef} position="center" opacity={0.9} />
      <LoadingComponent text={loadingText} isVisible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%",
    backgroundColor: "#f2f2f2",
  },
  btnCloseSession: {
    marginTop: 30,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10,
  },
  btnCloseSessionText: {
    color: "#00a680",
  },
});
