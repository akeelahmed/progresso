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
        'click .list__name': 'openEditView',
        'close .list__name': 'closeEditView',
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
        this.$('.list__name').html(this._editListView.render().$el);
        this.$('.list__name input').focus();
    },

    closeEditView: function () {
        this._editListView.remove();
        this._editListView = undefined;
        this.$('.list__name').html(this.model.escape('name'));
    },

    renderCards: function() {
        var that = this;

        var $cards = $('<ul class="cards">')
                      .attr('data-id', this.model.escape('id'));

        var cards = this.model.get('cards');

        cards.each(function(card) {
            var cardView = new PRO.Views.CardShow({ model: card});
            that.adopt(cardView);
            $cards.append(cardView.render().$el);
        });

        this.$('.cards').replaceWith($cards);
    },

    render: function () {
        this.orphanAll();
        this.$el.html(this.template({ model: this.model }));
        this.renderCards();
        this.$el.data('id', this.model.id);

        var $newCardBtn = $('<div class="new-card-button"></div>')
            .html('<span class="new-card-button__button">Add a card...</span>');

        this.$el.append($newCardBtn);
        this.$('.cards').sortable({
            connectWith: '.cards',
            items: '.card',
            placeholder: 'card--placeholder',
            activeClass: 'card--dragged',
            tolerance: 'pointer',
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
            }
        });
    },
});
