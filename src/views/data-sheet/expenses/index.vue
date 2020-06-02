<template>
  <div class="wrapper-container list-content">
    <el-row>
      <el-col :span="12">
        <!-- 剩余条数  -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="msg-text">剩余短信数量统计</span>
          </div>
          <div class="msg-title">
            <el-row>
              <el-col :span="12">类型</el-col>
              <el-col :span="12">数量</el-col>
            </el-row>
          </div>

          <el-row class="msg-content">
            <el-col :span="12">验证码</el-col>
            <el-col :span="12">{{userObj.checkCode}} 条</el-col>
          </el-row>
          <el-row class="msg-content">
            <el-col :span="12">短信通知</el-col>
            <el-col :span="12">{{userObj.message}} 条</el-col>
          </el-row>
          <el-row class="msg-content">
            <el-col :span="12">推广短信</el-col>
            <el-col :span="12">{{userObj.promote}} 条</el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <!-- 预发条数 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="msg-text">预发短信数量统计</span>
          </div>
          <div class="msg-title">
            <el-row>
              <el-col :span="12">类型</el-col>
              <el-col :span="12">数量</el-col>
            </el-row>
          </div>
          <el-row class="msg-content">
            <el-col :span="12">验证码</el-col>
            <el-col :span="12">{{userObj.expectCheckCode}} 条</el-col>
          </el-row>
          <el-row class="msg-content">
            <el-col :span="12">短信通知</el-col>
            <el-col :span="12">{{userObj.expectMessage}} 条</el-col>
          </el-row>
          <el-row class="msg-content">
            <el-col :span="12">推广短信</el-col>
            <el-col :span="12">{{userObj.expectPromote}} 条</el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!-- 搜索栏 -->
    <el-row :gutter="20" class="sign-table">
      <el-col :span="2" class="check-name">
        <span>消费月份</span>
      </el-col>
      <el-col :span="6">
        <div class="block">
          <el-date-picker
            :editable="false"
            v-model="sendData.mouthDt"
            value-format="yyyy-MM"
            type="month"
            placeholder="选择日期"
          ></el-date-picker>
        </div>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" plain @click="inquire">查询</el-button>
      </el-col>
      <el-col :span="2">
        <el-button @click="handleLoad">导出</el-button>
      </el-col>
    </el-row>
    <!-- 列表数据展示 -->
    <el-table :data="tableData" class="sign-table" v-loading="listLoading" stripe>
      <el-table-column
        v-for="(item, index) in tableList"
        :key="index"
        align="center"
        :prop="item.value"
        :label="item.label"
        :min-width="item.width"
      >
        <template slot-scope="scope">
          <div>
            <!-- 展示：除了审核状态和模板类型 其他值 -->
            <span v-if="item.value !== 'payType' ">{{scope.row[item.value]}}</span>
            <TypeText v-if="item.value == 'payType'" :type="scope.row[item.value]"></TypeText>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <Pagination
      :page="Pagination.page"
      :limit="Pagination.limit"
      :total="Pagination.total"
      @pagination="pagination"
    />
  </div>
</template>

<script>
import { DataService } from "@/service"; // 引入短信模块的接口
import TypeText from "./../components/typeText";

// 模板表格
const tableList = [
  { label: "序号", value: "id", width: "60px" },
  { label: "消费时间", value: "payDt", width: "60px" },
  { label: "消费前", value: "payBeforeCnt", width: "60px" },
  { label: "消费后", value: "payBehindCnt", width: "60px" },
  { label: "消费类型", value: "payType", width: "100px" },
  { label: "消费条数", value: "realPayCnt", width: "80px" },
  { label: "剩余条数", value: "payBehindCnt", width: "80px" }
];
export default {
  components: { TypeText },
  data() {
    return {
      Pagination: {
        page: 1, // 当前页数
        limit: 10, // 默认每页展示条数
        total: 0 // 分页器总条数
      },
      tableList,
      listLoading: false, // 页面加载
      sendData: {
        page: "1", // 当前页数
        rows: "10", // 显示条数
        mouthDt: "" // 日期
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now(); // 日期选择器
        }
      },
      tableData: [], // 列表展示数据
      userObj: {}
    };
  },
  created() {},

  mounted() {
    this.handleGetConsumeList();
    this.getUserList(this.sendData.mouthDt);
  },

  methods: {
    // 获取用户剩余短信
    async getUserList(date) {
      const obj = {
        mouthDt: date
      };
      const { code, data } = await DataService.getUserMsg(obj);
      this.userObj = data;
    },

    // 获取消费列表
    async handleGetConsumeList() {
      this.listLoading = true;
      const { code, data } = await DataService.getConsumeList(this.sendData);
      this.listLoading = false;
      this.tableData = data.list;
      this.Pagination.total = data.total;
    },

    // 查询按钮
    inquire() {
      this.sendData.page = 1;
      this.handleGetConsumeList();
      this.getUserList(this.sendData.mouthDt);
    },

    // 分页器按钮
    pagination(val) {
      this.sendData.page = val.page;
      this.Pagination.limit = val.limit;
      this.sendData.rows = val.limit;
      this.handleGetConsumeList();
    },

    // 导出表格
    handleLoad() {
      DataService.consumeExport(this.$cookies.get("token"));
    }
  }
};
</script>

<style lang="less" scoped>
.list-content {
  .check-name {
    height: 40px;
    line-height: 40px;
    text-align: right;
  }
  .sign-table {
    margin-top: 26px;
  }
  .check-list {
    margin-left: 60px;
  }
}
.box-card {
  margin-right: 30px;
  margin-bottom: 30px;
}
.msg-text {
  font-weight: 420;
  font-size: 16px;
}

.msg-title {
  font-size: 16px;
  margin-bottom: 20px;
}
.msg-content {
  margin-bottom: 10px;
}
.el-table th,
.el-table tr {
  background: #ffdf25;
}
.advance,
.remaining {
  background: #ffdf25;
  box-shadow: 6px 6px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  padding: 10px;
  margin-right: 20px;
  width: 300px;
  height: 150px;
}
.advance {
  background: #36a9ce;
}
.el-table::before {
  height: 0px;
}
.fl {
  float: left;
}
</style>
