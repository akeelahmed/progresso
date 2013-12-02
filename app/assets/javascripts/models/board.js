PRO.Models.Board = Backbone.Model.extend({
    urlRoot: '/api/v1/boards',

     parse: function(response) {
         response.lists = new PRO.Collections.Lists(
            response.lists, { parse: true, board_id: response.id }
         );
         return response;
     },
});
