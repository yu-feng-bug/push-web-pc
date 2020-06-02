const invoiceInformate = {
    state: {
        billsArr: [], // 订单信息
        invoiceObj: {}, // 发票信息
        addressObj: {}, // 寄送地址
    },

    mutations: {
        SET_BILLSARR: (state, billsArr) => {
            state.billsArr = billsArr
        },
        SET_INVOICEOBJ: (state, invoiceObj) => {
            state.invoiceObj = invoiceObj
        },
        SET_ADDRESSOBJ: (state, addressObj) => {
            state.addressObj = addressObj
        },

    },

    actions: {

    }
}

export default invoiceInformate