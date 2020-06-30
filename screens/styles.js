import {StyleSheet}from 'react-native'
export default StyleSheet.create({
    headingg:{
        fontWeight: 'bold',
        fontSize:40,
        textAlign:'center',
        backgroundColor:'#e9dcc9',
        color:'black'
    }, 
    heading:{
        fontSize:20,
        textAlign:'center',
        justifyContent:'center',
        backgroundColor:'#e9dcc9',
        color:'black'
    },
    
    input:{
        marginLeft:20,
        marginRight:20,
        backgroundColor:'#e9dcc9'
    },
    container:{
        flex:1,
        borderColor:"#5B340B",
        padding: 10,
         
        backgroundColor:'#e9dcc9',
        justifyContent:'center',
        
        
    },
    cardb:{
        justifyContent:'center',
        backgroundColor:'#e9dcc9',
        margin:10,
        marginTop:100,
        borderWidth:2,
        borderColor:"lightgrey",
    },
    btn: {
        marginLeft:20,
        marginRight:20,
        alignItems:'center',
        width: 300,
    height: 45,
         padding: 10,
         paddingLeft:10,
         paddingRight:10,
         shadowColor: '#000000',
         backgroundColor:'brown',
         shadowOffset: {
           width: 0,
           height: 3}
     
       },
       btnn: {
        marginLeft:6,
        marginRight:20,
        alignItems:'center',
         padding: 10,
         paddingLeft:10,
         paddingRight:10,
         width:125,
         shadowColor: '#000000',
         backgroundColor:'#5B340B',
         shadowOffset: {
           width: 0,
           height: 3}
         } 
})