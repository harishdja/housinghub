import React, { Component } from 'react';
import { TouchableOpacity,Image, Text,View, StyleSheet } from 'react-native';
import{Icon,Badge,withBadge} from 'react-native-elements';
import FAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import streetView from './streetView';

import {DrawerItems,createStackNavigator,createSwitchNavigator,createDrawerNavigator,createAppContainer}from 'react-navigation'

export default class AddButton extends Component {
 
  render() {
    return(
      <View style={style.badgeIconView}>
      <Text style={style.badge}> + </Text>
      <Image source={require('./location.png')} style={{width:30,height:30}} />
</View>
    );
  }
}

const AppStack = createSwitchNavigator({
    AddButton:AddButton,
    streetView:streetView,
  })
  const ApppContainer = createAppContainer(AppStack);
const style = StyleSheet.create({
  badgeIconView:{
    position:'relative',
    padding:5,
    alignItems:'center'
  },
  badge:{
    color:'#fff',
    position:'absolute',
    zIndex:10,
    top:1,
    right:1,
    padding:1,
    height:20,
    width:20,
    backgroundColor:'red',
    borderRadius:30
  },
  bigBubble: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "brown",
    height: 65,  
    width: 65,
    borderRadius: 65/ 2, 
    top: -40,
    position: 'absolute'
  },
});