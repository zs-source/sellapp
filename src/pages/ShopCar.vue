<template>
  <div>
    <!-- <h1>购物车</h1> -->
    <div class="shopcar_boxtop">
      <div>购物车</div>
      <div>清空购物测</div>
    </div>
    <div>
      <div v-for="item in goodsList" :key="item.id" class="shopcar_boxbottom">
        <div class="left">{{item.name}}</div>
        <div class="right">
          <span>￥{{item.price}}</span>&emsp;
          <span>
            <button @click="changeNum(-1,item.name)">-</button>
            {{item.num}}
            <button @click="changeNum(1,item.name)">+</button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    goodsList() {
      return this.$store.getters.getgoods;
    }
  },
  methods: {
    changeNum(n, name) {
      this.$store.commit({
        type: "changegoodsNum",
        n,
        name
      });
    }
  }
};
</script>

<style lang="less" scoped>
.shopcar_boxtop,
.shopcar_boxbottom {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.shopcar_boxbottom button {
  height: 20px;
  width: 20px;
  border-radius: 10px;
  border: none;
  outline: none;
  background: #ffc744;
  font-weight: bold;
  text-align: center;
}
</style>