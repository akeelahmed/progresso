PRO.Collections.Boards = Backbone.Collection.extend({
    url: '/api/v1/boards',
    model: PRO.Models.Board,
    comparator: 'id',

    getOrFetch: function(id, options) {
        var that = this;
        var model;
        if (!(model = this.get(id))) {
            model = new this.model({ id: id });
            model.fetch({
                success: function() {

                    options.success();
                    that.add(model);
                }
            });
        } else {
            model.fetch({
                success: options.success
            })
        }
        return model;
    }
});

PRO.Store.boards = new PRO.Collections.Boards();
