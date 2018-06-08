import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, TextInput, Alert, Image,
        ScrollView, TouchableOpacity, YellowBox, ListView, Platform,
        Picker , ActivityIndicator, PixelRatio } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {DrawerNavigator} from 'react-navigation';
import ImagePicker from 'react-native-image-picker';

class AddActivity extends Component {
  constructor(props) {
    super(props);

      this.state = {

        nama_tempat: '',
        dis_sing: '',
        dis_leng: '',
        latitude: '',
        longitude: '',
        id_kategori: '',
        gambar:''

      };
    }
    navigateKategori = () => {
     this.props.navigation.navigate('Kategori');
    }

    InsertDataToServer = () =>{

      console.log('launch');
      const { nama_tempat } = this.state ;
      const { dis_sing } = this.state ;
      const { dis_leng } = this.state ;
      const { latitude } = this.state ;
      const { longitude } = this.state ;
      const { id_katagori } = this.state ;


   fetch('https://iwes.000webhostapp.com/bulwis/datas/post/', {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-type': 'application/json',
     },
     body: JSON.stringify({
       nama_tempat: nama_tempat,
       dis_sing: dis_sing,
       dis_leng: dis_leng,
       latitude: latitude,
       longitude: longitude,
       id_katagori: id_katagori
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

 state = {

   ImageSource: null,

};

choosePicture = () => {
  console.log("upload")
  var ImagePicker = require('react-native-image-picker');
  var options = {
      title: 'Pilih Gambar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
  };

  ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        console.log(source);
        console.log(response.fileName);
        this.setState({
          srcImg: source,
          uri: response.uri,
          fileName: response.fileName

        });
      }
  });
};
uploadPicture = () => {
  console.log('mulai upload');
  this.setState  ({loading : true })
  const { nama_tempat } = this.state ;
  const { dis_sing } = this.state ;
  const { dis_leng } = this.state ;
  const { latitude } = this.state ;
  const { longitude } = this.state ;
  const { id_katagori } = this.state ;

  const data = new FormData();
  //data.append('name', 'Fotoku'); // you can append anyone.
  data.append('fileToUpload', {
    uri: this.state.uri,
    type: 'image/jpeg', // or photo.type
    name: this.state.fileName,
  });

  const url= "https://iwes.000webhostapp.com/bulwis/datas/post2/"
  fetch(url, {
    method: 'post',
    body: data
  })
  .then((response) => response.json())
  .then((responseJson) =>
    {
      // console.log(responseJson);
      this.setState  ({
          loading : false
         }, function(){
          fetch('https://iwes.000webhostapp.com/bulwis/datas/post/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nama_tempat: nama_tempat,
            dis_sing: dis_sing,
            dis_leng: dis_leng,
            latitude: latitude,
            longitude: longitude,
            id_katagori: id_katagori
          }),
        });
        })
        this.props.navigation.navigate('Kategori');
        Alert.alert("Data berhasil di upload")
    });

}

    render() {
      return (

  <View style={styles.MainContainer}>
    <ScrollView>
        <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> Tambah Data </Text>
          <TextInput

            // Adding hint in Text Input using Place holder.
            placeholder="Nama Lokasi"

            onChangeText={nama_tempat => this.setState({nama_tempat})}

            // Making the Under line Transparent.
            underlineColorAndroid='transparent'

            style={styles.TextInputStyleClass}
          />

          <TextInput

            // Adding hint in Text Input using Place holder.
            placeholder="Alamat"

            onChangeText={dis_sing => this.setState({dis_sing})}

            // Making the Under line Transparent.
            underlineColorAndroid='transparent'

            style={styles.TextInputStyleClass}
          />

          <TextInput
              {...this.props}
              multiline={true}
               placeholder="Diskripsi"
              onChangeText={(dis_leng) => {
                  this.setState({ dis_leng })
              }}
              onContentSizeChange={(event) => {
                  this.setState({ height: event.nativeEvent.contentSize.height })
              }}
              style={styles.TextInputStyleClass2}
              //style={[styles.default, {height: Math.max(35, this.state.height)}]}
              value={this.state.dis_leng}
          />

          <TextInput

            // Adding hint in Text Input using Place holder.
            placeholder="latitude"

            onChangeText={latitude => this.setState({latitude})}

            // Making the Under line Transparent.
            underlineColorAndroid='transparent'

            style={styles.TextInputStyleClass}
          />

          <TextInput

            // Adding hint in Text Input using Place holder.
            placeholder="longitude"

            onChangeText={longitude => this.setState({longitude})}

            // Making the Under line Transparent.
            underlineColorAndroid='transparent'

            style={styles.TextInputStyleClass}
          />

          <View style={{ flex: 1, paddingBottom: 20, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{fontSize: 14, color: '#000'}}>Choose Image</Text>
                <TouchableOpacity onPress={this.choosePicture.bind(this)}>
                    <View style={styles.ImageContainer}>
                        {this.state.srcImg === null ? (
                            <Text>Choose Photo From Gallery</Text>
                        ) : (

                                <Image
                                    style={styles.ImageContainer}
                                    source={this.state.srcImg}
                                />
                            )}
                    </View>
                </TouchableOpacity>

            </View>

          <TextInput

            // Adding hint in Text Input using Place holder.
            placeholder="Kategori: 1 -> Wisata, 2 -> Hotel, 3 -> Kuliner"

            onChangeText={id_katagori => this.setState({ id_katagori})}

            // Making the Under line Transparent.
            underlineColorAndroid='transparent'

            style={styles.TextInputStyleClass}

            keyboardType = 'numeric'
          />

          <Button title="Input Data" onPress={this.uploadPicture} color="#2196F3" />

          <View style={styles.AddButton}>
            <Button title="Kembali Ke Menu Kategori" onPress={this.navigateKategori} color="#2196F3" />
          </View>
        </ScrollView>
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
 },

 ImageContainer: {
      borderRadius: 0,
      width: 125,
      height: 100,
      borderColor: "#2196F3",
      borderWidth: 1 / PixelRatio.get(),
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: 'rgba(255,255,255, .4)'

  },

  TextInputStyleClass2: {
    textAlign: 'center',
    marginBottom: 7,
    height: 70,
    borderWidth: 1,
    borderColor: '#FF5722',
  }

  });
export default AddActivity;
