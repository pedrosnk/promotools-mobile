(function(){

window.InstagramView = Backbone.View.extend({

  INSTAGRAM_PHOTOS_RECENT_URL: 'https://api.instagram.com/v1/tags/snow/media/recent?client_id=dcc9a6c691524a7cac554ca90233c511',

  initialize: function(){

    $.getJSON('http://localhost:3000/instagram/recent_photos')
    .done(this._recentPhotosSuccess);

    return this;
  },

  _recentPhotosSuccess: function(medias) {
  },

});

})();
