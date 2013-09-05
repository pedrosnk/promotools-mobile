(function() {

  window.App = {

    config: {
      ENDPOINT: null,
      CLIENT_KEY: "SUSHILOKO_406_SUL"
    },

    init: function(){
      console.log("\n[APP] Initializing Promotools Mobile App...");
      window.App.storage.createDB();
      window.App.network.initSenderJob();
      window.App.utils.timer.reloadAppOnTimeout();
    }
  }

})();
