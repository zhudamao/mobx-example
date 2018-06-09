import React, {Component} from 'react'
import styles from './style'
import Item from './item'
import { observer } from 'mobx-react/native'
import { 
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView,
  RefreshControl,
  BackAndroid,
  Platform,
  ToastAndroid,

} from 'react-native'
const tabArray = {
  ask:"问答",
  share:'分享',
  job:"工作",
  good:"精华"
}
const getTagName = function(tag){
  let tagName = null
  if(tag == "ask"){tagName = tabArray.ask}
  else if(tag == "share"){tagName = tabArray.share}
  else if(tag == "job"){tagName = tabArray.job}
  else if(tag == "good"){tagName = tabArray.good}
  else {tagName = '未知'}
  return tagName
}
const getTimeFunc = function(nowTime,getTime){
  let difference = nowTime - getTime
  // 日
  let days = Math.floor(difference/(24*3600*1000))
  if(days < 1){
    // 时
    let leave_1 = difference%(24*3600*1000)
    let hours = Math.floor(leave_1/(3600*1000))
    if(hours < 1){
      // 分
      let leave_2 = leave_1%(3600*1000)
      let minutes=Math.floor(leave_2/(60*1000))
      if(minutes < 1){
        let leave_3 = leave_2%(60*1000)
        let seconds=Math.floor(leave_3/(1000))
        return seconds + "秒前"
      }
      else {return minutes + "分钟前"}
    }
    else {return hours + "小时前"}
  }
  else {return days + '天前'}
}
const getLastTimeFunc = function(time){
  let date = new Date(time)
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
  let D = (date.getDate()  < 10 ? '0'+(date.getDate()) : date.getDate())  + ' '
  let h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':'
  let m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':'
  let s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds())
  return(Y+M+D+h+m+s)
}

@observer
class Index extends Component {
  constructor(props){
    super(props)
  }
  componentWillMount(){
    let {fetchTopic,getFromStorage} = this.props.store
    // fetchTopic(1)
    if (Platform.OS === 'android'){
      BackAndroid.addEventListener('hardwareBackPress',this.onBackPress);
    }
    
    getFromStorage()
  }
  _ArticleStruct(value,index){
    let {navigator,store} = this.props
    let {time,list} = store
    let isLast = (index == data.length - 1)?true:false
    let article = {
      id:value.id,
      name:value.author.loginname,
      avatar:value.author.avatar_url,
      time:getTimeFunc(time,new Date(value.create_at).getTime()),
      tag:getTagName(value.tab),
      title:value.title,
      cmtNumber:value.reply_count,
      seeNumber:value.visit_count,
      top:value.top,
      lastCmtTime:getTimeFunc(time,new Date(value.last_reply_at).getTime()),
    }
    return(<Item article={article} key={value.id} isLast={isLast} navigator={navigator} />)
  }
  _renderRow(value,sid,rid){
    let {navigator,store} = this.props
    let {time,list} = store
    let isLast = (rid == list.length - 1)?true:false
    let article = {
      id:value.id,
      name:value.author.loginname,
      avatar:value.author.avatar_url,
      time:getTimeFunc(time,new Date(value.create_at).getTime()),
      tag:getTagName(value.tab),
      title:value.title,
      cmtNumber:value.reply_count,
      seeNumber:value.visit_count,
      top:value.top,
      lastCmtTime:getTimeFunc(time,new Date(value.last_reply_at).getTime()),
    }
    return(<Item article={article} key={value.id} isLast={isLast} navigator={navigator} />)
  }
  _onRefresh(){
    let {fetchTopic} = this.props.store
    fetchTopic(1)
  }
  _onEndReached(){
    let {fetchTopic,state,page} = this.props.store
    if(state > 1){fetchTopic(page+1)}

  }
  _renderRefreshControl(){
    let {state,time} = this.props.store
    let loadFlag = false
    let text = "加载中"
    if(time != 0 && state == 2){
      text = '上次加载时间：'+ getLastTimeFunc(time)
    }
    if(state == 0 || state == 1){
      loadFlag = true
      text = "加载中"
    }
    else {loadFlag = false}
    return(
      <RefreshControl
        refreshing={loadFlag}
        onRefresh={this._onRefresh.bind(this)}
        tintColor="#ccc"
        title={text}
        progressBackgroundColor="#ccc"
        titleColor="#333"
        colors={['#888', '#666', '#fff']}
      />
    )
  }

  render() {
    return (
      <View style={styles.page}>
        <ListView
          refreshControl={this._renderRefreshControl()}
          style={styles.container}
          dataSource= {this.props.store.dataSource}
          renderRow = {this._renderRow.bind(this)}
          enableEmptySections = {true}
          onEndReached = {this._onEndReached.bind(this)}
          onEndReachedThreshold = {100}
        />
      </View>
    )
  }


  onBackPress = ()=>{
    let {navigator} = this.props
    if (navigator.getCurrentRoutes().length > 1){
        navigator.pop()
        return true;
    }
    else {
      if (this.lastExitTime && this.lastExitTime -Date.now() < 2000){
        return false;
      }else{
        this.lastExitTime = Date.now();
        ToastAndroid.show('再按一次退出',ToastAndroid.SHORT);
        return true;
      }

    }
      
  }

  componentWillUnmount(){
    if (Platform.OS === 'android'){
      BackAndroid.removeEventListener('hardwareBackPress',this.onBackPress);
    }
  }

}

export default Index
