import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as firebase from 'firebase';

/* Utils */
import { validateEmail } from '../../utils/validations';
import { reauthenticate } from '../../utils/api';

export const ChangeEmailForm = (props) => {

    const { email, setShowModal, toastRef, setReloadUserInfo } = props;
    const [formData, setFormData] = useState(defaultFormData());
    const [showPassword, setShowPassword] = useState(true);
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const onChange = (e, type) => {
        setFormData({
            ...formData,
            [type]: e.nativeEvent.text
        })
    }

    const onSubmit = () => {
        setErrors({});

        if( !formData.email || email === formData.email ) {
            setErrors({email: 'El email no ha cambiado.'})
        } else if (!validateEmail(formData.email)) {
            setErrors({email: 'El email es incorrecto.'})
        } else if (!formData.password) {
            setErrors({password: 'La contraseña es necesaria'})
        } else {
            setIsLoading(true);
            reauthenticate(formData.password)
                .then(() => {
                    firebase
                        .auth()
                        .currentUser.updateEmail(formData.email)
                        .then(() => {
                            setIsLoading(false);
                            setReloadUserInfo(true);
                            toastRef.current.show('Email actualizado correctamente');
                            setShowModal(false);
                        })
                        .catch((err) => {
                            console.log(err)
                            setErrors({email: 'Error al actualizar el email'});
                            setIsLoading(false);
                        });
                })
                .catch((err) => {
                    setIsLoading(false)
                    setErrors({password: 'La contraseña es incorrecta.'})
                })
        }

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
                onChange={(e) => onChange(e, 'email')}
                errorMessage={errors.email}
            />
            <Input 
                placeholder='Contraseña'
                containerStyle={styles.input}
                secureTextEntry={showPassword}
                rightIcon={{
                    type: 'material-community',
                    name: showPassword ? 'eye-outline' : 'eye-off-outline',
                    color: '#c2c2c2',
                    onPress: () => setShowPassword(!showPassword)
                }}
                onChange={(e) => onChange(e, 'password')}
                errorMessage={errors.password}
            />
            <Button 
                title='Cambiar email'
                containerStyle={styles.btnContainer}
                buttonStyle= {styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>
    )
}

const defaultFormData = () => ({
    email: '',
    password: ''
})

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