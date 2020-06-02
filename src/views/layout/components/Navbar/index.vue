<template>
  <div class="navbar">
    <hamburger
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    />
    <breadcrumb />
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <div class="headerFl">你好，{{userName}}</div>
        <i class="el-icon-switch-button" />
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "./Breadcrumb";
import Hamburger from "./Hamburger";
import Axios from "../../../../utils/axios.js";
import { LoginService } from "@/service";
import sessionStorage from "../../../../utils/sessionStorage.js";
export default {
  computed: {
    ...mapGetters(["sidebar", "userInfo"])
  },
  data() {
    return {
      //获取的本地userInfo
      userAdmin: [],
      //获取登录人
      userName: ""
    };
  },
  mounted() {
    this.userAdmin = sessionStorage.getData("userInfo");
    this.userName = this.userAdmin.name;
    console.log(this.userName);
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    logout() {
      window.sessionStorage.removeItem("userInfo");
      window.sessionStorage.removeItem("ssoToken");
      window.sessionStorage.removeItem("routerInfo");
      Axios({
        method: "post",
        url: `/api/sys/loginout`,
        headers: {
          "Access-Control-Allow-Headers":
            "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild",
          token: this.$cookies.get("token")
        }
      });
      this.$router.push('/login');
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  }
};
</script>

<style lang="less" scoped>
.el-icon-switch-button {
  position: absolute;
  right: -20px;
  top: 14px;
  font-size: 16px;
  font-weight: 700;
}
.el-icon-switch-button:hover {
  transform: scale(1.2);
  color: #0cc2aa;
}
.headerFl {
  font-size: 18px;
  padding-top: 10px;
  padding-right: 20px;
}
.navbar {
  height: 50px;
  line-height: 50px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }

  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }

  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 60px;

    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;

      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
    }
  }
}
.el-dropdown-menu {
  margin-top: -3px !important;
  width: 100px !important;
  height: 40px !important;
  line-height: 40px !important;
  padding: 0 !important;
}
.el-dropdown-menu li:hover {
  color: #0cc2aa;
}
.el-dropdown-menu {
  .el-dropdown-menu__item--divided {
    margin-top: 0px !important;
    border-top: none !important;
    line-height: 28px !important;
  }
}
</style>