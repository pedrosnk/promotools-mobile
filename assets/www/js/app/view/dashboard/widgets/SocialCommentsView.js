require( ['backbone', 'moment'], function(Backbone, moment){
  "use strict";

  window.SocialCommentsView = Backbone.View.extend({

    className: "social-comments",

    initialize: function(params) {
      this.el = params.el;
      this.items = params.collection.foursquare_comments.items;
    },

    render: function() {
      this.el.html('');
      var output_html = "<table class='table table-striped social-media-comments'>";
      output_html += "<thead><tr><th>Comentários</th></tr></thead>";
      output_html += "<tbody>";
      for( var i in this.items ){
        var comment = this.items[i]
        output_html += "<tr>";
        output_html += "<td class='comment'>"; 
        output_html += "<div class='author-image'> <img  class='mini-thumb' src="+ comment.user.photo  +"></div>";
        output_html += "<div class='tip-content'>";
        output_html += "<div class='comment'>" + comment.text + "</div>";
        output_html += "<div class='tip-info'>" + comment.user.firstName + " " + comment.user.lastName + "  -  " + moment.unix(comment.createdAt).lang("pt-br").format('LLLL') + "</div>";
        output_html += "</div>";
        output_html += "</td>";
        output_html += "</tr>";
      }
      output_html += "</tbody></table>";
      this.el.html(output_html);
    }

  });
});

