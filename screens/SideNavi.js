import React, {Component} from 'react';
import {Platform, StyleSheet,TouchableOpacity,SafeAreaView, AppLoading,Text, View} from 'react-native';
import {DrawerItems,createStackNavigator,createSwitchNavigator,createDrawerNavigator,createAppContainer}from 'react-navigation'
import streetView from './streetView';
import AddButton from './AddButton'
import Filter from './Filter'
import HomeScreen from './HomeScreen'
import locationTracking from './locationTracking'
import Dashboard from './Dashboard'
import Dashboardd from './Dashboardd'
import myAds from './myAds'
import updateAd from './updateAd'
 
export default class SideNavi extends Component<Props> {
    constructor(props){
      super(props);
       
    }
    
  
    render() {
         return(<ApppContainer/>);
  
  
      }
      
  } 
    
  const AppStack = createSwitchNavigator({
    Profile: {screen: AddButton},
    streetView: {screen: streetView},
    Homescreen:HomeScreen,
    AddButton:AddButton,
    Filter:Filter,
    Dashboardd:Dashboardd,
    locationTracking:locationTracking,   
      Dashboard:Dashboard, 
      myAds:myAds,
     updateAd:updateAd,  
     
  
  }
      
    )
  const ApppContainer = createAppContainer(AppStack); 