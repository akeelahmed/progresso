PRO.Views.ListName = Backbone.View.extend({
    className: 'list__header',

    events: {
        'click .list__header__name': 'toggleState',
        'blur .list__header__name--input': 'saveAndToggleState',
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
        if (this._editing) {
            var $input = $('<input type=\"text\">');
            $input.addClass('list__header__name--input');
            $input.val(this.model.escape('name'));
            this.$el.html($input);

            $input.focus();
        } else {
            var $name = $(
                '<span class=\"list__header__name\">'
                );
            $name.html(this.model.escape('name'));

            this.$el.html($name);
        }

        return this
    },

});
