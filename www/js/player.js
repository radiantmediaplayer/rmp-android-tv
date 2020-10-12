const AVAILABLE_STREAMS = {
  liveHls: {
    uri: 'https://5b44cf20b0388.streamlock.net:8443/live/ngrp:live_all/playlist.m3u8',
    title: 'Android TV Demo App - HLS Live',
    ads: false,
    hls: true
  },
  vodHls: {
    uri: 'https://5b44cf20b0388.streamlock.net:8443/vod/smil:bbb.smil/playlist.m3u8',
    title: 'Android TV Demo App - HLS VOD',
    ads: false,
    hls: true
  },
  vodDash: {
    uri: 'https://5b44cf20b0388.streamlock.net:8443/vod/smil:bbb.smil/manifest.mpd',
    title: 'Android TV Demo App - DASH VOD',
    ads: false,
    dash: true
  },
  liveDash: {
    uri: 'https://5b44cf20b0388.streamlock.net:8443/live/ngrp:live_all/manifest.mpd',
    title: 'Android TV Demo App - DASH Live',
    ads: false,
    dash: true
  },
  vodHlsAdsIma: {
    uri: 'https://5b44cf20b0388.streamlock.net:8443/vod/smil:bbb.smil/playlist.m3u8',
    title: 'Android TV Demo App - HLS VOD with IMA ads',
    ads: true,
    hls: true,
    adParser: 'ima',
    adTagUrl: 'https://www.radiantmediaplayer.com/vast/tags/inline-linear-1.xml'
  },
  vodHlsAdsRmpVast: {
    uri: 'https://5b44cf20b0388.streamlock.net:8443/vod/smil:bbb.smil/playlist.m3u8',
    title: 'Android TV Demo App - HLS VOD with rmp-vast ads',
    ads: true,
    hls: true,
    adParser: 'rmp-vast',
    adTagUrl: 'https://www.radiantmediaplayer.com/vast/tags/inline-linear-1.xml'
  },
  vodDashDrm: {
    uri: 'https://media.axprod.net/TestVectors/v7-MultiDRM-SingleKey/Manifest.mpd',
    title: 'Android TV Demo App - DASH VOD with Widevine DRM',
    ads: false,
    dash: true,
    drm: true,
    licenseDrmUri: 'https://drm-widevine-licensing.axtest.net/AcquireLicense',
    licenseHeaders: {
      'X-AxDRM-Message': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJjb21fa2V5X2lkIjoiYjMzNjRlYjUtNTFmNi00YWUzLThjOTgtMzNjZWQ1ZTMxYzc4IiwibWVzc2FnZSI6eyJ0eXBlIjoiZW50aXRsZW1lbnRfbWVzc2FnZSIsImtleXMiOlt7ImlkIjoiOWViNDA1MGQtZTQ0Yi00ODAyLTkzMmUtMjdkNzUwODNlMjY2IiwiZW5jcnlwdGVkX2tleSI6ImxLM09qSExZVzI0Y3Iya3RSNzRmbnc9PSJ9XX19.4lWwW46k-oWcah8oN18LPj5OLS5ZU-_AQv7fe0JhNjA'
    }
  },
};

const PLAYER_ID = 'rmpPlayer'

const PLAYER_BUTTONS = [
  { id: 0, mane: 'quickRewind', element: null },
  { id: 1, name: 'playPause', element: null },
  { id: 2, name: 'quickForward', element: null }
];

class PlayerManagement {
  constructor(debug, mainInterface) {
    this.rmp = new RadiantMP(PLAYER_ID);
    this.rmpContainer = document.getElementById(PLAYER_ID);
    this.rmpFramework = this.rmp.getFramework();
    this.playerOnStage = false;
    this.activePlayerButtonId = null;
    this.nullFn = function () { return null };
    this.__onReadyWirePlayerKeys = this.nullFn;
    this.__onPlayerKeyDown = this.nullFn;
    this.mainInterface = mainInterface;
    this.debug = debug;
  }

  // Private Methods
  _log(text) {
    if (text) {
      window.console.log(text);
    }
  }

  _removeHoverClass() {
    for (let i = 0, len = PLAYER_BUTTONS.length; i < len; i++) {
      this.rmpFramework.removeClass(PLAYER_BUTTONS[i].element, 'rmp-button-hover');
    }
  }

