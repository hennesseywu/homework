//requestLogin
export function requestLogin(params) {
  return window.$ajax.post(`/login`, params);
}

//fetchBase
export function fetchBase(params) {
  return window.$ajax.get(`/base`, params);
}

//fetchAgent
export function fetchAgent(params) {
  let getUrl = "/agents";
  if (params&&params.type) {
    getUrl += "?type=" + params.type
  }
  return window.$ajax.get(getUrl);
}