(function() {

  window.App = {

    config: {
      //ENDPOINT: 'http://www.promotools.com.br',
      ENDPOINT: 'http://192.168.1.104:3000',
      API_VERSION: 'v1.1',
      CLIENT_NAME: 'vintage',      
      CLIENT_KEY: 'VINTAGE',
      CLIENT_STORE: 'iguatemi'
    },

    init: function(){
      console.log("[APP] Initializing Promotools Mobile App...");
      window.App.storage.createDB();
      window.App.network.initSenderJob();
      window.App.network.initKeepAlive();
      window.App.utils.timer.reloadAppOnTimeout();
    }
  }

})();
