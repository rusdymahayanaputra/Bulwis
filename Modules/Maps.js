import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

class Maps extends Component {
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
          gambar:responseJson[0].gambar

        }, function(){

        });

      })
      .catch((error) =>{
        console.log('not mounting')
      });
    }

  state = {
    region: {
      latitude: -8.149407,
      longitude: 115.216667,
      latitudeDelta: 0.8922,
      longitudeDelta: 0.8421,
    },
    markers : [
      {
        key:1,
        latlng: {
          latitude: -8.149407,
          longitude: 115.216667
        },
        title: 'Letak Supermarket di Bali',
        subtitle: ''
      },

   ]
  };

  render() {
    return (
      <View style={styles.contMain}>
        <View style={styles.contHeader}>
            <Text style={styles.textHeader}> {this.state.nama_tempat} </Text>
        </View>
        <View style={styles.contMaps}>
              <MapView
                style={styles.map}
                region={this.state.region}
              >
              {this.state.markers.map(mark => (
              <Marker
                  key = {mark.key}
                  coordinate={mark.latlng}
                  title={this.state.nama_tempat}
                  description={mark.subtitle}
                />
              ))}
              </MapView>
        </View>
        <View style={styles.contFooter}>
           <Text style={styles.textFooter}> BULWIS@REP </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  contMain: {
      flex : 1
  },
  contHeader: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    position: 'relative'
  },
  contMaps : {
    flex : 10
  },
  textHeader: {
    fontSize: 20,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contFooter: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    position: 'relative'
  },
  textFooter: {
    fontSize: 16,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Maps;
