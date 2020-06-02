import { LoginService } from "@/service";
import { Auth } from "@/utils";

const user = {
    state: {
        userInfo: {},
        roles: [],
        dateSt: "",
    },

    mutations: {
        SET_USER_INFO: (state, userInfo) => {
            state.userInfo = userInfo;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        SET_DATE: (state, dateSt) => {
            state.dateSt = dateSt;
        },
    },

    actions: {
        // 获取用户的权限信息，来设置用户token 和 routers
        GetUserInfo({ commit }, obj) {
            return new Promise((resolve, reject) => {
                // 用户租权限数组
                let roles = [obj.user_admin, obj.group_admin];
                let res = {
                    data: obj,
                    roles: roles,
                };
                if (roles && roles.length > 0) {
                    commit("SET_ROLES", roles);
                    commit("SET_USER_INFO", obj);
                    Auth.setToken(obj.token);
                } else {
                    reject("loginByUsername: 角色列表不能为空");
                }
                resolve(res);
            });
        },
        // 登出
        // Logout({ commit }, token) {
        //     return new Promise((resolve, reject) => {
        //         // 删除本地用户信息
        //         LoginService.logout(token).then(() => {
        //             window.sessionStorage.removeItem("userInfo");
        //             window.sessionStorage.removeItem("ssoToken");
        //             commit('SET_USER_INFO', {});
        //             commit('SET_ROLES', []);
        //             resolve();
        //         }).catch(err => {
        //             reject(err)
        //         })
        //     })

        // }
    },
};

export default user;