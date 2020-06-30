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
import { Header,Rating,Icon,Button,ButtonGroup,Badge} from 'react-native-elements'
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
export default class Dashboard extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
       title: 'Housing Hub',
       headerTintColor: 'black',
       headerStyle: {
          textAlign:'center',
          backgroundColor: '#e9dcc9'
       }
    }
 }
  constructor(props){
    super(props)
    this.state={
      name:this.props.navigation.state.params.name,
      latitude:0,
      longitude:0,
      area:'',
      city:'',
      excep:0,
      loading:false,
        loadingText:'Upload Image',
      number:this.props.navigation.state.params.number,
      room:this.props.navigation.state.params.room,
      address:this.props.navigation.state.params.address,
      price:0,
      imgname:'',
      avatarSource:'',
      houseTypeIndex :0,
      peopleTypeIndex :0,
      houseType:"Apartment",
      peopleType:"Bachelor"

    };
    if(!firebase.apps.length){firebase.initializeApp(Firebase.FirebaseConfig);}
    this.user = firebase.auth().currentUser;
    this.GetV = this.GetV.bind(this)
    this.updateIndex = this.updateIndex.bind(this)
    this.updatePeople = this.updatePeople.bind(this)
  }
  signout(){
    firebase.auth().signOut();
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
    var em=firebase.auth().currentUser.email
    var locad=this.state.area+','+this.state.city
    const conv=parseInt(this.state.price)

    if(this.state.username=="" ||this.state.phone=="" ||this.state.address=="" ||this.state.price==0 ||this.state.area=="" ||this.state.city=="" )
    {
      alert('Fill Every Field')
    }
    else{
      firebase.database().ref('users/' ).push({
        username: this.state.name,
        phone:this.state.number,
        room:this.state.room,
        address:this.state.address,
        price:conv,
        email:em,
        locaddress:locad,
        latitude:this.state.latitude,
        longitude:this.state.longitude,
        housetype:this.state.houseType,
        peopletype:this.state.peopleType,
        homepic:this.state.avatarSource
      }).then(()=>{
        Alert.alert(
          'Ad Status',
          'Sucessfully Uploaded',
          [
          
            {text: 'OK', onPress:()=> this.props.navigation.navigate('homee')},
          ],
          { cancelable: false }
        )
    },(error)=>{
        Alert.alert(error.message);
    });
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
      .then(url => { alert('uploaded');this.setState({avatarSource:url}) })
      .catch(error => console.log(error)) 

      }
    }) 
  }
  render() {
    const{heading,input,btn,container,headingg,cardb}=styles
    const component1 = () => <Image source={require("./buildings.png")} style={{width:125,}}/> 
    const component2 = () => <Image source={require("./house.png")}/>
    const buttons = ['Apartment','Individual']
    const butttons=[{ element: component1 }, { element: component2 }]
    const bu = ['Bachelor' , 'Family']
    const { houseTypeIndex ,peopleTypeIndex  } = this.state
    return (
        <View style={{  flex:1,
          borderColor:"#5B340B",
        
           
          backgroundColor:'#e9dcc9',
           
          }}>
            <View elevation={5} style={{alignItems:'center',height:55,flexDirection:'row',
  backgroundColor:'#6B2404',
  shadowColor: "#000000",
  shadowOpacity: 0.8,
  shadowRadius: 2,
  shadowOffset: {
    height: 1,
    width: 1
  }}} >
<TouchableOpacity style={{paddingLeft:5,alignItems:'center',justifyContent:'center',width:50,height:50}} onPress={()=>this.props.navigation.navigate('Dashboardd')}    >
 <Icon color="white" name='arrow-left' type='feather' style={{width:30,height:30}}/> 
</TouchableOpacity>
 <Text style={{paddingLeft:60,fontSize:20,color:'black',color:"white",fontWeight:'bold'}}>   Housing Hub    </Text></View> 
        <Text style={{fontSize:15,paddingTop:130, fontWeight:'bold', marginLeft:20}}>House Type:</Text>

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
         <Text style={{fontSize:15, fontWeight:'bold', marginLeft:20}}>Price:</Text>
     {this.state.excep!=0 && this.getAddress()}
        <TextInput value={this.state.password} underlineColorAndroid="#a76d23" keyboardType="numeric"  placeholder="Rent" style={input} onChangeText={text=>this.setState({price:text})} />
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
  
        
         
         
        </View>
    )
  }
}
