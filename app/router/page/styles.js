import {Platform,StyleSheet} from 'react-native'
let {OS} = Platform
export default styles = {
  page:{
    flex: 1,
    backgroundColor: '#f1f1f1',
    paddingTop:OS == "android"?40:60,
  },
  itemContainer:{
    paddingTop:10,
    // paddingBottom:10,
    paddingLeft:15,
    paddingRight:15,
    marginBottom:10,
    flex:1,
    backgroundColor: '#fff',
    overflow:"hidden",
    justifyContent:'center',
    alignItems:'center'
  },
}
