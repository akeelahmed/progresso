window.PRO = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    Store: {},
    initialize: function() {
        new PRO.Routers.Boards({content: "#content", header: "#header"});
        Backbone.history.start();
    }
};

$(document).ready(function(){
    PRO.initialize();
});
