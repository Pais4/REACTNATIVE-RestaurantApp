import React from 'react'
import { Image } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel'; 

export const CarouselComponent = (props) => {

    const { arrayImages, height, width } = props;

    // Hacemos destructuring directamente en la funcion
    const renderItem = ({ item }) => {

        return <Image style={{ width, height}} source={{uri: item}}/>
    }

    return (
        <Carousel 
            layout={'default'}
            data={arrayImages}
            sliderWidth={width}
            itemWidth={width}
            renderItem={renderItem}
        />
    )   
}
