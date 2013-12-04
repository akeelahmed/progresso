PRO.Models.Card = Backbone.Model.extend({
    urlRoot: '/api/v1/cards',

    url: function() {
        return '/api/v1/lists/' + this.get('list_id') + '/cards';
    },

    parse: function(response) {
        // TODO: gonna have to do stuff
        return response
    },
});
