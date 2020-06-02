import { Axios } from "@/utils";
import configApi from "./config";
import Qs from "qs";

const API = configApi["API"];

export default {
    // 查询详情
    getDetail(taskId) {
        return Axios.post(
            `${API}/census/queryFailById`,
            Qs.stringify({
                taskId: taskId,
            })
        );
    },

    // 发送记录查询
    SendRecord(body) {
        return Axios.post(`${API}/census/querySendRecord`, Qs.stringify(body));
    },

    // 发送任务查询
    sendTask(body) {
        return Axios.post(`${API}/census/queryTaskRecord`, Qs.stringify(body));
    },

    // 导出发送任务列表
    loadTaskList(params) {
        const url = `${API}/census/exportTaskRecord/downloadExcel?token=${params}`;
        window.open(url, "_self");
    },

    // 导出发送统计列表
    loadSendRecrd(params) {
        const url = `${API}/census/exportSendRecrd/downloadExcel?token=${params}`;
        window.open(url, "_self");
    },
    // 消费列表
    getConsumeList(body) {
        return Axios.post(`${API}/census/queryConsumeRecord`, Qs.stringify(body));
    },

    // 用户信息数量
    getUserMsg(body) {
        return Axios.post(`${API}/census/queryUserBalance`, Qs.stringify(body));
    },

    // 消费记录导出
    consumeExport(params) {
        const url = `${API}/census/exportConsumeRecord/downloadExcel?token=${params}`;
        window.open(url, "_self");
    },

    // 导出发送量列表
    exportSendCount(params) {
        (window.location.href = `${API}/census/exportSendCount`), { params };
    },

    // 发送量统计
    SendCount(body) {
        return Axios.post(`${API}/census/querySendCount`, Qs.stringify(body));
    },

    // 取消任务
    cancelTask(body) {
        return Axios.post(`${API}/send/cancelTask`, Qs.stringify(body));
    },
};