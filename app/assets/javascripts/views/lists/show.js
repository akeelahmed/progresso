PRO.Views.ListShow = PRO.Views.ParentView.extend({
    template: JST['lists/show'],
    tagName: 'li',
    className: 'list',
    children: function () {
        return this.model.get('cards');
    },

    childViewClass: function() {
        return PRO.Views.CardShow;
    },

    events: {
        'click .new-card-button': 'openNewView',
        'close .cards__new-card': 'closeNewView',
        'click .lists__list__name': 'openEditView',
        'close .lists__list__name': 'closeEditView',
        'sortstop .cards': 'resetCardinalities',
    },

    resetCardinalities: function (e) {
        e.stopPropagation();
        var that = this;
        var ids = $.map(this.$('.card'), function(o) {
            return $(o).data('id');
        });

        this.model.save({ ordered_card_ids: ids });
    },

    openEditView: function () {
        this._editListView = new PRO.Views.ListEdit({ model: this.model });
        this.$('.lists__list__name').html(this._editListView.render().$el);
        this.$('.lists__list__name input').focus();
    },

    closeEditView: function () {
        this._editListView.remove();
        this._editListView = undefined;
        this.$('.lists__list__name').html(this.model.escape('name'));
    },

    render: function () {
        this.$el.html(this.template({ model: this.model }));
        this.$el.data('id', this.model.id);
        var $cards = this.$('.cards').empty();
        this._buildChildViews().each(function(cardView) {
            $cards.append(cardView.render().$el);
        });
        var $newCardBtn = $('<div class="new-card-button"></div>')
            .html('<span class="new-card-button__button">&#10010;</span>');

        this.$el.append($newCardBtn);
        this.$('.cards').sortable({
            connectWith: '.cards',
            items: '.card',
            handle: '.card__body'
        }).disableSelection();

        return this;
    },

    openNewView: function (event) {
        var cards = this.model.get('cards');
        var newCard = new PRO.Models.Card({
            list_id: this.model.id,
            cardinality: (_.max(cards.pluck('cardinality')) + 1),
        });

        this._newCardView = new PRO.Views.CardNew({ model: newCard});
        $newCard = $('<li class="cards__new-card card">');
        $newCard.html(this._newCardView.render().$el);
        this.$('.cards').append($newCard);
        this.$('.cards__new-card input').focus();
    },

    closeNewView: function() {
        var that = this;
        this.model.get('cards').fetch({
            success: function() {
                that.render();
                console.log(that.$el);
            }
        });
    },
};
