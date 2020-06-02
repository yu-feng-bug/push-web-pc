import { Axios } from '@/utils'

export default {
    fetchList(query) {
        return Axios.get('/article/list', query)
    },
    fetchArticle(id) {
        return Axios.get('/article/detail', { id })
    },
    fetchPv(pv) {
        return Axios.get('/article/pv', { pv })
    },
    createArticle(data) {
        return Axios.post('/article/create', data)
    },
    updateArticle(data) {
        return Axios.post('/article/update', data)
    }
}