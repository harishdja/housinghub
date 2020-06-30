import ImagePicker from 'react-native-image-picker';
import React, {Component} from 'react';
import {Platform, StyleSheet,Image,Alert,Text,TouchableOpacity,TextInput,View} from 'react-native';
import Firebase from './Firebase'
import firebase from '@firebase/app'
import styles from "./styles"
import '@firebase/storage'
import '@firebase/auth'
import Geocoder from 'react-native-geocoder';
import RNFetchBlob from 'rn-fetch-blob';
import { Header,Rating,Button,ButtonGroup,Badge} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;


 
const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
export default class updateAd extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
       title: 'Update Details',
       headerTintColor: 'white',
       headerStyle: {
          textAlign:'center',
          backgroundColor: '#6B2404'
       }
    }
 }
  constructor(props){
    super(props)
    this.state={
      name:this.props.navigation.state.params.username,
      latitude:0,
      longitude:0,
      area:'',
      city:'',
      locaddress:this.props.navigation.state.params.locaddress,
      excep:0,
      objkey:this.props.navigation.state.params.objkey,
      loading:false,
      loadingText:'Upload Image',
      room:this.props.navigation.state.params.room,
      roomm:this.props.navigation.state.params.room,
      address:this.props.navigation.state.params.address,
      price:this.props.navigation.state.params.price+'',
      phone:this.props.navigation.state.params.phone,
      imgname:'',
      avatarSource:this.props.navigation.getParam('homepic',''),
      houseTypeIndex :0,
      peopleTypeIndex :0,
      houseType:this.props.navigation.getParam('houseType'),
      peopleType:this.props.navigation.getParam('peopleType'),
      
    };
    if(!firebase.apps.length){firebase.initializeApp(Firebase.FirebaseConfig);}
    this.user = firebase.auth().currentUser;
    this.GetV = this.GetV.bind(this)
    this.updateIndex = this.updateIndex.bind(this)
    this.updatePeople = this.updatePeople.bind(this)
  }
 
  ratingCompleted(rating) {
    this.GetV(rating)
    
  
  }
  updatePeople(peopleTypeIndex) {
   
    this.setState({peopleTypeIndex})
    if(peopleTypeIndex==0){
      this.setState({peopleType:"Bachelor"})
    }
    else{
      this.setState({peopleType:"Family"})
    }
  }
  componentDidMount(){
      if(this.state.houseType=="Apartment")
      {
          this.setState({
              houseTypeIndex:0
          })
      }
      if(this.state.houseType=="Individual"){
          this.setState({
              houseTypeIndex:1
          })
      }
      if(this.state.peopleType=="Bachelor")
      {
          this.setState({
              peopleTypeIndex:0
          })
      }
      else{
          this.setState({
              peopleTypeIndex:1
          })
      }
      var splitt=this.state.locaddress.split(',')
      this.setState({
          area:splitt[0],
          city:splitt[1]
      })
  }
  updateIndex (houseTypeIndex) {
   
    this.setState({houseTypeIndex})
    if(houseTypeIndex==0){
      this.setState({houseType:"Apartment"})
    }
    else{
      this.setState({houseType:"Individual"})
    }
  }

  
  postad(){
    const{objkey}=this.state
    var em=firebase.auth().currentUser.email
    var locad=this.state.area+','+this.state.city
    const conv=parseInt(this.state.price)

    if(this.state.username=="" ||this.state.phone=="" ||this.state.address=="" ||this.state.price==0 ||this.state.area=="" ||this.state.city=="" )
    {
      alert('Fill Every Field')
    }
    else{
        firebase
        .database()
        .ref()
        .child('users/')
        .orderByChild('homepic')
        .equalTo(this.state.avatarSource)
        .once("value",snap=>{
         var data=snap.val()
         if(snap.val()){
            firebase
            .database()
            .ref('users/'+this.state.objkey).update(
               {
             username: this.state.name,
         phone:this.state.phone,
         room:this.state.room,
         address:this.state.address,
         price:conv,
         email:em,
         area:'',
         city:'',
         locaddress:locad,
         latitude:this.state.latitude,
         longitude:this.state.longitude,
         housetype:this.state.houseType,
         peopletype:this.state.peopleType,
         homepic:this.state.avatarSource}
            ).then(()=>{
              alert("sucess")
            })
         
             
             
  }
  })
    }
   

  }
  uploadImage(uri, mime = 'image/jpeg', name) {
    const {imgname}=this.state
    return new Promise((resolve, reject) => {
      let imgUri = uri; let uploadBlob = null;
      const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
      const { currentUser } = firebase.auth();
      const imageRef = firebase.storage().ref(`images/`+this.state.imgname)
  
      fs.readFile(uploadUri, 'base64')
        .then(data => {
          return Blob.build(data, { type: `${mime};BASE64` });
        })
        .then(blob => {
          uploadBlob = blob;
          return imageRef.put(blob, { contentType: mime, name: name });
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL();
        })
        .then(url => {
          this.setState({loading:false,loadingText:'Upload Image'})
          resolve(url);
        })
        .catch(error => {
          reject(error)
      })
    })
  }
  getloc(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          excep:1,
          error: null,
        });
       
       
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000 },
    );
    
  }
  getAddress(){
    if(this.state.latitude!=0){
    const{latitude,longitude}=this.state
    var NY = {
      lat:this.state.latitude, 
      lng: this.state.longitude
    };
    Geocoder.geocodePosition(NY).then(res => {
      const answer_array = res[0].formattedAddress.split(',');
  const n=answer_array.length;
  const another_array=answer_array[n-4];
  
   this.setState({
     excep:0
   })
      alert("Latitude:"+this.state.latitude+"\nLongitude : "+this.state.longitude);
  
        // res is an Array of geocoding object (see below)
    })
    .catch(err => alert(err)) }
  }
  GettV(rating){
    this.setState({room:rating})
   }
  GetV=async()=>{
     ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }  else {
        const answer_array = response.uri.split('%2F');
        const n=answer_array.length;
        const another_array=answer_array[n-1].split('.');

        this.setState({loading:true,loadingText:'Uploading...',imgname:response.uri})
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.uploadImage(response.uri)
      .then(url => { this.setState({avatarSource:url});alert(this.state.avatarSource); })
      .catch(error => console.log(error)) 

      }
    }) 
  }

  GetRating(rating){
    this.setState({room:rating})
   }
   
