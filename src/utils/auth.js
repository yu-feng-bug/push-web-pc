const TOKEN_KEY = 'doooly-admin-key'

export default {
    getToken() {
        return localStorage.getItem(TOKEN_KEY)
    },
    setToken(token) {
        return localStorage.setItem(TOKEN_KEY, token)
    },
    removeToken() {
        return localStorage.setItem(TOKEN_KEY, '')
    },
    //记录页面数据状态到sessionStorage
    saveData(key, data) {
        let data_str = JSON.stringify(data)
        window.sessionStorage[key] = data_str
    },
    //返回页面数据状态到
    getData(key) {
        let data_str = window.sessionStorage[key]
        let data = JSON.parse(data_str || "{}")
        return data
    },
    // 设置cookies
    set_cookies: function(urlList, token) {
        for (var i = 0; i < urlList.length; i++) {
            var _frm = document.createElement("iframe");
            _frm.style.display = "none";
            _frm.src = urlList[i]['appDomain'] + '#/set_cookies?token=' + token;
            document.body.appendChild(_frm);
        }
    }
}