import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import { map, size, filter, countBy } from 'lodash';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import uuid from 'random-uuid-v4';
import { ModalComponent } from '../ModalComponent';

/* Firebase */
import { firebaseApp } from '../../utils/firebase';
import firebase from 'firebase/app';
import 'firebase/storage';
import'firebase/firestore';

const db = firebase.firestore(firebaseApp);

/* Obtener las medidas de la pantalla */
const widtScreen = Dimensions.get('window').width;

export const AddRestaurantForm = (props) => {

    const { toastRef, setIsLoading, navigation } = props;

    const [restaurantName, setRestaurantName] = useState('');
    const [restaurantAdress, setRestaurantAdress] = useState('');
    const [restaurantDescription, setRestaurantDescription] = useState('');
    const [imagesSelected, setImagesSelected] = useState([]);
    const [isVisibleMap, setIsVisibleMap] = useState(false);
    const [locationRestaurant, setLocationRestaurant] = useState(null)


    const addRestaurant = () => {
        
        if ( !restaurantName || !restaurantAdress || !restaurantDescription ) {

            toastRef.current.show('Todos los campos son necesarios.');

        }  else if ( size(imagesSelected) === 0 ) {

            toastRef.current.show('El restaurante debe tener al menos una foto.')

        } else if ( !locationRestaurant ) {

            toastRef.current.show('Debes localizar el restaurante en el mapa.')

        } else {

            setIsLoading(true);
            /* Esto devuelve una promesa con las url de las imagenes */
            uploadImageStorage()
                .then( response => {

                    db.collection('restaurants')
                        .add({
                            name: restaurantName,
                            address: restaurantAdress,
                            description: restaurantDescription,
                            location: locationRestaurant,
                            images: response,
                            rating: 0,
                            ratingTotal: 0,
                            quantityVoting: 0,
                            createAt: new Date(),
                            createBy: firebase.auth().currentUser.uid
                        })
                        .then(() => {
                            setIsLoading(false);
                            navigation.navigate('restaurants')
                        })
                        .catch(() => {
                            setIsLoading(false);
                            toastRef.current.show('Error al subir el restaurante, intentelo de nuevo')
                        })

                })
        }
    }

    const uploadImageStorage = async () => {
        
        const imageBlob = [];

        await Promise.all(

            map(imagesSelected, async(image) => {
    
                const response = await fetch(image);
                
                const blob = await response.blob();
    
                const ref = firebase.storage().ref('Restaurants').child(uuid());
    
                await ref.put(blob).then(async(result) => {
                    
                    /* Nos conectamos a firestore para obtener la url de las imagenes que subimos */
                    await firebase
                            .storage()
                            /* Nombre del fichero */
                            .ref(`Restaurants/${result.metadata.name}`)
                            .getDownloadURL()
                            .then(photoUrl => {
                                imageBlob.push(photoUrl);
                            })
                })
            })

        )


        return imageBlob;
    }

    return (
        <ScrollView style={styles.scrollView}>
            <ImageRestaurant 
                imagesSelected= {imagesSelected[0]}
            />
            <FormAdd 
                setRestaurantName={setRestaurantName}
                setRestaurantAdress={setRestaurantAdress}
                setRestaurantDescription={setRestaurantDescription}
                setIsVisibleMap={setIsVisibleMap}
                locationRestaurant={locationRestaurant}
            />
            <UploadImage 
                toastRef={toastRef} 
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
            />
            <Button 
                title='Crear restaurante'
                onPress={addRestaurant}
                buttonStyle={styles.btnAddRestaurant}
            />
            <MapComponent 
                isVisibleMap={isVisibleMap}
                setIsVisibleMap={setIsVisibleMap}
                setLocationRestaurant={setLocationRestaurant}
                toastRef={toastRef}
            />
        </ScrollView>
    )
}

/* Componentes internos */

const ImageRestaurant = (props) => {

    const { imagesSelected } = props;

    return (
        <View style={styles.viewPhoto}>
            <Image 
                source={ 
                    imagesSelected 
                    ? {uri: imagesSelected}
                    : require('../../../assets/img/no-image.png')
                }
                style={{width: widtScreen, height: 200}}
            />
        </View>
    )
}

const FormAdd = (props) => {

    const { setRestaurantName, setRestaurantAdress, setRestaurantDescription, setIsVisibleMap, locationRestaurant } = props;

    return(
        <View style={styles.viewForm}>
            <Input
                placeholder='Nombre del restaurante'
                containerStyle={styles.input}
                onChange={(e) => setRestaurantName(e.nativeEvent.text)}
            />
            <Input
                placeholder='Dirección'
                containerStyle={styles.input}
                onChange={(e) => setRestaurantAdress(e.nativeEvent.text)}
                rightIcon={{
                    type: 'material-community',
                    name: 'google-maps',
                    color: !locationRestaurant ? '#c2c2c2' : '#00a680',
                    onPress: () => setIsVisibleMap(true)
                }}
            />
            <Input
                placeholder='Descripción del restaurante'
                multiline={true}
                inputContainerStyle={styles.textArea}
                containerStyle={styles.input}
                onChange={(e) => setRestaurantDescription(e.nativeEvent.text)}
            />
        </View>
    )
}

