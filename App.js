 import React, {Component} from 'react';
import {Platform, StyleSheet,StatusBar, AppLoading,Text, View} from 'react-native';
import {createStackNavigator,createDrawerNavigator,createAppContainer}from 'react-navigation'
import BottomTabNavigation from './screens/BottomTabNavigation'
import '@firebase/auth'
import firebase from '@firebase/app'
import LoginScreen from './screens/LoginScreen'
import Firebase from './screens/Firebase'
import HomeScreen from './screens/HomeScreen'
import Dashboard from './screens/Dashboard'
import Dashboardd from './screens/Dashboardd'
import streetView from './screens/streetView'
import Signup from './screens/Signup'
import Forgot from './screens/Forgot'
import SplashScreen from 'react-native-splash-screen';
import StartNavigator from './screens/StartNavigator'
import MainTabNavigator from './screens/MainTabNavigator'
import SideNavi from './screens/SideNavi'
import { YellowBox } from 'react-native';

import _ from 'lodash';
console.disableYellowBox = true;
   
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  componentDidMount(){
  
}
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
    SplashScreen.hide();
  }
  render() {
      
     if (this.state.isAuthenticated){
      return(<BottomTabNavigation/>);

    }
    else
      {return(<StartNavigator/> );

      }
    }
}

const AppStack = createStackNavigator({
  SideNavi:SideNavi,
  BottomTabNavigation:BottomTabNavigation,
  MainTabNavigator:MainTabNavigator,
  StartNavigator:StartNavigator
  
})
const AppContainer = createAppContainer(AppStack);
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
