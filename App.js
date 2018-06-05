import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Login from './Modules/Login' ;
import Maps from './Modules/Maps' ;
import Kategori from './Modules/Kategori' ;
import Hotel from './Modules/Hotel' ;
import Kuliner from './Modules/Kuliner' ;
import Tempat_Wisata from './Modules/Tempat_Wisata' ;
import AddActivity from './Modules/AddActivity' ;
import EditActivity from './Modules/EditActivity' ;
import DetailCategory from './Modules/DetailCategory' ;
import { StackNavigator } from 'react-navigation';


export default MyProject = StackNavigator(
{

 Login: { screen: Login },

 Maps: { screen: Maps },

 Kategori: { screen: Kategori},

 Hotel: { screen: Hotel},

 Kuliner: { screen: Kuliner},

 Tempat_Wisata: { screen: Tempat_Wisata},

 Add: { screen: AddActivity},

 DetailCategory: { screen: DetailCategory},

 Edit: { screen: EditActivity}

});
