import ImagePicker from 'react-native-image-picker';
import React, {Component} from 'react';
import {Platform,ScrollView, StyleSheet,Image,Alert,Text,TouchableOpacity,TextInput,View} from 'react-native';
import Firebase from './Firebase'
import firebase from '@firebase/app'
import styles from "./styles"
import '@firebase/storage'
import '@firebase/auth'
import RNFetchBlob from 'rn-fetch-blob';
import { Icon,Header,Rating,Button,ButtonGroup,Badge} from 'react-native-elements'
export default class Filter extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
       title: 'Filter',
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
      minprice:0,
      maxprice:20000,
      roomm:1,
      screenValidate:this.props.navigation.getParam('screenValidate',0),
      houseTypeIndex :0,
      peopleTypeIndex :0,
      houseType:"Apartment",
      peopleType:"Bachelor"
    };
    this.user = firebase.auth().currentUser;
    
    this.GetV = this.GetV.bind(this)
    this.updateIndex = this.updateIndex.bind(this)
    this.updatePeople = this.updatePeople.bind(this)
  }
   GetV(rating){
    this.setState({room:rating})
   }
   
ratingCompleted(rating) {
  this.GetV(rating)
  

}
 
  nextscreen(){
    if(this.state.screenValidate==0 )
    {
      this.props.navigation.navigate('Homescreen',{room:this.state.room,houseType:this.state.houseType,peopleType:this.state.peopleType,minprice:this.state.minprice,maxprice:this.state.maxprice}) }
    else{
      this.props.navigation.navigate('streetView',{room:this.state.room,houseType:this.state.houseType,peopleType:this.state.peopleType,minprice:this.state.minprice,maxprice:this.state.maxprice})
     
    }
  
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
  render() {
    const{heading,input,btn,container,headingg,cardb}=styles

    const buttons = ['Apartment','Individual']
    const bu = ['Bachelor' , 'Family']
    const { houseTypeIndex ,peopleTypeIndex  } = this.state
    const WATER_IMAGE = require('./roomm.png')
    return (
      <View style={{ 
        flex:1,
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

<TouchableOpacity style={{paddingLeft:5,alignItems:'center',justifyContent:'center',width:50,height:50}} onPress={()=>this.props.navigation.navigate('Homescreen')}    >
 <Icon color="white" name='arrow-left' type='feather' style={{width:30,height:30}}/> 
</TouchableOpacity><Text style={{paddingLeft:60,fontSize:20,color:'black',color:"white",fontWeight:'bold'}}>   Housing Hub    </Text></View> 
<Text style={headingg,{fontSize:30, fontWeight:'bold',textAlign:'center'}}>Filter </Text>
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
          <Text style={{fontSize:15, fontWeight:'bold', marginLeft:20}}>Price:</Text>
     <View style={{flexDirection:'row'}}>
     <TextInput value={this.state.password} underlineColorAndroid="#a76d23" keyboardType="numeric"  placeholder="Min Value" style={input} onChangeText={text=>this.setState({minprice:text})} />
     <Text style={{padding:20}}> to </Text><TextInput value={this.state.password} underlineColorAndroid="#a76d23" keyboardType="numeric"  placeholder="Max Value" style={input} onChangeText={text=>this.setState({maxprice:text})} />
     </View>
     <Button
  title="Apply Filter"
  loadingProps={{ size: "large", color: "black" }}
  onPress={() =>this.nextscreen()}
  color='white'
  icon={{ name: 'filter', type: 'font-awesome',color:'white' }}
  buttonStyle={{backgroundColor:'#6B2404', }}
/>
    
      </View>
      
     
    )
  }
}
