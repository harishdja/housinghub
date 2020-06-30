import React, { Component } from 'react'
import { Text,TextInput,Image,ActivityIndicator,Alert, View,TouchableOpacity,StyleSheet,FlatList} from 'react-native'
import styles from "./styles"
import '@firebase/auth'
import '@firebase/database'
import firebase from '@firebase/app'
import {List,ListItem,Card,Button,Icon,SearchBar,PricingCard} from 'react-native-elements'
import call from 'react-native-phone-call'
import ActionButton from 'react-native-action-button';
import { YellowBox } from 'react-native';

import _ from 'lodash';
var gh=[]
let stor=[]
export default class myFav extends Component {
    static navigationOptions={
        header:null
    }
     constructor(props){
        super(props);
        
        this.state={
       /* sample:this.props.navigation.state.params.a,*/
        message:'',
        details:[],
        dddetails:[],
        number:0,
        room:this.props.navigation.getParam('room',0),
        houseType:this.props.navigation.getParam('houseType','abc'),
        peopleType:this.props.navigation.getParam('peopleType','abc'),
        avatarSource:'',
        loading: true,
        data: [],
        page: 1,
        seed: 1,
        error: null,
  refreshing: false
            };
            this.user = firebase.auth().currentUser;
            YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};
 
        
     }
     componentDidMount(){
        const initMessages=[];
        var us = firebase.auth().currentUser;
        firebase
        .database()
        .ref()
        .child(us.uid+'/')
        .once("value",snap=>{
         var data=snap.val()
         if(snap.val()){
             
             
             Object.keys(data)
             .forEach(message=>initMessages.push(data[message]));
             this.setState({
               dddetails:initMessages,
               number:1   
           })
 
          
          }
           
    })
 
         
         
          
         
     }
   
   makeRemoteRequest=()=> {
   let g=''
    this.state.dddetails.map((it, i) => { firebase
      .database()
      .ref()
      .child('users/')
      .orderByChild('homepic')
      .equalTo(it.fav)
      .once("value",snap=>{
       var data=snap.val()
       if(snap.val()){
           
           const initMessages=[];
          Object.keys(data)
          .forEach(message=>initMessages.push(data[message]));
          this.setState((prevState) => {
            return {details: [initMessages].concat(prevState.details),
              loading:false,
              refreshing:false };
            })
          
        
        }   
      })
      initMessages=[]
      })
     
    this.abc()
     
     };
     abc(){
     
  
     }
     renderHeader = () => {
        return (<View></View>);
    };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
};
buttonPressed(text){
  const args = {
    number: text, // String value with the number to call
    prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
  }
   
  call(args).catch(console.error)
}
loc(la,long){
  
  this.props.navigation.navigate('locationTracking',{latitude:la,longitude:long})
}
renderFooter = () => {
    if (this.state.loading){

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
    }
    return null;
};

    render() {
        const{heading,input,btn,container,headingg,btnn,cardb}=styles
        const{number}=this.state
    return (
        


        <View key="abc" style={{flex:1,backgroundColor:'#e9dcc9'}}>
       {this.state.number!=0 && this.makeRemoteRequest()}
       <View elevation={5} style={{alignItems:'center',height:55,flexDirection:'row',
  backgroundColor:'brown',
  shadowColor: "#000000",
  shadowOpacity: 0.8,
  shadowRadius: 2,
  shadowOffset: {
    height:2 ,
    width: 2
  }}} ><Text style={{paddingLeft:100,fontSize:20,color:'black',color:"white",fontWeight:'bold'}}>   Housing Hub    </Text></View> 
<Text style={{paddingLeft:85,fontSize:20,color:'black',color:"black",fontWeight:'bold'}}>My Favourites</Text>
<FlatList
          data={this.state.details}
     renderItem={({item}) => (
        <Card key={this.user} >
        <View style={{flexDirection:'row',alignItems:'center'}} key={item.username} >
          
      {!!item.homepic && <Image source={{uri:item.homepic}}  style={{width:125,height:150}}/>}
      <View>
        <View  style={{flexDirection:"row",alignItems:'center',justifyContent:'center'}}><Text style={{fontWeight:'bold',textAlign:'center'}}>{item.room} bhk</Text></View>
        <View style={{flexDirection:"row",alignItems:'center',justifyContent:'center'}}><Text  style={{fontWeight:'bold',fontSize:25}}> ₹ {item.price}</Text></View> 
           <View style={{flexDirection:"row",alignItems:'center',justifyContent:'center'}}>{item.housetype=="Apartment"?<Image source={require('./buildings.png')} style={{width:25,height:25}}/>:<Image source={require('./house.png')} style={{width:25,height:25}}/>}<Text style={{paddingLeft:4,fontWeight:'bold',justifyContent:'center'}}>{item.housetype}</Text></View>
          
           <View style={{flexDirection:"row",alignItems:'center',justifyContent:'center'}}><Text style={{fontWeight:'bold'}}>{item.peopletype}</Text>{item.peopletype=="Family"?<Image source={require('./family.png')} style={{width:25,height:25}}/>:<Image source={require('./boy.png')} style={{width:25,height:25}}/>}</View>
          
       
        <Text></Text> 
        <View style={{flexDirection:"row"}}><TouchableOpacity  key={item.phone} onPress={()=>{this.buttonPressed(item.phone)}}    >
        <View style={{alignItems:'center',flexDirection:"row",paddingLeft:10}}><Image source={require('./phone.png')} style={{width:30,height:30}}/><Text style={{fontSize:10,color:'black',paddingLeft:4,fontWeight: 'bold'}}>Call</Text></View>

    </TouchableOpacity>
    <TouchableOpacity key={item} onPress={()=>{this.loc(item.latitude,item.longitude)}}  >
    <View style={{alignItems:'center',flexDirection:"row",paddingLeft:10}}><Image source={require('./location.png')} style={{width:30,height:30}}/><Text style={{fontSize:10,color:'black',paddingLeft:2,fontWeight: 'bold'}}> Location</Text></View>
    </TouchableOpacity></View><View><Text style={{paddingLeft:4,fontWeight:'bold'}}>Owned by {item.username}</Text></View></View>
    
          </View> 
     </Card>
        
      )}

      keyExtractor={item => item.username}
     ListHeaderComponent={this.renderHeader}
     onRefresh={this.handleRefresh}
    refreshing={this.state.refreshing}
    ListFooterComponent={this.renderFooter}
      />
     
 
       </View>
  

    );
  }
}


const styl = StyleSheet.create({
  shadow: {
      shadowColor: 'black',
      shadowOpacity: 0.5,
      shadowRadius: 5,
      // iOS
      shadowOffset: {
          width: 0,            // These can't both be 0
          height: 1,           // i.e. the shadow has to be offset in some way
      },
      // Android
      shadowOffset: {
          width: 0,            // Same rules apply from above
          height: 1,           // Can't both be 0
      },
    }
});