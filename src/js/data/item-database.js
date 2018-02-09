import item_data from '../../res/string/item_list.xml';

const GENDER = {
  MAN : "man",
  WOMAN : "woman"
}

let itemDataBase;
const GetItemDB = () => {
  if (itemDataBase == null) {
    itemDataBase = new ItemDataBase();
  }
  return itemDataBase;
}

export default GetItemDB;

class ItemDataBase {
  init(onFinishCallback) {
    this.db = {};
    this.db.items = {};
    this.db.manItemsIds = [];
    this.db.womanItemsIds = [];
    this.db.categoryMan = {};
    this.db.categoryWoman = {};
    new Parser(this.db, onFinishCallback);
  }

  getItemAtId(id) {
    return this.db.items[id];
  }

  getItemIdsAtGender(gender) {
    return gender == GENDER.MAN ? [...this.db.manItemsIds] : [...this.db.womanItemsIds];
  }

  getCategoryTypes(gender) {
    return gender == GENDER.MAN ? Object.assign({},this.db.categoryMan) : Object.assign({}, this.db.categoryWoman);
  }

}

class Parser {
  constructor(db, onFinishCallback) {
    this.db = db;
    this.manIds = db.manItemsIds;
    this.womanIds = db.womanItemsIds;
    this.categoryMan = db.categoryMan;
    this.categoryWoman = db.categoryWoman;
    this.parsing(db);
    this.onFinishCallback = onFinishCallback;
  }

  parsing() {
    fetch(item_data).then((r)=>r.blob()).then((r)=>{
      let reader = new FileReader();
      reader.onload = (r) => {
          let parser = new DOMParser();
          let xmlDom = parser.parseFromString(r.target.result, "text/xml");
          this.parsingItems(xmlDom.getElementsByTagName("man")[0]);
          this.parsingItems(xmlDom.getElementsByTagName("woman")[0]);
          if (this.onFinishCallback != null) {
            this.onFinishCallback();
          }
      }
      reader.readAsText(r);
    });
  }

  parsingItems(rootNode) {
    const gender = rootNode.nodeName;
    let itemNode = rootNode.children;

    const data = {};
    let genderIds = gender == GENDER.MAN ? this.manIds : this.womanIds;
    let categoryIds = gender == GENDER.MAN ? this.categoryMan : this.categoryWoman;


    for (let i = 0;i < itemNode.length;i++) {
      const item = itemNode[i];
      let itemObj = new ItemData();
      itemObj.id = item.getElementsByTagName("id")[0].innerHTML;
      itemObj.type = item.getElementsByTagName("type")[0].innerHTML;
      itemObj.gender = item.getElementsByTagName("gender")[0].innerHTML;
      itemObj.brand = item.getElementsByTagName("brand")[0].innerHTML;
      itemObj.name = item.getElementsByTagName("name")[0].innerHTML;
      itemObj.pricemoney = item.getElementsByTagName("pricemoney")[0].innerHTML;
      itemObj.pricegem = item.getElementsByTagName("pricegem")[0].innerHTML;
      itemObj.description = item.getElementsByTagName("description")[0].innerHTML;
      itemObj.small_iamge = item.getElementsByTagName("small_iamge")[0].innerHTML;
      itemObj.large_iamge = item.getElementsByTagName("large_iamge")[0].innerHTML;
      itemObj.owned = item.getElementsByTagName("owned")[0].innerHTML == "true";

      this.db.items[itemObj.id] = itemObj;
      genderIds.push(itemObj.id);
      if (categoryIds[itemObj.type] == null) {
        categoryIds[itemObj.type] = [];
      }
      categoryIds[itemObj.type].push(itemObj);
    }
  }
}

class ItemData {

  // get id() {
  //   return this.id;
  // }
  //
  // get type() {
  //   return this.type;
  // }
  //
  // get gender() {
  //   return this.gender;
  // }
  //
  // get brand() {
  //   return this.brand;
  // }
  //
  // get name() {
  //   return this.name;
  // }
  //
  // get pricemoney() {
  //   return this.pricemoney;
  // }
  //
  // get pricegem() {
  //   return this.pricegem;
  // }
  //
  // get description() {
  //   return this.description;
  // }
  //
  // get small_iamge() {
  //   return this.small_iamge;
  // }
  //
  // get large_iamge() {
  //   return this.large_iamge;
  // }
}
