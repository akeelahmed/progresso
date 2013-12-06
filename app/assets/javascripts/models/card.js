PRO.Models.Card = Backbone.Model.extend({
    urlRoot: '/api/v1/cards',

    url: function() {
        if (this.isNew()) {
            return '/api/v1/lists/' + this.get('list_id') + '/cards';
        } else {
            return '/api/v1/cards/' + this.id;
        }
    },

    parse: function(response) {
        // TODO: gonna have to do stuff
        return response
    },
});
