<template>
  <div>
    <!-- sso -->
    <!-- 检验sso页面 -->
  </div>
</template>

<script>
import { Axios } from "@/utils";
import sessionStorage from "@/utils/sessionStorage.js";
export default {
  async mounted() {
    let res = await this.isHaveCookie();
    if (res) {
      this.setUserInfo(res);
    } else {
      this.$router.push("/login");
    }
  },
  methods: {
    //如果cookie中有token 去到接口去用户信息
    isHaveCookie() {
      let token = this.$cookies.get("token");
      return new Promise((r, j) => {
        Axios({
          method: "post",
          url: `api/sso`,
          headers: {
            token: token
          }
        }).then(res => {
          console.log(res);
          if (res.code == 200) {
            r(res);
          } else {
            r(false);
          }
        });
      });
    },
    setUserInfo(res) {
      if (res.code != 200) return;
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
        this.$Message.error("暂无登陆权限");
        return this.$router.push("/login");
      }
      this.$cookies.set("token", val.token);
      sessionStorage.saveData("userInfo", data);

      //向其他项目发起set cookies操作
      //   if (res.data.data.appInfos && Array.isArray(res.data.data.appInfos)) {
      //     sessionStorage.set_cookies(res.data.data.appInfos, val.token);
      //   }
      return this.$router.replace("/");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>