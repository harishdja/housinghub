import ImagePicker from 'react-native-image-picker';
import React, {Component} from 'react';
import {Platform, StyleSheet,Image,TouchableHighlight,Alert,Text,TouchableOpacity,TextInput,View} from 'react-native';
import Firebase from './Firebase'
import firebase from '@firebase/app'
import styles from "./styles"
import '@firebase/storage'
import '@firebase/auth'
import RNFetchBlob from 'rn-fetch-blob';
import { Header,Rating,Button,ButtonGroup,Icon,Badge} from 'react-native-elements'
import AddButton from './AddButton';
export default class Dashboardd extends Component {
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
    super(props);
    this.state={
      name:"",
      number:0,
      room:1,
      address:"",
      price:0,
      roomm:1,
      houseType:0
    };
    this.user = firebase.auth().currentUser;
    this.GetV = this.GetV.bind(this)
    this.updateIndex = this.updateIndex.bind(this)
  }
   GetV(rating){
    this.setState({room:rating})
   }
   updateIndex (houseType) {
   
    this.setState({houseType})
  }
ratingCompleted(rating) {
  this.GetV(rating)
  

}
  nextscreen(){
    if(this.state.name!="" && this.state.number!=0 && this.state.address!="" )
    {
    this.props.navigation.navigate('Dashboard',{name:this.state.name,number:this.state.number,room:this.state.room,address:this.state.address})
    }
    else{
       
      this.props.navigation.navigate('Dashboard',{name:this.state.name,number:this.state.number,room:this.state.room,address:this.state.address})
 
    }
  
  }
  render() {
    const{heading,input,btn,container,headingg,cardb}=styles


    const WATER_IMAGE = require('./roomm.png')
    return (
      <View  style={{  flex:1,
        borderColor:"#5B340B",
      
         
        backgroundColor:'#e9dcc9',
         
        }}>
    <View elevation={5} style={{alignItems:'center',height:55,flexDirection:'row',
  backgroundColor:'#6B2404',
  alignItems:'center',
  shadowColor: "#000000",
  shadowOpacity: 0.8,
  shadowRadius: 2,
  shadowOffset: {
    height: 1,
    width: 1
  }}} >

 <Text style={{paddingLeft:100,fontSize:20,color:'black',color:"white",fontWeight:'bold'}}>   Housing Hub    </Text></View> 
      <Text style={headingg,{fontSize:30, fontWeight:'bold',paddingTop:150,textAlign:'center'}}>Ad Details </Text>
      <Text style={{fontSize:15, fontWeight:'bold', marginLeft:20}}>Name :</Text>
      <TextInput value={this.state.email} autoCapitalize="none" underlineColorAndroid="#a76d23" style={input} placeholder="Enter your Name" onChangeText={text=>this.setState({name:text})}/>
      <Text style={{fontSize:15, fontWeight:'bold', marginLeft:20}}>Phone Number :</Text>
      <TextInput value={this.state.password} underlineColorAndroid="#a76d23" keyboardType="numeric"   placeholder="Enter your Number" style={input} onChangeText={text=>this.setState({number:text})} />
      <Text style={{fontSize:15, fontWeight:'bold', marginLeft:20}}>Address:</Text>
      <TextInput value={this.state.password} underlineColorAndroid="#a76d23"   placeholder="Type Address Here" style={input} onChangeText={text=>this.setState({address:text})} />
      <Text style={{fontSize:15, fontWeight:'bold', marginLeft:20}}>No of Rooms :</Text>
      <Rating
      
  type='custom'
  title="No of Rooms"
  ratingImage={WATER_IMAGE}
  ratingColor='#6B2404'
  ratingBackgroundColor='#e9dcc9'
  ratingCount={5}
  
  startingValue={1}
  onFinishRating={(value) => {
   this.GetV(value)
    
  }}
  style={{ paddingHorizontal: 10 ,padding:10,marginLeft:20}}
/>

       <Button
  title=">>"
  loadingProps={{ size: "large", color: "black" }}
  onPress={()=>this.nextscreen()}
  color='white'
  buttonStyle={{backgroundColor:'#6B2404',alignSelf:'flex-end',width:100 }}
/>
  
      

      
       
       
      </View>
    )
  }
}
