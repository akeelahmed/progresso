PRO.Views.ListShow = PRO.Views.ParentView.extend({
    template: JST['lists/show'],
    tagName: 'li',
    className: 'four columns list',
    children: function () {
        return this.model.get('cards');
    },

    childViewClass: function() {
        return PRO.Views.CardShow;
    },

    events: {
        'click .cards__new-card__button': 'openNewView',
        'close .cards__new-card': 'closeNewView',
        'click .lists__list__name': 'openEditView',
        'close .lists__list__name': 'closeEditView',
        'sortstop .cards': 'resetCardinalities',
    },

    resetCardinalities: function (e) {
        e.stopPropagation();
        console.log('reset from list/show');
        var that = this;
        var ids = $.map(this.$('.card'), function(o) {
            return $(o).data('id');
        });
        _(ids).each(
            function(id, cardinality) {
                that.model.get('cards').get(id).set('cardinality', cardinality);
            });
        this.model.save();
        console.log(that.model.get('cards').pluck('cardinality'), that.model.get('cards').pluck('body'))
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
        var $newCard = $('<li class="cards__new-card"></li>')
            .html('<span class="cards__new-card__button">new card</span>');
        $cards.append($newCard);
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
        this.$('.cards__new-card')
            .html(this._newCardView.render().$el);
        this.$('.cards__new-card input').focus();
    },

    closeNewView: function() {
        var that = this;
        this.model.get('cards').fetch({
            success: this.render.bind(this)
        });
    },
});
