<template>
  <div class="wrapper-container list-content">
    <el-row :gutter="20">
      <el-col :span="2" class="check-name">
        <div>发送日期：</div>
      </el-col>
      <el-col :span="4">
        <el-date-picker
          :editable="false"
          v-model="sendData.realSendDt"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-col>
      <el-col :span="2" class="check-name">
        <div>发送状态：</div>
      </el-col>
      <el-col :span="4">
        <el-select v-model="sendData.sendStatus" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2" class="check-name">
        <div>手机号：</div>
      </el-col>
      <el-col :span="4">
        <el-input
          placeholder="请输入手机号"
          v-model="sendData.mobile"
          clearable
          maxlength="11"
          :@change="inputPhone()"
        ></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="sign-table">
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
        <el-select v-model="sendData.templateType" placeholder="请选择">
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
        <el-button type="info" @click="Reset()">重置</el-button>
      </el-col>
      <el-col :span="2">
        <el-button @click="handleLoad()">导出</el-button>
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
      >
        <template slot-scope="scope">
          <div>
            <!-- 展示：除了审核状态和模板类型 其他值 -->
            <span
              v-if="item.value !== 'sendStatus' && item.value !== 'templateType'"
            >{{scope.row[item.value]}}</span>
            <!-- 模板类型 -->
            <span v-if="item.value === 'templateType'">{{ OptionsMap[scope.row.templateType] }}</span>
            <!-- 发送状态 -->
            <span v-if="item.value === 'sendStatus'">{{ StatueTy[scope.row.sendStatus] }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="60px" label="任务名称" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.sendContent}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <MyButton
            :danger="true"
            @click.native="handleClick1(scope.row)"
            v-if="scope.row.sendStatus == 2"
          >失败详情</MyButton>
          <!-- <MyButton :warning="true" @click.native="delTemplate(scope.row.id)">删除</MyButton> -->
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

    <!--  弹框 -->
    <DefaultDialog
      :textContent="textContent"
      :dialogVisible="dialogVisible"
      @handleCloseText="handleCloseText"
    ></DefaultDialog>
  </div>
</template>

<script>
import SignState from "../../sms-centre/components/signState"; // 引入签名状态组件
import { SmsService } from "@/service"; // 引入短信模块的接口
import { DataService } from "@/service"; // 引入短信模块的接口
import { mapState } from "vuex";
// 模板表格
const tableList = [
  { label: "手机号", value: "mobile", width: "60px" },
  { label: "日期", value: "createTime", width: "60px" },
  { label: "签名", value: "signName", width: "150px" },
  { label: "模版类型", value: "templateType", width: "100px" },
  { label: "发送状态", value: "sendStatus", width: "80px" }
];

const StatueTy = {
  "0": "提交处理中",
  "1": "提交处理成功",
  "2": "提交处理失败"
};
const OptionsMap = {
  "1": "验证码",
  "2": "短信通知",
  "3": "推广短信"
};

export default {
  components: { SignState },
  data() {
    return {
      StatueTy,
      OptionsMap,
      dialogVisible: false,
      textContent: [],
      tableData: [],
      tableList,
      listLoading: false, // 页面加载

      // 日期选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      // 分页器参数
      Pagination: {
        page: 1, // 当前页数
        limit: 10, // 默认每页展示条数
        total: 300 // 分页器总条数
      },

      searchSigns: {}, // 签名栏

      searchSign: {
        page: 1, // 分页
        rows: 9999 // 每页显示的条数
      },

      // 发送状态下拉信息
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "发送失败"
        },
        {
          value: "1",
          label: "发送成功"
        }
      ],

      // 模板类型下拉信息
      options1: [
        {
          value: "3",
          label: "推广短信"
        },
        {
          value: "2",
          label: "短信通知"
        },
        {
          value: "1",
          label: "验证码"
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
        realSendDt: "", // 日期
        sendStatus: "", // 发送状态选择
        mobile: "", // 手机号
        signId: "", // 签名
        templateType: "", // 模板类型
        page: "1", // 当前页数
        rows: "10" // 显示条数
      }
    };
  },

  created() {
    this.getSignList(); // 签名列表
    console.log("data", this.dateSt);
    if (this.dateSt) {
      this.sendData.realSendDt = this.dateSt;
      this.handleSendRecord(); // 列表展示
    } else {
      this.handleSendRecord(); // 列表展示
    }
  },
  computed: {
    ...mapState({
      dateSt: state => state.user.dateSt
    })
  },
  mounted() {},

  methods: {
    //
    handleCloseText(val) {
      this.dialogVisible = val;
    },
    //
    handleClick1(obj) {
      this.textContent = [];
      this.dialogVisible = true;
      console.log(obj);
      this.textContent.push(obj);
    },

    // 手机号校验
    inputPhone() {
      let pattern = /^[0-9]+(.[0-9]{0,3})?$/;
      if (!pattern.test(this.sendData.mobile)) {
        this.sendData.mobile = "";
      }
    },

    // 获取签名列表页
    async getSignList() {
      const { code, data } = await SmsService.signInfoList(this.searchSign);
      this.searchSigns = data.list;
    },

    // 查询按钮
    Inquire() {
      this.sendData.page = 1;
      console.log(this.sendData);
      this.handleSendRecord();
    },

    // 查询按钮
    async handleSendRecord() {
      this.listLoading = true;
      const { code, data } = await DataService.SendRecord(this.sendData);
      this.listLoading = false;
      this.tableData = data.list;
      this.Pagination.page = data.pageNum;
      this.Pagination.total = data.total;
    },

    // 重置按钮
    Reset() {
      this.sendData = {
        realSendDt: "", // 日期
        sendStatus: "", // 发送状态选择
        mobile: "", // 手机号
        signId: "", // 签名
        templateType: "", // 模板类型
        page: "1", // 当前页数
        rows: "10" // 显示条数
      };
      this.handleSendRecord();
    },

    // 分页器按钮
    pagination(val) {
      console.log(val);
      this.sendData.page = val.page;
      this.sendData.rows = val.limit;
      this.handleSendRecord();
    },

    // 导出
    handleLoad() {
      DataService.loadSendRecrd(this.$cookies.get("token"));
    },

    // 删除
    delTemplate(id) {
      console.log(id);
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
