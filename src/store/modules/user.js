import { login } from '@/utils/wechat'
import $http from '@/utils/api'
let arrLength = null
const user = {
  state: {
    userInfo: null,
    locationInfo: null,
    systemInfo: null,
    clusterInfo: null,
    doAuth: false,
    personInfo: null,
    BusinessList: null,
    loginStatus: false,
    handleLoginOut: false,
    ids: '',
    isLoading: false,
    formIds: [],
    iphoneX: false
  },
  mutations: {
    SET_USER_INFO: (state, info) => {
      state.userInfo = info
    },
    SET_DO_AUTH: (state, info) => {
      state.doAuth = info
    },
    SET_LOCATION_INFO: (state, paylode) => {
      state.locationInfo = paylode
    },
    SET_SYSTEM_INFO: (state, paylode) => {
      state.systemInfo = paylode
    },
    SET_CLUSTER_INFO: (state, paylode) => {
      state.clusterInfo = paylode
    },
    SET_PERSON_INFO: (state, paylode) => {
      state.personInfo = paylode
    },
    SET_BUSINESS_LIST: (state, paylode) => {
      state.BusinessList = paylode
    },
    SET_IS_LOADING: (state, paylode) => {
      state.isLoading = paylode
    },
    SET_LOGIN_STATUS: (state, paylode) => {
      state.loginStatus = paylode
    },
    SET_HANDLE_LOGIN_OUT: (state, paylode) => {
      state.handleLoginOut = paylode
    },
    SET_IDS: (state, paylode) => {
      state.ids = paylode
    },
    SET_FORM_IDS: (state, paylode) => {
      state.formIds = paylode
    },
    SET_IPHONE_X: (state, paylode) => {
      state.iphoneX = paylode
    }
  },
  actions: {
    async getUserInfo ({commit}) {
      const jsCode = await login()
      const res = await $http.getOpenId(jsCode)
      res['openId'] = 'sns_wa_' + res.openid
      res.openid = 'sns_wa_' + res.openid
      commit('SET_USER_INFO', res)
      let formids = []
      let expireTimes = []
      user.state.formIds.map(i => {
        formids.push(i.formid)
        expireTimes.push(i.timestamp)
      })
      arrLength = user.state.formIds.length
      if (formids.length > 0) {
        if (user.state.formIds[0].formid === 'the formId is a mock one') return
        await $http.collectFormId(res.openid, formids.join(','), expireTimes.join(','))
        commit('SET_FORM_IDS', [])
      }
      setInterval(async () => {
        let formids = []
        let expireTimes = []
        user.state.formIds.map(i => {
          formids.push(i.formid)
          expireTimes.push(i.timestamp)
        })
        if (formids.length > 0 && user.state.formIds.length !== arrLength) {
          if (user.state.formIds[0].formid === 'the formId is a mock one') return
          await $http.collectFormId(res.openid, formids.join(','), expireTimes.join(','))
          commit('SET_FORM_IDS', [])
          arrLength = user.state.formIds.length
        }
      }, 10000)
    }
  }
}

export default user
