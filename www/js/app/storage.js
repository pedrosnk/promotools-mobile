window.App = window.App || {};

window.App.storage = {

  TABLE_NAME: "SURVEY",

  openDB: function(){
    return window.openDatabase("promotools-survey", "1.0", "Promotools DB", 1000000);
  },

  createDB: function() {
    var db = this.openDB();
    db.transaction(_.bind(function(tx){
      //tx.executeSql('DROP TABLE '+ this.TABLE_NAME);
      tx.executeSql('CREATE TABLE IF NOT EXISTS ' + this.TABLE_NAME + ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, survey_response, confirmed_sended, created_at)');
    },this), this.error, function(){
      console.log("\n[DB - SUCCESS] DB created successfully.");
    });
  },

  error: function(err) {
    console.log("[DB - ERROR] Error processing SQL: " + err.code);
  },

  success: function() {
    console.log("[DB - SUCCESS] Db operation was successfull.");
  },

  save: function(data){
    var queryInsert = "INSERT INTO " + this.TABLE_NAME +
    " (survey_response, confirmed_sended, created_at) " +
    "VALUES ('"+ data.survey_response +"', "+  data.confirmed_sended +", "+ new Date().getTime() +") ";

    console.log("!!!! App.storage.SAVE()");
    console.log("QUERY = " + queryInsert);

    this.openDB().transaction(function(tx){
      console.log("[DB] SAVING survey");
      tx.executeSql(queryInsert);
    }, this.error, this.success);
  },

  saveModelData: function(data){
    var queryInsert = "INSERT INTO " + this.TABLE_NAME +
    " (survey_response, confirmed_sended, created_at) " +
    "VALUES ('"+ JSON.stringify(data) +"', "+  App.network.status.ERROR +", "+ new Date().getTime() +") ";

    this.openDB().transaction(function(tx){
      console.log("[DB] SAVING survey");
      tx.executeSql(queryInsert);
    }, this.error, this.success);
  },

  updateStatus: function(data, status) {
    var queryUpdate = "UPDATE " + this.TABLE_NAME +
    " SET confirmed_sended="+ status +
    " WHERE id = " + data.id;

    console.log("!!!! App.storage.UPDATE()");
    console.log("QUERY = " + queryUpdate);

    this.openDB().transaction(function(tx){
      tx.executeSql(queryUpdate);
    }, this.error, this.success);
  },

  handleAnsweredSurveys: function() {
    var db = this.openDB();
    var queryGetSurveysUnsent = "SELECT * FROM " +
      this.TABLE_NAME + " WHERE confirmed_sended = " + App.network.status.ERROR;
    console.log("@@@@ >> App.storage.handleAnsweredSurveys()");
    console.log(queryGetSurveysUnsent);

    db.transaction(
      _.bind(function(tx){
        tx.executeSql(
          queryGetSurveysUnsent,
          [],
          this.handleUnsentResults,
          this.error
        );
      }, this),
      this.error
    );
  },

  handleUnsentResults: function(tx, result) {
    console.log("@@@@ >> App.storage.handleUnsentResults");
    var len = result.rows.length;
    console.log("UNSENT SURVEYS: " + len + " rows found.");
    surveys = [];
    for (var i=0; i<len; i++){
      var item = result.rows.item(i);
      var survey = {};
      survey.survey_data = JSON.parse(item.survey_response);
      survey.origin = 'totem';
      survey.created_at = item.created_at;
      survey.id = item.id;
      surveys.push(survey);
    }
    if (len !== 0) {
      App.network.submitSurveys(surveys);
    }
  }

};