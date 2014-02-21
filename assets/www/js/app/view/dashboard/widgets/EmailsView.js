require( ['backbone'], function(Backbone){
  "use strict";

  window.EmailsView = Backbone.View.extend({

    className: "emails",

    initialize: function(params) {
      this.el = params.el;
      this.collection = params.collection;
    },

    render: function() {
      this.el.html('');
      var output_html = "<table class='table table-hover'>";
      output_html += "<thead><tr><th>Email</th><th>Nota Nps</th></tr></thead>";
      output_html += "<tbody>";
      for( var i in this.collection ){
        output_html += "<tr>";
        output_html += "<td>" + this.collection[i].email +  "</td>";
        output_html += "<td>" + this.collection[i].nps +  "</td>";
        output_html += "</tr>";
      }
      output_html += "</tbody></table>";
      this.el.html(output_html);
    }

  });
});
