(function() {

  window.App = {

    config: {
      ENDPOINT: null,
      CLIENT_KEY: "VITRINNI"
    },

    init: function(){
      console.log("\n[APP] Initializing Promotools Mobile App...");
      window.App.storage.createDB();
      window.App.network.initSenderJob();
      window.App.utils.timer.reloadAppOnTimeout();
    }
  }

})();