import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, TextInput, Alert, Image, TouchableOpacity, YellowBox, ListView, AppRegistry, ActivityIndicator, FlatList   } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { List, ListItem, SearchBar } from "react-native-elements";
import {DrawerNavigator} from 'react-navigation';

class Hotel extends Component {
  constructor(props) {
      super(props);
      this.state = {
        isLoading: true
      }
    }
  // navigateDetailCategory = (id) => {
  //    this.props.navigation.navigate('DetailCategory');
  //
  //   }

  GetItem(nama_tempat) {
    Alert.alert(nama_tempat);
    }

    navigateAdd = () => {
     this.props.navigation.navigate('Add');

    }

    navigateEdit = () => {
      this.props.navigation.navigate(
        'Edit',
        { id },
      );
    }


    componentDidMount()  {
      const url = 'https://iwes.000webhostapp.com/bulwis/datas/get/3';
       this.setState({ loading: true });
      fetch (url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          data: responseJson,
          error: responseJson.error || null,
          loading: false,
          refreshing: false
        });
      }
    );
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
};


      renderHeader = () => {
      return <SearchBar placeholder="Cari..." lightTheme round />;
  };

  render() {
  return (
    <View style={styles.MainContainer}>
        <List>
        <FlatList
          data={this.state.data}
          keyExtractor={item => item.nama_tempat}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    this.props.navigation.navigate('DetailCategory', {
                      itemId: item.id_wisata
                    });
                  }}>
              <ListItem
                roundAvatar
                title={`${item.nama_tempat}`}
                subtitle={item.dis_sing}
                avatar={{uri :
                  'https://iwes.000webhostapp.com/bulwis/image/'+
                (item.gambar?item.gambar:'hotel.jpg')
                }}
              />
            </TouchableOpacity>
          )}
        />
        </List>
        <TouchableOpacity activeOpacity={0.5} onPress={this.navigateAdd} style={styles.TouchableOpacityStyle} >
              <Image source={{uri : 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png'}}
              style={styles.FloatingButtonStyle} />
        </TouchableOpacity>
    </View>
  );
}
}

  const styles = StyleSheet.create({

  MainContainer :{
  flex:1,
  },

     rowViewContainer: {
          paddingRight: 10,
          paddingTop: 10,
          paddingBottom: 10,
        },
        TextStyleBox:{
          fontSize: 20,
          marginBottom: 4,
          color: '#000000',
          alignItems:'center',
          justifyContent: 'center',
          fontWeight:'bold',
        },
        header_footer_style:{

           width: '100%',
           height: 45,
           backgroundColor: '#FF9800'

       },
       textStyle:{

         textAlign: 'center',
         color: '#fff',
         fontSize: 22,
         padding: 7

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
     width: 50,
     height: 50,
   },

  });

export default Hotel;
