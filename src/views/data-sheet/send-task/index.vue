<template>
  <div class="wrapper-container list-content">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="任务名称" class="fl">
        <el-input v-model="ruleForm.taskName" placeholder="请输入任务名称" clearable @clear="handleClear"></el-input>
      </el-form-item>
      <el-form-item class="fl">
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="handleLoad">导出</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表展示 -->
    <el-table
      :data="tableData"
      class="sign-table"
      v-loading="listLoading"
      style="width: 100%"
      stripe
    >
      <el-table-column min-width="60px" label="任务名称" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.taskName}}</span>
        </template>
      </el-table-column>
      <!-- 任务名称 -->
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
            :danger="true"
            class="mybtn"
            v-if="scope.row.status == '1' && scope.row.sendSign !=='off'"
            @click.native="handleDelTask(scope.row.id)"
          >撤销</MyButton>
          <MyButton
            :danger="true"
            class="mybtn"
            v-if="scope.row.status == '3'"
            @click.native="handleSendTaskAgn(scope.row.id)"
          >失败详情</MyButton>
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

    <!--  弹框 -->
    <DefaultDialog
      :textContent="textContent"
      :dialogVisible="dialogVisible"
      @handleCloseText="handleCloseText"
    ></DefaultDialog>
  </div>
</template>

<script>
import taskState from "../components/taskState.vue"; // 引入签名状态组件
import { DataService } from "@/service"; // 引入短信模块的接口

// 模板表格
const tableList = [
  { label: "任务创建时间", value: "createTime", width: "80px" },
  { label: "任务发送时间", value: "sendDt", width: "60px" },
  { label: "号码数量", value: "taskCount", width: "80px" },
  { label: "失败号码数量", value: "taskFaileCount", width: "80px" },
  { label: "任务状态", value: "status", width: "60px" }
];

export default {
  components: { taskState },
  data() {
    return {
      dialogVisible: false,
      textContent: [],
      tableData: [],
      tableList,
      listLoading: false, // 页面加载
      // 分页器参数
      Pagination: {
        page: 1, // 当前页数
        limit: 10, // 默认每页展示条数
        total: 300 // 分页器总条数
      },
      // 搜索框信息
      ruleForm: {
        taskName: "" // 名称
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
    // 失败详情
    handleSendTaskAgn(id) {
      this.dialogVisible = true;
      this.getDetail(id);
    },
    // 获取详情接口
    async getDetail(id) {
      const { code, data } = await DataService.getDetail(id);
      console.log(data, "hss");
      this.textContent = data;
    },
    //
    handleCloseText(val) {
      this.dialogVisible = val;
    },

    // 查询任务列表
    async handleSendTask() {
      var datas = {
        taskName: this.ruleForm.taskName, // 名称
        page: this.Pagination.page, // 当前页数
        rows: this.Pagination.limit // 显示条数
      };
      this.listLoading = true;
      const { code, data } = await DataService.sendTask(datas);
      this.listLoading = false;
      // 处理数据 若 sendSign == ‘off’ 就让sendDt = createTime的值
      data.list.forEach(item => {
        if (item.sendSign === "off") {
          item.sendDt = item.createTime;
        }
      });
      this.tableData = data.list;
      this.Pagination.page = data.pageNum;
      this.Pagination.total = data.total;
    },

    /**
     * 获取分页的页数
     * */
    pagination(val) {
      console.log(val);
      this.Pagination.page = val.page;
      this.Pagination.limit = val.limit;
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
      DataService.loadTaskList(this.$cookies.get("token"));
    },

    // 撤销
    handleDelTask(id) {
      this.delTask(id);
    },

    // 撤销任务请求
    async delTask(id) {
      const { code, data, errorMsg } = await DataService.cancelTask({
        taskId: id
      });
      if (code == 200) {
        this.$message({
          type: "success",
          message: "撤销成功!"
        });
        this.handleSendTask();
      } else {
        this.$message({
          type: "error",
          message: errorMsg
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.list-content {
  .mybtn {
    margin-right: -20px;
  }
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
