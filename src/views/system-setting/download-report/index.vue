<template>
  <div class="wrapper-container">
    <!-- form -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="选择纬度" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="发送记录"></el-radio>
          <el-radio label="发票任务"></el-radio>
          <el-radio label="充值订单"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="选择时间" required>
        <el-col :span="4">
          <el-form-item prop="date1">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="1">—</el-col>
        <el-col :span="4">
          <el-form-item prop="date2">
            <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <!-- <el-form-item label="活动区域" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="选择指标" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="类型" name="type"></el-checkbox>
          <el-checkbox label="状态" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="详细字段" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="验证码" name="type"></el-checkbox>
          <el-checkbox label="短信通知" name="type"></el-checkbox>
          <el-checkbox label="推广短信" name="type"></el-checkbox>
        </el-checkbox-group>
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="预执行中" name="type"></el-checkbox>
          <el-checkbox label="发送成功" name="type"></el-checkbox>
          <el-checkbox label="发送失败" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">生产报表</el-button>
        <el-button @click="resetForm('ruleForm')" type="info">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
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
  created() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
</style>