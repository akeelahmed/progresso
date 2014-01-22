PRO.Views.BoardShow = PRO.Views.ParentView.extend({
    template: JST['boards/show'],
    tagName: 'div',
    className: 'board',
    id: 'board',

    events: {
        'click .list--new__button': 'openNewView',
        'close .list--new': 'closeNewView',
        'sortstop #lists': 'resetCardinalities',
        'sortreceive #lists': 'moveItem',
        'click .board__name': 'openEditView',
        'close .board__name': 'closeEditView'
    },

    openEditView: function () {
        this._editView = new PRO.Views.BoardEdit({ model: this.model });
        //TODO make sure to add _editView to children for clean up.
        this.$('.board__name').html(this._editView.render().$el);
        this.$('.board__name input').focus();
    },

    closeEditView: function () {
        this._editView.remove();
        this._editView = undefined;
        this.$('.board__name').html(
            $("<h1 class=\"board__name__text\">")
                .html(this.model.escape('name'))
        );
    },

    resetCardinalities: function () {
        // Get list of list ids in order they appear.
        var ids = $.map($('#lists').children(), function(list) {
            return $(list).data('id');
        });
        this.model.set('ordered_list_ids', ids);
        this.model.save();
    },

    moveItem: function (e, ui) {
        var fromList, toList, item;
        fromList = this.model.get('lists').get(ui.sender.data('id'));
        toList = this.model.get('lists').get($(e.target).data('id'));
        item = fromList.get('cards').get($(ui.item).data('id'));

        fromList.get('cards').remove(item);
        toList.get('cards').add(item);
        item.save({ list_id: toList.id });

        // Reset cardinality on recipient list.
        $(e.target).trigger('sortstop');
    },



    renderLists: function() {
        var that = this;

        var $lists = $('<ul class="lists" id="lists"></ul>');

        var lists = this.model.get('lists');
        lists.each(function(list){
            var listView = new PRO.Views.ListShow({ model: list });
            that.adopt(listView);
            $lists.append(listView.render().$el);
        });

        var $newListButton = $('<li class="list--new">')
            .append(
                $('<span class="list--new__button">new list</span>')
            );

        $lists.append($newListButton);

        this.$('#lists').replaceWith($lists);
    },

    render: function() {
        this.orphanAll();
        this.$el.html(this.template({ model: this.model }));
        this.renderLists();
        this.$("#lists").sortable({
            items: '.list',
            handle: '.lists__list__name'
        }).disableSelection();
        return this;
    },

    openNewView: function (event) {
        var lists = this.model.get('lists');
        var newList = new PRO.Models.List({
            board_id: this.model.id,
            cardinality: (_.max(lists.pluck('cardinality')) + 1),
        });

        this._newListView = new PRO.Views.ListNew({ model: newList });
        this.$('.list--new').html(this._newListView.render().$el);
        this._newListView.$('#list-name').focus();
    },

    closeNewView: function() {
        var that = this;
        this.model.fetch({
            success: function appendNewList(model) {
                var $lists = that.$('#lists');

                var viewClass = that.childViewClass();
                var newView = new viewClass({
                    model: that._newListView.model
                });
                that._childViews.push(newView);

                that._newListView.remove();
                $lists.append(newView.render().$el);

                that.$('.list--new').remove();
                var $newListButton = $('<li class="list--new">')
                    .html(
                        $('<span class="list--new__button">new list</span>')
                    );
                $lists.append($newListButton);
            }
        });
    },
});
