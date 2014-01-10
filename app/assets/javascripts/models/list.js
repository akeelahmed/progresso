PRO.Models.List = Backbone.Model.extend({
    url: function() {
        // TODO: Refactor.
        if (this.isNew()) {
            return '/api/v1/boards/' + this.get('board_id') + '/lists';
        } else {
            return '/api/v1/lists/' + this.id;
        }

    },

    parse: function(response) {
        response.cards = new PRO.Collections.Cards(
            response.cards, { parse: true, list_id: response.id }
        );

        response.ordered_card_ids = response.cards.pluck('id');
        return response;
    },

    toJSON: function (options) {
        var attrs = _.clone(this.attributes);
        delete attrs.cards; // Don't send the cards collection.
        return attrs;
    },
});
