'use strict'
import {
  computed,
  observable,
  action,
  runInAction
} from 'mobx';

import axios from 'axios';

class fetchWebStore{
    // constructor(){
    //     this.content = '';
    //     this.baseUrl = '';

    // }

    @observable content = '';
    @observable baseUrl = '';
    @observable textStyle = {};

    @action 
    load_data_now = async ()=>{
        
        // fetch('http://api.now.pinzhi.xin/employee/list?'+`uid=21&page=${currentPage}&pagesize=10` ).
        //     then((respone)=>respone.json()).
        //     then(
               
        //             (res)=>{
        //                 const {data,code,desc} = res;
        //                 runInAction (
        //                     ()=>{
        //                         if (code === 0){
        //                             this.data = currentPage===1? data:this.data.concat(data);
        //                             this.currentPage = currentPage;
        //                             this.hasMore = data.length === 10;
        //                         }
        
        //                         if (currentPage === 1){
        //                             this.headerLoading = false;
        //                         }else{
        //                             this.footerLoading = false;
        //                         }

        //                     }
        //                 )
        //             }
                
        // ).catch(action('faild',
        //     err=>console.log(err)
        // ) 
        // );

        try{
            let fullUrl = 'https://m.baidu.com/' ;
            let res = await axios.get(fullUrl);
            
            if (res.status !== 200){
                throw( new Error('network fail'));
            }

            runInAction (
                ()=>{
                    this.content = res.data;
                    this.baseUrl = 'https://www.baidu.com';
                }
            )
        } catch(error){
            console.log(error);
        }

    }

    @action random_changeText_style(){
        this.textStyle = {color:`rgb(${ Math.random()*255},${ Math.random()*255},${ Math.random()*255})`}
    }


}

const webStore = new fetchWebStore();

export default webStore;