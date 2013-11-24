PRO.Models.List = Backbone.Model.extend({
    urlRoot: '/api/v1/lists',

    parse: function(response) {
        response.cards = PRO.Collections.Cards(
            response.cards, { list_id: response.id }
        );
        return response;
    },
});
