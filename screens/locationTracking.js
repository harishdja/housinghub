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
import getDirections from 'react-native-google-maps-directions'
import {Platform, Alert,StyleSheet, BackHandler,
  DeviceEventEmitter,
StatusBar, Text,TouchableOpacity, View} from 'react-native';
import {List,ListItem,Card,Button,Icon,SearchBar,PricingCard} from 'react-native-elements'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class locationTracking extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      mapLoaded:false,
      loclat:this.props.navigation.getParam('latitude',0),
      loclong:this.props.navigation.getParam('longitude',0),
      latitude: 0,
      longitude: 0,
      error: null,
    };
  }
  getdir(){
    const data = {
      
     destination: {
       latitude: this.state.loclat,
       longitude: this.state.loclong
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

  componentWillMount() {
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
    this.setState({
      mapLoaded:true
    });
  }

  render() {
    if(!this.state.mapLoaded){
      return(
        <View style={{flex:1,backgroundColor:'#e9dcc9',alignItems:'center',justifyContent:'center'}}>
        <SkypeIndicator size={30} />
        <Text>Getting things ready for you......</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
   
      <MapView style={styles.map}
     
    region={{
      latitude: this.state.latitude ,
      longitude: this.state.longitude,
      latitudeDelta: 0.09,
      longitudeDelta:0.09,
      }}
       
              showsUserLocation={true}
              showsMyLocationButton 
              showsCompass={true}
              followsUserLocation={true}
              loadingEnabled={true}
              toolbarEnabled={true}
              zoomEnabled={true}
              rotateEnabled={true}
    >
    <MapView.Marker title="my home" image={require('./marker.png')}  description="asdfsdf" coordinate={{latitude:this.state.latitude,longitude:this.state.longitude}}/>
     
    <MapView.Marker title="destination"   description="sample" coordinate={{latitude:this.state.loclat,longitude:this.state.loclong}}/>
    </MapView>
    <Button title="Get Direction" titleStyle={{textColor:'black'}} onPress={()=>this.getdir()}buttonStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)',width:80,height:55}}> </Button></View>
     

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  map:{
    flex:1,
    position:'absolute',
    left:0,
    top:0,
    right:0,
    bottom:0
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});