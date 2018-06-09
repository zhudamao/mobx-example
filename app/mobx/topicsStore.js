'use strict'
import {
  computed,
  observable,
  action,
  runInAction
} from 'mobx'

import { 
  ListView,
  AsyncStorage 
} from 'react-native';


// 请求
class fetchDataStore {
  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  @observable list
  @observable state
  @observable time
  @observable page
  @observable topic
  @computed get dataSource() { return this.ds.cloneWithRows(this.list.slice()) }
  @action fetchTopic = (page) => {
    // console.log("读取网络数据")
    // console.log(page);
    this.state = 1
    let fetchURL = 'https://cnodejs.org/api/v1/topics?page=' + page
    fetch(fetchURL, { method: 'get' })
      .then(res => res.json())
      .then(
        action("fetchOperate_success", (res) => {
          let { data, success } = res
          if (success) {
            this.state = 2
            this.time = new Date().getTime()
            // 不是第一页就合并数组
            if (page > 1) {
              this.list = this.list.concat(data)
              this.page = page
            }
            // 是第一页就存储内容
            else {
              this.list = data
              this.page = page
              let str = ''
              for (let i = 0; i < data.length; i++) {
                let val = data[i]
                if (i < data.length - 1) { str += JSON.stringify(val) + "@RN" }
                else { str += JSON.stringify(val) }
              }
              let topicStorage = { value: str, time: this.time }
              
              AsyncStorage.setItem("topicTime", this.time.toString(), (err) => {
                if (err) { return }
                AsyncStorage.setItem("topic", JSON.stringify(topicStorage), (err) => { })
              })
            }
          }
          else { this.state = -1 }
        })
      )
      .catch(
        action("fetchOperate_error", (err) => {
          this.state = -1
        })
      )
  }
  @action getFromStorage = () => {
    this.state = 1
    AsyncStorage.getItem('topicTime', action("getItemTime", (err, res) => {
      if (new Date().getTime() - parseInt(res) > 7200 * 1000) {
        console.log('内存已经过期');
        this.fetchTopic(1)
      }
      else {
        console.log('内存未过期');
        AsyncStorage.getItem('topic', action("getItemFronStorage", (err, res) => {
          if (err) { this.state = -1 }
          else if (res == null) {
            console.log("内存为空");
            this.fetchTopic(1)
          }
          else {
            //console.log("读取内存数据")
            this.state = 2
            let data = JSON.parse(res)
            let strArr = data.value.split('@RN')
            let jsonArr = strArr.map((val, index) => { return JSON.parse(val) })
            this.time = data.time
            this.list = jsonArr
            this.page = 1
          }
        }))
      }
    }))
  }
  constructor() {
    this.list = []
    this.topic = {}
    this.state = 0
    this.time = 0
    this.page = 0
  }
}
const fetchData = new fetchDataStore()

export default fetchData
