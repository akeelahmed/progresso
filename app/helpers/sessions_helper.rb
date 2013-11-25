module SessionsHelper
  def current_user
    User.find_by_session_token(session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def require_login
    redirect_to login_url unless logged_in?
  end

  def logout(user)
    session[:session_token] = nil
    user.session_token = User.generate_session_token
    user.save!
  end
end
