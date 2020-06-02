<template>
  <div class="wrapper-container list-content">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item label="发票名称:" class="fl">
            <el-input
              v-model="ruleForm.taskName"
              placeholder="请输入发票名称"
              clearable
              @clear="handleClear"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item class="fl">
            <el-button type="primary" @click="handleSearch">查询</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item class="fl">
            <el-button @click="handleLoad">导出</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" plain @click="dialogVal = true">新增开票信息</el-button>
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
      stripe
    >
      <el-table-column type="index" width="50"></el-table-column>
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
      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <MyButton :primary="true" @click.native="handleChooseInvoice(scope.row)">使用</MyButton>
          <MyButton :warning="true" @click.native="handleDelTask(scope.row.id)">编辑</MyButton>
          <MyButton :danger="true" @click.native="handleDelTask(scope.row.id)">删除</MyButton>
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

    <!-- 弹框组件-->
    <el-dialog title="新增发票信息" :visible.sync="dialogVal" width="34%">
      <div>
        <!-- form表单 -->
        <el-form
          :model="formList"
          :rules="rules"
          ref="formList"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="开具类型" prop="resource">
            <el-radio-group v-model="formList.lssuType">
              <el-radio label="个人"></el-radio>
              <el-radio label="企业"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="发票抬头" prop="name">
            <el-input v-model="formList.invoice"></el-input>
          </el-form-item>
          <el-form-item label="发票类型" prop="resource">
            <el-radio-group v-model="formList.invoiceType">
              <div class="radio-text">
                <el-radio label="增值税普通发票"></el-radio>
              </div>
              <div class="radio-text">
                <el-radio label="增值税专用发票"></el-radio>
              </div>
              <div>
                <el-radio label="组织(非企业)增值税普通发票"></el-radio>
              </div>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="税务登记证号" prop="name">
            <el-input v-model="formList.taxCode"></el-input>
          </el-form-item>
          <el-form-item label="开户银行名称">
            <el-input v-model="formList.bankName"></el-input>
          </el-form-item>
          <el-form-item label="基本开户名称">
            <el-input v-model="formList.accoutName"></el-input>
          </el-form-item>
          <el-form-item label="注册场所地址">
            <el-input v-model="formList.registAddress"></el-input>
          </el-form-item>
          <el-form-item label="注册固定电话">
            <el-input v-model="formList.phone"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVal = false">取 消</el-button>
        <el-button type="primary" @click="dialogVal = false">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import taskState from "../../components/taskState.vue"; // 引入签名状态组件
import { DataService } from "@/service"; // 引入短信模块的接口

// 模板表格
const tableList = [
  { label: "发票名称", value: "sendDt", width: "60px" },
  { label: "开具类型", value: "taskCount", width: "80px" },
  { label: "发票类型", value: "taskFaileCount", width: "80px" },
  { label: "税务登记证号", value: "taskFaileCount", width: "60px" },
  { label: "开户银行名称", value: "taskCount", width: "80px" },
  { label: "基本开户账户", value: "taskFaileCount", width: "80px" },
  { label: "注册场所地址", value: "taskFaileCount", width: "60px" },
  { label: "固定电话", value: "taskFaileCount", width: "60px" }
];

export default {
  components: { taskState },
  data() {
    return {
      dialogVal: false,
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
        taskName: "", // 名称
        page: "1", // 当前页数
        rows: "10" // 显示条数
      },
      rules: {
        name: [{ required: true, message: "请输入任务名称", trigger: "blur" }]
      },
      formList: {
        lssuType: "", // 开具类型
        invoice: "", // 发票抬头
        invoiceType: "", // 发票类型
        taxCode: "",
        bankName: "",
        accoutName: "",
        registAddress: "",
        phone: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },

  created() {
    this.handleSendTask();
  },

  mounted() {},

  methods: {
    // 点击使用按钮
    handleChooseInvoice(val) {
      this.$store.commit("SET_INVOICEOBJ", val);
      this.$emit("onChangeInvoice", "fourth");
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
      this.Pagination.total = data.total;
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
