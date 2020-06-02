<template>
  <div>
    <span v-if="type == 1">验证码</span>
    <span v-if="type == 2">短信通知</span>
    <span v-if="type == 3">推广短信</span>
  </div>
</template>

<script>
// 1：验证码 2："短信通知 3.推广短信

export default {
  name: "order-state",
  data() {
    return {};
  },
  props: {
    type: {
      required: true
    }
  }
};
</script>


