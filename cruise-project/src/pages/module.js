import {
  requestLogin,
  fetchAgent,
  fetchBase
} from './service'; //service  ajax request
import {
  Message
} from 'element-ui';
import Router from '../router'

const state = {
  user: {},
  agent: [],
  base: {
    "building": {},
    "idle": {},
    "type": [],
    "osVisibleModel": null
  }
}

const actions = {
  /**
   * 
   * @param {*} JSON
   * login interface
   */
  async loginAction({
    commit
  }, params) {
    // let {
    //   data
    // } = await requestLogin(params);
    let data = {
      code: 200,
      user: {
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545105819211&di=f661aea3a33798d97b51bf9c0e62612b&imgtype=0&src=http%3A%2F%2Fpic35.photophoto.cn%2F20150509%2F0010023701662314_b.jpg',
      }
    }
    if (data.code !== 200) {
      Message({
        message: data.msg,
        type: 'error'
      });
    } else {
      commit("SET_USER", data.user); //to mutation
      sessionStorage.setItem('user', JSON.stringify(data.user));
      Router.push({
        name: 'AGENT'
      });
    }
  },
  async fetchBase({
    commit
  }, params) {
    let {
      data
    } = await fetchBase(params);
    console.log("fetchBase", data);
    commit("SET_BASE", data); // to mutation

  },
  async fetchAgent({
    commit
  }, params) {
    let {
      data
    } = await fetchAgent(params);
    let addOsVisibleModel = [];
    for (var i = 0; i < data.length; i++) {
      addOsVisibleModel.push(false);
    }
    commit("SET_OSMODEL", addOsVisibleModel);
    commit("SET_AGENT", data);
  },
  updateOsModelStatus({
    commit
  }, params) {
    commit("SET_OSMODEL_STATUS", params);
  },
  addOsNames({
    commit,
    state
  }, params) {
    if (params.key && params.osNamesArray) {
      console.log(params.key ,"...", params.osNamesArray)
      let agent = state.agent;
      console.log("res", agent[params.key])
      params.osNamesArray.map((resouce) => {
        if (!agent[params.key].resources) {
          agent[params.key].resources = [];
        }
        agent[params.key].resources.push(resouce)
      })
      commit("SET_AGENT", agent);
    }
  },
  deleteOsName({
    commit,
    state
  }, params) {
    if (params.key && params.index) {
      let agent = state.agent;
      agent[params.key].resources.splice(params.index);
      commit("SET_AGENT", agent);
    }
  }
}
const mutations = {
  SET_USER(state, params) {
    state.user = params;
  },
  SET_AGENT(state, params) {
    state.agent = params;
  },
  SET_BASE(state, params) {
    state.base = params;
  },
  SET_OSMODEL(state, params) {
    state.osVisibleModel = params;
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}