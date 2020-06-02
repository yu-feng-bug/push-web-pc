import Axios from 'axios'
import { Message } from 'element-ui'
import { Auth, Utils } from '@/utils'
import router from '../router'

// axios 配置 
Axios.defaults.withCredentials = true;
Axios.defaults.timeout = 6000;
// Axios.defaults.headers = { 'Content-Type': 'application/json' };

// post 传参数格式处理
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/**发送拦截**/
Axios.interceptors.request.use(
    (config) => {
        let userInfo = Auth.getData('userInfo')
        if (userInfo.token) {
            config.headers.token = userInfo.token
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

/**响应拦截**/
Axios.interceptors.response.use(
    (res) => {
        let { data } = res;
        let { code } = data;

        if (code == 800) {
            window.sessionStorage.removeItem("userInfo")
            router.replace('/login');
        } else if (code == 403) {
            Message.error('权限不足，请联系管理员');
            return Promise.reject('权限不足，请联系管理员');
        } else if (code == 402) {
            Message.error('token过期,请重新登录')
            window.sessionStorage.removeItem("userInfo")
            router.replace('/login');
            return Promise.reject('token过期,请重新登录');
        } else if (code == 406) {
            Message.error('邮箱授权码/邮箱不匹配')
            return Promise.reject('邮箱授权码/邮箱不匹配');
        } else if (code == 4031) {
            Message.error('无效地址,请添加ip至应用白名单')
            return Promise.reject('无效地址,请添加ip至应用白名单');
        } else if (code == 4032) {
            Message.error('应用验证失败,请重新验证');
            return Promise.reject('应用验证失败,请重新验证');
        } else if (code == 4033) {
            Message.error('数据格式错误')
            return Promise.reject('数据格式错误');
        } else {
            return data;
        }
    },
    error => {
        let code = error.response.data.code
        if (code == 800) {
            window.sessionStorage.removeItem("userInfo")
            router.replace('/login');
        }
        return Promise.reject(error);
    }
)

export default Axios;