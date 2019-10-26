import Vue from 'vue';
import Vuex from 'vuex';
import { getGoods } from './apis/api';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        goodsList: [],
    },
    mutations: {
        changeName(state, val) {
            state.name = val.newName;
        },
        init_goodsList(state, data) {
            state.goodsList = data;
        },
        changegoodsNum(state, { n, name }) {
            state.goodsList.map(obj => {
                obj.foods.map(food => {
                    if (food.name == name) {
                        food.num += n
                    }
                })
            })
        },
    },
    actions: {
        init_goodsList(context) {
            getGoods().then(res => {
                res.data.data.map(item => {
                    item.foods.map(food => {
                        food.num =0
                    })
                })
                this.state.goodsList = res.data.data;
                context.commit('init_goodsList', res.data.data)
            })
        },

        change_addnum(context) {
            context.commit('change_addnum');
        },
    },
    getters: {
        getgoods(state) {
            let arr = [];
            state.goodsList.map(obj => {
                obj.foods.map(food => {
                    if (food.num > 0) {
                        var flag = false;
                        arr.map(oldFood => {
                            if (oldFood.name == food.name) {
                                flag =true
                            }
                        })
                        if (!flag) {
                            arr.push(food)
                        }
                    }
                })

            })
            return arr;
        }
    }

})
export default store;
store.dispatch('init_goodsList')

