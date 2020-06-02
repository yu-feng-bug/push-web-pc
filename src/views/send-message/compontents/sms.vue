<template>
  <div class="sms-wrapper wrapper-container">
    <p class="title">短信发送</p>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <!-- 任务 -->
      <el-form-item label="任务名称" prop="taskName">
        <el-row>
          <el-col :span="8">
            <el-input v-model="ruleForm.taskName" placeholder="请输入不超过30字的内容" clearable></el-input>
          </el-col>
        </el-row>
      </el-form-item>

      <!-- 签名 -->
      <el-form-item label="短信签名" prop="signId">
        <el-row>
          <el-col :span="4">
            <el-select v-model="ruleForm.signId" placeholder="请选择" clearable>
              <el-option
                v-for="(item,index) in searchSigns"
                :key="index"
                :label="item.sign"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>

      <el-row>
        <el-col :span="12">
          <p class="signle-title">
            * 没有需要的签名，马上
            <router-link to="/smsCentre/signature">
              <span class="tag-title">添加签名</span>
            </router-link>
          </p>
        </el-col>
      </el-row>

      <!-- 模版 -->
      <el-form-item label="短信模版">
        <el-row>
          <el-col :span="4">
            <el-select
              v-model="ruleForm.smsTemplates1"
              placeholder="请选择 如：短信通知"
              @change="chooseTemplate"
            >
              <el-option
                v-for="(item,index) in options"
                :label="item.label"
                :value="item.value"
                :key="index"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="templateId">
              <el-select
                v-model="ruleForm.templateId"
                filterable
                placeholder="请选择"
                clearable
                @change="chooseModelChild"
              >
                <el-option
                  v-for="(item,index) in templateDatas"
                  :key="index"
                  :label="item.templateName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-row>
        <el-col :span="24">
          <p class="signle-title">
            * 没有需要的模板，马上
            <router-link to="/smsCentre/stencil">
              <span class="tag-title">添加模板</span>
            </router-link>
          </p>
        </el-col>
      </el-row>

      <!-- 手机 -->

      <el-form-item label="手机号">
        <el-row>
          <el-col :span="12">
            <el-radio-group v-model="radio" @change="chooseTelModel">
              <el-radio label="1" :disabled="variableSign == 1">手动输入接受号码</el-radio>
              <el-radio label="2">导入接受号码文件</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item v-if="radio == '1'">
        <el-row>
          <el-col :span="3">
            <el-form-item prop="notVariableMobile">
              <el-input
                v-model="ruleForm.notVariableMobile"
                maxlength="11"
                placeholder="请输入手机号"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>

      <!-- excel导入模块 -->
      <div v-if="radio == '2'" class="excel-content">
        <!-- excel 手机号展示 -->
        <el-row>
          <el-col :span="8">
            <el-tooltip
              class="item"
              effect="light"
              popper-class="tel-tooltip"
              :content="telContent"
              placement="top"
              v-show="telContent"
            >
              <div slot="content" class="tel-box">{{telContent}}</div>

              <div class="tel-content">{{telContent}}</div>
            </el-tooltip>
          </el-col>
        </el-row>
        <span class="tel-task" v-show="telContent">最多展示前20个手机号</span>
        <el-row class="tel">
          <el-col :span="4">
            <!-- 导入组件 -->
            <MyUpload
              @handleGetFile="handleGetFile"
              @handleExcelData="handleExcelData"
              ref="uploadRef"
            ></MyUpload>
          </el-col>
        </el-row>
        <ul class="task-title">
          <li>
            请上传xlsx格式，“变量模版”号码文件
            <span class="down-btn" @click="handleTelTemplate">范例下载</span>，什么是
            <el-tooltip class="item" effect="light" placement="top" popper-class="tip-task">
              <div slot="content" class="tip-task">
                变量模版范例:'尊敬的${param}，您获得${param}元双十一狂欢券，
                <br />请登录APP领取'
              </div>
              <span class="model-btn">变量模版</span>
            </el-tooltip>
          </li>
          <li>Excel的单元格格式请务必使用“常规”或者“文本”格式</li>
          <li>请保存导入文件的变量顺序与模版内容的变量顺序一致，请严格遵守范例样式</li>
          <li>文件大小不可超过3M，建议单次导入号码50万个内</li>
        </ul>
      </div>

      <!-- 定时发送 -->

      <el-form-item label="定时发送" prop="sendSign">
        <el-switch v-model="sendSign" @change="handleSwitch"></el-switch>
      </el-form-item>

      <!-- 设置发送日期 -->
      <el-form-item label="设置发送时间" v-if="sendSign" required>
        <el-row>
          <el-col :span="4">
            <el-form-item prop="sendDt1">
              <el-date-picker
                v-model="ruleForm.sendDt1"
                type="date"
                placeholder="选择日期时间"
                :picker-options="pickerOptions"
                value-format="yyyy/MM/dd"
                @change="handleDateTime"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="sendDt2">
              <el-time-picker
                arrow-control
                placeholder="时间点"
                v-model="ruleForm.sendDt2"
                value-format="HH:mm:ss"
                @change="handleDateTime2"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row v-if="isShowDate">
          <el-col :span="24">
            <div class="date-task">定时任务时间必须晚于当前时间!</div>
          </el-col>
        </el-row>
      </el-form-item>

      <!-- 发送按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交发送任务</el-button>
        <!-- <el-button @click="submitForm('ruleForm','test')">发送测试</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { SmsService } from "@/service"; // 引入短信模块的接口
