import { Axios } from '@/utils'
export default {
    loginByUsername(username, password) {
        return Axios.get('/user/login', {
            username,
            password
        })
    },
    getUserInfo(token) {
        return Axios.get(`/user/info`, { token })
    },
    logout(token) {
        return Axios({
            'method': "POST",
            'url': `/sys/loginout`,
            'headers': {
                "Access-Control-Allow-Headers": "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild",
                'token': token
            }
        })
    }
}