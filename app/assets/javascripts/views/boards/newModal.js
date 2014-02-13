PRO.Views.BoardNewModal = Backbone.View.extend({
    template: JST['boards/newmodal'],
    className: 'modal--new-board',

    events: {
        'click .modal--new-board__close': 'remove',
        'submit .modal--new-board__form': 'save'
    },

    save: function(e) {
        e.preventDefault();
        var name = this.$('#board-name').val();

        this.model.save(
            { name: name },
            {
                success: function navigateAway(newBoard) {
                    var route = "boards/" + newBoard.id
                    Backbone.history.navigate(route, { trigger: true });
                }
            }
        );
    },

    render: function () {
        this.$el.html(this.template({ model: this.model }));
        return this;
    }
})
