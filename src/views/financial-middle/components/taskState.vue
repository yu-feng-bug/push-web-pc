<template>
  <div class="state-tag-wrapper">
    <span v-if="taskState == '1'" class="yellow">提交处理中</span>
    <span v-if="taskState == '2'" class="success">提交处理成功</span>
    <span v-if="taskState == '3'" class="error">提交处理失败</span>
    <span v-if="taskState == '4'" class="default">已撤销</span>
  </div>
</template>

<script>
// 1：提交处理中 2：提交处理成功 3.提交处理失败 4.撤销

export default {
  name: "order-state",
  data() {
    return {};
  },
  props: {
    taskState: {
      required: true
    }
  }
};
</script>

<style lang="less" scoped>
.state-tag-wrapper {
  display: inline-block;
  .error {
    color: #f56c6c;
  }
  .success {
    color: #0cc2aa;
  }
  .yellow {
    color: #ff9900;
  }
  .default {
    color: #909399;
  }
}
</style>


