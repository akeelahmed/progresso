PRO.Views.BoardShow = PRO.Views.ParentView.extend({
    template: JST['boards/show'],
    tagName: 'div',
    className: 'board',
    id: 'board',

    events: {
        'sortstop #lists': 'resetCardinalities',
        'sortreceive #lists': 'moveItem',
    },

    initialize: function () {
        var lists = this.model.get('lists');
        this.listenTo(lists, 'add', this.handleAddedList);
    },

    resetCardinalities: function () {
        // Get list of list ids in order they appear.
        var ids = $.map($('#lists').children(), function(list) {
            return $(list).data('id');
        });

        this.model.save({ ordered_list_ids: ids });
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

        var listViews = [];

        lists.each(function(list){
            var listView = new PRO.Views.ListShow({ model: list });
            that.adopt(listView);
            listViews.push(listView);
            $lists.append(listView.render().$el);
        });

        this._listViews = listViews;

        this.$('#lists').replaceWith($lists);
        this.$("#lists").sortable({
            items: '.list',
            handle: '.lists__list__name'
        }).disableSelection();
    },

    handleAddedList: function() {
        var lists = this.model.get('lists');
        var newList = lists.last();

        var listView = new PRO.Views.ListShow({ model: newList });
        this.adopt(listView);
        this._listViews.push(listView);
        this.$('#list--new').before(listView.render().$el);
    },

    render: function() {
        this.orphanAll();
        delete this._listViews;

        this.$el.html(this.template({ model: this.model }));

        this.renderLists();

        var nameView = new PRO.Views.BoardName({ model: this.model });
        this.adopt(nameView);
        this.$('.board__name').replaceWith(nameView.render().$el);

        var newListView = new PRO.Views.ListNew({ collection: this.model.get('lists') });
        this.adopt(newListView);
        this.$('#lists').append(newListView.render().$el);
        return this;
    },
});
