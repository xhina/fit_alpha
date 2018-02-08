import _ from 'lodash';

export default class BrowserHistory {
  constructor() {
    this.history = [];
  }

  go(page_uid) {
    let lastPage = _.last(this.history);
    this.history.push(page_uid);
  }

  goBack() {
    let list = this.history;
    let p = _.takeRight(list, 2);
    if (_.size(p) > 1) {
      list.pop();
      return _.last(list);
    }
    return null;
  }

  goBackEnable() {
    let list = this.history;
    return _.size(list) > 1;
  }

  current() {
    return _.last(this.history);
  }

  prev() {
    if (this.history.length <= 1){
      return null;
    }
    return this.history[this.history.length - 2];
  }

  reset() {
    this.history.length = 0;
  }

}
