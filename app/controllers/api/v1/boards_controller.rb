module Api::V1
  class BoardsController < ApiController
    def index
      @boards = current_user.boards
      render 'boards/index'
    end
    
    def create
      @board = Board.new(params[:board])
      @board.owner = current_user
      if @board.save
        render 'board/show'
      else
        render @board.errors.full_messages, :status => 422
      end
    end
  end
end
