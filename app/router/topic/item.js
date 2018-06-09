import React, {Component} from 'react'
import styles from './style'
import {StyleSheet,Text,View,Image,TouchableOpacity} from 'react-native'

class Item extends Component {
  constructor(props){
    super(props)
    this._onPress = this._onPress.bind(this)
  }
  componentWillMount(){
  }
  _onPress(){
    let {article,navigator} = this.props
    let {id} = article
    navigator.push({id:"Item",name:"详情",back:true})
  }
  _renderTop(){
    let {top} = this.props.article
    if(top){
      return(
        <View style={styles.setTop}>
          <Text style={styles.setTopText}>置顶</Text>
        </View>
      )
    }
  }
  render() {
    let {isLast,article} = this.props
    let {name,avatar,time,tag,title,seeNumber,cmtNumber,lastCmtTime,top} = article
    // console.log(top);
    return (
      <TouchableOpacity onPress={this._onPress} style={isLast?styles.itemContainerLast:styles.itemContainer}>
        <View style={styles.itemHeader}>
          <Image
            style={styles.itemAvatar}
            source={{uri:avatar}}
          />
          <View style={styles.itemHeaderUser}>
            <Text style={styles.userName}>{name}</Text>
            <View style={styles.topicInfor}>
              <Text style={styles.userInfo}>{time}</Text>
              <View style={styles.topicTag}>
                <Text style={styles.tagName}>{tag}</Text>
              </View>
            </View>
            {this._renderTop()}
          </View>
        </View>
        <Text style={styles.itemTitle}>{title}</Text>
        <View style={styles.itemFooter}>
          <View style={styles.itemFooterBox}>
            <Text style={styles.footBoxtext}>查看：{seeNumber}</Text>
          </View>
          <View style={styles.itemFooterBox}>
            <Text style={styles.footBoxtext}>评论：{cmtNumber}</Text>
          </View>
          <View style={styles.itemFooterBoxLast}>
            <Text style={styles.footBoxtext}>{lastCmtTime}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

export default Item
