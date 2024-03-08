
import React from 'react';
import { View, Button ,StyleSheet,Image,StatusBar,SafeAreaView, Text, Pressable,ImageBackground, ImageBackgroundBase} from 'react-native';
import  COLORS from '../../assets/Colors/colors.js';


const HomeScreen = ({navigation}) => {
    return (
     
      
      <SafeAreaView style = {{flex :1,backgroundColor:COLORS.white}}>
      <Image source ={require('../../assets/images/OnboardImage.jpg')} style={styles.image}/>
      <StatusBar translucent backgroundColor={{color:COLORS.translucent}}/>
        <View style={styles.indicatorContainer} >
          <View style={styles.indicator}/>
          <View style={styles.indicator}/>
          <View style={[styles.indicator,styles.indicatorActive]}/>
        </View>

        <View style={{paddingHorizontal:20,paddingTop:20}}>
          <View >
            <Text style={styles.title}>Welcome to Aqarati!</Text>
            <View style={{marginTop:20}}></View>
            <Text style={styles.text}>Discover your dream home with ease and precision .</Text>
          </View>
        </View>
        <View style={{flex:1,justifyContent:'flex-end',paddingBottom:40}}>

            <Pressable onPress={() => navigation.replace('welcome')}>
              <View style={styles.btn}>
              <Text style={{color :COLORS.white}}>Get Started</Text>
              </View>
            </Pressable>
        </View>
      </SafeAreaView>
 
  )};

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: 'transparent', 
  },

image :{

  height:420,
  width:'100%',
  borderBottomLeftRadius :140,


},
indicatorContainer :{
  height:20,
  flexDirection: 'row',
  justifyContent :'center',
  alignItems : 'center',
},
indicator:{
height:5,
width:30,
backgroundColor:COLORS.grey,
marginHorizontal:4,
borderRadius:5

},indicatorActive:{
  backgroundColor:COLORS.dark,
},title:{
  fontSize:32,
  fontWeight:'bold',
},
text:{
  fontSize:16,
  color:COLORS.grey
  ,

},
btn:{
  height:60,
  marginHorizontal:20,
  backgroundColor:COLORS.dark,
  borderRadius:15,
  alignItems:'center',
  justifyContent: 'center',

}

});

export default HomeScreen;
