import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, TextInput, Alert, Image,
        ScrollView, TouchableOpacity, YellowBox, ListView, Platform, Picker , ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {DrawerNavigator} from 'react-navigation';

class EditActivity extends Component {
  constructor(props) {

        super(props)
         const { navigation } = this.props;
         const itemIds = navigation.getParam('itemId','NA')
         const itemId = this.props.navigation.getParam('itemId')

        this.state = {
          id_wisata: itemId,
          nama_tempat: '',
          dis_sing:'',
          dis_leng:'',
          latitude:'',
          longitude:'',
          id_katagori: ''
        }

      }


     static navigationOptions =
     {
        title: 'Edit Data',
     };

     componentDidMount(){
        // console.log("https://iwes.000webhostapp.com/bulwis/datas/getwisata/"+this.state.id_wisata)

    const fetchUrl = 'https://iwes.000webhostapp.com/bulwis/datas/getwisata/'+this.props.navigation.getParam('itemId','NA')

      console.log(fetchUrl)
      return fetch(fetchUrl)
      .then((response) => response.json())
       .then((responseJson) => {
         console.log(responseJson[0])
         // console.log(responseJson[0].id_wisata)
         this.setState({
           id_wisata: responseJson[0].id_wisata,
           nama_tempat: responseJson[0].nama_tempat,
           dis_sing: responseJson[0].dis_sing,
           dis_leng: responseJson[0].dis_leng,
           latitude: responseJson[0].latitude,
           longitude: responseJson[0].longitude,
           id_katagori: responseJson[0].id_katagori,

         }, function(){

         });

       })
       .catch((error) =>{
         console.log('not mounting')
       });
     }

     Update = () =>{

       fetch('https://iwes.000webhostapp.com/bulwis/datas/update/', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id_wisata: this.state.id_wisata,
            nama_tempat: this.state.nama_tempat,
            dis_sing: this.state.dis_sing,
            dis_leng: this.state.dis_leng,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            id_katagori: this.state.id_katagori
            }),
        }).then((response) => response.json())
        .then((responseJson) => {

          Alert.alert(responseJson);

        }).catch((error) => {
           console.error(error);
        });
          this.props.navigation.navigate('Kategori');
       }

       DeleteStudentRecord = () =>{

          fetch('https://iwes.000webhostapp.com/bulwis/datas/delete/'+this.state.id_wisata, {


          }).then((response) => response.json())
          .then((responseJson) => {

            Alert.alert(responseJson);

          }).catch((error) => {
             console.error(error);
          });

          this.props.navigation.navigate('Kategori');

      }

     render() {

       return (

    <View style={styles.MainContainer}>
        <ScrollView>

           <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> Edit Data </Text>

           <TextInput

             placeholder="ID"

             value={this.state.id_wisata}

             defaultValue={this.state.id_wisata}

             onChangeText={ TextInputValue => this.setState({ id_wisata : TextInputValue }) }

             underlineColorAndroid='transparent'

             style={styles.TextInputStyleClass}

           />

           <TextInput

             placeholder="Nama Tempat"

             value={this.state.nama_tempat}

             defaultValue={this.state.nama_tempat}

             onChangeText={ TextInputValue => this.setState({ nama_tempat : TextInputValue }) }

             underlineColorAndroid='transparent'

             style={styles.TextInputStyleClass}
           />

           <TextInput

             placeholder="Alamat"

             value={this.state.dis_sing}

             defaultValue={this.state.dis_sing}

             onChangeText={ TextInputValue => this.setState({ dis_sing : TextInputValue }) }

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
               defaultValue={this.state.dis_leng}
           />

           <TextInput

             placeholder="Latitude"

             value={this.state.latitude}

             defaultValue={this.state.latitude}

             onChangeText={ TextInputValue => this.setState({ latitude : TextInputValue }) }

             underlineColorAndroid='transparent'

             style={styles.TextInputStyleClass}
           />

           <TextInput

             placeholder="Longitude"

             value={this.state.longitude}

             defaultValue={this.state.longitude}

             onChangeText={ TextInputValue => this.setState({ longitude : TextInputValue }) }

             underlineColorAndroid='transparent'

             style={styles.TextInputStyleClass}
           />

           <TextInput

             placeholder="Kategori"

             value={this.state.id_katagori}

             defaultValue={this.state.id_katagori}

             onChangeText={ TextInputValue => this.setState({ id_katagori : TextInputValue }) }

             underlineColorAndroid='transparent'

             style={styles.TextInputStyleClass}
           />



          <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.Update} >

             <Text style={styles.TextStyle}> UPDATE </Text>

          </TouchableOpacity>

          <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.DeleteStudentRecord} >

             <Text style={styles.TextStyle}> DELETE </Text>

          </TouchableOpacity>
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
 TouchableOpacityStyle: {

    paddingTop:10,
    paddingBottom:10,
    borderRadius:5,
    marginBottom:7,
    width: '90%',
    backgroundColor: '#00BCD4'

  },
  TextInputStyleClass2: {
    textAlign: 'center',
    marginBottom: 7,
    height: 70,
    borderWidth: 1,
    borderColor: '#FF5722',
  }

  });
export default EditActivity;
