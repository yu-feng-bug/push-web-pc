<template>
  <div class="wrapper-container message-box">
    <!-- 发送量 -->
    <div class="send-count">
      <el-card class="send-item">
        <div slot="header" class="clearfix">
          <span class="msg-text">发送总量阀值</span>
        </div>
        <div>
          <!-- 文本 -->
          <div class="send-text" v-show="!isShowSet">
            <p>每日发送总量无预警，无限额</p>
            <p>每月发送总量无预警，无限额</p>
            <el-button class="btn-set" @click="isShowSet=true">设置</el-button>
            <p class="prompt">提示：发送量阈值默认无限制，若有需求建议及时增加设置。达预警值及限额值，系统会发送短信提醒到联系人手机号</p>
          </div>

          <!-- form 表单 -->
          <div v-show="isShowSet">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="每日发送总量达:">
                    <el-input v-model="formInline.user" placeholder="数量"></el-input>
                  </el-form-item>
                  <span class="unit">条预警;</span>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="达">
                    <el-input v-model="formInline.user" placeholder="数量"></el-input>
                  </el-form-item>
                  <span class="unit">条限额，暂停短信发送;</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="每月发送总量达:">
                    <el-input v-model="formInline.user" placeholder="数量"></el-input>
                  </el-form-item>
                  <span class="unit">条预警;</span>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="达">
                    <el-input v-model="formInline.user" placeholder="数量"></el-input>
                  </el-form-item>
                  <span class="unit">条限额，暂停短信发送;</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="手机号:">
                    <el-input v-model="formInline.user" placeholder="手机号"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <p class="prompt">提示：达预警值及限额值，系统会发送短信提醒到手机号。达到限额值时，系统暂停短信发送，需要您手动更改。</p>
              <el-row>
                <el-col :span="2">
                  <el-button type="primary">保存</el-button>
                </el-col>
                <el-col :span="4">
                  <el-button @click="isShowSet=false">取消</el-button>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </el-card>
    </div>
    <!-- 账户余额 -->
    <div class="user-count">
      <el-card class="send-item">
        <div slot="header" class="clearfix">
          <span class="msg-text">账户余额预警设置</span>
        </div>
        <div>
          <!-- 文本 -->
          <div class="send-text">
            <p>剩余短信条数： 0 条</p>
            <p>
              可用额度预警：
              <el-switch
                v-model="switchVal"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="handleChoose"
              ></el-switch>
            </p>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 弹框组件-->
    <el-dialog title="预警设置" :visible.sync="dialogVal" width="34%">
      <div>
        <!-- form表单 -->
        <el-form
          :model="formList"
          ref="formList"
          label-width="120px"
          :inline="true"
          class="demo-ruleForm"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="可用短信条数预警阀值:" label-width="180px">
                <el-input v-model="formList.count"></el-input>
              </el-form-item>
              <span class="unit-title">条</span>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVal = false">取 消</el-button>
        <el-button type="primary" @click="dialogVal = false">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "MessageSetting",
  data() {
    return {
      isShowSet: false, // 是否显示设置信息
      formInline: {
        user: "",
        region: ""
      },
      switchVal: true,
      dialogVal: false,
      formList: {
        count: 0
      }
    };
  },
  methods: {
    handleChoose(val) {
      this.dialogVal = !val;
    }
  }
};
</script>
<style lang="less" scoped>
.unit-title {
  position: relative !important;
  top: 12px !important;
}
.send-count {
  margin-bottom: 60px;
  .unit {
    position: relative;
    top: 12px;
  }

  .send-item {
    height: 380px;
    width: 100%;
    margin: 10px auto;
  }

  .msg-text {
    font-weight: 420;
    font-size: 16px;
  }
  .btn-set {
    margin-top: 15px;
    margin-bottom: 30px;
  }
  .prompt {
    color: #a9b0b4;
    margin-top: 10px;
  }
}
</style>