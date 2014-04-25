(function() {

  window.App = {

    config: {
      ENDPOINT: 'http://www.promotools.com.br',     
      API_VERSION: 'v1.1',
      CLIENT_NAME: 'brapps',
      CLIENT_KEY: 'brapps',
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
