PRO.Views.ListShow = PRO.Views.ParentView.extend({
    template: JST['lists/show'],
    tagName: 'div',
    className: 'list',
    children: function () {
        return this.model.get('cards');
    },
    childViewClass: function() {
        return PRO.Views.CardShow
    },
    events: {
        'click .cards__new-card__button': 'openNewView',
        'close-card .cards__new-card': 'closeNewView'
    },

    render: function () {
        this.$el.html(this.template({ model: this.model }));
        var $cards = this.$('.cards').empty();
        this._buildChildViews().each(function(cardView) {
            $cards.append(cardView.render().$el);
        });
        var $newCard = $('<li class="cards__new-card"></li>')
            .html('<span class="cards__new-card__button">new card</span>');
        $cards.append($newCard);
        return this;
    },

    openNewView: function (event) {
        var cards = this.model.get('cards');
        var newCard = new PRO.Models.Card({
            list_id: this.model.id,
            cardinality: (_.max(cards.pluck('cardinality')) + 1),
        });

        this._newCardView = new PRO.Views.CardNew({ model: newCard});
        this.$('.cards__new-card')
            .html(this._newCardView.render().$el);
        this.$('.cards__new-card input').focus();
    },

    closeNewView: function() {
        var that = this;
        this.model.get('cards').fetch({
            success: this.render.bind(this)
        });
    }
});
