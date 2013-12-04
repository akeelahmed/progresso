PRO.Collections.Lists = Backbone.Collection.extend({
    model: PRO.Models.List,

    comparator: 'cardinality',

    url: function () {
        return 'api/v1/boards/' + this.board_id + '/lists';
    },

    initialize: function(models, options) {
        this.board_id = options.board_id
    },
});
