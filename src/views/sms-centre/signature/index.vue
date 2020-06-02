<template>
  <div class="wrapper-container sign-content">
    <!-- 签名标题 -->
    <div class="header-box">
      <span>{{signTitle}}</span>
      <router-link to="/smsCentre/moduleList">
        <el-button type="info" plain size="small">返回上层</el-button>
      </router-link>
    </div>
    <!-- 签名表单 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="签名" prop="sign">
        <el-input
          v-model="ruleForm.sign"
          placeholder="长度限2－12个字符，建议为用户真实应用名/网站名/公司名"
          style=" width:550px"
        ></el-input>
      </el-form-item>
      <ul class="signle-title">
        <li>若签名／模版内容侵犯到第三方权益必须获得第三方真实授权</li>
        <li>无须添加【】、()、[]符号，签名发送会自带【】符号，避免重复</li>
        <li>审核中的签名不允许修改或删除</li>
      </ul>
      <el-form-item label="适应场景">
        <el-radio v-model="ruleForm.useIdentifier" label="1" checked="ture">验证码</el-radio>
        <el-radio v-model="ruleForm.useIdentifier" label="2">通用</el-radio>
        <div v-if="ruleForm.useIdentifier == '1'">
          <ul class="signle-title1">
            <li>不能使用个人姓名作为短信签名</li>
            <li>个人用户可申请1个验证码签名，通用场景签名一天支持申请1个</li>
          </ul>
        </div>
        <div v-if="ruleForm.useIdentifier == '2'">
          <ul class="signle-title1">
            <li>不能使用个人姓名作为短信签名</li>
            <li>个人用户可申请1个验证码签名，通用场景签名一天支持申请1个</li>
            <span class="signle-task">
              <a href>升级为企业后可以</a>
              备注：若用户企业信息暂无，需求用户去填写企业信息
            </span>
          </ul>
        </div>
      </el-form-item>
      <el-form-item label="申请说明" prop="explain">
        <el-input
          type="textarea"
          :rows="4"
          :autosize="{ minRows: 4, maxRows: 6}"
          maxlength="100"
          show-word-limit
          resize="none"
          v-model="ruleForm.explain"
          placeholder="请描述您的业务场景，最多输入100字"
          style=" width:550px;"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleValideSign" class="input">确定</el-button>
        <ul class="signle-title1">
          <li>预计两小时完成审核</li>
          <li>审核工作时间: 周一至周日9:00-23:00（法定节日顺延）</li>
        </ul>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { SmsService } from "@/service"; // 引入短信模块的接口
import { Validate } from "@/utils"; // 校验模块引入

export default {
  name: "Signature",
  data() {
    return {
      id: this.$route.query.id, // 签名id
      signTitle: "",
      ruleForm: {
        //发送信息的from数据
        sign: "", // 签名
        explain: "", // 申请说明
        useIdentifier: "1" // 场景切换
      },
      rules: {
        sign: [
          // 签名校验
          {
            required: true,
            trigger: "blur",
            validator: Validate.validateSign
          }
        ],
        explain: [
          // 申请说明校验
          { required: true, message: "请输入申请说明", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    if (this.id) {
      this.signTitle = "编辑签名";
      this.getSignById(this.id);
    } else {
      this.signTitle = "添加签名";
    }
  },
  mounted() {
    console.log(Validate);
  },
  methods: {
    // 点击确定按钮，添加签名表单  若路由存有 id 则是编辑页面，否则是 新增页面
    handleValideSign() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          if (this.id) {
            const obj = {
              id: this.id,
              delSign: false
            };
            Object.assign(this.ruleForm, obj);
            this.handleEditSignForm(this.ruleForm); // 编辑签名
          } else {
            this.handleAddSignForm(this.ruleForm); // 新增签名
          }
        } else {
          return false;
        }
      });
    },

    /**
     * 提交签名
     *
     * */
    async handleAddSignForm(data) {
      const { code, errorMsg } = await SmsService.addSignInfo(data);
      if (code == 200) {
        this.$message({
          message: "添加成功",
          type: "success"
        });
        this.$router.push({ path: "/smsCentre/moduleList" });
      } else {
        this.$message({
          message: errorMsg,
          type: "error"
        });
      }
    },

    /**
     * 根据路由得到id获取签名详情
     *
     * */
    async getSignById(id) {
      const { code, data } = await SmsService.signInfoDetail({ id: this.id });
      const { sign, useIdentifier, explain } = data;
      this.ruleForm = { sign, useIdentifier, explain };
      console.log(this.ruleForm);
    },

    /**
     * 修改签名
     *
     * */
    async handleEditSignForm(data) {
      const { code, errorMsg } = await SmsService.editSignInfo(data);
      if (code == 200) {
        this.$message({
          message: "修改成功",
          type: "success"
        });

        this.$router.push({ path: "/smsCentre/moduleList" });
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
.sign-content {
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
    color: #7f7f7f;
    margin-top: 0;
    margin-left: 120px;
  }
  .signle-title1 {
    color: #7f7f7f;
    margin-top: 0;
    span {
      color: #7f7f7f;
      line-height: 40px;
      a {
        color: #0cc2aa;
        margin-right: 15px;
      }
    }
    li {
      line-height: 22px;
    }
  }
}
</style>
