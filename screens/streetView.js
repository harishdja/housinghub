import MapView,{Marker} from 'react-native-maps';
import React, {Component} from 'react';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import {Platform, Alert,StyleSheet, BackHandler,
    
  DeviceEventEmitter,
StatusBar, Text,ImageBackground,TouchableOpacity,ActivityIndicator, Image,View} from 'react-native';
import {List,ListItem,Header,Card,Button,Icon,SearchBar,PricingCard} from 'react-native-elements'
import '@firebase/auth'
import '@firebase/database'
import firebase from '@firebase/app'
import { YellowBox } from 'react-native';
import Geocoder from 'react-native-geocoder'
import _ from 'lodash';
import call from 'react-native-phone-call'
import getDirections from 'react-native-google-maps-directions'
import SearchHeader from './SearchHeader'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
var cardu=<View style={{position:'absolute',bottom:0,right:0}}><Card ><Text>ads</Text></Card></View> 
type Props = {};
export default class streetView extends Component<Props> {
  static navigationOptions = ({navigation}) => {
    return {
      header:null
    }}
  
    updateSearch = search => {

      this.setState({ search });
       
      
    };
    constructor(props) {
    super(props);

    this.state = {
        cardd:null,
        mapLoaded:false,
        screenValidate:1,
        statusBarHeight:1,
        bottom:1,
        test:0,
        search:'',
        details:[],
        dd:[],
        ddetails:[],
      loclat:this.props.navigation.getParam('latitude',0),
      loclong:this.props.navigation.getParam('longitude',0),
      latitude: 0,
      longitude: 0,
      error: null,
    };
    YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};
 
  }
 
searchplace() {
  const { search } = this.state;
  Geocoder.geocodeAddress(search).then(res => {
   this.setState({
     latitude:res[0].position.lat,
     longitude:res[0].position.lng,
     test:1
   })
})
.catch(err => console.log(err))
this.setState({
  search:''
})
}

