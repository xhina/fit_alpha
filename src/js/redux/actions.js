export const CHANGE_GENDER = "change_gender";
export const SELECT_ITEM = "select_item";
export const BUY_ITEM = "buy_item";
export const UNITY_MESSAGE_EVENT = "unity_message_event";

export function selectGender(gender) {
  return {
    type : CHANGE_GENDER,
    gender : gender
  }
}

export function selectItem(itemData) {
  return {
    type : SELECT_ITEM,
    itemData : itemData
  }
}

export function buyItem(id) {
  return {
    type : BUY_ITEM,
    itemId : id
  }
}

export function unityMessageEvent(enable) {
  return {
    type : UNITY_MESSAGE_EVENT,
    enable : enable
  }
}
