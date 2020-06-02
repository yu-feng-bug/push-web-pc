<template>
  <div class="wrapper-container">
    <!-- 模版标题 -->
    <div class="header-box">
      <span>{{signTitle}}</span>
      <el-button type="info" plain size="small" @click="links()">返回上层</el-button>
    </div>
    <!-- 模版表单 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="模板类型">
        <div>
          <el-radio v-model="ruleForm.templateType" label="1">验证码</el-radio>
        </div>
        <div>
          <el-radio v-model="ruleForm.templateType" label="2">短信通知</el-radio>
        </div>
        <div>
          <el-radio v-model="ruleForm.templateType" label="3">
            推广短信
            <!-- <a href="javascript:;" @click="links2()" class="bulue">升级为企业后可以</a> -->
          </el-radio>
        </div>
      </el-form-item>
      <el-form-item label="模版名称" prop="templateName">
        <el-input v-model="ruleForm.templateName" placeholder="请输入名称，不超过30字" style=" width:550px"></el-input>
      </el-form-item>
      <el-form-item label="模版内容" prop="templateContent">
        <el-input
          type="textarea"
          :rows="4"
          :autosize="{ minRows: 4, maxRows: 6 }"
          maxlength="500"
          resize="none"
          show-word-limit
          v-model="ruleForm.templateContent"
          placeholder="变量格式需以：${param}为准； 示例：尊敬的${param}，您好。您的验证码为：${param}，该验证码 5 分钟内有效，请勿泄漏于他人。（500字）"
          style=" width:550px;"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div v-if="ruleForm.templateType == '1'">
          <ul class="signle-title1">
            <li>验证码模板只支持验证码作为变量；变量替换值<=6位数字或字母</li>
            <li>不能发送营销/贷款/借款/中奖/抽奖类短信,不支持金融理财&房产通知类短信(验证码除外)</li>
            <li>
              签名/模版申请规范
              <a href="javascript:;" @click="links1()">帮助文档</a>
            </li>
          </ul>
        </div>
        <div v-if="ruleForm.templateType == '2'">
          <ul class="signle-title1">
            <li>不能发送营销/贷款/借款/中奖/抽奖类短信,不支持金融理财&房产通知类短信(验证码除外)</li>
            <li>
              签名/模版申请规范
              <a href="javascript:;" @click="links1()">帮助文档</a>
            </li>
          </ul>
        </div>
      </el-form-item>
      <el-form-item label="申请说明" prop="explain">
        <el-input
          type="textarea"
          :rows="4"
          :autosize="{ minRows: 4, maxRows: 6}"
          maxlength="200"
          show-word-limit
          resize="none"
          v-model="ruleForm.explain"
          placeholder="请描述您的业务场景，最多输入200字"
          style=" width:550px;"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="deter('ruleForm')" class="input">确定</el-button>
        <!-- <el-button>模板预览</el-button> -->
        <ul class="signle-title1">
          <li>预计两小时完成审核</li>
          <li>审核工作时间: 周一至周日9:00-23:00（法定节日顺延）</li>
        </ul>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Validate } from "@/utils";
import { SmsService } from "@/service"; // 引入短信模块的接口

export default {
  name: "stencil",
  data() {
    return {
      id: this.$route.query.id, // 签名id
      signTitle: "",
      //发送信息的from数据
      ruleForm: {
        templateName: "", // 模版名称
        templateContent: "", // 模板内容
        explain: "", // 申请说明
        templateType: "1" // 模板类型
      },
      // 表单校验内容
      rules: {
        // 签名校验
        templateName: [
          { required: true, message: "请输入模版名称", trigger: "blur" },
          { max: 30, message: "长度30个字符以内", trigger: "blur" }
        ],
        // 模板内容
        templateContent: [
          { required: true, trigger: "blur", validator: Validate.validateModel }
        ],
        // 申请说明校验
        explain: [
          { required: true, message: "请输入申请说明", trigger: "blur" }
        ]
      }
    };
  },

  created() {
    if (this.id) {
      this.signTitle = "编辑模版";
      this.getTemplateId(this.id);
    } else {
      this.signTitle = "添加模版";
    }
  },

  mounted() {},

  methods: {
    /**
     * 根据路由得到id获取签名详情
     *
     * */
    async getTemplateId(id) {
      const { code, data } = await SmsService.queryTemplateInfo({
        id: this.id
      });
      const { templateType, templateName, templateContent, explain } = data;
      this.ruleForm = { templateType, templateName, templateContent, explain };
      console.log(this.ruleForm);
    },

    // 点击确定按钮，添加签名表单  若路由存有 id 则是编辑页面，否则是 新增页面
    deter() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          if (this.id) {
            const obj = {
              id: this.id,
              delSign: false
            };
            Object.assign(this.ruleForm, obj);
            this.editTemplate(this.ruleForm); // 编辑签名
          } else {
            this.addTemplate(this.ruleForm); // 新增签名
          }
        } else {
          return false;
        }
      });
    },

    /**
     * 修改模板
     *
     * */
    async editTemplate(data) {
      const { code, errorMsg } = await SmsService.modifyTemplateInfo(data);
      if (code == 200) {
        this.$message({
          message: "修改成功",
          type: "success"
        });
        this.$router.push({ name: "moduleList", query: { name: "models" } });
      } else {
        this.$message({
          message: errorMsg,
          type: "error"
        });
      }
    },

    // 模板列表跳转
    links() {
      this.$router.push({ name: "moduleList", query: { name: "models" } });
    },

    // 帮助文档跳转
    links1() {
      this.$router.push({ name: "Documentation" });
    },

    // 企业管理跳转
    links2() {
      this.$router.push({ path: "/UserCenter/Center" });
    },
    /**
     * 新增模板
     *
     * */
    async addTemplate(data) {
      const { code, errorMsg } = await SmsService.addTemplate(data);
      if (code == 200) {
        this.$message({
          message: "添加成功",
          type: "success"
        });
        this.$router.push({ name: "moduleList", query: { name: "models" } });
      } else {
        this.$message({
          message: errorMsg,
          type: "error"
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.header-box {
  padding: 5px;
  border-bottom: 2px solid #e4e7ed;
  margin-bottom: 15px;
  span {
    margin-right: 15px;
    font-size: 16px;
    color: #373d41;
  }
}
.input {
  width: 100px;
  margin-left: 20px;
  margin-bottom: 10px;
}
.title {
  font-size: 18px;
  font-weight: 700;
  margin-left: 20px;
  margin-top: 5px;
  margin-bottom: 30px;
}
.br {
  border-bottom: 1px solid rgb(218, 214, 214);
  margin-bottom: 30px;
}
.signle-title {
  // height: 10px;
  color: #7f7f7f;
  margin-top: 0;
  margin-left: 120px;
}
.signle-title1 {
  color: #7f7f7f;
  margin-top: 0;
  span {
    color: #000;
    line-height: 80px;
  }
  li {
    line-height: 22px;
  }
}
.bulue {
  color: #0cc2aa;
  margin-left: 5px;
}
a {
  color: #0cc2aa;
}
</style>