  _triggerPlayerButton() {
    const currentActiveButton = this.rmpContainer.querySelector('.rmp-button-hover');
    this.rmpFramework.createStdEvent('click', currentActiveButton);
  }

  _setActiveButton(id) {
    this.activePlayerButtonId = id;
    this.rmpFramework.addClass(PLAYER_BUTTONS[id].element, 'rmp-button-hover');
  }

  _handleButtons(keyCode) {
    const currentActiveButton = this.rmpContainer.querySelector('.rmp-button-hover');
    if (currentActiveButton === null) {
      this._setActiveButton(1);
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
    this.rmpContainer.removeEventListener('destroycompleted', this.__destroyCompleted);
    this.__destroyCompleted = this.nullFn;
    this.rmpContainer.removeEventListener('ready', this.__onReadyWirePlayerKeys);
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
    return new Promise((resolve) => {
      if (this.playerOnStage) {
        this.playerOnStage = false;
        this.__destroyCompleted = this._onDestroyCompleted.bind(this, resolve);
        this.rmpContainer.addEventListener('destroycompleted', this.__destroyCompleted);
        this.rmp.destroy();
      } else {
        resolve();
      }
    });
  }

  // when TV remote buttons are pressed do something
  // we deal with 2 kind of remote: Basic Device, Smart Control 2016
  _onPlayerKeyDown(e) {
    const currentTime = this.rmp.getCurrentTime();
    const keyCode = e.keyCode;
    if (this.debug) {
      this._log('Key code from Player called: ' + keyCode);
    }
    this.rmp.setControlsVisible(true);
    switch (keyCode) {
      case 412: // MediaRewind 
        this.rmp.seekTo(currentTime - 10000);
        break;
      case 417: // MediaFastForward 
        this.rmp.seekTo(currentTime + 10000);
        break;
      case 10221: // Caption
      case 403: // ColorF0Red
      case 67: // c (keyboard)
        break;
      case 10009: // Back
      case 8: // Back (keyboard)
      case 27: // Escape (keyboard)
        this._clearPlayerFromDom();
        break;
      case 415: // MediaPlay
        this.rmp.play();
        break;
      case 19: // MediaPause
        this.rmp.pause();
        break;
      case 413: // MediaStop
        this.rmp.stop();
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
      case 9: // tab
        e.preventDefault();
        break;
      case 10252: // MediaPlayPause
        if (this.rmp.getPaused()) {
          this.rmp.play();
        } else {
          this.rmp.pause();
        }
        break;
      default:
        break;
    }
  }

  _onReadyWirePlayerKeys() {
    if (this.debug) {
      this._log('onReadyWirePlayerKeys');
    }
    this.playerOnStage = true;
    PLAYER_BUTTONS[0].element = this.rmpContainer.querySelector('.rmp-i-quick-rewind-tv');
    PLAYER_BUTTONS[0].element.setAttribute('data-button-id', '0');
    PLAYER_BUTTONS[1].element = this.rmpContainer.querySelector('.rmp-play-pause');
    PLAYER_BUTTONS[1].element.setAttribute('data-button-id', '1');
    PLAYER_BUTTONS[2].element = this.rmpContainer.querySelector('.rmp-i-quick-forward-tv');
    PLAYER_BUTTONS[2].element.setAttribute('data-button-id', '2');
    this.mainInterface.unwire();
    this.__onPlayerKeyDown = this._onPlayerKeyDown.bind(this);
    document.addEventListener('keydown', this.__onPlayerKeyDown);
  }

  // public method
  initiateInstance(type) {
    if (this.debug) {
      this._log('initiateInstance for ' + type);
    }
    this._clearPlayerFromDom().then(() => {
      this.__onReadyWirePlayerKeys = this._onReadyWirePlayerKeys.bind(this);
      this.rmpContainer.addEventListener('ready', this.__onReadyWirePlayerKeys);
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
        hideModule: {
          quality: true
        },
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
        }
      }
      this.rmp = new RadiantMP(PLAYER_ID);
      this.rmp.init(settings);
    });
  }
}

export default PlayerManagement;
