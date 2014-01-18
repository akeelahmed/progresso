module Api::V1
  # cards: index, show, create, update, destroy

  class CardsController < ApiController
    def index
      @cards = List.find(params[:list_id]).cards
      render 'cards/index'
    end

    def show
      @card = Card.find(params[:id])
      render 'cards/show'
    end

    def create
      params[:card][:cardinality] ||= 0
      # TODO: do this in the model.

      @card = Card.new(params[:card])
      if @card.save
        render 'cards/show'
      else
        render @card.errors.full_messages, status: 422
      end
    end

    def update
      @card = Card.find(params[:id])
      if @card.update_attributes(params[:card])
        render 'cards/show'
      else
        render json: @card.errors.full_messages
      end
    end

    def destroy
      @card = Card.find(params[:id])
      @card.destroy
      render 'cards/show'
    end
  end
end
