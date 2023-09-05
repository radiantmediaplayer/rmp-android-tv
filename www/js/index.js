import PlayerManagement from './player.js';
import MainInterface from './interface.js';

const app = {

  // Application Constructor
  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    // this.onDeviceReady.call(this); // to test on browser without Cordova
  },

  // deviceready Event Handler
  onDeviceReady: function () {
    const mainInterface = new MainInterface();
    mainInterface.wire();
    
    const playerManagement = new PlayerManagement(mainInterface);

    // buttons for stream selection
    const streamSelection = [
      document.getElementById('liveHls'),
      document.getElementById('vodHls'),
      document.getElementById('liveDash'),
      document.getElementById('vodDash'),
      document.getElementById('vodDashHevc'),
      document.getElementById('vodDashAv1'),
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
