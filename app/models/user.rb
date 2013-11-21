class User < ActiveRecord::Base
  before_validation :ensure_session_token, on: :create

  validates :provider, :uid, :session_token, presence: true

  def self.generate_session_token
    SecureRandom::urlsafe_base64(20)
  end

  def self.find_or_create_by_omniauth(auth)
    provider = auth['provider']
    uid = auth['uid'].to_i

    user = find_by_provider_and_uid(provider, uid)
    user ||= User.new

    user.provider = provider
    user.uid = uid
    user.name = auth['info']['name']
    user.email = auth['info']['email']
    user.username = auth['extra']['raw_info']['login']
    user.gravatar = auth['extra']['raw_info']['gravatar_id']

    user.session_token = User.generate_session_token
    user.save!

    user
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end
end
