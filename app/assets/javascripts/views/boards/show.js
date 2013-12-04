PRO.Views.BoardShow = PRO.Views.ParentView.extend({
    template: JST['boards/show'],
    tagName: 'div',
    className: 'board',
    id: 'board',
    children: function() {
        return this.model.get('lists');
    },
    childViewClass: function() {
        return PRO.Views.ListShow
    },

    events: {
        'click .lists__list--new__button': 'openNewView',
        'close .lists__list--new': 'closeNewView'
    },

    renderLists: function() {
        var $lists = this.$('#lists').empty();
        this._buildChildViews().each(
            function(listView) {
                $lists.append(listView.render().$el);
            });
        var $newListButton = $('<li class="lists__list--new">')
            .append(
                $('<span class="lists__list--new__button">new list</span>')
            );

        $lists.append($newListButton);
    },

    render: function() {
        this.$el.html(this.template({ model: this.model }));
        this.renderLists();
        return this;
    },

    openNewView: function (event) {
        var lists = this.model.get('lists');
        var newList = new PRO.Models.List({
            board_id: this.model.id,
            cardinality: (_.max(lists.pluck('cardinality')) + 1),
        });

        this._newListView = new PRO.Views.ListNew({ model: newList });
        this.$('.lists__list--new').html(this._newListView.render().$el);
        this.$('#list-name').focus();
    },

    closeNewView: function() {
        var that = this;
        this._newListView.remove();
        this.model.fetch({
            success: this.render.bind(this)
        });
    },
});
