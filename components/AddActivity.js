import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, TextInput, Alert, Image, TouchableOpacity, YellowBox, ListView, Platform, Picker , ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {DrawerNavigator} from 'react-navigation';

class AddActivity extends Component {
  constructor(props) {
      super(props)

      this.state = {

        nama_lokasi: '',
        alamat: '',
        id_kategori: ''

      };
    }
    navigate2SecondActivity = () => {
     this.props.navigation.navigate('Second');
    }

    InsertDataToServer = () =>{

      console.log('launch');
   const { nama_lokasi } = this.state ;
   const { alamat } = this.state ;
   const { id_kategori } = this.state ;


   fetch('http://api.ifreethink.net/Z1515051022/datas/post/', {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-type': 'application/json',
     },
     body: JSON.stringify({
       nama_lokasi: nama_lokasi,
       alamat: alamat,
       id_kategori: id_kategori
     })


   })
   .then((response) => response.json())
         .then((responseJson) => {

   // Showing response message coming from server after inserting records.
           Alert.alert('Data Berhasil Diinputkan');
           console.log(responseJson.response);
         }).catch((error) => {
           console.error(error);
         });
 }

    render() {
      return (

  <View style={styles.MainContainer}>

          <TextInput

            // Adding hint in Text Input using Place holder.
            placeholder="Nama Lokasi"

            onChangeText={nama_lokasi => this.setState({nama_lokasi})}

            // Making the Under line Transparent.
            underlineColorAndroid='transparent'

            style={styles.TextInputStyleClass}
          />

          <TextInput

            // Adding hint in Text Input using Place holder.
            placeholder="Alamat"

            onChangeText={alamat => this.setState({alamat})}

            // Making the Under line Transparent.
            underlineColorAndroid='transparent'

            style={styles.TextInputStyleClass}
          />

          <TextInput

            // Adding hint in Text Input using Place holder.
            placeholder="Kategori"

            onChangeText={id_kategori => this.setState({ id_kategori})}

            // Making the Under line Transparent.
            underlineColorAndroid='transparent'

            style={styles.TextInputStyleClass}
          />
          <Text>
            Kategori: 1 -> Bank, 2 -> Rumah Sakit, 3 -> Hotel, 4 -> SPBU
          </Text>

          <Button title="Input Data" onPress={this.InsertDataToServer} color="#2196F3" />

          <View style={styles.AddButton}>
            <Button title="Kembali Ke Menu Kategori" onPress={this.navigate2SecondActivity} color="#2196F3" />
          </View>
  </View>

      );
    }
  }

  const styles = StyleSheet.create({

  MainContainer :{

  justifyContent: 'center',
  flex:1,
  margin: 10
  },

  AddButton: {
    marginTop : 10,
  },

  TextInputStyleClass: {

  textAlign: 'center',
  marginBottom: 7,
  height: 40,
  borderWidth: 1,
  // Set border Hex Color Code Here.
   borderColor: '#FF5722',

  // Set border Radius.
   //borderRadius: 10 ,
  }

  });
export default AddActivity;
