import React, { Component } from 'react'
import getDirections from 'react-native-google-maps-directions'
import { Text,Header,View,
    TouchableOpacity,PermissionsAndroid,StyleSheet,Alert,TextInput } from 'react-native'
import styles from "./styles"
import { MenuContext, Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import '@firebase/auth'
import Geocoder from 'react-native-geocoder'
import Overlay  from "react-native-elements";
import {List,ListItem,Card,Button,Icon,SearchBar,PricingCard} from 'react-native-elements'
import Entypo from 'react-native-vector-icons/Entypo';
import firebase from '@firebase/app'
class LoginScreen extends Component {
    static navigationOptions={
        header:null
    }
    constructor(props){
       super(props);
       this.state={
       email:"harishdja@gmail.com",
       password:"zxcvbnm",
       latitude:0,
       longitude:1,
       loadingText:'LOGIN',
       loading:false,
      
       };
   
    }
   
    
    
    checkLogin(){
        this.setState({
            loading:true,loadingText:"Signing in..."
        })
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .then(()=>{
            this.setState({email:"",password:"",loading:false,loadingText:'Login'})
        },(error)=>{
            this.setState({email:"",password:"",loading:false,loadingText:'Login'})
            Alert.alert(error.message);
        });
    }
    createAcc(){
        this.setState({email:"",password:""})
        this.props.navigation.navigate("Signup");
    }
    Forgotp(){ 
   this.props.navigation.navigate("Forgot")
    }
    render() {
        const{heading,input,btn,container,headingg,cardb}=styles
        return (
     <View style={container}>
     
       <Icon
       
        name='users'
        size={50}
        type='font-awesome' 
        color='black'
        underlayColor='black'
        containerStyle={{backgroundColor:'#e9dcc9',borderWidth:0}} />
     
        <Text style={headingg}> Login</Text>
       
        <TextInput value={this.state.email} autoCapitalize="none" keyboardType="email-address" underlineColorAndroid="#3E1D0A" style={input} placeholder="Email" onChangeText={text=>this.setState({email:text})}/>
         
        <TextInput value={this.state.password} underlineColorAndroid="#3E1D0A" secureTextEntry={true} placeholder="Password" style={input} onChangeText={text=>this.setState({password:text})} />
        <TouchableOpacity  onPress={()=>this.Forgotp()}>
        <Text style={{fontSize:20,paddingLeft:20}}>Forgot Password</Text>
        </TouchableOpacity>
         
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',padding:0}}><Button
  title={this.state.loadingText}
  loadingProps={{ size: "large", color: "black" }}
  onPress={()=>this.checkLogin()}
  color='white'
  icon={{ name: 'login', type: 'entypo',color:'white' }}
  buttonStyle={{backgroundColor:'#6B2404',width:135, }}
/>
      <Button
  title="Sign up"
  onPress={()=>this.createAcc()}
  color='#6B2404'
   
  icon={{ name: 'add-user', type: 'entypo',color:'#6B2404' }}
  buttonStyle={{backgroundColor:'#e9dcc9',width:135,borderColor:'#6B2404',borderBottomWidth:1,borderTopWidth:1,borderLeftWidth:1,borderRightWidth:1, }}
/></View>


      </View>
    )
  }
}
export default LoginScreen;
