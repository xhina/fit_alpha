export const CHANGE_GENDER = "CHANGE_GENDER";

export function selectGender(gender) {
  return {
    type : CHANGE_GENDER,
    gender : gender
  }
}
