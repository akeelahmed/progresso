PRO.Collections.Boards = Backbone.Collection.extend({
    url: '/api/v1/boards',
    model: PRO.Models.Board,
    comparator: 'id',

    getOrFetch: function(id) {
        // TODO: Allow user to pass callback here.
        var model;
        if (!(model = this.get(id))) {
            model = new this.model({ id: id });
            model.fetch({
                success: function() {
                    this.add(model);
                }
            });
        }
        return model;
    }
});

PRO.Store.boards = new PRO.Collections.Boards();
