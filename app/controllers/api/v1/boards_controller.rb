module Api::V1
  # boards: index, show, create, update, destroy
  
  class BoardsController < ApiController
    def index
      @boards = current_user.boards
      render 'boards/index'
    end
    
    def show
      @board = Board.find(params[:id])
      
      if @board.owner_id = current_user.id
        render 'boards/show' 
      else
        render json: { msg: "You're not authorized" }, status: 401
      end
    end

    def create
      @board = Board.new(params[:board])
      @board.owner = current_user
      if @board.save
        render 'boards/show'
      else
        render @board.errors.full_messages, :status => 422
      end
    end
    
    def update 
      @board = Board.find(params[:id])
      @board.update_attributes(params[:board])
    end

    def destroy
      @board = Board.find(params[:id])
      @board.destroy
      render 'boards/show'
    end
  end
end
