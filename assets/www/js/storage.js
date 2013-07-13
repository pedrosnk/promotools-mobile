window.App = window.App || {};

window.App.storage = {

  DATABASE_NAME: "SURVEY",

  openDB: function(){
    return window.openDatabase("promotools-survey", "1.0", "Promotools DB", 1000000);
  },

  createDB: function() {
    var db = this.openDB();
    db.transaction(_.bind(function(tx){
      tx.executeSql('DROP TABLE '+ this.DATABASE_NAME);
      tx.executeSql('CREATE TABLE IF NOT EXISTS ' + this.DATABASE_NAME + ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, email, first_time, nps, reason, sugestion, confirmed_sended, created_at)');
    },this), this.error, function(){
      console.log("\n[DB - SUCCESS] DB created successfully.");  
    });
  },

  error: function(err) {
    console.log("\n[DB - ERROR] Error processing SQL: " + err.code);
  },

  success: function() {
    console.log("\n[DB - SUCCESS] Db operation was successfull.");
  },

  save: function(data){
    var db = this.openDB();
    console.log(data);
    var queryInsert = "INSERT INTO " + this.DATABASE_NAME +
      " (email, first_time, nps, reason, sugestion, confirmed_sended, created_at) " +
      "VALUES ('"+ data.email + "', "+  data.first_time + " , "+ data.nps +", '"+
      data.reason +"', '"+ data.sugestion +"' , "+ data.confirmed_sended +", "+ new Date().getTime() +") ";
      db.transaction(_.bind(function(tx){

      console.log("\n[DB] SAVING survey");
      tx.executeSql(queryInsert);

    },this), this.error, this.success);
  },

  update: function(data) {
    var db = this.openDB();
    console.log(data);
    var queryUpdate = "UPDATE " + this.DATABASE_NAME +
      " SET confirmed_sended="+ data.confirmed_sended +
      " WHERE id = " + data.id;
    db.transaction(_.bind(function(tx){

      console.log("\n[DB] UPDATING survey");
      tx.executeSql(queryUpdate);

    },this), this.error, this.success);
  },

  surveysUnsent: function(callback) {
    var db = this.openDB();
    var queryGetSurveysUnsent = "SELECT * FROM " + this.DATABASE_NAME + " WHERE confirmed_sended = 0";
    console.log("@@@@ >> App.storage.surveysUnsent()");
            console.log(queryGetSurveysUnsent);
    db.transaction(
      function(tx){
        tx.executeSql(
          queryGetSurveysUnsent,
          [],          
          callback,
          this.error
          );
      },
      this.error
    );
  }
};
