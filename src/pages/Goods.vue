<template>
  <div class="bottom">
    <div id="scroll_left" class="side_bar">
      <ul class="content">
        <div
          @click="click_sidegoods(item.name)"
          v-for="item in this.$store.state.goodsList"
          :key="item.id"
          :class="{sidebar_title:true,selected:curSelected==item.name}"
        >
          <div>{{item.name}}</div>
        </div>
      </ul>
    </div>

    <div id="scroll_right" class="out_content">
      <ul class="content">
        <div :id="item.name" v-for="item in this.$store.state.goodsList" :key="item.id">
          <div class="title">{{item.name}}</div>
          <div class="goodsList" v-for="(item1,i) in item.foods" :key="i">
            <div class="goodlist_pic">
              <img :src="item1.icon" />
            </div>
            <div class="goods_content">
              <p class="goods_title">{{item1.name}}</p>
              <div>{{item1.description}}</div>
              <p>月销{{item1.sellCount}}份 &emsp; 好评100%</p>
              <p>
                <span class="_price">￥</span>
                <span class="good_price">{{item1.price}}</span>&emsp;
                <del>￥{{item1.oldPrice}}</del>
                <span class="btn_num">
                  <button v-show="item1.num>0" @click="changeNum(-1,item1.name)">-</button>
                  <span v-show="item1.num > 0">{{item1.num}}</span>
                  <button class="btn_add" @click="changeNum(1,item1.name)">+</button>
                </span>
              </p>
            </div>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import { getGoods } from "../apis/api";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      curSelected: "热销榜",
      flag: false,
    };
  },
  computed: {
    goodlist() {
      return this.$store.state.goodsList;
    },
    _arr() {
      let new_arr = [];
      for (let obj of this.$store.state.goodsList) {
        new_arr.push(document.getElementById(obj.name).offsetHeight);
      }
      //再次循环，构建想要的数组
      this.new_arr = new_arr;
      let arr = [];
      let totalHeight = 0;
      for (let i = 0; i < this.new_arr.length; i++) {
        arr.push({
          min: totalHeight,
          max: totalHeight + this.new_arr[i],
          tabName: this.$store.state.goodsList[i].name
        });
        totalHeight += this.new_arr[i];
      }
      // this.arr = arr; //挂载在this上
      return arr;
    }
  },
  created() {
    this.num = this.$store.state.num;
    this.flag = true;
  },
  mounted() {
    this.right_scroll = new BScroll("#scroll_right", {
      probeType: 3 //3实时派发滚动事件
    });
    let left_scroll = new BScroll("#scroll_left", {
      click: true
    });
    //监听右侧滚动距离
    this.right_scroll.on("scroll", position => {
      //取y轴滚动距离，转为正数
      var scrollY = Math.abs(Math.round(position.y));
      // console.log(scrollY);
      for (let obj of this._arr) {
        if (scrollY >= obj.min && scrollY < obj.max) {
          this.curSelected = obj.tabName;
          break;
        }
      }
    });
  },
  methods: {
    click_sidegoods(name) {
      this.curSelected = name; //当前选中卡的名字切换为点击的选项卡名字
      this.right_scroll.scrollToElement("#" + name, 600); //让右侧面板进行滚动
    },
    changeNum(n,name){
      this.$store.commit({
        type:'changegoodsNum',
        n,
        name
      })
    }
  }
};
</script>

<style lang="less" scoped>
body {
  height: 100%;
}
.selected {
  background: #fff;
}
.bottom {
  display: flex;
  .side_bar {
    text-align: center;
    width: 80px;
    height: 500px;
    background: #eee;
    overflow: auto;
    .sidebar_title {
      height: 65px;
      padding: 20px 8px 8px 8px;
    }
  }
  .out_content {
    height: 500px;
    flex: 1;
    background: #eee;
    overflow: auto;
    .title {
      padding: 6px;
    }
    .goodsList {
      height: 120px;
      display: flex;
      justify-content: space-around;
      background: #fff;
      .goodlist_pic {
        margin-top: 20px;
      }
      .goodlist_pic,
      .goodlist_pic img {
        height: 80px;
        width: 80px;
      }
      .goods_content {
        margin-left: -20px;
        margin: 4px 0px 10px -20px;
        .btn_num {
          position: relative;
          right: -28px;
          .btn_add {
            position: absolute;
            left: 40px;
            text-align: center;
          }
          .display {
            display: none;
          }
          button {
            margin: 4px;
          }
        }
        button {
          background: #ffc744;
          height: 20px;
          width: 20px;
          font-size: 20px;
          font-weight: bold;
          color: #333333;
          text-align: center;
          line-height: 20px;
          border-radius: 10px;
          border: none;
          outline: none;
        }
        div {
          height: 22px;
          width: 130px;
          overflow: hidden;
        }
        p {
          margin-top: 4px;
        }
        .goods_title {
          font-weight: bold;
          font-size: 15px;
        }
        .good_price {
          color: red;
          font-size: 16px;
        }
        ._price {
          color: red;
        }
      }
    }
  }
}
</style>