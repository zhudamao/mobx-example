'use strict'
import {
  computed,
  observable,
  action,
  runInAction
} from 'mobx';

import { ListView } from 'react-native';
import axios from 'axios';
import qs from 'querystring';


class fetchStore{
    constructor(){
        this.currentPage = 1;
        this.headerLoading = false;
        this.footerLoading = false;
        this.hasMore = false;
        this.data = [];
    }
    ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    @observable currentPage;
    @observable headerLoading;
    @observable footerLoading;
    @observable hasMore;
    @observable data;
    @computed get dataSource() { return this.ds.cloneWithRows(this.data.slice()) }

    @action  load_data_now = async (currentPage)=>{
        if (currentPage === 1){
            this.headerLoading = true;
        }else{
            this.footerLoading = true;
        }

       
        try{
            let params  = {uid:21,page:currentPage,pagesize:10};
            let query =  qs.stringify(params);
            let fullUrl = 'http://localhost/employee/list?' + query;
            let res = await axios.get(fullUrl);
            
            if (res.status !== 200){
                throw( new Error('network fail'));
            }

            const {data,code,desc} = res.data;
            runInAction (
                ()=>{
                    if (code === 0){
                        this.data = currentPage===1? data:this.data.concat(data);
                        this.currentPage = currentPage;
                        this.hasMore = data.length === 10;
                    }

                    if (currentPage === 1){
                        this.headerLoading = false;
                    }else{
                        this.footerLoading = false;
                    }

                }
            )
        } catch(error){
            console.log(error);
        }

    }

}

const employeeStore = new fetchStore();

export default employeeStore;