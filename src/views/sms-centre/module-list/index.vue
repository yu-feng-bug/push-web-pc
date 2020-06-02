<template>
  <div class="wrapper-container list-content">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 签名列表页面内容 -->
      <el-tab-pane label="签名列表" name="sign">
        <!-- 签名搜索栏 -->
        <el-row :gutter="20">
          <el-col :span="6">
            <div>
              <el-input v-model="searchSign.sign" clearable placeholder="请输入签名名称搜索"></el-input>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="check-name">审核状态:</div>
          </el-col>
          <el-col :span="4">
            <div>
              <el-select v-model="searchSign.checkStatus" placeholder="全部">
                <el-option
                  v-for="item in signCheckStatusArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-col>

          <el-col :span="2">
            <el-button type="primary" plain @click="querySignList">查询</el-button>
          </el-col>
          <el-col :span="6">
            <router-link :to="{ name: 'Signature' }">
              <el-button type="primary">新增签名</el-button>
            </router-link>
          </el-col>
        </el-row>
        <!-- 签名table列表页 -->
        <section class="sign-table">
          <el-table :data="signTableData" style="width: 100%" v-loading="listLoading" stripe>
            <el-table-column min-width="60px" label="签名" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.sign}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="100px" label="申请说明" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.explain}}</span>
              </template>
            </el-table-column>
            <el-table-column
              v-for="(item, index) in signTitleList"
              :key="index"
              align="center"
              :prop="item.value"
              :label="item.label"
              :min-width="item.width"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div>
                  <!-- 展示：除了审核状态和适应场景 其他值 -->
                  <span
                    v-if="
                      item.value !== 'checkStatus' &&
                        item.value !== 'useIdentifier'  && item.value !== 'sign'
                    "
                  >{{ scope.row[item.value] }}</span>
                  <!-- 审核状态值 -->
                  <SignState
                    v-if="item.value === 'checkStatus'"
                    :signState="scope.row.checkStatus"
                  />
                  <!-- 适应场景 -->
                  <span v-if="item.value === 'useIdentifier'">
                    {{
                    scope.row[item.value] == 1 ? "验证码" : "通用"
                    }}
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              max-width="240px"
              label="操作"
              align="center"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <div v-if="scope.row.checkStatus != '0'">
                  <MyButton :primary="true" @click.native="handleEditSign(scope.row.id)">查看并修改</MyButton>
                  <MyButton :warning="true" @click.native="handleDelSign(scope.row.id)">删除</MyButton>
                </div>
                <div v-else>——</div>
              </template>
            </el-table-column>
          </el-table>
          <Pagination
            v-show="signTotal > 0"
            :page.sync="searchSign.page"
            :limit.sync="searchSign.rows"
            :total="signTotal"
            @pagination="getSignList"
          />
        </section>
      </el-tab-pane>
      <!-- 模版列表页面内容 -->
      <el-tab-pane label="模版列表" name="models">
        <div>
          <div class="search">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-input
                  clearable
                  v-model="templateData.templateName"
                  placeholder="请输入模版名称搜索"
                  :trigger-on-focus="false"
                ></el-input>
              </el-col>
              <el-col :span="2">
                <div class="check-name">模板类型：</div>
              </el-col>
              <el-col :span="4">
                <el-select v-model="templateData.templateType" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="2">
                <el-button type="primary" plain @click="Inquire()">查询</el-button>
              </el-col>
              <el-col :span="6">
                <router-link :to="{ name: 'stencil' }">
                  <el-button type="primary">新增模板</el-button>
                </router-link>
              </el-col>
            </el-row>
          </div>
          <el-table :data="tableData" class="sign-table" v-loading="listLoading" stripe>
            <el-table-column min-width="60px" label="模板名称" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.templateName}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="110px" label="模版CODE" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.templateContent}}</span>
              </template>
            </el-table-column>
            <el-table-column
              v-for="(item, index) in tableList"
              :key="index"
              align="center"
              :prop="item.value"
              :label="item.label"
              :show-overflow-tooltip="true"
              :min-width="item.width"
            >
              <template slot-scope="scope">
                <div>
                  <!-- 展示：除了审核状态和模板类型 其他值 -->
                  <span
                    v-if="
                      item.value !== 'checkStatus' &&
                        item.value !== 'templateType'
                    "
                  >{{ scope.row[item.value] }}</span>
                  <!-- 审核状态值 -->
                  <SignState
                    v-if="item.value === 'checkStatus'"
                    :signState="scope.row.checkStatus"
                  />
                  <!-- 模板类型 -->
                  <span v-if="item.value === 'templateType'">
                    {{
                    OptionsMap[scope.row.templateType]
                    }}
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.checkStatus != '0'">
                  <MyButton :primary="true" @click.native="handleClick1(scope.row.id)">查看并修改</MyButton>
                  <MyButton :warning="true" @click.native="delTemplate(scope.row.id)">删除</MyButton>
                </div>
                <div v-else>——</div>
              </template>
            </el-table-column>
          </el-table>
          <Pagination
            :page="Pagination.page"
            :limit="Pagination.limit"
            :total="Pagination.total"
            @pagination="pagination"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { SmsService } from "@/service"; // 引入短信模块的接口
