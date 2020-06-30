import React, { Component } from 'react'
import { Text,View,TouchableOpacity,StyleSheet,Alert,TextInput } from 'react-native'
import styles from "./styles"
import '@firebase/auth'
import {List,ListItem,Card,Button,Icon,SearchBar,PricingCard} from 'react-native-elements'
import firebase from '@firebase/app'
export default class Signup extends Component {
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
       loadingText:'SIGN UP',
       loading:false
       };
    }
    backToLogin(){
        this.props.navigation.navigate("Login");
    }
    createAcc(){
        if(this.state.password ==this.state.passwordconfrm){
            this.setState({
                loadingText:"Signing up...",
                loading:true
            })
            firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(()=>{ this.setState({
            password:"",
            passwordconfrm:"",
            loadingText:"Sign up",
            loading:false
        })
         Alert.alert(
            'Status',
            'Sucessfully Sign up',
            [
            
              {text: 'OK'},
            ],
            { cancelable: false }
          )
    },(error)=>{this.setState({
        password:"",
        passwordconfrm:"",
        loadingText:"Sign up",
        loading:false
    })
                Alert.alert(error.message);
        });
        }
        else{
            Alert.alert("Passwords do not match");
        }
        
    }

    render() {
        const{heading,input,container,btn,headingg}=styles
        return (
     <View style={container}>
     <Icon
       
       name='add-user'
       size={50}
       type='entypo' 
       color='black'
       underlayColor='black'
       containerStyle={{backgroundColor:'#e9dcc9',borderWidth:0}} />
        <Text style={headingg}>Sign Up</Text>
        <TextInput underlineColorAndroid="#6B2404" style={input} placeholder="Email" onChangeText={text=>this.setState({email:text})}/>
        <TextInput value={this.state.password}underlineColorAndroid="#6B2404" secureTextEntry={true} placeholder="Password" style={input} onChangeText={text=>this.setState({password:text})} />
        <TextInput value={this.state.passwordconfrm}underlineColorAndroid="#6B2404" secureTextEntry={true} placeholder="Confirm Password" style={input} onChangeText={text=>this.setState({passwordconfrm:text})} />
         
        <Button
  raised
 
     
   
  title={this.state.loadingText}
  loading={this.state.loading}
  loadingProps={{ size: "large", color: "black" }}
  titleStyle={{fontWeight:'bold',color:'black'}}
  buttonStyle={{backgroundColor:'#6B2404'}}
  onPress={()=>this.createAcc()}
  
/><TouchableOpacity  onPress={()=>this.backToLogin()}>
        <Text style={{fontSize:20,color:'black',paddingLeft:20}}>Already a User? Click here for Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
