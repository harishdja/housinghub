import MapView,{Marker} from 'react-native-maps';
import React, {Component} from 'react';
import {Platform, Alert,StyleSheet, BackHandler,
    
  DeviceEventEmitter,
StatusBar, Text,TouchableOpacity, View} from 'react-native';
import {List,ListItem,Card,Button,Icon,Header,SearchBar,PricingCard} from 'react-native-elements'
import '@firebase/auth'
import '@firebase/database'
import firebase from '@firebase/app'
import { YellowBox } from 'react-native';
import Geocoder from 'react-native-geocoder'
import _ from 'lodash';

export default class SearchHeader extends Component<Props>{
  static navigationOptions = ({navigation}) => {
    return {
      header:null
    }}
  state = {
    search: 'a',
  };

  updateSearch = search => {
    this.setState({ search });
  };
    render(){
      const { search } = this.state;
      return(
        <View style={styles.Container} >
        <Header
  leftComponent={{ icon: 'menu', color: '#fff' }}
  centerComponent={
    <SearchBar
   placeholder="Type Here..."
   onChangeText={this.updateSearch}
   value={search}
 />}
  rightComponent={{ icon: 'home', color: '#fff' }}
/>
     <Text>{this.state.search}</Text>
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    Container:{
      flex:1
    }
  });