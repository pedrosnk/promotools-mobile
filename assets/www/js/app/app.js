(function() {

  window.App = {

    config: {
      ENDPOINT: null,
      CLIENT_KEY: "VITRINNI"
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
