PRO.Views.ListName = Backbone.View.extend({
    className: 'list__header',
    template: JST['lists/name'],
    events: {
        'click .list__header__name': 'toggleState',
        'click .list__header__buttons': 'toggleState',
        'blur .list__header__name--input': 'saveAndToggleState',
        'click .list__header__buttons--editing__ok': 'saveAndToggleState',
        'click .list__header__buttons--editing__cancel': 'toggleState',
        'keyup .list__header__name--input': 'handleKey'
    },

    toggleState: function () {
        this._editing = (this._editing ? false : true);
        this.render();
    },

    saveAndToggleState: function () {
        if (!this._editing) return;
        var newName = this.$('.list__header__name--input').val();

        if (newName.length === 0) {
            this.toggleState();
            return;
        }

        this.model.save({
            name: newName
        }, {
            success: this.toggleState.bind(this)
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

    render: function () {
        this.$el.html(this.template({
            model: this.model,
            editing: this._editing
        }));
        this.$('.list__header__name--input').focus();
        return this
    },

});
