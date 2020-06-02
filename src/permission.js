import router from "./router";
import store from "./store";
import NProgress from "nprogress"; // 页面跳转的进度条
import "nprogress/nprogress.css";
import { Message } from "element-ui";
import { Auth } from "@/utils";

NProgress.configure({ showSpinner: false });

const WHITE_LIST = ["/login"]; // 白名单列表， 不需要token 权限验证

router.beforeEach((to, from, next) => {
    NProgress.start();
    // 获取sessionStorage的user数据，判断权限
    let userInfo = JSON.parse(window.sessionStorage.userInfo || "{}");
    // debugger;
    // 1. 若用户token存在，则判断当前路径是否为登录页，若是则进入首页
    if (userInfo.name) {
        if (to.path === "/login") {
            next("/");
        } else {
            // 2. 用户权限设置左侧导航栏的router
            if (store.getters.roles.length === 0 || from.path === "/login") {
                store
                    .dispatch("GetUserInfo", userInfo)
                    .then((res) => {
                        const roles = res.roles;
                        store.dispatch("GenerateRoutes", roles).then(() => {
                            router.addRoutes(store.getters.addRouters);
                            next({...to, replace: true });
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        // store.dispatch('Logout', userInfo).then(() => {
                        //     Message.error(err)
                        //     next({ path: '/' })
                        // })
                    });
            }
            next();
        }
    } else {
        // console.log(to);
        // 3.若用户token 不存在,则判断是否存在白名单，若存在白名单，则跳转白名单，若不是从/login 页面进来的则进入sso
        if (to.path == "/login") {
            next();
        } else if (to.path == "/test_sso") {
            next();
        } else {
            next("/test_sso");
        }
    }
    // next();
});

router.afterEach(() => {
    NProgress.done();
});