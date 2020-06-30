import React, {Component} from 'react';
import MainTabNavigator from './MainTabNavigator'
import {
Platform,
Image,
View,
TouchableHighlight,
TouchableOpacity,
Text,Dimensions,
AsyncStorage,
BackHandler,
StyleSheet,
} from 'react-native';
import { Icon,Button ,Badge,withBadge} from 'react-native-elements'
import {DrawerItems,createStackNavigator,createBottomTabNavigator,createDrawerNavigator,createAppContainer}from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Firebase from './Firebase'
import '@firebase/auth'
import firebase from '@firebase/app'
import Filter from './Filter'
import updateAd from './updateAd'
import HomeScreen from './HomeScreen'
import streetView from './streetView'
import swipeView from './swipeView'
import accountSettings from './accountSettings'
import locationTracking from './locationTracking'
import myAds from './myAds'
import myFav from './myFav'
import AddButton from './AddButton'
import Dashboard from './Dashboard'
import Dashboardd from './Dashboardd'
import changePassword from './changePassword'
import SearchHeader from './SearchHeader'
import { YellowBox } from 'react-native';
import SideNavi from './SideNavi';
import _ from 'lodash';
import myAdNavigator from './myAdNavigator';
var {height, width} = Dimensions.get('window');
 
export default class BottomTabNavigation extends Component<Props> {
constructor(props){
super(props);
this.on = this.on.bind(this)
}

on(){
  
}
render() {
return(<ApppContainer/>);

}
} 
const AppStack = createBottomTabNavigator({
 
  Homescreen: {screen: MainTabNavigator},
  swipeView:swipeView,
  accountSettings:accountSettings,
  HomeScreen: {screen: MainTabNavigator},
  myAds:{screen:myAdNavigator},
  myFav:myFav,
  Filter:Filter,
  streetView:{screen:streetView},
  changePassword:changePassword,
  Dashboardd:{screen:Dashboardd},
  Dashboard:Dashboard,
  homee:HomeScreen,
  locationTracking:{screen:locationTracking},

 },
 {
  tabBarComponent:({tintColor,navigation}) => (
   <View  elevation={10} style={{flex: 0.1,backgroundColor:'#e9dcc9',
   shadowColor: "#000000",
   shadowOpacity: 0.8,
   shadowRadius: 2,
   shadowOffset: {
     height:5 ,
     width: 5
   }}}>
     <View style={{flexDirection:'row',justifyContent:'space-evenly', alignItems: 'center'}}>
       
       <TouchableOpacity style={{  justifyContent:'center',height:50,width:50}}onPress={() => navigation.navigate('Homescreen')}>
       <Icon
name="search"
 
color={tintColor} />
       </TouchableOpacity>
     
       <TouchableOpacity style={{ justifyContent:'center',height:50,width:50}} onPress={() => navigation.navigate('Dashboardd')}>
      <Icon
name="home-outline"
type="material-community"
 size={30}
color="black" /><View style={style.badge}><Text style={{color:"white"}}>+</Text></View>
       </TouchableOpacity>
       <View style={{paddingRight:65}}>
        <TouchableOpacity
          style={style.bigBubble}          
          hitSlop={{
            top: 20,
            bottom: 20,
            left: 20,
            right: 20,
          }}  onPress={() => navigation.navigate('streetView')}
         >
          <Icon
            name="map-marker"
            type="font-awesome"
            size={35}
            color="#FFF"
            
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{ justifyContent:'center',height:50,width:50}} onPress={() =>navigation.navigate('myAds')}>
         <Icon name="newspaper-o"  type="font-awesome"/>
        
  
       </TouchableOpacity>
       <TouchableOpacity style={{justifyContent:'center',height:50,width:50}} onPress={() => navigation.navigate('accountSettings')}>
       <Icon
name="user-o"
type="font-awesome"
 
color="black" /> 
       </TouchableOpacity>
     </View>
 </View>
 )}
 ); 
const ApppContainer = createAppContainer(AppStack);

const style = StyleSheet.create({
  bigBubble: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#6B2404",
    height: 75,  
    width: 75,
    borderRadius: 75/ 2, 
    top:-50,
    position: 'absolute'
  },
  badge:{
    justifyContent: 'center',
    alignItems: 'center',
    color:'#fff',
    position:'absolute',
    bottom:3,
    right:3,
    height:20,
    width:20,
    backgroundColor:'black',
    borderRadius:30
  }
  
});