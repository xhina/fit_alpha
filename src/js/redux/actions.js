export const CHANGE_GENDER = "change_gender";
export const SELECT_ITEM = "select_item";

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
