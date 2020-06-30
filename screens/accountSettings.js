import ImagePicker from 'react-native-image-picker';
import React, {Component} from 'react';
import {Platform, StyleSheet,StatusBar,Image,Alert,Text,Button,TouchableOpacity,TextInput,View} from 'react-native';
import Firebase from './Firebase'
import firebase from '@firebase/app'
import styles from "./styles"
import '@firebase/storage'
import changePassword from './changePassword'
import '@firebase/auth'
import RNFetchBlob from 'rn-fetch-blob';
import { Header,Avatar,Rating,Divider,ButtonGroup,Badge} from 'react-native-elements'
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
var ur
const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
export default class accountSettings extends Component {
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
      sour:'',
      price:0,
      imgname:'',
      avatarSource:'',
      houseTypeIndex :0,
      peopleTypeIndex :0,
      houseType:"Apartment",
      peopleType:"Bachelor"

    };
    this.user = firebase.auth().currentUser;
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
    firebase.database().ref('users/' ).push({
      username: this.state.name,
      phone:this.state.number,
      room:this.state.room,
      address:this.state.address,
      price:this.state.price,
      housetype:this.state.houseType,
      peopletype:this.state.peopleType,
      homepic:this.state.avatarSource
    }).then(()=>{
      Alert.alert(
        'Ad Status',
        'Sucessfully Uploaded',
        [
        
          {text: 'OK', onPress:()=> this.props.navigation.replace('Homescreen')},
        ],
        { cancelable: false }
      )
  },(error)=>{
      Alert.alert(error.message);
  });

  }
  uploadImage(uri, mime = 'image/jpeg', name) {
    const {imgname}=this.state
    return new Promise((resolve, reject) => {
      let imgUri = uri; let uploadBlob = null;
      const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
      const { currentUser } = firebase.auth();
      const imageRef = firebase.storage().ref(`images/`+this.user.email)
  
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
          resolve(url);
        })
        .catch(error => {
          reject(error)
      })
    })
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

        this.setState({imgname:response.uri})
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.uploadImage(response.uri)
      .then(url => { alert('uploaded');this.setState({sour:url}) })
      .catch(error => console.log(error)) 

      }
    }) 
  }
componentDidMount(){
  var storage = firebase.storage();
  const userid=firebase.auth().currentUser
  const useremail=userid.email
  storage.ref('images/'+useremail).getDownloadURL().then(url=> {
    
   this.setState({
     sour:url
   })
 
  }).catch(function(error) {
    // Handle any errors
  });   
}
  render() {
    const{heading,input,btn,container,headingg,cardb}=styles
    const td=firebase.auth().currentUser 
    const { houseTypeIndex ,peopleTypeIndex ,sour } = this.state
    return (
    
      <View key="abc" style={{flex:1,backgroundColor:'#e9dcc9'}}>
       <StatusBar
    backgroundColor='#6B2404'
    barStyle="dark-content"
      
  />
        <View elevation={5} style={{alignItems:'center',height:55,flexDirection:'row',
  backgroundColor:'#6B2404',
  shadowColor: "#000000",
  shadowOpacity: 0.8,
  shadowRadius: 2,
  shadowOffset: {
    height:2 ,
    width: 2
  }}} ><Text style={{paddingLeft:100,fontSize:20,color:'black',color:"white",fontWeight:'bold'}}>   Housing Hub    </Text></View> 
 
  <View style={{padding:20,justifyContent:'center'}}>
            <Text style={{fontSize:30,fontWeight:'bold',paddingLeft:50,color:'black'}}>Account Settings </Text>
        <View style={{flexDirection:'row',paddingTop:10}}>{!!this.state.sour ?<Avatar
  rounded
  size='xlarge'
  avatarStyle={{height:50,width:50,borderRadius:25}}
  showEditButton 
    onEditPress={()=>this.GetV()}
  containerStyle={{width:45,height:45,borderRadius:23}}
  source={{uri:this.state.sour}}
/>:<Avatar
  rounded
  avatarStyle={{height:50,width:50,borderRadius:25}}
  size='xlarge'
  containerStyle={{width:45,height:45,borderRadius:23}}
  showEditButton
  onEditPress={()=>this.GetV()}
  source={require('./student.png')}
/>}<Text style={{fontWeight:'bold',padding:10,fontSize:20}}>{td.email}</Text></View>

<View style={{height:30,padding:10}}><Divider style={{backgroundColor:'black'}}></Divider></View>
        <TouchableOpacity   onPress={() =>this.props.navigation.navigate('changePassword')}><View style={{flexDirection:'row',padding:10}}><Image source={require('./padlock.png')}
      style={{width:30,height:30}}
    /><Text style={{fontWeight:'bold',fontSize:20,paddingLeft:5}}> Change Password </Text></View>
        </TouchableOpacity><TouchableOpacity   onPress={() => this.signout()}>
        <View style={{flexDirection:'row',padding:10}}><Image source={require('./logout.png')}
      style={{width:30,height:30}}
    /><Text style={{fontWeight:'bold',fontSize:20,paddingLeft:10}}>Sign out </Text></View></TouchableOpacity>
        </View>

        
         
         
        </View>
    )
  }
}
