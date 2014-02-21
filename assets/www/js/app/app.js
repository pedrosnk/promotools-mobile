define('app', ['storage', 'network'],
  function(Storage, Network){
  'use strict';

  return {
    config: {
      ENDPOINT: null,
      CLIENT_KEY: "VITRINE"
    },

    init: function(){
      console.log("\n[APP] Initializing Promotools Mobile App...");
      Storage.createDB();
      Network.initSenderJob();
      // window.App.utils.timer.reloadAppOnTimeout();
    }
  }

});