import SignState from "../components/signState"; // 引入签名状态组件

const OptionsMap = {
  "1": "验证码",
  "2": "短信通知",
  "3": "推广短信"
};

// 模板表格
const tableList = [
  { label: "工单号", value: "templateSign", width: "60px" },
  { label: "模版类型", value: "templateType", width: "100px" },
  { label: "创建时间", value: "createTime", width: "80px" },
  { label: "审核状态(全部)", value: "checkStatus", width: "80px" }
];
// 签名表格
const signTitleList = [
  { label: "适应场景", value: "useIdentifier", width: "60px" },
  { label: "审核状态", value: "checkStatus", width: "60px" },
  { label: "创建时间", value: "createTime", width: "80px" }
];

// 签名状态 '' : 全部状态 0：审核中，1：审核通过，2审核失败
const signCheckStatusArr = [
  { value: "", label: "全部" },
  { value: "0", label: "审核中" },
  { value: "1", label: "审核通过" },
  { value: "2", label: "审核失败" }
];

export default {
  name: "ModuleList",
  components: { SignState },
  data() {
    return {
      OptionsMap,
      activeName: "",
      signCheckStatusArr, // 签名状态
      listLoading: false, // 页面加载
      signTitleList, // 签名table标题库
      signTableData: [], // 签名列表数据
      searchSign: {
        // 列表筛选test
        sign: "", // 签名
        checkStatus: "", // 审核状态
        page: 1, // 分页
        rows: 10 // 每页显示的条数
      },
      signTotal: 0, // 签名页总数
      tableList,
      listLoading: false, // 页面加载
      templateData: {
        templateName: "", // 搜索框数据
        templateType: "", // 搜索下拉框数据
        page: "1",
        rows: "10"
      },

      //搜索下拉框数据
      options: [
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

      // 列表内容
      tableData: [],

      // 分页器参数
      Pagination: {
        page: 1, // 当前页数
        limit: 10, // 默认每页展示条数
        total: 300 // 分页器总条数
      }
    };
  },
  created() {
    if (this.$route.query && this.$route.query.name == "models") {
      this.activeName = "models";
    } else {
      this.activeName = "sign";
    }
  },
  mounted() {
    this.handleClick();
  },
  methods: {
    // 切换tab标签 获取不同的签名/模版列表页
    handleClick() {
      if (this.activeName === "sign") {
        this.querySignList();
      } else {
        // 模版列表数据
        this.Inquire();
      }
    },

    // 搜索查询签名
    querySignList() {
      this.searchSign.page = 1;
      this.getSignList();
    },

    // 获取签名列表页
    async getSignList() {
      this.listLoading = true;
      const { code, data } = await SmsService.signInfoList(this.searchSign);
      this.signTableData = data.list;
      this.signTotal = data.total;
      this.listLoading = false;
    },

    // 修改签名跳转
    handleEditSign(id) {
      this.$router.push({ name: "Signature", query: { id: id } });
    },

    // 确定删除签名
    handleDelSign(id) {
      this.$confirm("确定删除该签名吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delSignInfo(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 删除签名
    async delSignInfo(id) {
      const { code, errorMsg } = await SmsService.delSignfo({ id: id });
      if (code == 200) {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.handleClick();
      } else {
        this.$message({
          type: "error",
          message: "删除失败!"
        });
      }
    },

    // 模板列表

    // 查看并修改跳转
    handleClick1(id) {
      this.$router.push({ name: "stencil", query: { id: id } });
      console.log(id);
    },

    // 确定删除模板
    delTemplate(id) {
      this.$confirm("确定删除该模板吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delTemplates(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 删除模板
    async delTemplates(id) {
      const { code, errorMsg } = await SmsService.delTemplateInfo({ id: id });
      if (code == 200) {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.Inquire();
      } else {
        this.$message({
          type: "error",
          message: "删除失败!"
        });
      }
    },

    //查询按钮
    Inquire() {
      // this.Pagination.page = 1
      this.templateData.page = 1;
      console.log(this.Pagination, "1");
      this.TemplateList();
      // console.log(this.templateData);
    },
    async TemplateList() {
      this.listLoading = true;
      const { code, data } = await SmsService.queryTemplateList(
        this.templateData
      );
      this.tableData = data.list;
      this.Pagination.total = data.total;
      this.Pagination.page = data.pageNum;
      this.templateData.page = data.page;
      this.listLoading = false;
    },
    /**
     * 获取分页的页数
     * */
    pagination(val) {
      console.log(val);
      this.templateData.page = val.page;
      this.templateData.rows = val.limit;
      this.Pagination.limit = val.limit;
      this.TemplateList();
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
  .btn {
    display: inline-block;
    margin-right: 24px;
    cursor: pointer;
  }
  .btn-edit {
    color: #0cc2aa;
  }
  .btn-del {
    color: #e6a23c;
  }
}
</style>
