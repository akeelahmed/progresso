module Api::V1
  # lists index, create, show, update, destroy
 
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
        render @list.errors.full_messages, :status => 422
      end
    end

    def destroy
      @list = List.find(params[:id])
      @list.destroy
      render 'lists/show'
    end
  end
end
