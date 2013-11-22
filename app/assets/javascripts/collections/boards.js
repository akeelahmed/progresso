PRO.Collections.Boards = Backbone.Collection.extend({
    url: '/api/v1/boards',
    model: PRO.Models.Board
});
