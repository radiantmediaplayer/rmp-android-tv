import AVAILABLE_STREAMS from './assets.js';

const PLAYER_ID = 'rmp';

const PLAYER_BUTTONS = [
  { id: 0, name: 'fastRewind', element: null },
  { id: 1, name: 'quickRewind', element: null },
  { id: 2, name: 'playPause', element: null },
  { id: 3, name: 'quickForward', element: null },
  { id: 4, name: 'fastForward', element: null }
];

class PlayerManagement {
  constructor(mainInterface) {
    this.rmp = new RadiantMP(PLAYER_ID);
    this.rmpContainer = document.getElementById(PLAYER_ID);
    this.playerOnStage = false;
    this.activePlayerButtonId = 2;
    this.nullFn = function () { return null; };
    this.__onLoadeddataWirePlayerKeys = this.nullFn;
    this.__onPlayerKeyDown = this.nullFn;
    this.__onBackButton = this.nullFn;
    this.mainInterface = mainInterface;
  }

  // Private Methods
  _createEvent(eventName, htmlElement) {
    let event;
    if (htmlElement) {
      try {
        event = new Event(eventName);
        htmlElement.dispatchEvent(event);
      } catch (e) {
        console.trace(e);
      }
    }
  }

  _removeHoverClass() {
    for (let i = 0, len = PLAYER_BUTTONS.length; i < len; i++) {
      if (PLAYER_BUTTONS[i].element) {
        PLAYER_BUTTONS[i].element.classList.remove('rmp-button-hover');
      }
    }
  }

  _triggerPlayerButton() {
    const currentActiveButton = this.rmpContainer.querySelector('.rmp-button-hover');
    this._createEvent('click', currentActiveButton);
  }

  _setActiveButton(id) {
    this.activePlayerButtonId = id;
    if (PLAYER_BUTTONS[this.activePlayerButtonId].element) {
      PLAYER_BUTTONS[this.activePlayerButtonId].element.classList.add('rmp-button-hover');
    }
  }

  _handleButtons(keyCode) {
    const currentActiveButton = this.rmpContainer.querySelector('.rmp-button-hover');
    if (currentActiveButton === null) {
      this._setActiveButton(2);
    } else {
      this.activePlayerButtonId = parseInt(currentActiveButton.getAttribute('data-button-id'));
      this._removeHoverClass();
      let newId;
      switch (keyCode) {
        case 38: // ArrowUp
        case 39: // ArrowRight
          if (PLAYER_BUTTONS[this.activePlayerButtonId + 1]) {
            newId = this.activePlayerButtonId + 1;
          } else {
            newId = 0;
          }
          break;
        case 37: // ArrowLeft
        case 40: // ArrowDown
          if (PLAYER_BUTTONS[this.activePlayerButtonId - 1]) {
            newId = this.activePlayerButtonId - 1;
          } else {
            newId = PLAYER_BUTTONS.length - 1;
          }
          break;
      }
      this._setActiveButton(newId);
    }
  }

  _onDestroyCompleted(resolve) {
    this.__destroyCompleted = this.nullFn;
    this.__onReadyWirePlayerKeys = this.nullFn;
    this.rmp = null;
    const nextSibling = this.rmpContainer.nextSibling;
    const parentNode = this.rmpContainer.parentNode;
    parentNode.removeChild(this.rmpContainer);
    const newPlayerContainer = document.createElement('div');
    newPlayerContainer.id = PLAYER_ID;
    parentNode.insertBefore(newPlayerContainer, nextSibling);
    this.rmpContainer = document.getElementById(PLAYER_ID);
    this.mainInterface.wire();
    resolve();
  }

  _clearPlayerFromDom() {
    document.removeEventListener('keydown', this.__onPlayerKeyDown);
    this.__onPlayerKeyDown = this.nullFn;
    this.__onBackButton = this.nullFn;
    return new Promise((resolve) => {
      if (this.playerOnStage) {
        this.playerOnStage = false;
        this.__destroyCompleted = this._onDestroyCompleted.bind(this, resolve);
        this.rmp.one('destroycompleted', this.__destroyCompleted);
        this.rmp.destroy();
      } else {
        resolve();
      }
    });
  }

