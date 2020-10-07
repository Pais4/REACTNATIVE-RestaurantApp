import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import { firebaseApp } from '../../utils/firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { LoadingComponent } from '../../components/LoadingComponent';
import { CarouselComponent } from '../../components/Carousel';

const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get('window').width;

export const RestaurantScreen = (props) => {

    const { navigation, route } = props;
    const { id, name } = route.params;
    const [restaurant, setRestaurant] = useState(null);

    navigation.setOptions({
        title: name
    })

    useEffect(() => {
        
        db.collection('restaurants')
            .doc(id)
            .get()
            .then((response) => {
                const data = response.data();
                // Obtenemos el id del restaurante y lo asignamos a data
                data.id = response.id;
                setRestaurant(data);
            })

    }, [])
    
    if(!restaurant) {

        return <LoadingComponent isVisible={true} text='Cargando' />
    }
        

    return (
        <ScrollView vertical style={styles.viewBody}>
            <CarouselComponent 
                arrayImages={restaurant.images}
                height={250}
                width={screenWidth}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: '#fff'
    }
})
