class MainInterface {

  constructor() {
    this.currentAElement = null;
    this.currentIndex = 0;
    this.nullFn = function () { return null; };
    this.__onMainInterfacevKeyDown = this.nullFn;
  }

  _handleMainInterfaceButtons(type) {
    const aElements = document.querySelectorAll('#demo-list a');
    if (!this.currentAElement) {
      this.currentAElement = aElements[this.currentIndex];
    } else {
      if (type === 'next') {
        this.currentIndex++;
      } else {
        this.currentIndex--;
      }
      if (!aElements[this.currentIndex]) {
        if (type === 'next') {
          this.currentIndex = 0;
        } else {
          this.currentIndex = aElements.length - 1;
        }
      }
      this.currentAElement = aElements[this.currentIndex];
    }
    this.currentAElement.focus();
  }

  _onMainInterfacevKeyDown(e) {
    const keyCode = e.keyCode;
    // console.log('Key code from MainInterface called: ' + keyCode);
    switch (keyCode) {
      case 39: // Right arrow
      case 40: // DOWN arrow
        this._handleMainInterfaceButtons('next');
        break;
      case 37: // Left arrow
      case 38: // UP arrow
        this._handleMainInterfaceButtons('previous');
        break;
      case 13: // Enter
        e.preventDefault();
        try {
          this.currentAElement.click();
          this.currentAElement.blur();
        } catch (e) {
          console.log(e);
        }
        break;
    }
  }

  wire() {
    this.__onMainInterfacevKeyDown = this._onMainInterfacevKeyDown.bind(this);
    document.addEventListener('keydown', this.__onMainInterfacevKeyDown);
  }

  unwire() {
    document.removeEventListener('keydown', this.__onMainInterfacevKeyDown);
    this.__onMainInterfacevKeyDown = this.nullFn;
  }

}

export default MainInterface;
