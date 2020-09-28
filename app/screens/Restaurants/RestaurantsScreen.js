import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { useFocusEffect } from '@react-navigation/native';
import { firebaseApp } from '../../utils/firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

/* Componentes */
import { ListRestaurants } from "../../components/Restaurant/ListRestaurants";

const db = firebase.firestore(firebaseApp);

export const RestaurantsScreen = (props) => {

  const { navigation } = props;

  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [totalRestaurants, setTotalRestaurants] = useState(0);
  const [startRestaurants, setStartRestaurants] = useState(null);
  const [loading, setLoading] = useState(false);
  const limitRestautant = 10;

  useEffect(() => {
    
    firebase.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo)
    })

  }, []);

  /* Cuando se haga focus en la screen se va a ejecutar este Effect */
  useFocusEffect(
    useCallback(() => {
      db.collection('restaurants').get()
      .then((snap) => {
        setTotalRestaurants(snap.size)
      })

    const resultRestaurants = [];

    db.collection('restaurants')
      .orderBy('createAt', 'desc')
      .limit(limitRestautant)
      .get()
      .then((response) => {
        setStartRestaurants(response.docs[response.docs.length - 1]);
        response.forEach((doc) => {
          const restaurant = doc.data();
          restaurant.id = doc.id;
          resultRestaurants.push(restaurant);
          setRestaurants(resultRestaurants);
        })
      })
    }, [])
  )

  const handleLoadMore = () => {

    const resultRestaurants = [];

    restaurants.length < totalRestaurants && setLoading(true);

    db.collection('restaurants')
      .orderBy('createAt', 'desc')
      .startAfter(startRestaurants.data().createAt)
      .limit(limitRestautant)
      .get()
      .then((response) => {
        if( response.docs.length > 0 ) {
          setStartRestaurants(response.docs[response.docs.length - 1]);
        } else {
          setLoading(false);
        }

        response.forEach((doc) => {
          const restaurant = doc.data();
          restaurant.id = doc.id;
          resultRestaurants.push(restaurant);
        })
        setRestaurants([...restaurants, ...resultRestaurants]);
      })

  }

  return (
    <View style={styles.viewBody}>
      
      <ListRestaurants restaurants={restaurants} handleLoadMore={handleLoadMore} loading={loading} />

      {user &&
        <Icon 
          reverse
          type='material-community'
          name='plus'
          color='#00a680'
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate('add-restaurant')}
        />
      } 

    </View>
  );
};

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: '#fff'
  },
  btnContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2},
    shadowOpacity: 0.5
  }
})