import React, { Component } from 'react'
import { Text, View,TouchableOpacity,StyleSheet,Alert,TextInput } from 'react-native'
import styles from "./styles"
import '@firebase/auth'
import firebase from '@firebase/app'
import {List,ListItem,Card,Button,Icon,SearchBar,PricingCard} from 'react-native-elements'
export default class Forgot extends Component {
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
   email:""
   };
}
 
Forgotp(){
     firebase.auth().sendPasswordResetEmail(this.state.email)
     .then(()=>{
     Alert.alert("email sent");
},(error)=>{
  Alert.alert(error.message);
});
}
render() {
    const{heading,input,btn,container,headingg}=styles
    return (
 <View style={container}>
    <Text style={{fontWeight:'bold',fontSize:20,paddingLeft:20,
        backgroundColor:'#e9dcc9',
        color:'black'}}>Forgot Password</Text>
    <TextInput underlineColorAndroid="#a76d23" style={input} placeholder="Email" onChangeText={text=>this.setState({email:text})}/>
    <Text></Text>
    <Button
  title="Reset Password"
  loadingProps={{ size: "large", color: "black" }}
  onPress={()=>this.Forgotp()}
   color='white'
   
  buttonStyle={{backgroundColor:'#6B2404', }}
/>
  
    <Text></Text>
     
    <Text></Text>
     
  </View>
)
}
}
