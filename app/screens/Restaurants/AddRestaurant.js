import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-easy-toast';

/* Components */
import { LoadingComponent } from '../../components/LoadingComponent';
import { AddRestaurantForm } from '../../components/Restaurant/AddRestaurantForm';

export const AddRestaurant = (props) => {

    const { navigation } = props;
    const [isLoading, setIsLoading] = useState(false);
    
    const toastRef = useRef();

    return (
        <View>
            <AddRestaurantForm 
                toastRef={toastRef}
                setIsLoading={setIsLoading}
                navigation={navigation}
            />
            <Toast ref={toastRef} position='center' opacity={0.9} />
            <LoadingComponent isVisible={isLoading} text='Creando restaurante' />
        </View>
    )
}
