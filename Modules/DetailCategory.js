import React from 'react';
import { StyleSheet, Text, ScrollView, TouchableHighlight, TouchableOpacity, View, Button,
  TextInput,FlatList,Image } from 'react-native';
import { List, ListItem, Card,Rating, ButtonGroup, Icon} from "react-native-elements";
import ActionButton from 'react-native-action-button';

export default class ItemWadaya extends React.Component {
  // static navigationOptions = ({ navigation })=> ({
  //   title: navigation.state.params.title,
  // });
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const itemIds = navigation.getParam('itemId','NA')
    const itemId = this.props.navigation.getParam('itemId')
    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
      selectedIndex: 2
    };
  }

      navigateEdit = () => {
        this.props.navigation.navigate(
          'Edit',
          { id },
        );
      }

      navigateMaps = () => {
       this.props.navigation.navigate('Maps');

      }

  // componentDidMount()  {
  //     // const { params } = this.props.navigation.state;
  //     // const kat_id= params.kat.kat_id;
  //     // const url = 'http://wadaya.rey1024.com/api/getListBudaya.php?kat_id='+kat_id;
  //      this.setState({ loading: true });
  //     fetch (url)
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       console.log('budaya');
  //       console.log(responseJson);
  //       this.setState({
  //         data: responseJson,
  //         error: responseJson.error || null,
  //         loading: false,
  //         refreshing: false
  //       });
  //     }
  //   );
  // }

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
        id_katagori: responseJson[0].id_katagori,
        gambar:responseJson[0].gambar
      }, function(){

      });

    })
    .catch((error) =>{
      console.log('not mounting')
    });
  }



  render() {
    return (
      <View style={styles.contBudaya}>
         <View style={styles.image}>
         <Image
         style={styles.image}
         resizeMode="cover"
         source={{ uri: 'https://iwes.000webhostapp.com/bulwis/image/'+this.state.gambar }}
         />
         </View>
         <View style={styles.contJudul} >
            <Text style={styles.textJudul1}> {this.state.nama_tempat} </Text>
            <Text style={styles.textJudul2}>
              {this.state.dis_sing}
            </Text>
         </View>
         <View style={styles.contDeskripsi}>
            <ScrollView>
              <Text style={styles.teksDeskripsi}>
                  {this.state.dis_leng}
              </Text>
            </ScrollView>
         </View>
         <View style={styles.AddButton}>
           <Button title="Lokasi" onPress={() => {this.props.navigation.navigate('Maps', {itemId: this.state.id_wisata,});}}/>
         </View>
         <View style={styles.contEdit}>
             <TouchableOpacity activeOpacity={0.5} onPress={() => {this.props.navigation.navigate('Edit', {itemId: this.state.id_wisata,});}}>
                   <Image source={{uri : 'http://www.athletesnest.com/Kendo/Browsers/Images/Image?path=edit%20icon%20green.png'}}
                   style={styles.FloatingButtonStyle} />
             </TouchableOpacity>
         </View>
      </View>

    );
  }
}
const styles = StyleSheet.create({
    footer: {
      flex: 1,
      backgroundColor: '#D7CCC8',
      justifyContent: 'center',
      alignItems: 'center'
    },
    actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },

    image: {
      flex: 3,
      height: 120

    },
    TouchableOpacityStyle:{

  position: 'absolute',
  width: 50,
  height: 50,
  alignItems: 'center',
  justifyContent: 'center',
  right: 30,
  bottom: 30,
},
FloatingButtonStyle: {
  resizeMode: 'contain',
  width: 40,
  height:40,
  marginBottom:25
},
    contBudaya: {
        flex: 1,
        justifyContent: 'center',
        margin: 10

    },
    ImageStyle: {
      width: 520,
      height: 250,
    },
    teksDeskripsi: {
        fontSize: 15,
        textAlign: 'justify',
        padding: 5

    },
    textJudul1: {
      fontSize: 20,
      color: '#fff',
      paddingLeft: 5

    },
    textJudul2: {
      fontSize: 16,
      color: '#fff',
      paddingLeft: 5

    },
    listButton: {
      flex: 1,
      backgroundColor: '#D7CCC8'
    },
    contJudul: {
      flex: 2,
      justifyContent: 'center',
      //alignItems: 'center',
      backgroundColor: '#8D6E63'

    },
    contDeskripsi: {
      flex: 4,
      backgroundColor: '#EFEBE9'
    },
    contEdit: {
      flex: 0.8,
      backgroundColor: '#EFEBE9',
      marginTop:10
    }

  });
