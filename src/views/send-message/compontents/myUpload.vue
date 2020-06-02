<template>
  <div>
    <el-upload
      ref="uploadRef"
      class="upload-demo"
      action
      :on-change="handleChange"
      :on-remove="handleRemove"
      :file-list="fileList"
      :limit="limitUpload"
      :auto-upload="false"
      :on-error="handleError"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    >
      <el-button size="small" type="info">导入号码</el-button>
      <div slot="tip" class="el-upload__tip">只能上传一个xlsx/xls 文件</div>
    </el-upload>
  </div>
</template>

<script>
// accept 为默认打开的可上传的文件格式
export default {
  data() {
    return {
      limitUpload: 1, // 限制上传1个
      fileTemp: null, // 上传的文件
      fileListUpload: [], //上传的文件列表
      sizeLimit: 3, // 文件大小限制3m
      formats: ["xlsx", "csv", "xls"],
      fileList: []
    };
  },
  created() {},
  mounted() {},
  methods: {
    /**
     * 判断上传文件格式
     *
     * */
    handleChange(file, fileList) {
      this.fileTemp = file.raw;
      if (this.fileTemp) {
        if (
          this.fileTemp.type ==
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          this.fileTemp.type == "application/vnd.ms-excel"
        ) {
          this.$emit("handleGetFile", this.fileTemp);
          this.importfile(this.fileTemp);
        } else {
          this.$message({
            type: "warning",
            message: "附件格式错误，请删除后重新上传！"
          });
        }
      } else {
        this.$message({
          type: "warning",
          message: "请上传附件！"
        });
      }
    },

    /**
     * 删除文件时，初始化 fileTemp 为null
     *
     * */
    handleRemove(file) {
      this.fileList = [];
      this.fileTemp = null;
      this.file = null;
      this.$emit("handleExcelData", []);
    },

    /**
     * 转化文件类型 格式
     *
     * */
    importfile(obj) {
      let _this = this;
      // 通过DOM取文件数据
      this.file = obj;
      var rABS = false; //是否将文件读取为二进制字符串
      var f = this.file;
      var excleData = null;
      var reader = new FileReader();
      FileReader.prototype.readAsBinaryString = function(f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var pt = this;
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function(e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: "base64"
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary"
            });
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西
          this.da = [...outdata];
          let arr = [];
          this.da.map((v, i) => {
            let obj = {};
            obj.tel = v["手机号"];
            obj.type = v["变量1"];
            arr.push(obj);
          });
          setTimeout(function() {
            _this.$emit("handleExcelData", arr);
          }, 200);
          return arr;
        };
        reader.readAsArrayBuffer(f);
      };

      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },

    // 文件上传失败时的钩子
    handleError(err, file, fileList) {
      this.$message.error("文件上传失败");
    }
  }
};
</script>

<style lang="less" scoped>
.el-upload__tip {
  margin: 10px 0;
}
</style>