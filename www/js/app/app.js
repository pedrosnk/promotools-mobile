(function() {

  window.App = {

    config: {
      //ENDPOINT: 'http://www.promotools.com.br',
      ENDPOINT: 'http://192.168.1.15:3000',
      API_VERSION: 'v1.1',
      CLIENT_NAME: 'zimbrus',
      CLIENT_KEY: 'zimbrus',
      CLIENT_STORE: 'pier21'
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
