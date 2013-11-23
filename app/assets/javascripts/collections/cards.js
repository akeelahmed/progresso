PRO.Collections.Cards = Backbone.Collection.extend({
    url: '/api/v1/cards',
    model: PRO.Models.Card
});
