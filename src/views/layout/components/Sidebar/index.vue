<template>
  <div class="sidebar-wrap">
    <div class="push" v-show="!isCollapse">
      <svg-icon icon-class="icon_push" class="push-logo" />易恒PUSH系统
    </div>
    <div v-show="isCollapse" class="img-logo">
      <svg-icon icon-class="icon_push" class="collapse-logo svg-icon" />
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permission_routers"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import variables from "@/styles/variables.less";
import SidebarItem from "./SidebarItem";
import { constants } from "fs";
export default {
  computed: {
    ...mapGetters(["sidebar", "permission_routers"]),
    routes() {
      return this.$router.options.routes;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  components: { SidebarItem }
};
</script>

<style lang="less" scoped>
.img-logo {
  height: 30px;
  margin-top: 10px;
}
.collapse-logo {
  font-size: 16px;
  margin-left: 12px !important;
}
.push-logo {
  width: 16px;
  height: 16px;
  margin: 0 6px 0 0px !important;
}
.sidebar-wrap {
  height: 100%;
  background-color: rgb(48, 65, 86);
}
.sidebar-container > .push {
  height: 30px;
  color: #fff !important;
  font-size: 20px;
  padding: 50px 0 35px 42px;
  font-weight: 500;
  font-weight: 700;
}
.el-scrollbar {
  overflow: visible !important;
}
el-scrollbar {
  overflow: visible !important;
}
</style>