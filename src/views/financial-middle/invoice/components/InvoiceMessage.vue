import { mapGetters } from 'vuex';
<template>
  <div class="invoice-content">
    <span class="title">关联订单</span>
    <el-divider></el-divider>
    <!-- 展示订单信息 -->
    <div class="order-content chile-content">
      <div class="order-note" v-if="!billsArr.length">
        <span>请在《发票索取》中，选择订单</span>
      </div>
      <div v-else>
        <div v-for="item in  billsArr" :key="item.id" class="order-item">
          <el-row>
            <el-col :span="4">订单号: {{item.id}}</el-col>
            <el-col :span="4">套餐名称: 套餐一</el-col>
            <el-col :span="4">开票金额: ¥ 900.00</el-col>
            <el-col :span="6">订单时间: {{item.createTime}}</el-col>
          </el-row>
        </div>
      </div>
    </div>
    <span class="title">开票信息</span>
    <el-divider></el-divider>
    <!-- 开票信息 -->
    <div class="invoice-content chile-content">
      <!-- 发票抬头 -->
      <el-row class="order-item">
        <el-col :span="6">发票抬头：上海易恒科技有限格式</el-col>
        <el-col :span="6">发票金额： ¥{{invoiceObj.id}}</el-col>
        <el-col :span="6">发票类型： 企业</el-col>
      </el-row>
      <!-- 收取地址 -->
      <el-row>
        <el-col :span="6">收货地址：上海徐家汇天月桥1000号</el-col>
        <el-col :span="6">收件人：{{addressObj.createTime}}</el-col>
        <el-col :span="6">电话: 18362390864</el-col>
      </el-row>
    </div>

    <!-- 提交按钮 -->
    <div class="btn-content">
      <el-button @click="handleSearch" class="stap">上一步</el-button>
      <el-button type="primary" plain @click="handleSearch">提交申请</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      billsArr: state => state.invoiceInfor.billsArr,
      addressObj: state => state.invoiceInfor.addressObj,
      invoiceObj: state => state.invoiceInfor.invoiceObj
    })
  },
  created() {
    console.log(this.$store.state);
  }
};
</script>

<style lang="less" scoped>
.invoice-content {
  .chile-content {
    padding: 2px 26px;
  }
  .order-note {
    text-align: center;
    font-size: 16px;
    color: #adafaf;
  }
  .title {
    font-size: 20px;
    font-weight: 500;
  }
  .order-content {
    margin-bottom: 26px;
  }
  .order-item {
    margin: 16px auto;
  }
  .btn-content {
    margin: 60px auto;
    text-align: center;
    .stap {
      margin-right: 50px;
      // margin-left: -200px;
    }
  }
}
</style>