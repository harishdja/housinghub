import React, { Component } from 'react'
import { Text,View,TouchableOpacity,StyleSheet,Image,Alert,TextInput } from 'react-native'
import styles from "./styles"
import accountSettings from './accountSettings'
import '@firebase/auth'
import {List,ListItem,Card,Button,Icon,SearchBar,PricingCard} from 'react-native-elements'
import firebase from '@firebase/app'
export default class changePassword extends Component {
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
       email:"",
       password:"",
       passwordconfrm:"",
       loadingText:'Change Password',
       loading:false
       };
    }
   
    reauthenticate = (currentPassword) => {
        var user = firebase.auth().currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);
        return user.reauthenticateAndRetrieveDataWithCredential(cred);
      }
    createAcc(){
      
        
        this.reauthenticate(this.state.email).then(() => {
            var user = firebase.auth().currentUser;
            user.updatePassword(this.state.password).then(() => {
              alert("Password updated!");
              this.props.navigation.navigate('accountSettings')
            }).catch((error) => { console.log(error); });
          }).catch((error) => { console.log(error); });
        
        
    }

    render() {
        const{heading,input,container,btn,headingg}=styles
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

<TouchableOpacity style={{paddingLeft:5,alignItems:'center',justifyContent:'center',width:50,height:50}} onPress={()=>this.props.navigation.navigate('accountSettings')}    >
 <Icon color="white" name='arrow-left' type='feather' style={{width:30,height:30}}/> 
</TouchableOpacity><Text style={{paddingLeft:60,fontSize:20,color:'black',color:"white",fontWeight:'bold'}}>   Housing Hub    </Text></View> 
<View style={{justifyContent:'center',paddingTop:150}}><View style={{alignItems:'center'}}><Image source={require('./padlock.png')}
      style={{width:100,height:100}}
      containerStyle={{paddingLeft:100}}
    /></View><Text style={headingg}>Change Password</Text><TextInput underlineColorAndroid="#6B2404" secureTextEntry={true}  style={input} placeholder="Current Password" onChangeText={text=>this.setState({email:text})}/>
        <TextInput value={this.state.password}underlineColorAndroid="#6B2404" secureTextEntry={true} placeholder="New Password" style={input} onChangeText={text=>this.setState({password:text})} />
        <TextInput value={this.state.passwordconfrm}underlineColorAndroid="#6B2404" secureTextEntry={true} placeholder="Confirm New Password" style={input} onChangeText={text=>this.setState({passwordconfrm:text})} />
         
        <Button
  raised
 
     
   
  title='Change Password'
  
  loadingProps={{ size: "large", color: "black" }}
  titleStyle={{fontWeight:'bold',color:'black'}}
  buttonStyle={{backgroundColor:'#6B2404'}}
  onPress={()=>this.createAcc()}
  
/></View>
      </View>
    )
  }
}
