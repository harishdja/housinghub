import React, { Component } from 'react'
import { Text,ScrollView,StatusBar,TextInput,Image,ActivityIndicator,Alert, View,TouchableOpacity,StyleSheet,FlatList} from 'react-native'
import styles from "./styles"
import '@firebase/auth'
import '@firebase/database'
import firebase from '@firebase/app'
import {List,ListItem,Card,Button,Icon,SearchBar,PricingCard} from 'react-native-elements'
import call from 'react-native-phone-call'
import ActionButton from 'react-native-action-button';
import { YellowBox } from 'react-native';
import getDirections from 'react-native-google-maps-directions'
import Geocoder from 'react-native-geocoder';
import _ from 'lodash';
var a=0; 

export default class HomeScreen extends Component {
    static navigationOptions={
        header:null
    }
     constructor(props){
        super(props);
        
        this.state={
       /* sample:this.props.navigation.state.params.a,*/
        message:'',
        details:[],
        locaddress:'',
        count:0,
        showSearchBar:false,
        search:'',
        room:this.props.navigation.getParam('room',0),
        houseType:this.props.navigation.getParam('houseType','abc'),
        peopleType:this.props.navigation.getParam('peopleType','abc'),
        avatarSource:'',
        loading: true,
        data: [],
        page: 1,
        clearVisible:false,
        seed: 1,
        error: null,
  refreshing: false
            };
            this.arrayholder = [];
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
  storedet(a,b){
    var NY = {
      lat:a, 
      lng: b
    };
    
 Geocoder.geocodePosition(NY).then(res => {
      const answer_array = res[0].formattedAddress.split(',');
  const n=answer_array.length;
  const another_array=answer_array[n-4];
  const city=answer_array[n-3];
  let cb=another_array+","+city
  this.setState({
    locaddress:another_array
  })
    

        // res is an Array of geocoding object (see below)
    })
    .catch(err => alert(err))
  }
   makeRemoteRequest=()=> {
    const minpricee=parseInt(this.props.navigation.getParam('minprice',0))
    const maxpricee=this.props.navigation.getParam('maxprice',20000)
    const roomm=this.props.navigation.getParam('room',0)
    const htype=this.props.navigation.getParam('houseType','abc')
    const ptype=this.props.navigation.getParam('peopleType','abc')
     
     
        firebase
        .database()
        .ref()
        .child('users/')
        .once("value",snap=>{
         var data=snap.val()
         if(snap.val()){
             
             const initMessages=[];
             Object.keys(data)
             .forEach(message=>initMessages.push(data[message]));
             this.arrayholder = initMessages; 
             this.setState({
               details:initMessages,
               loading: false,
               refreshing: false      
           })
           var newArray = initMessages.filter(function (el) {
             const db=parseInt(el.price)
            if(htype!='abc'){
              
              return el.room==roomm && el.peopletype == ptype &&el.housetype==htype && el.price>=minpricee && el.price<=maxpricee;
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
})
     };
     renderHeader = () => {
      const{showSearchBar,search}=this.state
      return( <View></View> )
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
searchFilterFunction = text => {
  
  const newData = this.arrayholder.filter(item => {
    var p=item.room+'bhk'
    const itemData = `${p} ${item.housetype} ${item.locaddress}`;

     const textData = text;
      
     return itemData.indexOf(textData) > -1;    
  });    

  this.setState({ search:text,details: newData }); 
  if(text!='')
  {
  this.setState({clearVisible:true})
  }
  else{
    this.setState({clearVisible:false})
  } 
};
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
 
onClk() {
  const{showSearchBar,count}=this.state
  
  a++;
  if(a>2){
  this.setState({
    showSearchBar: !showSearchBar,
  });
}
}
findLoc(la,ln){
  var NY = {
    lat:la, 
    lng: ln
  };
  Geocoder.geocodePosition(NY).then(res => {
    const answer_array = res[0].formattedAddress.split(',');
const n=answer_array.length;
const another_array=answer_array[n-4];

 
    alert(another_array+","+res[0].locality);

      // res is an Array of geocoding object (see below)
  })
  .catch(err => alert(err))  
}

    render() {
        const{heading,input,btn,container,headingg,btnn,cardb}=styles
      const{search}=this.state
    return (
        


        <View key="abc" style={{ flex:1,
                    backgroundColor:'#e9dcc9',
          }}>
     <StatusBar
    backgroundColor='#e9dcc9'
    barStyle="light-content"
  />

   <View elevation={5} style={{alignItems:'center',padding:0,flexDirection:'row',
          backgroundColor:'#e9dcc9',
          shadowColor: "#000000",
          shadowOpacity: 0.8,
          shadowRadius: 2,
          shadowOffset: {
            height:2 ,
            width: 2
          }}} ><SearchBar   placeholder="Type Here..." clearIcon={this.state.clearVisible}
          onChangeText={text => this.searchFilterFunction(text)} inputStyle={{backgroundColor: 'white'}}
          value={search} containerStyle={{width:330,backgroundColor:'#e9dcc9',borderBottomWidth:0,borderTopWidth:0}}></SearchBar><TouchableOpacity onPress={()=>this.props.navigation.navigate("Filter")} style={{paddingLeft:10}}><Image style={{width:40,height:30}} source={require('./filter.png')}></Image></TouchableOpacity></View>
         <FlatList
          data={this.state.details}
     renderItem={({item}) => (
        <Card key={this.user} >
        <View style={{flexDirection:'row',flex:1}} key={item.username} >
          
      {!!item.homepic && <Image source={{uri:item.homepic}}  style={{width:125,height:175}}/>}
      <View>
        <View  style={{flexDirection:"row",alignItems:'center',justifyContent:'center'}}><Text style={{paddingLeft:4,fontWeight:'bold',justifyContent:'center'}}>{item.room}bhk | {item.housetype}</Text>{item.housetype=="Apartment"?<Image source={require('./buildings.png')} style={{width:25,height:20}}/>:<Image source={require('./house.png')} style={{width:25,height:20}}/>}</View>
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