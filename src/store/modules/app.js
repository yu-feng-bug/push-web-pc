const app = {
    state: {
        sidebar: {
            opened: localStorage.getItem('sidebarStatus') ? localStorage.getItem('sidebarStatus') == 'true' : true,
            withoutAnimation: false
        },
        device: 'desktop'
    },
    mutations: {
        TOGGLE_SIDEBAR: state => {
            state.sidebar.opened = !state.sidebar.opened
            localStorage.setItem('sidebarStatus', state.sidebar.opened)
            state.sidebar.withoutAnimation = false
        },
        CLOSE_SIDEBAR: (state, withoutAnimation) => {
            state.sidebar.opened = false
            localStorage.setItem('sidebarStatus', state.sidebar.opened)
            state.sidebar.withoutAnimation = withoutAnimation
        },
        TOGGLE_DEVICE: (state, device) => {
            state.device = device
        }
    },
    actions: {
        ToggleSideBar: ({ commit }) => {
            commit('TOGGLE_SIDEBAR')
        },
        CloseSideBar({ commit }, { withoutAnimation }) {
            commit('CLOSE_SIDEBAR', withoutAnimation)
        },
        ToggleDevice({ commit }, device) {
            commit('TOGGLE_DEVICE', device)
        }
    }
}

export default app