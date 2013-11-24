PRO.Collections.Cards = Backbone.Collection.extend({
    model: PRO.Models.Card,

    url: function () {
        return 'api/v1/lists' + this.list_id + 'cards';
    },

    initialize: function(models, options) {
        this.list_id = options.list_id;
    }
});
