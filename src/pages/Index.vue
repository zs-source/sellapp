<template>
  <div class="wrapper">
    <!-- <div class="header" :style="{backgroundImage: `url(${avatar})`}"> -->
    <div class="header">
      <div class="header_pic">
        <img :src="avatar" />
      </div>
      <div class="right_content">
        <p class="seller_name">
          <img src="../assets/imgs/brand@2x.png" alt />
          {{name}}
        </p>
        <p>{{ description}}/{{deliveryTime}}分钟到达</p>
        <p class="decrease">
          <img src="../assets/imgs/decrease_1@2x.png" alt />
          {{getSupports}}
        </p>
      </div>
    </div>
    <div class="tips">
      <img src="../assets/imgs/bulletin@2x.png" alt />
      {{bulletin}}
    </div>
    <button
      v-show="flag_icon"
      class="btn_icon"
      :style="{background:i==0? icon1_bgcolor:icon2_bgcolor}"
    >{{geticonNum}}</button>
    <div class="header_title">
      <label :class="{selected:curPage=='/'}" @click="click_title('/')">商品</label>
      <label :class="{selected:curPage=='/talkabout'}" @click="click_title('/talkabout')">评论</label>
      <label :class="{selected:curPage=='/seller'}" @click="click_title('/seller')">商家</label>
    </div>
    <router-view></router-view>
    <!-- 面板 -->
    <transition name="slide-fade">
      <div v-show="flag" class="shopcar_box">
        <shopcar></shopcar>
      </div>
    </transition>
    <!-- 购物车 -->
    <div class="shop_car">
      <div class="shopcar_wrapper">
        <div class="shopcar_left">
          <div
            @click="click_shopcar"
            class="shopcar_logo"
            :style="{background:i==0? default_bgcolor:bgcolor}"
          >
            <img :src="getImg" />
          </div>
          <div class="price">￥{{getTotalPrice}}</div>
        </div>
        <div class="shopcar_middle">另需配送费 ￥5</div>
        <div
          :style="{background:style==0? '#969696':'#ffc744'}"
          class="shopcar_right"
          v-text="text==0? '￥20起送':'去结算'"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import shopcar from "./ShopCar";
import { getSeller } from "../apis/api";
export default {
  components: { shopcar },
  data() {
    return {
      default_bgcolor: "#666666",
      bgcolor: "#FFD161",
      num: "",
      curPage: "/",
      avatar: "",
      name: "",
      description: "",
      deliveryTime: "",
      supports: "",
      bulletin: "",
      i: 0,
      flag_icon: false,
      flag: false,
      text: 0,
      style: 0,
      icon2_bgcolor: "#FB4E44"
    };
  },
  methods: {
    click_title(hash) {
      this.curPage = hash;
      this.$router.push(hash);
    },
    click_shopcar() {
      this.flag = !this.flag;
    }
  },
  created() {
    this.num = this.$store.state.num;
    getSeller()
      .then(res => {
        let {
          name,
          avatar,
          deliveryTime,
          description,
          bulletin,
          supports
        } = res.data.data;
        this.name = name;
        this.avatar = avatar;
        this.deliveryTime = deliveryTime;
        this.description = description;
        this.supports = supports;
        this.bulletin = bulletin;
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    getSupports() {
      let str = "";
      for (let obj of this.supports) {
        str += obj.description + ",";
      }
      return str;
    },
    getTotalPrice() {
      let totalPrice = 0;
      this.$store.getters.getgoods.map(obj => {
        totalPrice += obj.num * obj.price;
      });
      return totalPrice;
    },
    geticonNum() {
      let iconNum = 0;
      this.$store.getters.getgoods.map(obj => {
        iconNum += obj.num;
      });
      return iconNum;
    },
    getImg() {
      if (this.$store.getters.getgoods.length > 0) {
        this.i = 1;
        this.text = 1;
        this.style = 1;
        this.flag_icon = true;
        return require("../assets/imgs/ic_gouwuchecopy (1).png");
      } else {
        this.i = 0;
        this.text = 0;
        this.style = 0;
        return require("../assets/imgs/ic_gouwuchecopy (2).png");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.bt {
  height: 40px;
  width: 40px;
  background: rgb(248, 203, 203);
}
.header_title {
  display: flex;
  justify-content: space-around;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  border-bottom: 1px solid rgb(206, 201, 201);
}
.selected {
  color: red;
}
.header {
  height: 115px;
  background: #333333;
  line-height: 30px;
  display: flex;
  padding: 20px;
  color: #fff;
}
.tips {
  background: #333333;
}
.header_pic {
  height: 80px;
  width: 80px;
}
.header_pic img {
  width: 80px;
}
.right_content {
  margin-left: 19px;
}
.seller_name {
  font-weight: bold;
  font-size: 20px;
}
.seller_name img,
.tips img {
  width: 30px;
}
.decrease {
  overflow: hidden;
  height: 22px;
}
.decrease img {
  width: 20px;
  height: 15px;
}
.tips {
  color: #fff;
  overflow: hidden;
  height: 50px;
  line-height: 33px;
  padding: 10px;
}
.shop_car {
  position: fixed;
  bottom: 0px;
  width: 100%;
}
.shopcar_wrapper {
  display: flex;
  height: 60px;
  text-align: center;
  line-height: 60px;
  background: #333333;
  color: #fff;
  .shopcar_left {
    width: 120px;
    display: flex;
    .price {
      flex: 1;
      text-align: right;
    }
    .shopcar_logo {
      position: absolute;
      top: -15px;
      left: 15px;
      height: 50px;
      width: 50px;
      border-radius: 25px;
      background: rgb(54, 54, 54);
      overflow: hidden;
      img {
        height: 28px;
        margin-top: 12px;
      }
    }
  }
  .shopcar_right {
    background: #ffc234;
    color: #3b3b3c;
  }
  .shopcar_middle {
    flex: 1;
  }
  .shopcar_right {
    width: 80px;
  }
}
.shopcar_box {
  position: fixed;
  bottom: 60px;
  width: 100%;
  background: #fff;
}
.btn_icon {
  position: absolute;
  bottom: 60px;
  left: 48px;
  z-index: 100;
  border-radius: 9px;
  height: 18px;
  width: 18px;
  text-align: center;
  font-size: 4px;
  outline: none;
  border: none;
  color: #fff;
  font-size: 12px;
}
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(100px);
  opacity: 0;
}
</style>