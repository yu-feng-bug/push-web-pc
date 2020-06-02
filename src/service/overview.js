import { Axios } from '@/utils'
import configApi from './config'
import Qs from 'qs'

const API = configApi['API'];

export default {
    // 获取操作入口
    getOperate(body) {
        return Axios.post(`${API}/overview/queryFastOperation`, Qs.stringify(body))
    },

    // 获取每个月发送短信数量
    getSendCount(body) {
        return Axios.post(`${API}/overview/querySendCountByMouth`, Qs.stringify(body))
    },

    // 获取每个月的12月的消费情况
    getConsumCount(body) {
        return Axios.post(`${API}/overview/queryConsumerTrendByMouth`, Qs.stringify(body))
    },
}