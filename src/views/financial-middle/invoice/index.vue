<template >
  <div class="wrapper-container invoice-wrapper">
    <!-- 标签页 -->
    <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
      <el-tab-pane label="开票列表" name="first"></el-tab-pane>
      <el-tab-pane label="发票索取" name="second"></el-tab-pane>
      <el-tab-pane label="发票信息管理" name="third"></el-tab-pane>
      <el-tab-pane label="寄送地址管理" name="fourth"></el-tab-pane>
      <el-tab-pane label="提交发票" name="five"></el-tab-pane>
    </el-tabs>
    <!-- 开票列表 -->
    <div v-show=" activeName === 'first'">
      <BillList></BillList>
    </div>
    <!-- 步骤条 -->
    <div class="steps-content" v-if="isShowStep">
      <el-steps :active="active" align-center>
        <el-step title="第一步" description="选择开票订单"></el-step>
        <el-step title="第二步" description="选择开票信息"></el-step>
        <el-step title="第三步" description="选择寄送地址"></el-step>
        <el-step title="第四步" description="确认信息并提交发票申请"></el-step>
      </el-steps>
    </div>
    <!-- 发票索取 -->
    <div v-show=" activeName === 'second'">
      <InvoiceRequest @handleTabChild="handleTabChild"></InvoiceRequest>
    </div>

    <!-- 发票信息管理 -->
    <div v-show=" activeName === 'third'">
      <InformationManage @onChangeInvoice="handleTabInvoice"></InformationManage>
    </div>

    <!-- 寄送地址管理 -->
    <div v-show=" activeName === 'fourth'">
      <ShippAddress @handleAddress="handleAddress"></ShippAddress>
    </div>

    <!-- 提交信息 -->
    <div v-show=" activeName === 'five'">
      <InvoiceMessage></InvoiceMessage>
    </div>
  </div>
</template>

<script>
import BillList from "./components/BillList"; // 开票列表
import InvoiceRequest from "./components/InvoiceRequest"; // 发票索取
import InformationManage from "./components/InformationManage"; // 发票索取
import ShippAddress from "./components/ShippAddress"; // 寄送地址管理
import InvoiceMessage from "./components/InvoiceMessage"; // 提交发票信息

export default {
  name: "",
  components: {
    BillList,
    InvoiceRequest,
    InformationManage,
    ShippAddress,
    InvoiceMessage
  },
  data() {
    return {
      activeName: "first",
      active: 1,
      isShowStep: false
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 点击寄送地址使用
    handleAddress(val) {
      this.active++;
      this.activeName = val;
    },

    // 发票索取页面传入的tabs 值
    handleTabChild(val) {
      this.active++;
      this.activeName = val;
    },

    // 点击发票信息管理的使用
    handleTabInvoice(val) {
      this.active++;
      this.activeName = val;
    },

    // tab 页面点击切换
    handleClick(val) {
      val !== "first" ? (this.isShowStep = true) : (this.isShowStep = false);
      switch (val) {
        case "second":
          this.active = 1;
          break;
        case "third":
          this.active = 2;
          break;
        case "fourth":
          this.active = 3;
          break;
        case "five":
          this.active = 4;
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.invoice-wrapper {
  .steps-content {
    padding: 0 20px;
    margin: 5px auto 20px auto;
  }
}
</style>
