import {TextRes} from './res-link';
import _ from 'lodash';

const table_sym = Symbol('string_table');

class StringResource {

  constructor(onLoadComplete) {
    const table = {};
    StringResource[table_sym] = table;
    if (TextRes.ui_string) {
      new StringDataLoader(table, TextRes.ui_string, onLoadComplete);
    }
    else {
      if (onLoadComplete != null) onLoadComplete();
    }
  }

  static get(id) {
    if (StringResource[table_sym] == null) {
      console.warn('not initialize, string resource');
      return;
    }
    let value = StringResource[table_sym][id];
    let a = "";
    return (value != null) ? value : '@id/' + id;
  }

  static hasString(id) {
    let value = StringResource[table_sym][id];
    return (value != null) ? value : null;
  }
}

class StringDataLoader {

  constructor(tableObj, resource, onLoadComplete) {
    fetch(resource).then((res) => {
        return res.blob();
    }).then((blob) => {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.parsing(tableObj, e.target.result);
        console.log('complete : string resoucre loaded');
        if (onLoadComplete) onLoadComplete();
      };
      reader.readAsText(blob);
    });
  }

  parsing(tableObj, text) {
    var arr = _.map(text.split('\n'), _.trim);
    _.map(arr, (str)=>{
      var kv = _.split(str, '=', 2);
      var id = _.trim(kv[0]);
      var value = _.trim(kv[1]);
      value = _.replace(value, /\\n/gi, "\n");
      tableObj[id] = value;
    });
  }
}

export default StringResource;
