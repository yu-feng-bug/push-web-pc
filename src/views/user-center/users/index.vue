<template >
  <div class="wrapper-container list-content">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="160px"
      class="demo-ruleForm"
    >
      <el-form-item label="营业执照">
        <el-upload
          class="upload-demo check-text"
          list-type="picture"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip fr">照片支持：jpg,jpeg,bmp,png.pdf格式，大小不超过8M</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="统一社会信息代码/注册👌/组织机构代码" prop="name">
        <el-input
          v-model="ruleForm.name"
          placeholder="请输入身份证件的统一社会信用代码或注册号或组织机构代码"
          class="check-name check-list"
        ></el-input>
      </el-form-item>
      <el-form-item label="企业名称" prop="region">
        <el-input v-model="ruleForm.region" placeholder="请填写营业执照或其他身份证件上的企业名称" class="check-name"></el-input>
      </el-form-item>
      <el-form-item label="经营期限至" required>
        <el-col :span="6">
          <el-form-item prop="date1" class="sign-table">
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              v-model="ruleForm.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">
          <el-checkbox label="长期" name="type" v-model="ruleForm.delivery" class="check-name"></el-checkbox>
        </el-col>
      </el-form-item>
      <el-form-item label="所在地区" prop="area">
        <v-distpicker
          class="disabled-select"
          :province="ruleForm.address__province"
          :city="ruleForm.address__city"
          :area="ruleForm.address__dist"
          @selected="onSelected"
        ></v-distpicker>
      </el-form-item>
      <el-form-item label="详细地址" prop="desc">
        s
        <el-input v-model="ruleForm.desc" placeholder="请填写详细地址，以便在有需要时给你寄书面文件" class="check-name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')" type="info">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import VDistpicker from "v-distpicker";
export default {
  name: "UserCenter",
  components: { VDistpicker },
  data() {
    return {
      fileList: [],
      ruleForm: {
        address__province: "",
        address__city: "",
        address__dist: "",
        area: "",
        name: "",
        delivery: false,
        date1: "",
        region: "",
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入身份证件的统一社会信用代码或注册号或组织机构代码",
            trigger: "blur"
          }
        ],
        region: [
          {
            required: true,
            message: "请填写营业执照或其他身份证件上的企业名称",
            trigger: "blur"
          }
        ],
        date1: [
          {
            type: "string",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        area: [
          {
            type: "string",
            required: true,
            message: "请选择地区",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "请填写详细地址，以便在有需要时给你寄书面文件",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    onSelected(data) {
      this.ruleForm.address__province = data.province.value;
      this.ruleForm.address__city = data.city.value;
      this.ruleForm.address__dist = data.area.value;
      this.ruleForm.area = data.area.code;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    // 提交按钮
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
      this.ruleForm = {
        address__province: "",
        address__city: "",
        address__dist: "",
        area: "",
        name: "",
        delivery: false,
        date1: "",
        region: "",
        type: [],
        resource: "",
        desc: ""
      };
    }
  }
};
</script>

<style lang="less" scoped>
.disabled-select select {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}
.list-content {
  .fr {
    float: right;
  }
  .check-name {
    width: 500px;
  }
  .sign-table {
    width: 300px;
  }
  .check-list {
    margin-top: 20px;
  }
  .check-text {
    width: 400px;
  }
  .el-upload__tip {
    margin-top: 0px;
  }
}
</style>
