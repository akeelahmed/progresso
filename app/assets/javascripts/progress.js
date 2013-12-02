window.PRO = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    Store: {},
    initialize: function() {
        var boards = PRO.Store.boards = new PRO.Collections.Boards();
        boards.fetch({
            success: function () {
                new PRO.Routers.Boards({content: "#content"});
                Backbone.history.start();
            },
            error: function () {
                console.log('Tried to fetch boards but something went wrong.');
            }
        });
    }
};

$(document).ready(function(){
    PRO.initialize();
});
