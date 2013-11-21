class SessionsController < ApplicationController
  def create
    user = User.find_or_create_by_omniauth(request.env['omniauth.auth'])
    session[:session_token] = user.session_token

    redirect_to root_url
  end

  def fail
    render :json => {msg: "github auth failed"}
  end

  def new
    if current_user
      redirect_to root_url
    else
      render :new
    end
  end

  def destroy
    logout current_user
    redirect_to root_url
  end
end
