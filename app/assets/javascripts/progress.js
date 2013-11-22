window.PRO = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Store: {},
  initialize: function() {
    alert('Hello from Backbone!');
    var boards = PRO.Store.boards = new PRO.Collections.Boards();
    boards.fetch({
        success: function () {
            //new PRO.Routers.BoardsRouter({rootEl: '#content'});
            Backbone.history.start();
        }
    });
  }
};

$(document).ready(function(){
  PRO.initialize();
});
