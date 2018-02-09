import { toolbarShow, toolbarHide } from '../unity-message';

export class EventController {

  constructor() {
    this.sy = 0;
    this.target = null;
  }

  addUnityToolbarEvent(target) {
    this.target = target;
    target.addEventListener('touchstart', this.onTouchStart = (e)=>{
      this.sy = target.scrollTop;
    });

    target.addEventListener('touchend', this.onTouchEnd = (e)=>{
      if (target.scrollTop > this.sy){
        toolbarHide();
      }
      else if (target.scrollTop < this.sy) {
        toolbarShow();
      }
    });
  }

  removeUnityToolbarEvent() {
    this.target.removeEventListener('touchstart', this.onTouchStart);
    this.target.removeEventListener('touchend', this.onTouchEnd);
  }
}
