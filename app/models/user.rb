class User < ActiveRecord::Base
  has_many :boards, foreign_key: :owner_id

  before_validation :ensure_session_token, on: :create

  validates :provider, :uid, :session_token, presence: true

  def self.generate_session_token
    SecureRandom::urlsafe_base64(20)
  end

  def self.guest_user
    user = User.new

    user.provider = "guest"
    user.uid = Random.rand(1_000_000_000) # TODO better idea than this.

    user.name = "Christopher Guest"
    user.email = "chris.guest@example.com"
    user.username = "CGuest"
    user.gravatar = "205e460b479e2e5b48aec07710c08d50"
    user.session_token = User.generate_session_token

    user.save!
    user.boards.build(name: "Welcome!")
    user.save!

    user
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