const MapComponent = (props) => {

    const { isVisibleMap, setIsVisibleMap, setLocationRestaurant, toastRef } = props;
    const [location, setLocation] = useState(null);

    useEffect(() => {
        
        /* Funcion anonima asincrona auto ejecutable */
        (async () => {

            const resultPermissions = await Permissions.askAsync(
                Permissions.LOCATION
            );

            const statusPermissions = resultPermissions.permissions.location.status;

            if( statusPermissions !== 'granted') {
                toastRef.current.show('Tienes que aceptar los permisos de localizacion', 3000)
            } else {
                const loc = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                })
            }

        })()

    }, [])

    const confirmLocation = () => {
        setLocationRestaurant(location);
        toastRef.current.show('Localizacion guardada correctamente');
        setIsVisibleMap(false);
    }

    return(
        <ModalComponent isVisible={isVisibleMap} setIsVisible={setIsVisibleMap} >
            <View>
                {
                    location && (
                        <MapView 
                            style={styles.mapStyles}
                            initialRegion={location}
                            showsUserLocation={true}
                            onRegionChange={(region) => setLocation(region)}
                        >
                            <MapView.Marker 
                                coordinate={{
                                    latitude: location.latitude,
                                    longitude: location.longitude
                                }}
                                draggable
                            />
                        </MapView>
                    )
                }
                <View style={styles.mapViewBtn}>
                    <Button 
                        title='Guardar ubicación'
                        containerStyle={styles.viewMapBtnContainerSave}
                        buttonStyle={styles.viewMapBtnSave}
                        onPress={confirmLocation}
                    />
                    <Button 
                        title='Cancelar Ubicación'
                        containerStyle={styles.viewMapBtnContainerCancel}
                        buttonStyle={styles.viewMapBtnCancel}
                        onPress={() => setIsVisibleMap(false)}
                    />
                </View>
            </View>
        </ModalComponent>
    )
}

const UploadImage = (props) => {

    const { toastRef, setImagesSelected, imagesSelected } = props;

    const imageSelect = async() => {
        
        const resultPermissions = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );
        
        if ( resultPermissions === 'denied' ) {
            toastRef.current.show('No brindaste los permisos de la galeria.', 3000);
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4,3]
            });

            if ( result.cancelled ) {
                toastRef.current.show(
                    'Has cerrado la galeria sin seleccionar una imagen', 2000
                );
            } else {
                setImagesSelected( [...imagesSelected, result.uri] )
            }
        }

    }

    const removeImage = (image) => {
        const arrayImages = imagesSelected;

        Alert.alert(
            'Eliminar Imagen',
            '¿Estas seguro de que quieres eliminar la imagen?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text:'Eliminar',
                    onPress: () => {
                        setImagesSelected(
                            filter(arrayImages, (imageUrl) => imageUrl !== image)
                        )
                    }
                }
            ],
            { cancelable: false }
        )
    }

    return(
        <View style={styles.viewImage}>
            {
                size(imagesSelected) < 5
                    && (
                        <Icon 
                            type='material-community'
                            name= 'camera'
                            color='#7a7a7a'
                            containerStyle={styles.containerIcon}
                            onPress={imageSelect}
                        />
                    )
            }
            {
                /* Por cada iteracion me devuleve la imagen -> imageRestaurant */
                /* Todo bucle de map debe tener una key */
                map(imagesSelected, (imageRestaurant, index) => (
                    <Avatar 
                        key={index}
                        style={styles.miniatureStyle}
                        source={{uri: imageRestaurant}}
                        onPress={() => removeImage(imageRestaurant)}
                    />
                ))
            }
        </View>
    )
}
 
const styles = StyleSheet.create({
    scrollView: {
        height: '100%'
    },
    viewForm: {
        marginLeft: 10,
        marginRight: 10
    }, 
    input: {
        marginBottom: 10
    },
    textArea: {
        height: 100,
        width: '100%',
        padding: 0,
        margin: 0
    },
    btnAddRestaurant: {
        backgroundColor: '#00a680',
        margin: 20
    },
    viewImage: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30
    },
    containerIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: '#e3e3e3'
    },
    miniatureStyle: {
        width: 70,
        height: 70, 
        marginRight: 10
    },
    viewPhoto: {
        alignItems: 'center',
        height: 200,
        marginBottom: 20
    },
    mapStyles: {
        width:'100%',
        height: 550
    },
    mapViewBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    viewMapBtnContainerCancel: {
        paddingLeft: 5
    },
    viewMapBtnCancel: {
        backgroundColor: '#F76141'
    },
    viewMapBtnContainerSave: {
        paddingRight: 5
    },
    viewMapBtnSave: {
        backgroundColor: '#00a680'
    }
})