export function toolbarShow() {
  window.location.href = 'uniwebview://bottom_bar?active=' + "true";
}

export function toolbarHide() {
  window.location.href = 'uniwebview://bottom_bar?active=' + "false";
}
