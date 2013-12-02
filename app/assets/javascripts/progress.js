window.PRO = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    Store: {},
    initialize: function() {
        alert('Hello from Backbone!');
        var boards = PRO.Store.boards = new PRO.Collections.Boards();
        new PRO.Routers.Boards({content: "#content"});
        Backbone.history.start();
    }
};

$(document).ready(function(){
    PRO.initialize();
});
