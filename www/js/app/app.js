(function() {

  window.App = {

    config: {
      ENDPOINT: 'http://www.promotools.com.br',
      API_VERSION: 'v1.1',
      CLIENT_NAME: 'zimbrus',
      CLIENT_KEY: 'zimbrus',
      CLIENT_STORE: 'aguas-claras'
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
