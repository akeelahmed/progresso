module Api::V1
  # cards: index, create, show, update, destroy
  class CardsController < ApiController
    def create
      params[:card][:cardinality] ||= 0
      @card = Card.new(params[:card])
      if @card.save
        render 'cards/show'
      else
        render @card.errors.full_messages, :status => 422
      end
    end

    def destroy
      @card = Card.find(params[:id])
      @card.destroy
      render 'cards/show'
    end
  end
end
