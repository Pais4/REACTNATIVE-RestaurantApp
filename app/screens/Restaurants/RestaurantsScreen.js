import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
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
  const [startRestaurants, setStartRestaurants] = useState(null)
  const limitRestautant = 10;

  useEffect(() => {
    
    firebase.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo)
    })

  }, []);

  useEffect(() => {
    
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

  return (
    <View style={styles.viewBody}>
      
      <ListRestaurants restaurants={restaurants} />

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