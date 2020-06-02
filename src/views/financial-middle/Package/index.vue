<template>
  <div class="wrapper-container list-content">
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
      <el-table-column min-width="100px" label="购买数量" align="center">
        <template slot-scope="scope">
          <span>
            <el-input v-model="input" placeholder="请输入数量"></el-input>
          </span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" label="计费" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.sign}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row.id)" type="primary" plain>立即充值</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 模板表格
const tableList = [
  { label: "套餐名称", value: "templateName", width: "100px" },
  { label: "类型", value: "templateSign", width: "100px" },
  { label: "套餐范围", value: "templateContent", width: "100px" },
  { label: "市场价", value: "templateType", width: "120px" },
  { label: "优惠价格", value: "checkStatus", width: "120px" }
];

export default {
  data() {
    return {
      tableData: [],
      tableList,
      listLoading: false, // 页面加载
      input: ""
    };
  },

  created() {},

  mounted() {},

  methods: {
    // 立即充值按钮
    handleClick() {}
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
