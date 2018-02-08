import _ from 'lodash';

let userData;

export function getUserData() {
  if (userData == null) {
    userData = new UserData();
  }
  return userData;
}

class UserData {
  constructor() {
    this.data = {};
    this.data.os = this.checkOS();
    this.data.chromeVer = this.checkChromeVer();
    this.env = new AppEnv();
    this.env.checkTransitionEffectMode(this.data.os, this.data.chromeVer);
  }

  get appEnv() {
    return this.env;
  }

  checkOS() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      if (/Android/i.test(navigator.userAgent)) {
        return "android";
      }
      else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        return "ios";
      }
      else {
        return "mobile_etc";
      }
    }
    else {
      return "web";
    }
  }

  checkChromeVer() {
    let ver = 0;
    const agent = navigator.userAgent.toLowerCase();
    if (agent.indexOf("chrome") == -1) {
      return ver;
    }

    const arr = _.split(agent, ' ');
    for (let i in arr) {
      let str = arr[i];
      let idx = str.indexOf('chrome');
      if (idx == -1) continue;
      let v = _.split(str, "/");
      if (v.length < 2) continue;
      ver = v[1].split('.')[0];
      break;
    }
    console.log('chorme version : ', ver);
    return ver;
  }

  get os() {
    return this.data.os;
  }

}

class AppEnv {

  constructor() {
    this.transtion_mode = true;
  }

  get transitionMode() {
    return this.transtion_mode;
  }

  checkTransitionEffectMode(os, chromeVer) {
    this.transtion_mode = true;

    // if (chromeVer == 0 || chromeVer > 60) {
    //   this.transtion_mode = true;
    // }
    // else {
    //   this.transtion_mode = false;
    // }
  }

}
