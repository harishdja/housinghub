import React, {Component} from 'react';
import {Platform, StyleSheet,TouchableOpacity,SafeAreaView, AppLoading,Text, View} from 'react-native';
import {DrawerItems,createStackNavigator,createSwitchNavigator,createMaterialTopTabNavigator,createDrawerNavigator,createAppContainer}from 'react-navigation'
import Firebase from './Firebase'
import '@firebase/auth'
import firebase from '@firebase/app'
import Filter from './Filter'
import HomeScreen from './HomeScreen'
import streetView from './streetView'
import locationTracking from './locationTracking'
import Dashboard from './Dashboard'
import AddButton from './AddButton'
import Dashboardd from './Dashboardd'
import SearchHeader from './SearchHeader'
import { YellowBox } from 'react-native';
import _ from 'lodash';
import myAds from './myAds'
import updateAd from './updateAd'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class MainTabNavigator extends Component<Props> {
  constructor(props){
    super(props);
     
  }
  signout(){
    firebase.auth().signOut();
  }
 

  render() {
       return(<ApppContainer/>);


    }
    
} 
  
const AppStack = createSwitchNavigator({

  Homescreen:HomeScreen,
  AddButton:AddButton,
  streetView:streetView,
  AddButton:AddButton,
  Filter:Filter,
  myAds:myAds,
  updateAd:updateAd,
  Dashboardd:Dashboardd,
  locationTracking:locationTracking,   
    Dashboard:Dashboard,  
    
   

}
    
  )
const ApppContainer = createAppContainer(AppStack);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});