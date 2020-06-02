<template>
  <div class="login_wrap">
    <div class="login_header">
      <!-- 微信扫码的图片 -->
      <div class="logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z"
          />
          <polyline points="2.32 6.16 12 11 21.68 6.16" />
          <line x1="12" y1="22.76" x2="12" y2="11" />
        </svg>
        <span>易恒PUSH系统</span>
      </div>
      <div class="dosc">2020年1月更新</div>
    </div>
    <!-- 中间数组标题 -->
    <div class="login_content">
      <div class="left">
        <p>数据可视化深度融合，创造数字化未来</p>
      </div>
      <div class="right">
        <div>
          <span>微信登录</span>
        </div>
        <div>
          <div class="code">
            <img :src="codeUrl" alt />
          </div>
          <div class="text">
            <span>请使用微信扫描二维码登录</span>
          </div>
          <div class="text">
            <span>{{indate}}</span>
            <span>秒后自动刷新</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部文字显示 -->
    <div class="login_foot">
      <span>Copyright © 2018-2019 ECMOHO. 易恒健康-数据中心 版权所有</span>
    </div>
  </div>
</template>

<script>
import { Axios } from "@/utils";
import { Auth, Utils } from "@/utils";
export default {
  data() {
    return {
      codeUrl: "",
      indate: 120, //倒计时总时间
      indateJiShiQi: null,
      timer: [],
      isDone: false,
      all: null,
      allTime: 180, //多少时间后停止请求接口 超时断开
      myToken: "", //
      isSendSso: false,
      jsShiQi: null,
      redirect: undefined // 权限的跳转router
    };
  },
  async mounted() {
    this.getCode();
  },
  created() {},
  methods: {
    getCode() {
      const url = window.location.href.split("#")[0];
      let getUrl = () => {
        Axios.get(`/qrcode/user/manage/vx/?app_domain=${url}`, {
          timeout: 2000
        })
          .then(res => {
            let { code, data } = res;
            if (code == 200) {
              this.codeUrl = data.url;
              this.lastTime(data.scene_id);
              this.startInterval();
            }
          })
          .catch(err => {
            setTimeout(() => {
              getUrl();
            }, 1000);
          });
      };
      getUrl();
    },
    isScanCode(id) {
      Axios.get("/qrcode/user/vx/user_info/", {
        params: {
          scene_id: id
        }
      })
        .then(async res => {
          //扫码成功
          if (res.code == 200) {
            this.setUserInfo(res);
            clearInterval(this.jsShiQi);
            clearInterval(this.indateJiShiQi);
          }
        })
        .catch(e => {});
    },
    lastTime(id) {
      this.jsShiQi = setInterval(() => {
        this.isScanCode(id); //开始检查是否扫码
      }, 2000);
    },
    //刷新二维码倒计时启动
    startInterval() {
      this.indate = 120;
      this.indateJiShiQi = setInterval(() => {
        if (this.indate <= 1) {
          clearInterval(this.indateJiShiQi);
          clearInterval(this.jsShiQi);
          this.getCode();
        }
        this.indate--;
      }, 1000);
    },
    // 取到用户信息  开始操作
    async setUserInfo(res) {
      let _this = this;
      // if (res.code != 200) return;
      let val = res.data;
      let data = {
        name: val.user_name,
        token: val.token,
        unite_field: val.unite_field,
        email: val.email,
        group: val.group,
        nick_name: val.nick_name,
        status: val.status,
        user_number: val.user_number,
        vx_id: val.vx_id,
        user_admin: val.user_admin,
        login_admin: val.login_admin,
        audit_admin: val.audit_admin,
        app_admin: val.app_admin,
        group_admin: val.group_admin
      };
      //单独rbac判断能否登陆权限
      if (!val.login_admin) {
        this.getCode();
        this.$cookies.remove("token");
        return this.$Message.error("暂无登陆权限");
      }
      this.$cookies.set("token", val.token);
      this.$store.commit("SET_USER_INFO", data);
      Auth.saveData("userInfo", data);

      //向其他项目发起set cookies操作
      if (res.data.appInfos && Array.isArray(res.data.appInfos)) {
        Auth.set_cookies(res.data.appInfos, val.token);
      }

      setTimeout(() => {
        _this.$router.push("/").catch(err => {});
      }, 20);
      // return this.$router.replace("/");
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
.login_wrap {
  height: 100%;
  background-image: url("../../assets/images/login_back.jpg");
  background-size: 100% 100%;
  position: relative;
  & > .login_header {
    display: flex;
    height: 148px;
    justify-content: space-around;
    background-color: rgba(78, 94, 107, 0.6);
    .logo {
      height: auto;
      line-height: 64px;
      color: white;
      font-size: 24px;
      font-weight: 500;
      text-align: center;
      display: flex;
      align-items: center;
      svg {
        color: #fff;
        height: 26px;
        width: 26px;
        vertical-align: middle;
        margin-right: 8px;
      }
    }
    .dosc {
      color: #b4beca;
      display: flex;
      align-items: center;
      font-size: 14px;
      letter-spacing: 2px;
      margin-left: 180px;
    }
  }
  & > .login_content {
    width: 100%;
    min-height: calc(100% - 351px);
    display: flex;
    align-items: center;
    justify-content: center;
    & > .left {
      & > p {
        font-size: 30px;
        color: #fff;
        letter-spacing: 2px;
      }
      & > ul {
        color: #cdd1d8;
        text-align: left;
        line-height: 30px;
        font-size: 14px;
        margin-top: 40px;
      }
    }
    & > .right {
      width: 340px;
      margin-left: 100px;
      border-radius: 4px;
      overflow: hidden;
      text-align: center;
      & > div:nth-child(1) {
        background-color: #cbced1;
        height: 63px;
        line-height: 63px;
        & > span:nth-child(1) {
          color: #003b51;
          font-size: 18px;
          font-weight: bold;
        }
        & > span:nth-child(2) {
          color: #003b51;
          font-size: 14px;
          margin-left: 8px;
          font-weight: bold;
        }
      }
      & > div:nth-child(2) {
        background-color: #a5a7ae;
        height: 340px;
        overflow: hidden;
        & > .code {
          background-color: #fff;
          width: 180px;
          height: 180px;
          margin: 45px auto 34px;
          & > img {
            width: 100%;
            height: 100%;
          }
        }
        & > .text {
          text-align: center;
          color: #333333;
          font-size: 14px;
          margin-bottom: 10px;
        }
      }
    }
  }
  & > .login_foot {
    width: 100%;
    height: 203px;
    background-color: rgba(78, 94, 107, 0.5);
    overflow: hidden;
    text-align: center;
    & > span {
      display: inline-block;
      margin-top: 50px;
      color: #acb4c0;
      font-size: 14px;
      letter-spacing: 1px;
    }
  }
}
</style>