import sessionStorage from "./../../../utils/sessionStorage.js";
import { Validate } from "@/utils"; // 引入校验规则
import MyUpload from "./myUpload";
import { Axios } from "@/utils";

//搜索下拉框数据
const options = [
  { value: "", label: "全部" },
  { value: "1", label: "验证码" },
  { value: "2", label: "短信通知" },
  { value: "3", label: "推广短信" }
];

export default {
  name: "sms",
  components: { MyUpload },
  data() {
    return {
      pickerOptions: {
        // 设置日期范围
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
        }
      },
      options,
      delExcel: true, // 是否删除文件
      isShowDate: false, // 日期判断显示s
      telContent: "", // 展示导入的手机号
      userAdmin: [], //获取的本地userInfo
      fileList: [], //导入文件
      //发送信息的from数据
      ruleForm: {
        taskName: "", // 任务名称
        signId: null, // 短信签名ID
        smsTemplates1: "", // 短信模版
        templateId: null, // 短信模版ID
        notVariableMobile: "", //手机号
        sendSign: "off", // 定时发送
        useId: 1,
        sendDt1: null,
        sendDt2: null,
        token: this.$cookies.get("token")
      },
      variableSign: 0, // 是否含有变量
      file: null, // 导入文件
      sendSign: false, // 开关默认false
      radio: "1",
      file: null,
      searchSigns: {}, // 签名栏
      templateDatas: {}, // 模板列表
      searchSign: {
        page: 1, // 分页
        rows: 9999 // 每页显示的条数
      },
      templateData: {
        templateName: "", // 搜索框数据
        templateType: "", // 搜索下拉框数据
        page: "1",
        rows: 9999
      },
      rules: {
        taskName: [
          { required: true, message: "请输入任务名称", trigger: "blur" },
          { min: 1, max: 30, message: "长度在 1 到 30个字符", trigger: "blur" }
        ],
        notVariableMobile: [
          { required: true, validator: Validate.validatePhone, trigger: "blur" }
        ],
        templateId: [
          { required: true, message: "请选择短信模版", trigger: "change" }
        ],
        signId: [
          { required: true, message: "请选择短信签名", trigger: "change" }
        ],
        sendDt1: [
          {
            required: true,
            message: "请选择日期",
            trigger: "blur"
          }
        ],
        sendDt2: [
          {
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this.getSignList(); // 签名列表
    this.TemplateList(); // 模版列表
  },
  mounted() {
    // 获取用户id
    this.userAdmin = sessionStorage.getData("userInfo");
  },
  methods: {
    /**
     * 1.选择短信模版时 需要判断改模块是否含有变量，若有变量则 无法 手动输入手机号
     * 2. 每次更换模版，若有变量则 需要清空导入的手机号码
     * */
    chooseModelChild(val) {
      const obj = this.templateDatas.filter(child => child.id === val)[0];
      console.log(obj, "obj");
      this.variableSign = obj.variableSign;
      if (this.variableSign) {
        this.chooseTelModel("2");
      } else {
        this.chooseTelModel("1");
      }
      if (this.telContent) this.$refs.uploadRef.handleRemove();
    },

    // 选择手机单输入或者导入
    chooseTelModel(val) {
      this.radio = val;
    },

    // 设置日期时间 获取选择的时间值
    handleDateTime(val) {
      this.ruleForm.sendDt1 = val;
      this.isShowDate = this.handleIsChooseTime(
        this.ruleForm.sendDt1,
        this.ruleForm.sendDt2
      );
    },

    // 设置获取时间值
    handleDateTime2(val) {
      this.ruleForm.sendDt2 = val;
      this.isShowDate = this.handleIsChooseTime(
        this.ruleForm.sendDt1,
        this.ruleForm.sendDt2
      );
    },

    // 判断选择的时间是否小于当前值
    handleIsChooseTime(date, time) {
      if (date && time) {
        var timeVal = date + " " + time;
        var chooseTime = new Date(timeVal).getTime(); // 得到毫秒数
        var nowTime = new Date().getTime(); // 当前时间戳
        if (chooseTime < nowTime) {
          return true;
        }
      }
      return false;
    },

    // 获取switch的定时开关
    handleSwitch(val) {
      if (val) {
        this.ruleForm.sendSign = "on";
      } else {
        this.ruleForm.sendSign = "off";
      }
    },

    // 下载手机模版
    handleTelTemplate() {
      SmsService.export(this.$cookies.get("token"));
    },

    // 获取文件类型
    handleGetFile(file) {
      this.file = file;
    },

    // 获取excel文件的手机内容
    handleExcelData(arr) {
      this.excelData = arr;
      this.telContent = "";
      if (arr.length > 20) {
        arr = arr.slice(0, 20);
      }
      arr.forEach(item => {
        this.telContent += item.tel + ",";
      });
      // 如果短信模版有变量 则验证用户上传的excel 是否有变量字段
      // if (this.variableSign && this.excelData.length) {
      //   this.$message({
      //     type: "error",
      //     message: "请根据短信模版<变量个数>导入正确的文件格式!",
      //     duration: 5000
      //   });
      //   this.telContent = "";
      //   this.$refs.uploadRef.fileList = [];
      // }
    },

    // 短信模版
    chooseTemplate(val) {
      this.ruleForm.templateId = "";
      this.TemplateList(val);
    },

    // 获取模板列表页
    async TemplateList(val) {
      this.templateData.templateName = this.ruleForm.templateId;
      this.templateData.templateType = val;
      const { code, data } = await SmsService.queryTemplateList(
        this.templateData
      );
      this.templateDatas = data.list;
    },

    // 获取签名列表页
    async getSignList() {
      const { code, data } = await SmsService.signInfoList(this.searchSign);
      this.searchSigns = data.list;
    },

    // 发送任务接口
    async handleAddTask(obj) {
      const { data, code } = await SmsService.sendTask(obj);
      if (code == 200) {
        this.$message({
          type: "success",
          message: "发送成功!"
        });
        this.$router.push({ name: "sendTask" });
      } else {
        this.$message({
          type: "error",
          message: "发送失败!"
        });
      }
    },

    // 发送按钮
    submitForm(formName, type) {
      this.$refs[formName].validate(valid => {
        if (valid && !this.isShowDate) {
          if (
            this.ruleForm.sendSign == "on" &&
            this.ruleForm.sendDt1 &&
            this.ruleForm.sendDt2
          ) {
            this.ruleForm.sendDt =
              this.ruleForm.sendDt1 + " " + this.ruleForm.sendDt2;
          }
          if (this.radio == "2") {
            this.ruleForm.notVariableMobile = "";
            if (!this.telContent) {
              this.$message({
                type: "warning",
                message: "请导入接受号码文件!"
              });
              return;
            }
          }
          if (this.telContent) {
            let formData = new FormData();
            for (let key in this.ruleForm) {
              formData.append(key, this.ruleForm[key]);
            }
            formData.append("file", this.file);
            // 若是发送测试按钮 则需要验证模版是否含有变量

            if (this.variableSign && type == "test") {
              this.$message({
                type: "warning",
                message: "请选择不含有${param}短信模版!"
              });
              return;
            } else {
              this.handleSendFile(formData);
            }
          } else {
            this.handleAddTask(this.ruleForm);
          }
        } else {
          return false;
        }
      });
    },

    // 发送上传文件时接口
    handleSendFile(data) {
      let requestConfig = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      Axios.post("/push/send/addTask", data, requestConfig).then(res => {
        if (res.code == 200) {
          this.$message({
            message: "发送成功",
            type: "success"
          });
          this.$router.push({ name: "sendTask" });
        } else {
          this.$message({
            message: "发送失败",
            type: "error"
          });
        }
      });
    },

    // 发送信息
    async addMation() {
      if (this.fileList != "") {
        this.ruleForm.notVariableMobile = "";
      }
      if (this.ruleForm.notVariableMobile != "") {
        this.fileList = "";
      }
      let datas = {
        file: this.fileList, // 批量手机号文件
        taskName: this.ruleForm.taskName, // 任务名称
        signId: this.ruleForm.signId, // 短信签名ID
        templateId: this.ruleForm.templateId, // 短信模版ID
        notVariableMobile: this.ruleForm.notVariableMobile, //手机号
        sendDt: this.ruleForm.sendDt, // 活动日期时间
        sendSign: this.ruleForm.sendSign, // 定时发送
        useId: 113,
        token: this.$cookies.get("token")
      };
      const { code, data } = await SmsService.addTask(datas);
      if (code == 200) {
        this.$message({
          message: "发送成功",
          type: "success"
        });
      } else {
        this.$message({
          message: "发送失败",
          type: "error"
        });
      }
    },

    // 发送测试按钮
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.tip-task .el-tooltip__popper {
  color: red !important;
}
.sms-wrapper {
  .model-btn {
    font-weight: 500;
    color: #909399;
    cursor: pointer;
  }
  .down-btn {
    color: #0cc2aa;
    cursor: pointer;
  }
  .tag-title {
    color: #0cc2aa;
  }
  .date-task {
    font-size: 12px;
    position: relative;
    top: -20px;
    color: #e55130;
  }
  .tel {
    margin: 10px 0;
  }
  .excel-content {
    margin-left: 120px;
  }
  .title {
    font-size: 18px;
    font-weight: 500;
  }
  .signle-title {
    height: 10px;
    margin-top: -8px;
    margin-left: 120px;
    color: #a9b0b4;
    font-size: 12px;
  }
  .task-title {
    color: #a9b0b4;
    font-size: 12px;
    padding: 0 15px;
    margin: 0;
    li {
      height: 15px;
      margin-bottom: 3px;
    }
  }
  .tel-content {
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    font-size: 14px;
    line-height: 40px;
    padding: 0 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    margin-bottom: 20px;
  }
  .tel-box {
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    font-size: 12px;
    padding: 0 15px;
    cursor: pointer;
  }
  .tel-task {
    font-size: 12px;
    color: #606266;
    margin: 8px 0;
  }
}
</style>
