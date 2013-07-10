if(window.App === undefined){
  console.log("App is undefined in storage.js");
  window.App = {};
}

window.App.db = {

  DATABASE_NAME: "SURVEY",

  openDB: function(){
    return window.openDatabase("promotools-survey", "1.0", "Promotools DB", 1000000);
  },

  createDB: function() {
    console.log(" --->> on createDB");
    var db = this.openDB();
    db.transaction(_.bind(function(tx){
      tx.executeSql('DROP TABLE '+ this.DATABASE_NAME);
      tx.executeSql('CREATE TABLE IF NOT EXISTS ' + this.DATABASE_NAME + ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, email, first_time, nps, reason, sugestion, confirmed_sended, created_at)');
    },this), this.error, this.success);
  },

  createTable: function(tx) {
    console.log(" >> on createTable");

  },

  error: function(err) {
    console.log("[DB - ERROR] Error processing SQL: " + err.code);
  },

  success: function() {
    console.log("[DB - SUCCESS] Db operation was successfull.");
  },

  save: function(data){
    var db = this.openDB();
    console.log(data);
    var queryInsert = "INSERT INTO " + this.DATABASE_NAME +
      " (email, first_time, nps, reason, sugestion, confirmed_sended, created_at) " +
      "VALUES ('"+ data.email + "', "+  data.first_time + " , "+ data.nps +", '"+
        data.reason +"', '"+ data.sugestion +"' , "+ data.confirmed_sended +", "+ new Date().getTime() +") ";
    db.transaction(_.bind(function(tx){

      console.log("SALVANDO:");
      console.log(queryInsert);
      tx.executeSql(queryInsert);

    },this), this.error, this.success);
  },

  surveysUnsent: function(callback) {
    console.log(" >>> surveysUnsent");
    var db = this.openDB();
    var queryGetSurveysUnsent = "SELECT * FROM " + this.DATABASE_NAME + " WHERE confirmed_sended = 0";

    db.transaction(
      function(tx){
        console.log(queryGetSurveysUnsent);
        tx.executeSql(
          queryGetSurveysUnsent,
          [],
          function(tx, result){
            console.log(" >>> surveysUnsent.CALLBACK");
            console.log(result);
            callback(result);
          },
          this.error
          );
      },
      this.error
    );
  }
};
