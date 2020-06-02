export default {
    // 框架自带验证正则
    isvalidUsername(str) {
        const valid_map = ['admin', 'table', 'nested']
        return valid_map.indexOf(str.trim()) >= 0
    },
    isExternal(path) {
        return /^(https?:|mailto:|tel:)/.test(path)
    },

    // 公用正则验证
    /**
     * 签名验证
     * 2~12个字，由中英文或数字组成。其中，中文和英文都作为一个字统计支持全英文,不支持空格、符号或全数字
     * @param {*} rule 定义正则
     * @param {*} value 传入的值
     * @param {*} callback 返回函数
     * */
    validateSign(rule, value, callback) {
        const reg = /^[\u4e00-\u9fa5a-zA-Z][\u4e00-\u9fa5a-zA-Z0-9]{1,11}$/
        if (value) {
            if (!reg.test(value)) {
                callback(new Error("请输入由'以字母或中文开头，可以包含中文、字母、数字2-12字符名称！'"));
            } else {
                callback();
            }
        } else {
            callback(new Error("请输入内容"));
        }
    },

    /**
     * 模版内容验证
     * 暂不支持如[],【】，★、 ※、 →、 ●等特殊符号
     * @param {*} rule 定义正则
     * @param {*} value 传入的值
     * @param {*} callback 返回函数
     * */
    validateModel(rule, value, callback) {
        const reg = /[【】★※→●[]]/
        if (value) {
            if (reg.test(value)) {
                callback(new Error("暂不支持如[],【】，★、 ※、 →、 ●等特殊符号"));
            } else {
                callback();
            }
        } else {
            callback(new Error("请输入内容"));
        }
    },

    /**
     * 验证特殊字符
     * @param {*} rule 定义正则
     * @param {*} value 传入的值
     * @param {*} callback 返回函数
     */
    specialCharacters(rule, value, callback) {
        const reg = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im
        if (value) {
            if (!reg.test(value)) {
                callback(new Error("请输入正确的内容"));
            } else {
                callback();
            }
        } else {
            callback(new Error("请输入内容"));
        }
    },

    /**
     * 支付宝账号验证
     * @param {*} rule 定义正则
     * @param {*} value 传入的值
     * @param {*} callback 返回函数
     */
    validateAlipay(rule, value, callback) {
        const reg = /^(?:\w+\.?)*\w+@(?:\w+\.)+\w+|\d{9,11}$/;
        if (rule.required) {
            if (!value) {
                callback(new Error('请输入支付宝账号'));
            } else if (!reg.test(value)) {
                callback(new Error('请输入正确支付宝账号'));
            } else {
                callback();
            }
        } else if (value && !reg.test(value)) {
            callback(new Error('请输入正确支付宝账号'));
        } else {
            callback();
        }
    },

    /**
     * 只能是英文和数字
     * @param {*} rule 定义正则
     * @param {*} value 传入的值
     * @param {*} callback 返回函数
     */
    EnglishAndNum(rule, value, cb) {
        const reg = new RegExp('^[a-zA-Z0-9]+$');
        if (rule.required) {
            if (!value) {
                cb(new Error('请输入信息'));
            } else if (!reg.test(value)) {
                cb(new Error('只能输入英文和数字'));
            } else {
                cb();
            }
        } else if (value && !reg.test(value)) {
            cb(new Error('只能输入英文和数字'));
        } else {
            cb();
        }
    },

    /**
     * 只能是数字正整数
     * @param {*} rule 定义正则
     * @param {*} value 传入的值
     * @param {*} callback 返回函数
     */
    positiveInteger(rule, value, cb) {
        const reg = new RegExp('^[0-9]*$');
        if (rule.required) {
            if (!value) {
                cb(new Error('请输入信息'));
            } else if (!reg.test(value)) {
                cb(new Error('只能输入正整数'));
            } else {
                cb();
            }
        } else if (value && !reg.test(value)) {
            cb(new Error('只能输入正整数'));
        } else {
            cb();
        }
    },

    /**
     * 数字 可以带小数
     * @param {*} rule 定义正则
     * @param {*} value 传入的值
     * @param {*} callback 返回函数
     */
    validateNumber(rule, value, cb) {
        const reg = new RegExp('^[+]?[0-9]*\\.?[0-9]+$');
        if (rule.required) {
            if (!value && Number(value) !== 0) {
                cb(new Error('请输入信息'));
            } else if (!reg.test(value)) {
                cb(new Error('只能输入正数字'));
            } else {
                cb();
            }
        } else if (value && !reg.test(value)) {
            cb(new Error('只能输入正数字'));
        } else {
            cb();
        }
    },

    /**
     * 验证用户邮箱是否正确
     * @param {*} rule 定义正则
     * @param {*} value 传入的值
     * @param {*} callback 返回函数
     */
    validateEmail(rule, value, callback) {
        const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        if (rule.required) {
            if (!value) {
                callback(new Error('请输入邮箱'));
            } else if (!reg.test(value)) {
                callback(new Error('请输入正确的邮箱'));
            } else {
                callback();
            }
        } else if (value && !reg.test(value)) {
            callback(new Error('请输入正确的邮箱'));
        } else {
            callback();
        }
    },

    /**
     * 验证手机号是否正确
     * @param {*} rule 定义正则
     * @param {*} value 传入的值
     * @param {*} callback 返回函数
     */
    validatePhone(rule, value, callback) {
        const reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
        if (rule.required) {
            if (!value) {
                callback(new Error('请输入手机号码'));
            } else if (!reg.test(value)) {
                callback(new Error('请输入正确的手机号码'));
            } else {
                callback();
            }
        } else if (value && !reg.test(value)) {
            callback(new Error('请输入正确的手机号码'));
        } else {
            callback();
        }
    },

    /**
     * 验证密码是否正确
     * @param {*} rule 定义正则
     * @param {*} value 传入的值
     * @param {*} callback 返回函数
     */
    validatePassword(rule, value, callback) {
        const hasUpperCase = /[A-Z]+?/.test(value);
        const hasLowerCase = /[a-z]+?/.test(value);
        const hasNumber = /[0-9]+?/.test(value);
        const hasSpecial = /[_.#?!@$%^&*-]+?/.test(value);
        const pass = [hasUpperCase, hasLowerCase, hasNumber, hasSpecial].filter(
            item => item
        );
        const errMsg = '至少包含数字、大小写字母、特殊字符_.#?!@$%^&*-中的两种';
        if (rule.required) {
            if (!value) {
                callback(new Error('请输入密码'));
            } else if (value.length < 6) {
                callback(new Error('最少6位'));
            } else if (pass.length < 2) {
                callback(errMsg);
            } else {
                callback();
            }
        } else if (value) {
            if (value.length < 6) {
                callback(new Error('最少6位'));
            } else if (pass.length < 2) {
                callback(errMsg);
            }
        } else {
            callback();
        }
    },






}