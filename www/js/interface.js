class MainInterface {

  constructor(debug) {
    this.currentAElement = null;
    this.currentIndex = 0;
    this.nullFn = function () { return null };
    this.__onMainInterfacevKeyDown = this.nullFn;
    this.debug = debug;
  }

  _handleMainInterfaceButtons() {
    const aElements = document.querySelectorAll('a');
    if (!this.currentAElement) {
      this.currentAElement = aElements[this.currentIndex];
    } else {
      this.currentIndex++;
      if (!aElements[this.currentIndex]) {
        this.currentIndex = 0;
      }
      this.currentAElement = aElements[this.currentIndex];
    }
    this.currentAElement.focus();
  }

  _onMainInterfacevKeyDown(e) {
    if (this.debug) {
      window.console.log(e);
    }
    const keyCode = e.keyCode;
    if (this.debug) {
      window.console.log('Key code from MainInterface called: ' + keyCode);
    }
    switch (keyCode) {
      case 39: // Right arrow
      case 37: // Left arrow
      case 38: // UP arrow
      case 40: // DOWN arrow
        this._handleMainInterfaceButtons();
        break;
      case 9: // tab
        e.preventDefault();
        break;
      case 13: // Enter
        e.preventDefault();
        try {
          this.currentAElement.click();
          this.currentAElement.blur();
        } catch (e) {
          if (this.debug) {
            window.console.log(e);
          }
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
