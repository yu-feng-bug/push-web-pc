import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Layout from "@/views/layout";

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [{
        path: "/login",
        name: "Login",
        hidden: true,
        component: () =>
            import ( /* webpackChunkName: "main" */ "@/views/login"),
    },
    {
        path: "/test_sso",
        name: "test_sso",
        hidden: true,
        component: () =>
            import ( /* webpackChunkName: "main" */ "@/views/test_sso"),
    },
    {
        path: "/overview",
        redirect: "/overview",
        component: Layout,
        children: [{
            path: "/overview",
            name: "Overview",
            component: () =>
                import ( /* webpackChunkName: "main" */ "@/views/overview"),
            meta: { title: "概览", icon: "eye-open", affix: true },
        }, ],
    },
    {
        path: "/",
        name: "Home",
        redirect: "/home",
        component: Layout,
        children: [{
            path: "/home",
            name: "SendMessage",
            component: () =>
                import ( /* webpackChunkName: "main" */ "@/views/send-message"),
            meta: { title: "发送中心", icon: "form" },
        }, ],
    },
    {
        path: "/smsCentre",
        name: "smsCentre",
        redirect: "/smsCentre/moduleList",
        component: Layout,
        alwaysShow: true,
        meta: { title: "短信管理", icon: "tree" },
        children: [{
                path: "moduleList",
                name: "moduleList",
                // hidden: true, // 隐藏路由标签
                component: () =>
                    import (
                        /* webpackChunkName: "form" */
                        "@/views/sms-centre/module-list"
                    ),
                meta: { title: "短信列表", icon: "" },
            },
            {
                path: "signature",
                name: "Signature",
                component: () =>
                    import ( /* webpackChunkName: "form" */ "@/views/sms-centre/signature"),
                meta: { title: "签名", icon: "" },
            },
            {
                path: "stencil",
                name: "stencil",
                component: () =>
                    import ( /* webpackChunkName: "form" */ "@/views/sms-centre/stencil"),
                meta: { title: "模版", icon: "" },
            },
            // {
            //     path: "stencil-libraries",
            //     name: "tencil-libraries",
            //     component: () =>
            //         import (
            //             /* webpackChunkName: "form" */
            //             "@/views/sms-centre/stencil-libraries"
            //         ),
            //     meta: { title: "模版库列表", icon: "" },
            // },
        ],
    },
    {
        path: "/dataSheet",
        name: "dataSheet",
        redirect: "/dataSheet/sendRecord",
        component: Layout,
        alwaysShow: true,
        meta: { title: "数据统计", icon: "table" },
        children: [{
                path: "sendRecord",
                name: "sendRecord",
                // hidden: true, // 隐藏路由标签
                component: () =>
                    import (
                        /* webpackChunkName: "form" */
                        "@/views/data-sheet/send-record"
                    ),
                meta: { title: "发送记录", icon: "" },
            },
            {
                path: "sendVolume",
                name: "sendVolume",
                // hidden: true, // 隐藏路由标签
                component: () =>
                    import (
                        /* webpackChunkName: "form" */
                        "@/views/data-sheet/send-volume"
                    ),
                meta: { title: "发送量统计", icon: "" },
            },
            {
                path: "sendTask",
                name: "sendTask",
                // hidden: true, // 隐藏路由标签
                component: () =>
                    import ( /* webpackChunkName: "form" */ "@/views/data-sheet/send-task"),
                meta: { title: "发送任务设置", icon: "" },
            },
            // {
            //     path: "expenses",
            //     name: "expenses",
            //     // // hidden: true, // 隐藏路由标签
            //     component: () =>
            //         import ( /* webpackChunkName: "form" */ "@/views/data-sheet/expenses"),
            //     meta: { title: "消费记录", icon: "" },
            // },
        ],
    },
    // {
    //     path: '/financialMiddle',
    //     name: 'FinancialMiddle',
    //     redirect: '/financialMiddle/Recharge',
    //     component: Layout,
    //     alwaysShow: true,
    //     meta: { title: '财务中心', icon: 'example' },
    //     children: [{
    //         path: 'Recharge',
    //         name: 'Recharge',
    //         component: () =>
    //             import ( /* webpackChunkName: "form" */ '@/views/financial-middle/Recharge'),
    //         meta: { title: '充值订单', icon: '' }
    //     }, {
    //         path: 'Package',
    //         name: 'Package',
    //         component: () =>
    //             import ( /* webpackChunkName: "form" */ '@/views/financial-middle/Package'),
    //         meta: { title: '充值套餐', icon: '' }
    //     }, {
    //         path: 'invoice',
    //         name: 'invoice',
    //         component: () =>
    //             import ( /* webpackChunkName: "form" */ '@/views/financial-middle/invoice'),
    //         meta: { title: '发票管理', icon: '' }
    //     }, ]
    // },

    // {
    //     path: "/userCenter",
    //     name: "UserCenter",
    //     redirect: "/UserCenter/Center",
    //     component: Layout,
    //     alwaysShow: true,
    //     meta: { title: "用户中心", icon: "user" },
    //     children: [{
    //         path: "Center",
    //         name: "Center",
    //         component: () =>
    //             import ( /* webpackChunkName: "form" */ "@/views/user-center/users"),
    //         meta: { title: "企业信息管理", icon: "" },
    //     }, ],
    // },
    // {
    //     path: "/systemSetting",
    //     redirect: "/systemSetting/messageSetting",
    //     component: Layout,
    //     alwaysShow: true,
    //     meta: { title: "系统设置", icon: "nested" },
    //     children: [{
    //             path: "messageSetting",
    //             name: "MessageSetting",
    //             component: () =>
    //                 import (
    //                     /* webpackChunkName: "form" */
    //                     "@/views/system-setting/message-setting"
    //                 ),
    //             meta: { title: "消息设置", icon: "" },
    //         },
    //         {
    //             path: "report",
    //             name: "Report",
    //             component: () =>
    //                 import (
    //                     /* webpackChunkName: "form" */
    //                     "@/views/system-setting/download-report"
    //                 ),
    //             meta: { title: "下载报表", icon: "" },
    //         },
    //     ],
    // },
    {
        path: "/documentation",
        redirect: "/documentation",
        component: Layout,
        children: [{
            path: "/documentation",
            name: "Documentation",
            component: () =>
                import ( /* webpackChunkName: "main" */ "@/views/documentation"),
            meta: { title: "帮助文档", icon: "form" },
        }, ],
    },
    {
        path: "/404",
        name: "Page404",
        hidden: true,
        component: () =>
            import ( /* webpackChunkName: "error-page" */ "@/views/error-page/404"),
    },
    {
        path: "/401",
        name: "Page401",
        hidden: true,
        component: () =>
            import ( /* webpackChunkName: "error-page" */ "@/views/error-page/401"),
    },
];

import tableRouter from "./modules/nested.js";

export const asyncRouterMap = [
    // tableRouter,
    {
        path: "*",
        redirect: "/404",
        hidden: true,
    },
];

export default new VueRouter({
    mode: "hash",
    routes: constantRouterMap,
    scrollBehavior: () => ({
        y: 0,
    }),
});