componentDidMount(){
  setTimeout(()=>this.setState({statusBarHeight:0}),500);
   
  this.props.navigation.setParams({onSearchText: (searchedText) => this.onSearchText(searchedText)});
  navigator.geolocation.getCurrentPosition(
     (position) => {
  
       this.setState({
         latitude: position.coords.latitude,
         longitude: position.coords.longitude,
         error: null,
       });
     },
     (error) => this.setState({ error: error.message }),
     { enableHighAccuracy: true, timeout: 20000 },
   ); 
   this.makeRemoteRequest();
}
componentWillMount(){
  
   

  

  
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
        .child('users')
        .once("value",snap=>{
         var data=snap.val()
         if(snap.val()){
             
             const initMessages=[];
             Object.keys(data)
             .forEach(message=>initMessages.push(data[message]));
             this.setState({
               ddetails:initMessages,
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
           var apartment = initMessages.filter((r) => {
            if (r.latitude)
                return r.housetype;
            
        });
        var individual = initMessages.filter((r) => {
            if (r.latitude)
                return r.housetype=="Individual";
            
        });
        this.setState({
          
            details:apartment,
            dd:individual,
            loading:false,
            
            refreshing:false,
          })
              
      
          } this.setState({
            mapLoaded:true
          })
         
          
         
})

     };
     onChangeText = (newText) => {
      //your custom logic here
      alert(newText);
    }
     search(){
      const { search } = this.state;
      Geocoder.geocodeAddress(search).then(res => {
       this.setState({
         latitude:res[0].position.lat,
         longitude:res[0].position.lng
       })
    })
    .catch(err => console.log(err))
    this.setState({
      search:''
    })
}
getdir(aa,cc){
  const data = {
    
   destination: {
     latitude: aa,
     longitude:cc
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
onPressMarke(e, index) {
  this.setState({
    bottom: 0,
  cardd:<View style={{position:'absolute',height:300,bottom:0,right:0}}><Card style={{ height:300 }}   ><View style={{flexDirection:'row',alignItems:'center'}}  >{!!e.homepic && <Image source={{uri:e.homepic}}  style={{width:50,height:50}}/>}<View style={{paddingLeft:5}}><Text>{e.room}bhk</Text><Text style={{fontWeight:'bold'}}>₹{e.price}</Text><Text>{e.peopletype}</Text></View></View><View style={{flexDirection:'row'}}><TouchableOpacity   onPress={()=>{this.buttonPressed(e.phone)}}  style={{paddingLeft:5}}><Icon size={18}name='phone-call' type='feather'/></TouchableOpacity><TouchableOpacity onPress={()=>this.getdir(e.latitude,e.longitude)} style={{ paddingLeft:35}}><Icon size={20} name='directions' type='material'/></TouchableOpacity></View></Card ></View> })
  
} 
onPressMarker(e, index) {
  this.setState({
    bottom: 0,
  cardd:<View style={{position:'absolute',height:300, bottom:0,right:0}}><Card style={{ height:300 }} ><View style={{flexDirection:'row',alignItems:'center'}}  >{!!e.homepic && <Image source={{uri:e.homepic}}  style={{width:60,height:75}}/>}<View style={{paddingLeft:5}}><Text>{e.room}bhk</Text><Text>{e.housetype}</Text><Text style={{fontWeight:'bold'}}>₹{e.price}</Text><Text>{e.peopletype}</Text></View></View><View style={{flexDirection:'row'}}><TouchableOpacity   onPress={()=>{this.buttonPressed(e.phone)}}  style={{paddingLeft:10}}><Icon size={18}name='phone-call' type='feather'/></TouchableOpacity><TouchableOpacity onPress={()=>this.getdir(e.latitude,e.longitude)} style={{ paddingLeft:40}}><Icon size={20} name='directions' type='material'/></TouchableOpacity></View></Card ></View> })
  
}

  render() {
     const { search } = this.state;
    const mmarker = require('./marker.png');
const selectedMarker = require('./housess.png');
    let rows=[]
    const { cardd  } = this.state
    var mark
    if(!!this.state.latitude && this.state.test!=0)
    {
      mark=<MapView.Marker coordinate={{latitude: this.state.latitude,
        longitude: this.state.longitude}}></MapView.Marker>
    }
    if(this.state.details){
      rows=this.state.details.map((marker,i) => (
   
        <MapView.Marker    key={`marker-${i}`}
        onPress={(e) => this.onPressMarker(marker, i)}
            coordinate={{latitude:marker.latitude,longitude:marker.longitude}} title={marker.username+"'s Home"}   >
            <ImageBackground style={{width:33, height:33}} source={mmarker} onLoad={() => this.forceUpdate()}>
       <Text style={{width:0, height:0}}>{Math.random()}</Text></ImageBackground></MapView.Marker>
         
       
            ))
       ro=this.state.dd.map((marker,i) => (
   
        <MapView.Marker    key={`marker-${i}`}
        onPress={(e) => this.onPressMarke(marker, i)}
            coordinate={{latitude:marker.latitude,longitude:marker.longitude}} title={marker.username+"'s Home"}>
            <ImageBackground style={{width:25, height:25}} source={selectedMarker} onLoad={() => this.forceUpdate()}>
            <Text style={{width:0, height:0}}>{Math.random()}</Text></ImageBackground></MapView.Marker>
       
            ))
      
    }
     
    if(!this.state.mapLoaded){
      return(
        <View style={{flex:1,backgroundColor:'#e9dcc9',alignItems:'center',justifyContent:'center'}}>
        
        <Text>StreetView</Text>
        </View>
      );
    }
   
    return (
       <View style={[styles.container,{marginTop:this.state.statusBarHeight}]}>
      
       
<MapView style={ [styles.map, { bottom:this.state.bottom}]}
showsUserLocation
toolbarEnabled={false}
showsMyLocationButton={true}
region={{
  latitude: this.state.latitude,
  longitude: this.state.longitude,
  latitudeDelta: 0.009,
  longitudeDelta:0.009,
}}
initialRegion={{
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: 0.009,
    longitudeDelta:0.009,
    }}
>
{mark}
{rows}
   
</MapView>

   <View elevation={5} style={{alignItems:'center',padding:0,flexDirection:'row',
          backgroundColor:'#e9dcc9',
          shadowColor: "#000000",
          shadowOpacity: 0.8,
          shadowRadius: 2,
          shadowOffset: {
            height:2 ,
            width: 2
          }}} ><SearchBar inputStyle={{backgroundColor: 'white'}}
    containerStyle={{width:350,backgroundColor:'#e9dcc9',borderBottomWidth:0,borderTopWidth:0}}
    placeholder="Type Here..."
   onChangeText={this.updateSearch}
   value={search}
 /><TouchableOpacity onPress={()=>this.searchplace()} style={{height:40}}><Icon name='search' iconStyle={{padding:5}} /></TouchableOpacity></View>
    {cardd}</View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  map:{
    position:'absolute',
    left:0,
    top:55,
    right:0,
    bottom:0
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});