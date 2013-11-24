PRO.Models.Board = Backbone.Model.extend({
    urlRoot: '/api/v1/boards',

    parse: function(response) {
        response.lists = PRO.Collections.Lists(
            response.lists, { board_id: response.id }
        );
        return response;
    },
});
