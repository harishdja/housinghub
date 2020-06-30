import React, { Component } from 'react'
import { Text,TextInput,Image,StatusBar,ActivityIndicator,Alert, View,TouchableOpacity,StyleSheet,FlatList} from 'react-native'
import styles from "./styles"
import '@firebase/auth'
import '@firebase/database'
import getDirections from 'react-native-google-maps-directions'
import { MenuContext, Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';

import firebase from '@firebase/app'
import {List,ListItem,Card,Button,Icon,SearchBar,PricingCard} from 'react-native-elements'
import call from 'react-native-phone-call'
import ActionButton from 'react-native-action-button';
import { YellowBox } from 'react-native';

import _ from 'lodash';
 

export default class myAds extends Component {
    static navigationOptions={
        header:null
    }
     constructor(props){
        super(props);
        
        this.state={
       /* sample:this.props.navigation.state.params.a,*/
        message:'',
        details:[],
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
       
        this.makeRemoteRequest();
         
         
          
         
     }
     del(ph){
  var ke='as'
      firebase
      .database()
      .ref()
      .child('users/')
      .orderByChild('homepic')
      .equalTo(ph)
      .once("value",snap=>{
       var data=snap.val()
       if(snap.val()){
           
           const initMessages=[];
           firebase
           .database()
           .ref('users/'+Object.keys(data)).remove()
       
           
           
}
})
 
   
 
}
updateHome(item){
  var ke='as'
      firebase
      .database()
      .ref()
      .child('users/')
      .orderByChild('homepic')
      .equalTo(item.homepic)
      .once("value",snap=>{
       var data=snap.val()
       if(snap.val()){
        this.props.navigation.navigate('updateAd',{objkey:Object.keys(data),room:item.room,houseType:item.housetype,peopleType:item.peopletype,locaddress:item.locaddress,price:item.price,phone:item.phone,username:item.username,address:item.address,homepic:item.homepic,latitude:item.latitude,longitude:item.longitude}) 
        
       
           
           
}
})
 
   
 
}
   makeRemoteRequest=()=> {
    const pricee=this.props.navigation.getParam('price',0)
    const roomm=this.props.navigation.getParam('room',0)
    const htype=this.props.navigation.getParam('houseType','abc')
    const ptype=this.props.navigation.getParam('peopleType','abc')
    var us = firebase.auth().currentUser;
     
        firebase
        .database()
        .ref()
        .child('users/')
        .orderByChild('email')
        .equalTo(us.email)
        .on("value",snap=>{
         var data=snap.val()
         if(snap.val()){
             
             const initMessages=[];
             Object.keys(data)
             .forEach(message=>initMessages.push(data[message]));
             this.setState({
               details:initMessages,
               loading: false,
               refreshing: false      
           })
           var newArray = initMessages.filter(function (el) {
            if(htype!='abc'){
              
              return el.room==roomm && el.peopletype == ptype &&el.housetype==htype;
            }
            else{
            return el.room ;}
          });
         
         this.setState({
           details:newArray,
           loading:false,
           refreshing:false
         })
          }
          else{
            this.setState({
              loading:false,
              refreshing:false
            })
          }   
})
     };
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
getdir(l,ll){
 
  const data = {
    
   destination: {
     latitude: l,
     longitude: ll
   },
   params: [
     {
       key: "travelmode",
       value: "driving"        // may be "walking", "bicycling" or "transit" as well
     },
     {
       key: "dir_action",
       value: "navigate"       // this instantly initializes navigation using the given travel mode 
     }
   ]
 }

 getDirections(data)
}
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
        if(!!this.state.loading ){
          return(
            <View key="abc" style={{flex:1,backgroundColor:'#e9dcc9'}}>
            <StatusBar
         backgroundColor='#6B2404'
         barStyle="dark-content"
           
       /> 
            <View elevation={5} style={{alignItems:'center',height:55,flexDirection:'row',
       backgroundColor:'#6B2404',justifyContent:"center",
       shadowColor: "#000000",
       shadowOpacity: 0.8,
       shadowRadius: 2,
       shadowOffset: {
         height:2 ,
         width: 2
       }}} ><Text style={{fontSize:20,color:'black',color:"white",fontWeight:'bold'}}>   Housing Hub    </Text></View><Text></Text><ActivityIndicator size="large" color="#6B2404"></ActivityIndicator></View>
          )
        }
      
    return (
        
     

        <View key="abc" style={{flex:1,backgroundColor:'#e9dcc9'}}>
       <StatusBar
    backgroundColor='#6B2404'
    barStyle="dark-content"
      
  /><MenuProvider  >
       <View elevation={5} style={{alignItems:'center',height:55,flexDirection:'row',
  backgroundColor:'#6B2404',justifyContent:"center",
  shadowColor: "#000000",
  shadowOpacity: 0.8,
  shadowRadius: 2,
  shadowOffset: {
    height:2 ,
    width: 2
  }}} ><Text style={{fontSize:20,color:'black',color:"white",fontWeight:'bold'}}>   Housing Hub    </Text></View> 
<Text style={{textAlign:"center",fontSize:20,color:'black',color:"black",fontWeight:'bold'}}>My Advertisement</Text>
   {!!this.state.details ?  
     <FlatList
          data={this.state.details}
     renderItem={({item}) => (
        <Card key={this.user} >
        <View style={{flexDirection:'row',flex:1}} key={item.username} >
        
      {!!item.homepic && <Image source={{uri:item.homepic}}  style={{width:125,height:175}}/>}
      <View>
        <View  style={{flexDirection:"row",alignItems:'center',justifyContent:'center'}}><Text style={{paddingLeft:4,fontWeight:'bold',justifyContent:'center'}}>{item.room}bhk | {item.housetype}</Text>{item.housetype=="Apartment"?<Image source={require('./buildings.png')} style={{width:25,height:20}}/>:<Image source={require('./house.png')} style={{width:25,height:20}}/>}<View style={{paddingLeft:30}}>
          <Menu >
            <MenuTrigger><Icon name="edit" size={20} type="material"></Icon></MenuTrigger>
            <MenuOptions>
            <MenuOption onSelect={() => this.updateHome(item)}>
                <Text  >Edit</Text>
              </MenuOption>
              <MenuOption onSelect={() => this.del(item.homepic)}>
                <Text  >Delete</Text>
              </MenuOption>
              
              
            </MenuOptions>
          </Menu>
        </View></View>
        
        <View style={{flexDirection:"row",alignItems:'center',justifyContent:'center'}}><Text  style={{fontWeight:'bold',fontSize:25}}> ₹ {item.price}</Text></View> 
           <View style={{flexDirection:"row",alignItems:'center',justifyContent:'center'}}><Text style={{fontWeight:'bold',textAlign:'center'}}> {item.locaddress}</Text></View>
           <Text></Text>   
           <View style={{flexDirection:"row",alignItems:'center',justifyContent:'center'}}>{item.peopletype=="Family"?<Image source={require('./family.png')} style={{width:25,height:25}}/>:<Image source={require('./boy.png')} style={{width:25,height:25}}/>}<Text style={{fontWeight:'bold'}}>{item.peopletype}</Text></View>
          
     <View style={{flexDirection:"row",padding:8}}>
        <TouchableOpacity  key={item.phone} style={{borderRadius:4,borderColor:'#6B2404',borderBottomWidth:1,borderTopWidth:1,borderLeftWidth:1,borderRightWidth:1}}  onPress={()=>{this.buttonPressed(item.phone)}}    >
        <View style={{alignItems:'center',flexDirection:"row",padding:6}}><Icon name= 'call' type= 'material' color='#6B2404'></Icon><Text style={{fontSize:14,color:'#6B2404',paddingLeft:4,fontWeight: 'bold'}}>Contact</Text></View></TouchableOpacity><Text>   </Text><TouchableOpacity style={{borderRadius:4,backgroundColor:'#6B2404'}} key={item}  onPress={()=>{this.getdir(item.latitude,item.longitude)}}  >
    <View style={{alignItems:'center',flexDirection:"row",padding:6}}><Icon name= 'directions' type= 'material' color='white'></Icon><Text style={{fontSize:14,color:'white',paddingLeft:4,fontWeight: 'bold'}}> Direction</Text></View>
    </TouchableOpacity></View></View>  
  



        
        
          </View> 
     </Card>
        
      )}

      keyExtractor={item => item.username}
     ListHeaderComponent={this.renderHeader}
     onRefresh={this.handleRefresh}
    refreshing={this.state.refreshing}
    ListFooterComponent={this.renderFooter}
     />:<Text>No Results</Text>}</MenuProvider  >
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