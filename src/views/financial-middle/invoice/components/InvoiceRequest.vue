<template>
  <div class="wrapper-container list-content">
    <!-- 搜索栏 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="10">
          <el-form-item label="付款日期:">
            <el-date-picker
              v-model="dataVal"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="订单号:" class="fl">
            <el-input
              v-model="ruleForm.taskName"
              placeholder="请输入任务名称"
              clearable
              @clear="handleClear"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="套餐名称" class="fl">
            <el-input
              v-model="ruleForm.taskName"
              placeholder="请输入任务名称"
              clearable
              @clear="handleClear"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <el-form-item class="fl">
            <el-button type="primary" @click="handleSearch">查询</el-button>
          </el-form-item>
        </el-col>

        <el-col :span="2">
          <el-form-item class="fl">
            <el-button @click="handleSearch">导出</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" plain @click="handleChooseBill">索取发票</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 列表展示 -->
    <el-table
      :data="tableData"
      class="sign-table"
      v-loading="listLoading"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      stripe
    >
      <!-- 选择 -->
      <el-table-column type="selection" width="60"></el-table-column>
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
            <span
              v-if="item.value !== 'status' && item.value !== 'taskName' "
            >{{scope.row[item.value]}}</span>

            <!-- 审核状态值 -->
            <taskState v-if="item.value === 'status'" :taskState="scope.row.status" />
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="scope">
          <MyButton
            :warning="true"
            v-if="scope.row.status == '1'"
            @click.native="handleDelTask(scope.row.id)"
          >撤销</MyButton>
          <MyButton
            :primary="true"
            v-if="scope.row.status == '3'"
            @click.native="handleDelTask(scope.row.id)"
          >重发</MyButton>
        </template>
        <!-- 提交处理失败时 可显示 重发操作 暂时未写改功能 -->
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
import taskState from "../../components/taskState"; // 引入签名状态组件
import { DataService } from "@/service"; // 引入短信模块的接口

// 模板表格
const tableList = [
  { label: "订单号", value: "createTime", width: "80px" },
  { label: "订单支付时间", value: "sendDt", width: "60px" },
  { label: "套餐名称", value: "taskCount", width: "60px" },
  { label: "订单实付金额", value: "taskFaileCount", width: "60px" }
];
const invoiceState = [
  { value: "0", label: "全部" },
  { value: "1", label: "申请成功" },
  { value: "2", label: "申请失败" },
  { value: "3", label: "申请中" }
];

export default {
  components: { taskState },
  data() {
    return {
      chooseArr: [],
      invoiceState,
      dataVal: "",
      pickerOptions: {},
      tableData: [],
      tableList,
      listLoading: false, // 页面加载
      // 分页器参数
      Pagination: {
        page: 1, // 当前页数
        limit: 5, // 默认每页展示条数
        total: 300 // 分页器总条数
      },
      // 搜索框信息
      ruleForm: {
        invoiceState: "0",
        taskName: "", // 名称
        page: "1", // 当前页数
        rows: "10" // 显示条数
      },
      rules: {
        name: [{ required: true, message: "请输入任务名称", trigger: "blur" }]
      }
    };
  },

  created() {
    this.handleSendTask();
  },

  mounted() {},

  methods: {
    // 点击索取发票
    handleChooseBill() {
      if (!this.chooseArr.length) {
        this.$message({
          showClose: true,
          message: "请选择订单",
          type: "warning"
        });
      } else {
        this.$emit("handleTabChild", "third");
      }
    },

    // 选择框内容
    handleSelectionChange(val) {
      if (val.length) {
        this.chooseArr = val;
        this.$store.commit("SET_BILLSARR", this.chooseArr);
      }
    },

    // 查询任务列表
    async handleSendTask() {
      this.listLoading = true;
      const { code, data } = await DataService.sendTask(this.ruleForm);
      this.listLoading = false;
      // 处理数据 若 sendSign == ‘off’ 就让sendDt = createTime的值
      data.list.forEach(item => {
        if (item.sendSign === "off") {
          item.sendDt = item.createTime;
        }
      });
      this.tableData = data.list;
      this.Pagination.page = data.pageNum;
      this.Pagination.total = 14;
    },

    /**
     * 获取分页的页数
     * */
    pagination(val) {
      this.ruleForm.page = val.page;
      this.handleSendTask();
    },

    // 查询任务
    handleSearch() {
      this.ruleForm.page = 1;
      this.handleSendTask();
    },

    // 清除任务时
    handleClear() {
      this.ruleForm = {
        taskName: "",
        page: "1",
        rows: "10"
      };
      this.handleSendTask();
    },

    // 导出
    handleLoad() {
      DataService.loadTaskList();
    }
  },
  watch: {
    orderArr: {
      handler(newVal, oldVal) {
        this.orderArr = newVal;
      },
      immediate: true,
      deep: true
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
.fl {
  float: left;
}
</style>
