import _ from 'lodash';

function parameterFromURL(searchVar) {
  let params = new URLSearchParams(window.location.search);
  return params.get(searchVar);

  // let params = _.replace(window.location.search, "?", "");
  // params = _.split(params, "&");
  // for (let i = 0;i < params.length;i++) {
  //   let e = params[i];
  //   let p = _.split(e, "=");
  //   if (p.length < 2)
  //     continue;
  //
  //   const {k,v} = {k:p[0], v:p[1]};
  //   if (k === searchVar) {
  //     return v;
  //   }
  // }
  // return null;
}
export default parameterFromURL;
