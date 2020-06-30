import React, {Component} from 'react';
import {Platform, StyleSheet, AppLoading,Text,TouchableOpacity,View} from 'react-native';
import {createStackNavigator,createDrawerNavigator,createAppContainer}from 'react-navigation'
import styles from "./styles"
import '@firebase/auth'
import firebase from '@firebase/app'
import Firebase from './Firebase'
import { YellowBox } from 'react-native';
import _ from 'lodash';
import StartNavigator from './StartNavigator';
import MainTabNavigator from './MainTabNavigator';


type Props = {};
export default class Chooser extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {
      isLoadingComplete:false,
      isAuthenticatedReady:false,
      isAuthenticated:false
    };
    if(!firebase.apps.length){firebase.initializeApp(Firebase.FirebaseConfig);}

    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }
  onAuthStateChanged = (user) =>{
    this.setState({isAuthenticatedReady:true});
    this.setState({isAuthenticated:!!user});
  }
  onpres(){
    return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
          {(this.state.isAuthenticated) ? <MainTabNavigator /> : <StartNavigator />}
        </View>
);
  }
  
  render() {
    const{heading,input,btn,container,headingg,cardb}=styles
    return(
      <View style={container}><TouchableOpacity style={btn}  onPress={()=>this.onpres()}><Text>Enter Housing Hub</Text></TouchableOpacity></View>
    )
      
}
}