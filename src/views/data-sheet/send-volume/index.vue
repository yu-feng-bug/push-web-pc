<template>
  <div class="wrapper-container list-content">
    <el-row :gutter="20">
      <el-col :span="2" class="check-name">
        <div>发送日期：</div>
      </el-col>
      <el-col :span="6">
        <el-date-picker
          v-model="changeTime"
          type="daterange"
          range-separator="至"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          :picker-options="pickerOptions"
          @change="handleDate(changeTime)"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-col>
      <el-col :span="2" class="check-name">
        <div>签名：</div>
      </el-col>
      <el-col :span="4">
        <el-select v-model="sendData.signId" placeholder="请选择" clearable>
          <el-option
            v-for="(item,index) in searchSigns"
            :key="index"
            :label="item.sign"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" class="check-name">
        <div>模板选择：</div>
      </el-col>
      <el-col :span="4">
        <el-select v-model="sendData.components" placeholder="请选择">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="sign-table">
      <el-col class="check-list" :span="2">
        <el-button type="primary" @click="Inquire()">查询</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="info" @click="Reset()">重置</el-button>
      </el-col>
      <el-col :span="2">
        <el-button @click="handleLoad">导出</el-button>
      </el-col>
    </el-row>
    <!-- 列表展示 -->
    <el-table :data="tableData" class="sign-table" v-loading="listLoading" stripe>
      <el-table-column
        v-for="(item, index) in tableList"
        :key="index"
        align="center"
        :prop="item.value"
        :label="item.label"
        :min-width="item.width"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <MyButton :default="true" @click.native="handleClick1(scope.row.date)">查看详情</MyButton>
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
import { SmsService } from "@/service"; // 引入短信模块的接口
// 模板表格
const tableList = [
  { label: "发送时间", value: "date", width: "60px" },
  { label: "发送总数（条）", value: "sendCount", width: "60px" },
  { label: "发送成功", value: "successCount", width: "60px" },
  { label: "发送失败", value: "faileCount", width: "100px" },
  { label: "发送成功率", value: "sendSuccessRate", width: "80px" }
];

export default {
  data() {
    return {
      changeTime: [],
      tableData: [],
      tableList,
      listLoading: false, // 页面加载
      // 日期选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      searchSigns: {}, // 签名栏

      searchSign: {
        page: 1, // 分页
        rows: 9999 // 每页显示的条数
      },

      // 分页器参数
      Pagination: {
        page: 1, // 当前页数
        limit: 10, // 默认每页展示条数
        total: 300 // 分页器总条数
      },

      // 模板类型下拉信息
      options1: [
        {
          value: "3",
          label: "全部"
        },
        {
          value: "2",
          label: "验证码"
        },
        {
          value: "1",
          label: "短信通知"
        }
      ],

      // 日期选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },

      endTime: "",
      startTime: "",
      // 搜索框信息
      sendData: {
        startDt: "", // 开始日期
        endDt: "", // 结束日期
        signId: "", // 签名
        components: "", // 模板类型
        page: "1", // 当前页数
        rows: "10" // 显示条数
      }
    };
  },

  created() {
    this.getCurrentMonthFirst();
    this.getCurrentMonthLast();
    this.getSignList(); // 签名列表
    this.handleSendCount(); // 数据列表
  },

  mounted() {},

  methods: {
    //
    handleDate(val) {
      console.log(val);
      this.startTime = val && val[0];
      this.endTime = val && val[1];
    },

    // 查看详情
    handleClick1(val) {
      console.log(val, "val");
      this.$store.commit("SET_DATE", val);
      this.$router.push("/dataSheet/sendRecord");
    },
    //
    getCurrentMonthFirst() {
      let date = new Date();
      date.setDate(1);
      let month = parseInt(date.getMonth() + 1);
      let day = date.getDate();
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      this.startTime = date.getFullYear() + "-" + month + "-" + day;
    },
    getCurrentMonthLast() {
      let date = new Date();
      let month = parseInt(date.getMonth() + 1);
      let day = date.getDate();
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      this.endTime = date.getFullYear() + "-" + month + "-" + day;
    },
    // 获取签名列表页
    async getSignList() {
      const { code, data } = await SmsService.signInfoList(this.searchSign);
      this.searchSigns = data.list;
    },

    // 查询按钮
    async handleSendCount() {
      let datas = {
        startDt: this.startTime, // 起始日期
        endDt: this.endTime, // 结束日期
        signId: this.sendData.signId, // 签名
        templateType: this.sendData.components, // 模板类型
        page: this.sendData.page, // 当前页数
        rows: this.sendData.rows // 显示条数
      };
      this.listLoading = true;
      const { code, data } = await DataService.SendCount(datas);
      this.listLoading = false;
      this.tableData = data.list;
      this.Pagination.page = data.pageNum;
      this.Pagination.total = data.total;
    },

    // 查询按钮
    Inquire() {
      this.sendData.page = 1;
      console.log(this.sendData);
      this.handleSendCount();
    },

    // 重置按钮
    Reset() {
      this.getCurrentMonthFirst();
      this.getCurrentMonthLast();
      this.sendData = {
        signId: "", // 签名
        components: "", // 模板类型
        page: "1", // 当前页数
        rows: "10" // 显示条数
      };

      this.handleSendCount();
    },
    // 导出
    handleLoad() {
      let datas = {
        startDt: this.startTime, // 起始日期
        endDt: this.endTime, // 结束日期
        signId: this.sendData.signId, // 签名
        templateType: this.sendData.components // 模板类型
      };
      DataService.loadSendRecrd(datas);
    },

    // 分页器按钮
    pagination(val) {
      console.log(val);
      this.sendData.page = val.page;
      this.sendData.rows = val.limit;
      this.handleSendCount();
    }
  },
  watch: {
    changeTime(val) {
      if (!val) {
        this.getCurrentMonthFirst();
        this.getCurrentMonthLast();
        this.handleSendCount();
      }
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
</style>
