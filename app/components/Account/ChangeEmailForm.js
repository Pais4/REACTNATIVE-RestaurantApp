import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button } from 'react-native-elements';

export const ChangeEmailForm = (props) => {

    const { email, setShowModal, toastRef, setReloadUserInfo } = props;

    const onSubmit = () => {
        console.log('Formulario Enviado');
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder='Correo Electronico'
                containerStyle={styles.input}
                defaultValue={email}
                rightIcon={{
                    type:'material-community',
                    name: 'at',
                    color: '#c2c2c2'
                }}
            />
            <Input 
                placeholder='Contraseña'
                containerStyle={styles.input}
                secureTextEntry={true}
                rightIcon={{
                    type: 'material-community',
                    name: 'eye-outline',
                    color: '#c2c2c2'
                }}
            />
            <Button 
                title='Cambiar email'
                containerStyle={styles.btnContainer}
                buttonStyle= {styles.btn}
                onPress={onSubmit}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    input: {
        marginBottom: 10
    },
    btnContainer: {
        width: '95%'
    },
    btn: {
        backgroundColor: '#00a680'
    }
})