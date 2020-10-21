import PlayerManagement from './player.js';
import MainInterface from './interface.js';

const app = {

  // Application Constructor
  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  // deviceready Event Handler
  onDeviceReady: function () {
    window.console.log('onDeviceReady');
    document.addEventListener('keydown', (e) => {
      window.console.log(e);
    });
    document.addEventListener('keypress', (e) => {
      window.console.log(e);
    });
    document.addEventListener('mousedown', (e) => {
      window.console.log(e);
    });
    document.addEventListener('mouseup', (e) => {
      window.console.log(e);
    });
    document.addEventListener('click', (e) => {
      window.console.log(e);
    });

    const mainInterface = new MainInterface(true);
    mainInterface.wire();
    const playerManagement = new PlayerManagement(true, mainInterface);

    // buttons for stream selection
    const streamSelection = [
      document.getElementById('liveHls'),
      document.getElementById('vodHls'),
      document.getElementById('liveDash'),
      document.getElementById('vodDash'),
      document.getElementById('vodDashVP9'),
      document.getElementById('vodDashDrm'),
      document.getElementById('vodDashDrm2'),
      document.getElementById('vodHlsAdsIma'),
      document.getElementById('vodHlsAdsRmpVast')
    ];

    // wire main buttons for stream selection
    streamSelection.forEach(element => {
      element.addEventListener('click', event => {
        if (event) {
          event.stopPropagation();
          event.preventDefault();
        }
        playerManagement.initiateInstance(element.id);
      });
    });
  }

};

app.initialize();
