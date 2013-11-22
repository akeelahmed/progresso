module Api::V1
  class BoardsController < ApiController
    def index
      @boards = current_user.boards
      render 'boards/index'
    end
  end
end
