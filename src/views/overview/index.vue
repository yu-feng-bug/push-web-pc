<template >
  <div class="wrapper-container">
    <!-- 第一模块 -->
    <el-row>
      <el-col :span="12">
        <!-- 操作入口  -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="msg-text">快速操作入口</span>
          </div>
          <div>
            <el-row class="msg-content">
              <el-col :span="20">
                已有短信签名
                <span class="count">{{operatObj.signCount}}</span> 个
              </el-col>
              <router-link to="/smsCentre/signature">
                <el-col :span="4" class="btn">添加签名</el-col>
              </router-link>
            </el-row>
            <el-row class="msg-content">
              <el-col :span="20">
                已有短信模版
                <span class="count">{{operatObj.templateCount}}</span> 个
              </el-col>
              <router-link to="/smsCentre/stencil">
                <el-col :span="4" class="btn">添加模版</el-col>
              </router-link>
            </el-row>
            <el-row class="msg-content">
              <el-col :span="20">
                已发送任务量
                <span class="count">{{operatObj.waitTaskCount}}</span>个
              </el-col>
              <router-link to="/dataSheet/sendTask">
                <el-col :span="4" class="btn">查看更多</el-col>
              </router-link>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <!-- 预发条数 -->
        <el-card>
          <div slot="header" class="clearfix">
            <span class="msg-text">财务提醒</span>
          </div>
          <div>
            <el-row class="msg-content">
              <el-col :span="20">
                待支付订单
                <span class="count">12</span>
                个
              </el-col>
              <router-link to="/overview">
                <el-col :span="4" class="btn">去支付</el-col>
              </router-link>
            </el-row>
            <el-row class="msg-content">
              <el-col :span="20">
                可索取发票
                <span class="count">10</span>个
              </el-col>
              <router-link to="/overview">
                <el-col :span="4" class="btn">去开票</el-col>
              </router-link>
            </el-row>
            <el-row class="msg-content">
              <el-col :span="20">
                短信剩余条数
                <span class="count">654</span> 条
              </el-col>
              <router-link to="/overview">
                <el-col :span="4" class="btn">去充值</el-col>
              </router-link>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="date-btn">
      <!-- 日期 -->
      <div class="dateChange">
        <div class="btnclass">
          <span ref="activeDate">日期</span>
          <el-date-picker
            class="picker"
            v-model="dateVal1"
            type="month"
            :editable="false"
            :clearable="false"
            value-format="yyyy-MM"
            @change="handleChooseDate"
          ></el-date-picker>
        </div>
      </div>
    </div>
    <!-- 第二模块 -->
    <div class="echarts">
      <div class="top-title">
        <span class="lf-btn">每月发送短信数量</span>
        <div class="rg-btn">
          <span>
            <router-link to="/dataSheet/sendVolume">
              <span class="btn">查看更多</span>
            </router-link>
          </span>
        </div>
      </div>

      <div id="msgChart" class="msg-chart"></div>
    </div>

    <!-- 第三模块 -->
    <div class="echarts">
      <div class="top-title">
        <span class="lf-btn">近12个月的消费趋势</span>
        <div class="rg-btn">
          <router-link to="/dataSheet/expenses">
            <span class="btn">查看更多</span>
          </router-link>
        </div>
      </div>
      <div id="consumChart" class="msg-chart"></div>
    </div>
  </div>
</template>

<script>
import { OverService } from "@/service";

const dateMounth = [
  "一月份",
  "二月份",
  "三月份",
  "四月份",
  "五月份",
  "六月份",
  "七月份",
  "八月份",
  "九月份",
  "十月份",
  "十一月份",
  "十二月份"
];

