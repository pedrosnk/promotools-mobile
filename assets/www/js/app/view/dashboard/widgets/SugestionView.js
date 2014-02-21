require( ['backbone'], function(Backbone ){
  "use strict";

  window.SugestionView = Backbone.View.extend({

    className: "sugestionItem",

    initialize: function(params) {
      this.el = params.el;
      this.sugestions = params.sugestions;
    },

    render: function() {
      this.el.html('');
      var output_html = "<table class='table table-hover'>";
      output_html += "<thead><tr><th>Sugestão</th></tr></thead>";
      output_html += "<tbody>";
      for( var i in this.sugestions ){
        output_html += "<tr>";
        output_html += "<td>" + this.sugestions[i] +  "</td>";
        output_html += "</tr>";
      }
      output_html += "</tbody></table>";
      this.el.html(output_html);
    }

  });
});

