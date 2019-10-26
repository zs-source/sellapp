<template>
  <div id="scroll_bottom" class="wrapper">
    <ul class="content">
      <div class="talkabout_top">
        <div class="talkabout_left">
          <p style="color:orange;font-size: 27px">3.9</p>
          <p>综合评分</p>
          <p style="fontSize:10px">高于周边商家69.2%</p>
        </div>
        <div class="talkabout_right">
          <p>
            服务态度
            <img src="../assets/imgs/star24_on@2x.png" alt />
            <img src="../assets/imgs/star24_on@2x.png" alt />
            <img src="../assets/imgs/star24_on@2x.png" alt />
            <img src="../assets/imgs/star24_on@2x.png" alt />
            <img style="height:19px;" src="../assets/imgs/star36_off@2x.png" alt />
            <span>3.9</span>
          </p>
          <p>
            服务态度
            <img src="../assets/imgs/star24_on@2x.png" alt />
            <img src="../assets/imgs/star24_on@2x.png" alt />
            <img src="../assets/imgs/star24_on@2x.png" alt />
            <img src="../assets/imgs/star24_on@2x.png" alt />
            <img style="height:19px;" src="../assets/imgs/star36_off@2x.png" alt />
            <span>4.0</span>
          </p>
          <p>送达时间&emsp;44分钟</p>
        </div>
      </div>
      <div class="talkabout_bottom">
        <div class="bottom_top" style="margin-left:20px">
          <span style="background:#00A0DC;">全部57</span>
          <span style="background:#CCECF7">满意47</span>
          <span style="background:#EAEBED">不满意10</span>
        </div>
        <div class="talkabout_content">
          <div>
            <Radio v-model="single">只看有内容的评论</Radio>
          </div>
          <div class="person_content" v-for="item in  ratingsList" :key="item.id">
            <div class="header_pic">
              <img style="width:100%;" :src="item.avatar" alt />
            </div>
            <div class="right_content">
              <div style="display:flex;justify-content: space-between">
                <div>{{item.username}}</div>
                <div>{{ total_timers}}</div>
              </div>
              <p>{{item.text}}</p>
              <p>
                <span>dfdff</span>
                <span>111111</span>
                <span>yyjujuj</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
import { getRatings } from "../apis/api";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      ratingsList: [],
      single: false,
      rateTime: "",
      time: 0,
      total_timers: ""
    };
  },
  created() {
    getRatings().then(res => {
      this.ratingsList = res.data.data;
      //   res.data.data.map(item=>{
      //     //    this.ratingsList.push(item.rateTime)
      //       console.log(' item.rateTime',  item.rateTime)
      //   })
      this.rateTime = res.data.data[0].rateTime;
      let times = new Date(parseInt(this.rateTime, 10));
      let year = times.getFullYear(this.rateTime);
      let month = times.getMonth();
      let day = times.getDate();
      let hour = times.getHours();
      let minute = times.getMinutes();
      let total_timers = `${year}-${month}-${day} ${hour}:${minute}`;
      this.total_timers = total_timers;
    });
  },
  mounted() {
    let scroll = new BScroll("#scroll_bottom");
  }
};
</script>

<style lang="less" scoped>
.wrapper{
    height: 600px;
    overflow: hidden;
}
.talkabout_top {
  display: flex;
  height: 130px;
  background: #fff;
  border-bottom: 1px solid rgb(151, 150, 150);
  padding: 20px;
  .talkabout_left {
    width: 100px;
    text-align: center;
    border-right: 1px solid rgb(75, 69, 69);
    p {
      padding: 2px 0px;
    }
  }
  .talkabout_right {
    flex: 1;
    padding-left: 20px;
    span {
      color: orange;
      margin: 0px 10px;
    }
    p {
      padding: 4px 0px;
    }
  }
}
.talkabout_bottom {
  border-top: 20px solid #eee;
  .bottom_top {
    span {
      display: inline-block;
      height: 35px;
      width: 60px;
      margin: 20px 5px;
      color:#5B6066;
      line-height: 38px;
      text-align: center;
    }
  }
  .talkabout_content {
    margin-left: 20px;
  }
  .person_content {
    display: flex;
    padding: 20px 0px;
    border-bottom: 1px solid #eee;
    .header_pic {
      height: 30px;
      width: 30px;
      border-radius: 20px;
      overflow: hidden;
    }
    .right_content {
      flex: 1;
      margin-left: 20px;
      padding: 0px 10px;
    }
  }
}
</style>