<template>
  <div class="state-tag-wrapper">
    <span v-if="signState == '0'" class="yellow">审核中</span>
    <span v-if="signState == '1'" class="success">审核通过</span>
    <span v-if="signState == '2'" class="error">审核失败</span>
  </div>
</template>

<script>
export default {
  name: "order-state",
  data() {
    return {};
  },
  props: {
    signState: {
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
}
</style>


