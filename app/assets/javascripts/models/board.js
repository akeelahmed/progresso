PRO.Models.Board = Backbone.Model.extend({
    urlRoot: '/api/v1/boards',

    lists: function() {
        this._lists || this._lists = new PRO.Collections.Lists();
    },

     parse: function(response) {
         this.lists().set(
             response.lists,
             {
                 parse: true,
                 board_id: response.id,
             }
         );

         delete response.lists;
         response.ordered_list_ids = this.lists().pluck('id');

         return response;
     },
});
