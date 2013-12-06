PRO.Models.List = Backbone.Model.extend({
    url: function() {
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
        return response;
    },

    toJSON: function (options) {
        var attrs = _.clone(this.attributes);
        if (attrs.cards && !options.shallow) {
            attrs.cards_attributes = attrs.cards.toJSON({ shallow: true });
        }
        delete attrs.cards;
        return attrs;
    }
});
