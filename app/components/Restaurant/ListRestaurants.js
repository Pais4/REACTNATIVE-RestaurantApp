import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { size } from 'lodash';

export const ListRestaurants = (props) => {

    const { restaurants } = props;

    return (
        <View>
            {
                size(restaurants) > 0
                ? 
                (
                    <FlatList 
                        data={restaurants}
                        renderItem={(restaurant) => <Restaurant restaurant={restaurant} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )
                : 
                (
                    <View style={styles.loaderRestaurants}>
                        <ActivityIndicator size='large' />
                        <Text>Cargando restaurantes</Text>
                    </View>
                )
            }
        </View>
    )
}

const Restaurant = (props) => {

    const {restaurant} = props;

    const { images, name, description, address } = restaurant.item;

    const imageRestaurant = images[0];

    const goRestaurantScreen = () => {
        console.log('RestaurantScreen')
    }

    return(

        <TouchableOpacity onPress={goRestaurantScreen}>
            <View style={styles.viewRestaurant}>
                <View style={styles.viewRestaurantImage}>
                    <Image
                        resizeMode='cover'
                        /* Spinner mientras carga la imagen */
                        PlaceholderContent={<ActivityIndicator color='#fff' />}
                        source={
                            imageRestaurant 
                            ? { uri: imageRestaurant }
                            : require('../../../assets/img/no-image.png')
                        }
                        style={styles.imgRestaurant}
                    />
                </View>
                <View>
                    <Text style={styles.restaurantName}>{name}</Text>
                    {/* Extraemos desde la letra 0 a la 60 para que nos sea muy largo */}
                    <Text style={styles.restaurantDescription}>{description.substr(0, 60)}...</Text>
                    <Text style={styles.restaurantAddress}>{address}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    loaderRestaurants: {
        marginTop: 10,
        marginBottom: 10, 
        alignItems: 'center'
    },
    viewRestaurant: {
        flexDirection: 'row',
        margin: 10
    },
    viewRestaurantImage: {
        marginRight: 15
    },
    imgRestaurant: {
        width: 80,
        height: 80
    },
    restaurantName: {
        fontWeight: 'bold'
    },
    restaurantAddress: {
        paddingTop: 2,
        color: 'grey'
    },
    restaurantDescription: {
        paddingTop: 2,
        color: 'grey',
        width: 300
    }
})
