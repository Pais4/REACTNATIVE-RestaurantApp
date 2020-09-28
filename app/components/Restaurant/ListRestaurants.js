import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { size } from 'lodash';
import { useNavigation } from '@react-navigation/native';

export const ListRestaurants = (props) => {

    const { restaurants, handleLoadMore, loading } = props;
    const navigation = useNavigation();

    return (
        <View>
            {
                size(restaurants) > 0
                ? 
                (
                    <FlatList 
                        data={restaurants}
                        renderItem={(restaurant) => <Restaurant restaurant={restaurant} navigation={navigation} />}
                        keyExtractor={(item, index) => index.toString()}
                        onEndReachedThreshold={0.5}
                        onEndReached={handleLoadMore}
                        ListFooterComponent={<FooterList loading={loading}/>}
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

    const { restaurant, navigation } = props;

    const { images, name, description, address, id } = restaurant.item;

    const imageRestaurant = images[0];

    const goRestaurantScreen = () => {
        navigation.navigate('restaurant', {
            id,
            name
        });
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

const FooterList = (props) => {

    const { loading } = props;

    if ( loading ) {

        return(
            <View style={styles.loaderRestaurants}>
                <ActivityIndicator size='large' />
            </View>
        )

    } else {

        return (
            <View style={styles.notFoundRestaurants}>
                <Text>No quedan restaurantes por cargar...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loaderRestaurants: {
        marginTop: 10,
        marginBottom: 10, 
        alignItems: 'center'
    },
    notFoundRestaurants: {
        marginTop: 10,
        marginBottom: 20,
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
