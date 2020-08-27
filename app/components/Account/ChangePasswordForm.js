import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { size } from 'lodash';
import * as firebase from 'firebase';
import { reauthenticate } from '../../utils/api';

export const ChangePasswordForm = (props) => {

    const { setShowModal, toastRef } = props;

    const [showPassword, setShowPassword] = useState(true);
    const [formData, setFormData] = useState(defaultFormData);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const onChange = (e, type) => {
        setFormData({
            ...formData,
            [type]: e.nativeEvent.text
        })
    }

    const onSubmit = async() => {
        
        let isSetErrors = true;
        let errorsTemp = {}

        /* Limpiamos el estado */
        setErrors({});

        if ( !formData.password || !formData.newPassword || !formData.repeatNewPassword) {

            errorsTemp = {
                password: !formData.password ? 'La contraseña no puede estar vacia.' : '',
                newPassword: !formData.newPassword ? 'La nueva contraseña no puede estar vacia.' : '',
                repeatNewPassword: !formData.repeatNewPassword ? 'La contraseña no puede estar vacia.' : ''
            }

        } else if ( formData.newPassword !== formData.repeatNewPassword ) {

            errorsTemp = {
                newPassword: 'Las contraseñas deben coincidir',
                repeatNewPassword: 'Las contraseñas deben coincidir'
            }


        } else if ( size( formData.newPassword ) < 6 ) {

            errorsTemp = {
                newPassword: 'La contraseña debe ser mayor a 6 caracteres.',
                repeatNewPassword: 'La contraseña debe ser mayor a 6 caracteres.'
            }

        } else {

            setIsLoading(true);
            await reauthenticate(formData.password)
                .then(async() => {
                    await firebase
                        .auth()
                        .currentUser
                        .updatePassword(formData.newPassword)
                            .then(() => {
                                isSetErrors = false;
                                setIsLoading(false);
                                setShowModal(false);
                                firebase.auth().signOut();
                            })
                            .catch(() => {
                                errorsTemp= {
                                    other: 'Error al actualizar la contraseña'
                                }
                                setIsLoading(false);
                            })
                })
                .catch((err) => {
                    console.log(err)
                    errorsTemp = {
                        password: 'La contraseña no es correcta'
                    }
                    setIsLoading(false);
                    
                })
        }

        isSetErrors && setErrors(errorsTemp)
    }

    return (
        <View style={styles.view}>
            <Input 
                placeholder='Contraseña actual'
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
            <Input 
                placeholder='Nueva contraseña'
                secureTextEntry={showPassword}
                rightIcon={{
                    type: 'material-community',
                    name: showPassword ? 'eye-outline' : 'eye-off-outline',
                    color: '#c2c2c2',
                    onPress: () => setShowPassword(!showPassword)
                }}
                onChange={(e) => onChange(e, 'newPassword')}
                errorMessage={errors.newPassword}
            />
            <Input 
                placeholder='Repetir nueva contraseña'
                secureTextEntry={showPassword}
                rightIcon={{
                    type: 'material-community',
                    name: showPassword ? 'eye-outline' : 'eye-off-outline',
                    color: '#c2c2c2',
                    onPress: () => setShowPassword(!showPassword)
                }}
                onChange={(e) => onChange(e, 'repeatNewPassword')}
                errorMessage={errors.repeatNewPassword}
            />
            <Button 
                title='Cambiar contraseña'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
            <Text>{errors.other}</Text>
        </View>
    )
}

const defaultFormData = () => ({
    password: '',
    newPassword: '',
    repeatNewPassword: ''
})

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 10
    },
    btnContainer: {
        marginTop: 10,
        width: '95%'
    },
    btn: {
        backgroundColor: '#00a680'
    }
})
