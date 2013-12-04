PRO.Models.List = Backbone.Model.extend({
    urlRoot: '/api/v1/lists',

    url: function() {
        return '/api/v1/boards/' + this.get('board_id') + '/lists';
    },

    parse: function(response) {
        response.cards = new PRO.Collections.Cards(
            response.cards, { parse: true, list_id: response.id }
        );
        return response;
    },
});
