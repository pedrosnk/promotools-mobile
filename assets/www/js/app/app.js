(function() {

  window.App = {

    config: {
      ENDPOINT: 'http://www.promotools.com.br',
      CLIENT_NAME: 'habibs',
      API_VERSION: 'v1.1',
      CLIENT_KEY: 'HABIBS_CONJUNTO'
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
