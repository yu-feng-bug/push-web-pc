import { Axios } from '@/utils'
import configApi from './config'
import Qs from 'qs'

const API = configApi['API'];

export default {

    // 短信发送
    addTask(body) {
        return Axios.post(`${API}/send/addTask`, Qs.stringify(body))
    },

    // 添加签名
    addSignInfo(body) {
        return Axios.post(`${API}/sign/addSignInfo`, Qs.stringify(body))
    },

    // 签名列表
    signInfoList(body) {
        return Axios.post(`${API}/sign/querySignList`, Qs.stringify(body))
    },

    // 签名详情
    signInfoDetail(params) {
        return Axios.get(`${API}/sign/querySignInfo`, { params })
    },

    // 修改签名
    editSignInfo(body) {
        return Axios.post(`${API}/sign/modifySignInfo`, Qs.stringify(body))
    },

    // 删除签名
    delSignfo(params) {
        return Axios.get(`${API}/sign/delSignInfo`, { params })
    },

    // 添加模板
    addTemplate(body) {
        return Axios.post(`${API}/template/addTemplateInfo`, Qs.stringify(body))
    },

    // 查询模板
    queryTemplateList(body) {
        return Axios.post(`${API}/template/queryTemplateList`, Qs.stringify(body))
    },

    // 删除模板
    delTemplateInfo(params) {
        return Axios.get(`${API}/template/delTemplateInfo`, { params })
    },

    // 修改模板
    modifyTemplateInfo(body) {
        return Axios.post(`${API}/template/modifyTemplateInfo`, Qs.stringify(body))
    },

    // 模板详情
    queryTemplateInfo(params) {
        return Axios.get(`${API}/template/queryTemplateInfo`, { params })
    },

    // 发送短信任务
    sendTask(body) {
        return Axios.post(`${API}/send/addTask`, Qs.stringify(body))
    },

    // 下载手机模版
    export (params) {
        const url = `${API}/send/FixedTemplate/downloadExcel?token=${params}`;
        window.open(url, "_self");

    }


}