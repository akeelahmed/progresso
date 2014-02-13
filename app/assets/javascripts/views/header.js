PRO.Views.Header = Backbone.View.extend({
    events: {
        'click .header__section--right__add-board-button': 'openNewBoardModal',
        'click .header__boards-menu': function() {
            Backbone.history.navigate('', {trigger: true})
        }
    },

    openNewBoardModal: function () {
        this.closeModals();

        var modal = new PRO.Views.BoardNewModal({
            model: new PRO.Models.Board()
        });

        this._currentModal = modal;


        this.$el.append(modal.render().$el);
    },

    closeModals: function () {
        this._currentModal && this._currentModal.remove();
    },
});