  // when remote buttons are pressed do something
  _onPlayerKeyDown(e) {
    const keyCode = e.keyCode;
    // console.log('Key code from Player called: ' + keyCode);
    this.rmp.setControlsVisible(true);
    switch (keyCode) {
      case 461: // Back HbbTV  
      case 88: // Back Orsay 
      case 10009: // Back Tizen 
      case 8: // Back (keyboard)
      case 27: // Escape (keyboard)
        this._clearPlayerFromDom();
        break;
      case 37: // ArrowLeft
      case 38: // ArrowUp
      case 39: // ArrowRight
      case 40: // ArrowDown
        this._handleButtons(keyCode);
        break;
      case 13: // Enter + NumpadEnter
      case 32: // space (keyboard)
        this._triggerPlayerButton();
        break;
      default:
        break;
    }
  }

  // when remote buttons are pressed do something
  _onBackButton() {
    this._clearPlayerFromDom();
  }

  _onLoadeddataWirePlayerKeys() {
    this.playerOnStage = true;
    PLAYER_BUTTONS[0].element = this.rmpContainer.querySelector('.rmp-fast-rewind');
    if (PLAYER_BUTTONS[0].element) {
      PLAYER_BUTTONS[0].element.setAttribute('data-button-id', '0');
    }
    PLAYER_BUTTONS[1].element = this.rmpContainer.querySelector('.rmp-i-quick-rewind-tv');
    if (PLAYER_BUTTONS[1].element) {
      PLAYER_BUTTONS[1].element.setAttribute('data-button-id', '1');
    }
    PLAYER_BUTTONS[2].element = this.rmpContainer.querySelector('.rmp-play-pause');
    if (PLAYER_BUTTONS[2].element) {
      PLAYER_BUTTONS[2].element.setAttribute('data-button-id', '2');
    }
    PLAYER_BUTTONS[3].element = this.rmpContainer.querySelector('.rmp-i-quick-forward-tv');
    if (PLAYER_BUTTONS[3].element) {
      PLAYER_BUTTONS[3].element.setAttribute('data-button-id', '3');
    }
    PLAYER_BUTTONS[4].element = this.rmpContainer.querySelector('.rmp-fast-forward');
    if (PLAYER_BUTTONS[4].element) {
      PLAYER_BUTTONS[4].element.setAttribute('data-button-id', '4');
    }
    this.mainInterface.unwire();
    this._setActiveButton(2);
    this.__onPlayerKeyDown = this._onPlayerKeyDown.bind(this);
    document.addEventListener('keydown', this.__onPlayerKeyDown);
    // back button on Android TV requires specific handling
    this.__onBackButton = this._onBackButton.bind(this);
    document.addEventListener('backbutton', this.__onBackButton);
  }

  // public method
  initiateInstance(type) {
    this._clearPlayerFromDom().then(() => {
      this.rmp = new RadiantMP(PLAYER_ID);
      this.__onLoadeddataWirePlayerKeys = this._onLoadeddataWirePlayerKeys.bind(this);
      this.rmp.one('loadeddata', this.__onLoadeddataWirePlayerKeys);
      const stream = AVAILABLE_STREAMS[type];
      const src = {};
      if (stream.hls) {
        src.hls = stream.uri;
      } else if (stream.dash) {
        src.dash = stream.uri;
      }
      const settings = {
        licenseKey: 'your-license-key',
        src: src,
        autoplay: true,
        capLevelToPlayerSize: false,
        delayToFade: 5000,
        ignoreDevicePixelRatio: false,
        disableKeyboardControl: true,
        contentMetadata: {
          title: stream.title
        },
        skin: 'tv'
      };
      if (stream.ads) {
        settings.ads = true;
        settings.adTagUrl = stream.adTagUrl;
        settings.adParser = stream.adParser;
      }
      if (stream.drm) {
        settings.shakaDrm = {
          servers: {
            'com.widevine.alpha': stream.licenseDrmUri
          }
        };
        settings.shakaRequestConfiguration = {
          license: {
            headers: stream.licenseHeaders
          }
        };
      }
      this.rmp.init(settings);
    });
  }
}

export default PlayerManagement;
