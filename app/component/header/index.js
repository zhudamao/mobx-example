import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableHighlight, Navigator,Image} from 'react-native'
import styles from './styles'
const leftIcon = require('../../images/left.png')

let MidTitle = (route, navigator, index, navState)=>{
  let {routeStack,presentedIndex} = navState
  return (
    <View style = {styles.header} >
        <Text style = {styles.headerText} >{route.name}</Text>
    </View>
  )
}
let LeftButton = (route, navigator, index, navState) =>{
  let {routeStack,presentedIndex} = navState
  if(route.back){
    return (
      <TouchableHighlight
        underlayColor = {'transparent'}
        activeOpacity={0.9}
        onPress= {()=>{navigator.pop()}}
        style = {styles.left}
      >
          <Image style={styles.headerBack} source={leftIcon} resizeMode="cover" />
      </TouchableHighlight>
    )
  }
  else {return(<View></View>)}
}
let RightButton = (route, navigator, index, navState) =>{
  return(<View></View>)
}

let Header = () => {
  return(
    < Navigator.NavigationBar
      routeMapper = {
        {
          LeftButton:LeftButton,
          RightButton: RightButton,
          Title:MidTitle,
        }
      }
      style = {styles.headerBlock}
    />
)}

export default Header