ratingCompleted(rating) {
  this.GetV(rating)
  

}
  render() {
    const{heading,input,btn,container,headingg,cardb}=styles
    const buttons = ['Apartment','Individual']
    const bu = ['Bachelor' , 'Family']


    const WATER_IMAGE = require('./roomm.png')
    const { houseTypeIndex ,peopleTypeIndex  } = this.state
    return (
        <View style={container}>
<ScrollView>
    
    <Text style={headingg,{fontSize:30, fontWeight:'bold',textAlign:'center'}}>Ad Details </Text>
    <Text style={{fontSize:15, fontWeight:'bold', marginLeft:20}}>Name :</Text>
    <TextInput value={this.state.name} autoCapitalize="none" underlineColorAndroid="#a76d23" style={input} placeholder="Enter your Name" onChangeText={text=>this.setState({name:text})}/>
    <Text style={{fontSize:15, fontWeight:'bold', marginLeft:20}}>Phone Number :</Text>
    <TextInput value={this.state.phone} underlineColorAndroid="#a76d23" keyboardType="numeric"   placeholder="Enter your Number" style={input} onChangeText={text=>this.setState({number:text})} />
    <Text style={{fontSize:15, fontWeight:'bold', marginLeft:20}}>Address:</Text>
    <TextInput value={this.state.address} underlineColorAndroid="#a76d23"   placeholder="Type Address Here" style={input} onChangeText={text=>this.setState({address:text})} />
    <Text style={{fontSize:15, fontWeight:'bold', marginLeft:20}}>No of Rooms :</Text>
    <Rating
    
type='custom'
title="No of Rooms"
ratingImage={WATER_IMAGE}
ratingColor='#6B2404'
ratingBackgroundColor='#e9dcc9'
ratingCount={5}

startingValue={this.state.room}
onFinishRating={(value) => {
 this.GetRating(value)
  
}}
style={{ paddingHorizontal: 10 ,padding:10,marginLeft:20}}
/>
        <Text style={{fontSize:15, fontWeight:'bold', marginLeft:20}}>House Type:</Text>
     
    <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={houseTypeIndex }
          buttons={buttons}
          selectedTextStyle={{color:'white'}}
          buttonStyle={{backgroundColor:'#e9dcc9',borderRadius:2,borderColor:'#6B2404' }}
          containerBorderRadius={7}
          textStyle={{color:'#6B2404'}}
          selectedButtonStyle={{backgroundColor:'#6B2404'}}
          containerStyle={{borderColor:'#6B2404',marginLeft:20,height: 50}}
        
        />
         <Text style={{fontSize:15, fontWeight:'bold', marginLeft:20}}>Rent:</Text>
            {this.state.excep!=0 && this.getAddress()}
        <TextInput value={this.state.price} underlineColorAndroid="#a76d23" keyboardType="numeric"  placeholder="Rent" style={input} onChangeText={text=>this.setState({price:text})} />
        <Text style={{fontSize:15, fontWeight:'bold', marginLeft:20}}>People Type:</Text>
        <ButtonGroup
          onPress={this.updatePeople}
          selectedIndex={peopleTypeIndex }
          buttons={bu}
          selectedTextStyle={{color:'white'}}
          buttonStyle={{backgroundColor:'#e9dcc9',borderRadius:2,borderColor:'#6B2404' }}
          containerBorderRadius={7}
          textStyle={{color:'#6B2404'}}
          selectedButtonStyle={{backgroundColor:'#6B2404'}}
          containerStyle={{borderColor:'#6B2404',marginLeft:20,height: 50}}
        
        />
        <View style={{flexDirection:'row',}}><TextInput value={this.state.area} autoCapitalize="none" underlineColorAndroid="#a76d23" style={[input,{width:150}]} placeholder="Area" onChangeText={text=>this.setState({area:text})}/>
        <TextInput value={this.state.city} autoCapitalize="none" underlineColorAndroid="#a76d23"  style={[input,{width:150}]}placeholder="City" onChangeText={text=>this.setState({city:text})}/>
      
      </View>

      {!!this.state.loading?<Button
  title="Uploading Image...."
  loadingProps={{ size: "large", color: "black" }}
  color='white'
  loading={this.state.loading}
  onPress={()=>this.GetV()}
  
  buttonStyle={{backgroundColor:'#6B2404', }}
/>:<Button
  title="Upload Image"
  loadingProps={{ size: "large", color: "black" }}
  color='white'
  loading={this.state.loading}
  onPress={()=>this.GetV()}
  icon={{ name: 'upload',size:0, type: 'entypo',color:'white' }}
  buttonStyle={{backgroundColor:'#6B2404', }}
/>}<Text></Text>
        <Button
  title="Get Location"
  disabled={this.state.loading}
  
  loadingProps={{ size: "large", color: "black" }}
  color='white'
  onPress={()=> this.getloc()}
  icon={{ name: 'location', type: 'entypo',color:'white' }}
  buttonStyle={{backgroundColor:'#6B2404', }}
/>
    
  
       
        <Text></Text>
        <Button
  title="Post Ad"
  disabled={this.state.loading}
  loadingProps={{ size: "large", color: "black" }}
  color='white'
  onPress={()=>this.postad()}
  icon={{ name:"newspaper-o" , type:"font-awesome" ,color:'white' }}
  buttonStyle={{backgroundColor:'#6B2404', }}
/>    
  
        
         <View ><Text></Text></View>
</ScrollView>
        </View>
    )
  }
}









 