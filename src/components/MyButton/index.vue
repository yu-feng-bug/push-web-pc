<template>
  <div class="btn-warpper">
    <span
      :class="{'btn':true,
      'primary': primary, 
      'success':  success,
       'info': info,
       'warning': warning,
       'danger': danger}"
    >
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "MyButton",
  props: {
    primary: {
      type: Boolean,
      default: false
    },
    success: {
      type: Boolean,
      default: false
    },
    info: {
      type: Boolean,
      default: false
    },
    warning: {
      type: Boolean,
      default: false
    },
    danger: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.btn-warpper {
  display: inline-block;
  cursor: pointer;
  text-align: center;
  width: 80px;
  .btn {
    // margin-right: 24px;
    &:hover {
      color: #606266;
    }
  }

  .primary {
    color: #0cc2aa;
  }
  .success {
    color: #67c23a;
  }
  .info {
    color: #909399;
  }
  .warning {
    color: #e6a23c;
  }
  .danger {
    color: #f56c6c;
  }
}
</style>

