PRO.Models.List = Backbone.Model.extend({
    urlRoot: '/api/v1/lists',

    parse: function(response) {
        response.cards = new PRO.Collections.Cards(
            response.cards, { parse: true, list_id: response.id }
        );
        return response;
    },
});
