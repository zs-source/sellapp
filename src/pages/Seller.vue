<template>
  <div>
    <div class="seller_top">
      <div>
        <p>粥品香坊(大运村)</p>
        <p>
          <img src="../assets/imgs/star24_on@2x.png" alt />
          <img src="../assets/imgs/star24_on@2x.png" alt />
          <img src="../assets/imgs/star24_on@2x.png" alt />
          <span>月销690单</span>
        </p>
      </div>
      <div class="seller_send">
        <div>起送价</div>
        <div>商家配送</div>
        <div>平均配送时间</div>
      </div>
    </div>
    <div class="seller_content">
      <div>的肌肤顶顶顶</div>
      <div class="list">
        <img src="../assets/imgs/decrease_3@2x.png" alt />
        <span>在线支付满减优惠</span>
      </div>
    </div>
    <div class="seller_img">
      <h3>商家实景</h3>
      <img src alt />
    </div>
    <div class="seller_msg">
      <h3>商家信息</h3>
      <div>
        <div>该商家支持开发票</div>
        <div>品类</div>
        <div>地址</div>
        <div>营业时间</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    console.log("shopcar_this", this);
  }
};
</script>

<style lang="less" scoped>
.seller_top {
  padding: 20px;
  .seller_send {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-top: 1px solid rgb(221, 220, 220);
    margin-top: 10px;
    div:nth-child(1){
      border-right: 1px solid #eeee;
    }
  }
}
.seller_content {
  border-top: 20px solid #eee;
  padding: 20px;
  .list {
    img {
      height: 15px;
      width: 15px;
    }
  }
}
.seller_img {
  padding: 20px;
  border-top: 20px solid #eee;
}
.seller_msg {
  padding: 20px;
  border-top: 20px solid #eee;
}
</style>