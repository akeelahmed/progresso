module Api::V1
  # lists index, show, create, update, destroy

  class ListsController < ApiController
    def index
      @lists = Board.find(params[:board_id]).lists
      render 'lists/index'
    end

    def show
      @list = List.find(params[:id])
      render 'lists/show'
    end

    def create
      params[:list][:cardinality] ||= 0
      @list = List.new(params[:list])
      if @list.save
        render 'lists/show'
      else
        render @list.errors.full_messages, status: 422
      end
    end

    def update
      @list = List.find(params[:id])
      if @list.update_attributes(params[:list])
        render 'lists/show'
      else
        render json: @list.errors.full_messages
      end
    end

    def destroy
      @list = List.find(params[:id])
      @list.destroy
      render 'lists/show'
    end
  end
end
