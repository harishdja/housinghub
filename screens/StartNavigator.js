import React, {Component} from 'react';
import {Platform, StyleSheet, AppLoading,Text, View} from 'react-native';
import {createStackNavigator,createDrawerNavigator,createAppContainer}from 'react-navigation'

import '@firebase/auth'
import firebase from '@firebase/app'
import LoginScreen from './LoginScreen'
import HomeScreen from './HomeScreen'
import Dashboard from './Dashboard'
import Signup from './Signup'
import Forgot from './Forgot'
import locationTracking from './locationTracking'
import streetView from './streetView'
import Filter from './Filter'
import { YellowBox } from 'react-native';
import _ from 'lodash';

 

type Props = {};
export default class StartNavigator extends Component<Props> {
  constructor(props){
    super(props);
     
  }
 

  render() {
       return(<AppppContainer/>);


    }
    
}

const AppStack = createStackNavigator({ 
    Login:{screen:LoginScreen},
    locationTracking:locationTracking,
    Signup:Signup,
    Forgot:Forgot,
})
const AppppContainer = createAppContainer(AppStack);
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