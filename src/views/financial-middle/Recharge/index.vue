<template>
  <div class="wrapper-container list-content">
    <el-row :gutter="20">
      <el-col :span="2" class="check-name">
        <div>下单日期：</div>
      </el-col>
      <el-col :span="3">
        <div class="block">
          <el-date-picker
            v-model="sendData.time"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy/MM/dd HH:mm:ss"
            style="width: 100%;"
          ></el-date-picker>
        </div>
      </el-col>
      <el-col :span="2" class="check-name">
        <div>订单号：</div>
      </el-col>
      <el-col :span="3">
        <el-input placeholder="请输入订单号" v-model="sendData.module" clearable></el-input>
      </el-col>
      <el-col :span="2" class="check-name">
        <div>订单状态：</div>
      </el-col>
      <el-col :span="3">
        <el-select v-model="sendData.components" placeholder="请选择">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col class="check-list" :span="2">
        <el-button type="primary" @click="Inquire()">查询</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" plain @click="Reset()">导出</el-button>
      </el-col>
      <el-col :span="2">
        <el-button>充值</el-button>
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
          <el-button @click="handleClick1(scope.row.id)" type="primary" plain>去付款</el-button>
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
// 模板表格
const tableList = [
  { label: "订单号", value: "templateName", width: "100px" },
  { label: "套餐类型", value: "templateSign", width: "100px" },
  { label: "套餐名称", value: "templateContent", width: "100px" },
  { label: "下单时间", value: "templateType", width: "120px" },
  { label: "支付时间", value: "checkStatus", width: "120px" },
  { label: "充值条数", value: "checkStatus", width: "100px" },
  { label: "充值后总条数", value: "checkStatus", width: "120px" },
  { label: "订单金额", value: "checkStatus", width: "100px" },
  { label: "支付金额", value: "checkStatus", width: "100px" },
  { label: "支付方式", value: "checkStatus", width: "100px" },
  { label: "订单状态", value: "checkStatus", width: "100px" },
  { label: "备注", value: "checkStatus", width: "100px" }
];

export default {
  data() {
    return {
      tableData: [],
      tableList,
      listLoading: false, // 页面加载

      // 分页器参数
      Pagination: {
        page: 1, // 当前页数
        limit: 10, // 默认每页展示条数
        total: 300 // 分页器总条数
      },

      // 模板类型下拉信息
      options1: [
        {
          value: "1",
          label: "待支付"
        },
        {
          value: "2",
          label: "已支付"
        },
        {
          value: "3",
          label: "取消"
        }
      ],

      // 日期选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },

      // 搜索框信息
      sendData: {
        time: "", // 日期
        module: "", // 订单号
        components: "", // 订单状态
        page: "1", // 当前页数
        rows: "10" // 显示条数
      }
    };
  },

  created() {},

  mounted() {},

  methods: {
    // 查询按钮
    Inquire() {
      console.log(this.sendData);
    },

    // 导出按钮
    Reset() {},

    // 分页器按钮
    pagination(val) {
      console.log(val);
      this.sendData.page = val.page;
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