export default {
  name: "Overview",
  data() {
    return {
      operatObj: {},
      dateVal1: "",
      dateVal2: "",
      nowDay: "",
      sendCounArr: [],
      consumeArr: [],
      dateMounth,
      resizeTimer: null,
      msgChart: null,
      consumChart: null
    };
  },
  created() {},
  mounted() {
    this.getOperate();
    this.getNowDate();
    let _this = this;
    window.addEventListener("resize", function() {
      if (_this.resizeTimer) clearTimeout(_this.resizeTimer);
      _this.resizeTimer = setTimeout(function() {
        _this.msgChart.resize();
        _this.consumChart.resize();
      }, 100);
    });
  },
  methods: {
    // 获取快速操作的入口
    async getOperate() {
      const { code, data } = await OverService.getOperate();
      this.operatObj = data;
    },

    // 获取当天日期
    getNowDate() {
      var myDate = new Date();
      var mouth =
        myDate.getMonth() > 10
          ? myDate.getMonth() + 1
          : "0" + (myDate.getMonth() + 1);
      this.nowDay = myDate.getFullYear() + "-" + mouth + "-" + myDate.getDate();
      this.getSendTaskList(this.nowDay);
      this.getConsumList(this.nowDay);
    },

    // 获取每个月短信发送量
    async getSendTaskList(day) {
      const obj = {
        dateTime: day,
        token: this.$cookies.get("token")
      };
      const { code, data } = await OverService.getSendCount(obj);
      this.sendCounArr = [];
      for (const val in data) {
        this.sendCounArr.push(data[val]);
      }
      this.handleDrawMsgLine();
    },

    // 选择日期
    handleChooseDate(val) {
      const dateval = val + "-" + new Date().getDate();
      this.getSendTaskList(dateval);
      this.getConsumList(dateval);
    },

    // 每月发送的数量
    handleDrawMsgLine() {
      // 基于准备好的dom，初始化echarts实例
      this.msgChart = this.$echarts.init(document.getElementById("msgChart"));
      // 绘制图表
      this.msgChart.setOption({
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.dateMounth,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "短信数量",
            type: "line",
            barWidth: "30%",
            itemStyle: {
              normal: {
                color: "#0cc2aa"
              }
            },
            data: this.sendCounArr
          }
        ]
      });
    },

    // 获取12月的消费情况
    async getConsumList(day) {
      const obj = {
        dateTime: day,
        token: this.$cookies.get("token")
      };
      const { data } = await OverService.getConsumCount(obj);
      this.consumeArr = [];
      for (const val in data) {
        if (Number(data[val]) < 0) {
          data[val] = data[val] * -1;
        }
        this.consumeArr.push(data[val]);
      }
      this.handelConsumChart();
    },

    // 12月份消费
    handelConsumChart() {
      // 基于准备好的dom，初始化echarts实例
      this.consumChart = this.$echarts.init(
        document.getElementById("consumChart")
      );
      // 绘制图表
      this.consumChart.setOption({
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.dateMounth,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "消费费用",
            type: "bar",
            barWidth: "30%",
            data: this.consumeArr
          }
        ]
      });
    }
  }
};
</script>

<style lang="less" scoped>
.date-btn {
  margin-bottom: 10px;
  text-align: right;
  margin-right: 70px;
}
.dateChange {
  height: 35px;
  display: flex;
  align-items: center;
  width: 60px;
  display: inline-block;
  margin-right: 30px;
  position: relative;
  top: -3px;
  .btnclass {
    float: left;
    text-align: center;
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    box-sizing: border-box;
    border: 1px solid #0cc2aa;
    position: relative;
    margin-top: 15px;
    font-size: 12px;
    margin: 0 2px;
    top: 12px;
    color: #0cc2aa;
    background: #e4f9f6;
    border-color: #0cc2aa;
    cursor: pointer;
    &:hover {
      color: #fff;
      background-color: #04c4ab;
      border-color: #c6e2ff;
    }
    & > span {
      display: inline-block;
      height: 100%;
      width: 100%;
    }

    .el-date-editor {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;
    }
  }
}

.count {
  font-size: 16px;
  font-weight: 480;
}
.echarts {
  position: relative;
  height: 280px;
}
.top-title {
  height: 50px;
  width: 100%;
  line-height: 50px;
  position: absolute;
  top: 0px;
  padding: 0 100px 0 20px;
  margin-bottom: 15px;
  z-index: 999;
  display: flex;
  justify-content: space-between;
}
.lf-btn {
  font-weight: 420;
  font-size: 16px;
  color: #303133;
}

.btn {
  color: #0cc2aa;
  cursor: pointer;
}
.box-card {
  margin-right: 30px;
  margin-bottom: 5px;
}
.msg-text {
  font-weight: 420;
  font-size: 16px;
}
.msg-title {
  font-size: 16px;
  margin-bottom: 10px;
}
.msg-content {
  margin-bottom: 12px;
}
.msg-chart {
  height: 260px;
  padding: 15px 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
  background-color: #fff;
  margin-bottom: 40px;
}
</style>