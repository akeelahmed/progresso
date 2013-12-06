PRO.Models.Board = Backbone.Model.extend({
    urlRoot: '/api/v1/boards',

     parse: function(response) {
         response.lists = new PRO.Collections.Lists(
            response.lists, { parse: true, board_id: response.id }
         );
         return response;
     },

    toJSON: function(options) {
        var attrs = _.clone(this.attributes);
        if (attrs.lists && !options.shallow) {
            attrs.lists_attributes = attrs.lists.toJSON({ shallow: true });
        };
        delete attrs.lists
        return attrs;
    },
});
