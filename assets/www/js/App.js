if(window.App === undefined){
  window.App = {};
}

// ENDPOINT: "http://promotools.com.br/surveys" ,
window.App.config =  { 
	ENDPOINT: null,
	CLIENT_KEY: "SUSHILOKO_406_SUL"
};

window.App.init = function(){
	window.App.storage.createDB();
  window.App.network.initSenderJob();
};