PRO.Views.ListNew = Backbone.View.extend({
    tagName: 'div',
    className: 'list--new',
    template: JST['lists/new'],
    id: 'list--new',

    events: {
        'click .list--new__button': 'toggleState',
        'keyup input': 'handleKey',
        'blur input': 'saveAndToggleState',
    },

    initialize: function(options) {
        this.boardId = options.boardId;
    },

    toggleState: function() {
        this._active = (this._active ? false : true);
        this.render();
    },

    saveAndToggleState: function() {
        var that = this;
        if (!this._active) return;
        var name = this.$('#list-name').val();
        var newList = new PRO.Models.List({
            name: name,
            board_id: this.boardId
        });

        newList.save( {}, {
            success: function() {
                that.toggleState();
                that.collection.add(newList);
            }
        });
    },


    handleKey: function(event) {
        keys = {
            enter: 13,
            escape: 27
        };

        if (event.keyCode === keys.enter) {
            this.saveAndToggleState();
        } else if (event.keyCode === keys.escape) {
            this.toggleState();
        }
    },


    save: function() {
        var that = this;
        var name = this.$('#list-name').val();
        debugger;
        if (name.length === 0) {
            this.$el.trigger('close');
            return;
            //TODO refactor.
        }
        this.model.save(
            { name: name },
            {
                success: function () {
                    that.$el.trigger('close');
                },
            }
        );
    },

    render: function() {
        if (this._active) {
            this.$el.html(this.template({
                model: new PRO.Models.List()
            }));
            // render text field
        } else {
            this.$el.html('<span class="list--new__button">Add a list...</span>');
        }
        return this;
    }
});
