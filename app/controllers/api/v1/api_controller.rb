module Api::V1
  class ApiController < ApplicationController
    before_filter :require_login

    def require_login
      unless logged_in?
        render :json => { message: "You're not authorized." }, status: :unauthorized
      end
    end
  end
end
