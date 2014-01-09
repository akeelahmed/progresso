PRO.Models.Board = Backbone.Model.extend({
    urlRoot: '/api/v1/boards',

     parse: function(response) {
         response.lists = new PRO.Collections.Lists(
            response.lists, { parse: true, board_id: response.id }
         );

         response.ordered_list_ids = response.lists.pluck('id');
         return response;
     },

    toJSON: function(options) {
        var attrs = _.clone(this.attributes);
        delete attrs.lists // Delete the lists collection.
        return attrs;
    },
});
