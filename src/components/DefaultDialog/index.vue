<template>
  <div>
    <el-dialog title="失败详情" :visible.sync="dialogVisible" width="50%" :before-close="handleCloser">
      <div>
        <el-table :data="textContent" style="width: 100%" stripe>
          <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
          <el-table-column prop="mobile" label="手机号" width="140px" align="center"></el-table-column>
          <el-table-column prop="sendContext" label="发送失败原因" align="center"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloser">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    textContent: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    //
    handleCloser() {
      this.$emit("handleCloseText", false);
    }
  }
};
</script>
<style lang='less' scoped>
/* @import url(); 引入css类 */
.text {
  color: red;
}
</style>