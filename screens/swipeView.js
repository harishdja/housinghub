import ImagePicker from 'react-native-image-picker';
import React, {Component} from 'react';
import {Platform,ScrollView, StyleSheet,Image,Animated,Dimensions,PanResponder,Alert,Text,TouchableOpacity,TextInput,View} from 'react-native';
import Firebase from './Firebase'
import firebase from '@firebase/app'

import '@firebase/storage'
import '@firebase/auth'
import RNFetchBlob from 'rn-fetch-blob';
import { Icon,Header,Rating,Button,ButtonGroup,Badge} from 'react-native-elements'
const SCREEN_HEIGHT=Dimensions.get('window').height
const SCREEN_WIDTH=Dimensions.get('window').width
const Users=[
    {id:'1',uri:require("./bac.png")},
    {id:'2',uri:require("./sbuildings.png")},
    {id:'3',uri:require("./room.png")},
    {id:'4',uri:require("./roomm.png")},
    {id:'5',uri:require("./phone.png")}
]
export default class swipeView extends Component {

    constructor() {
      super()
      this.state={
        /* sample:this.props.navigation.state.params.a,*/
         message:'',
         details:[],
         avatarSource:'',
         loading: true,
         data: [],
         page: 1,
         seed: 1,
         error: null,
   refreshing: false
             };
      this.position = new Animated.ValueXY()
      this.state = {
        currentIndex: 0
      }
  
      this.rotate = this.position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: ['-10deg', '0deg', '10deg'],
        extrapolate: 'clamp'
      })
  
      this.rotateAndTranslate = {
        transform: [{
          rotate: this.rotate
        },
        ...this.position.getTranslateTransform()
        ]
      }
  
      this.likeOpacity = this.position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp'
      })
      this.dislikeOpacity = this.position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0, 0],
        extrapolate: 'clamp'
      })
  
      this.nextCardOpacity = this.position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0, 1],
        extrapolate: 'clamp'
      })
      this.nextCardScale = this.position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: [1, 0.8, 1],
        extrapolate: 'clamp'
      })
  
    }
    componentDidMount(){
       
        this.makeRemoteRequest();
         
         
          
         
     }
   makeRemoteRequest=()=> {
 
     
        firebase
        .database()
        .ref()
        .child('users/')
        .once("value",snap=>{
         var data=snap.val()
         if(snap.val()){
             
             const initMessages=[];
             Object.keys(data)
             .forEach(message=>initMessages.push(data[message]));
             this.setState({
               details:initMessages,
               loading: false,
               refreshing: false      
           })
          }   
}) 
     };
    componentWillMount() {
      this.PanResponder = PanResponder.create({
  
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
  
          this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
        },
        onPanResponderRelease: (evt, gestureState) => {
  
          if (gestureState.dx > 120) {
            this.postad(this.state.details[this.state.currentIndex])
            Animated.spring(this.position, {
              toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
            }).start(() => {
               
              this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                this.position.setValue({ x: 0, y: 0 })
              })
            
            })
          }
          else if (gestureState.dx < -120) {
            Animated.spring(this.position, {
              toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
            }).start(() => {
              this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
                this.position.setValue({ x: 0, y: 0 })
              })
            })
          }
          else {
            Animated.spring(this.position, {
              toValue: { x: 0, y: 0 },
              friction: 4
            }).start()
          }
        }
      })
    }
    postad(det){
   /*   var us = firebase.auth().currentUser;
        firebase.database().ref(us.uid+'/').push({
         fav:det.homepic 
        }).then(()=>{
          Alert.alert(
            'Ad Status'
          )
      },(error)=>{
          Alert.alert(error.message);
      });
    
      */
  
    }
    renderUsers = () => {
      const {details}=this.state
 
      return  this.state.details.map((item, i) => {
  
      
        if (i < this.state.currentIndex) {
          return null
        }
        else if (i == this.state.currentIndex) {
  
          return (
            <Animated.View
              {...this.PanResponder.panHandlers}
              key={item.id} style={[this.rotateAndTranslate, { height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>
              <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
                <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>Interested</Text>
  
              </Animated.View>
  
              <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
                <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>Not Interested</Text>
  
              </Animated.View>
  
              <Image
                style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
                source={{uri:item.homepic}} />
  
            </Animated.View>
          )
        }
        else {
          return (
            <Animated.View
  
              key={item.id} style={[{
                opacity: this.nextCardOpacity,
                transform: [{ scale: this.nextCardScale }],
                height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute'
              }]}>
              <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
                <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>Interested</Text>
  
              </Animated.View>
  
              <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
                <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>Not Interested</Text>
  
              </Animated.View>
  
              <Image
                style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
                source={{uri:item.homepic}} />
  
            </Animated.View>
          )
        }
      }).reverse()
    }
  
    render() {
      return (
        <View style={{ flex: 1 }}>
   <View style={{ height: 60 }}>
  
          </View>
          <View style={{ flex: 1 }}>
            {!!this.state.details && this.renderUsers()}
          </View>
          <View style={{ height: 60 }}>
  
          </View>   
  
  
        </View>
  
      );
    }
  }
 