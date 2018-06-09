import {
    computed,
    observable,
    action,
    runInAction,
    autorun,
    when
  } from 'mobx';

class TodoStore{
    constructor() {
    //    this.data = [];
        autorun (()=>console.log(this.hasChoose.length))

        when(
            ()=>this.allChoose,
            ()=>alert('全选啦')
        )
      }

    @observable data =[] ;
    @computed get allChoose(){
        return  this.data.length? this.data.every(item=>item.choose):false;
    }

    @computed get nextAble(){
        return this.data.some(item=>item.choose);
    }

    @computed get hasChoose(){
        return this.data.filter(item=>item.choose);
    }

    @action.bound
    addNewOne(item){
        this.data.splice(0,0,item);
    }

    @action.bound 
    remove(item0){
        this.data = this.data.filter((item)=> item !== item0);
    }


    @action 
    clearAll = ()=>{
        this.data.length = 0;
    }

    @action 
    chooseAll = ()=>{
        let allChoose = this.allChoose;
        this.data = this.data.map((item)=>{
            item.choose = allChoose? false:true;
            return item;
        })
    }
}


const store = new TodoStore();

export default store;